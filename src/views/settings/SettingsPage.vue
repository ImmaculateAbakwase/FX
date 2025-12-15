<template>
  <div class="settings-page">
    <div class="page-top">
      <PageHeader :title="page?.title || 'Settings'" :subtitle="page?.subtitle || ''" :icon="page?.icon || 'bi-gear'" />
      <div class="page-actions">
        <button class="btn ghost" type="button" @click="reset" :disabled="isBusy">Reset</button>
        <button class="btn primary" type="button" @click="save" :disabled="isBusy">Save Changes</button>
      </div>
    </div>

    <div v-if="toast" class="toast" :class="toast.type">
      <i :class="toast.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'"></i>
      <span>{{ toast.message }}</span>
      <button class="toast-close" type="button" @click="toast = null"><i class="bi-x"></i></button>
    </div>

    <div v-if="!page" class="page-card">
      <p class="muted">Unknown settings page.</p>
    </div>

    <template v-else>
      <div v-if="page.type === 'form' || page.type === 'builder'" class="page-card">
        <div v-for="section in page.sections || []" :key="section.title" class="section">
          <div class="section-head">
            <h3 class="section-title">{{ section.title }}</h3>
            <p v-if="section.description" class="section-desc">{{ section.description }}</p>
          </div>

          <div class="fields">
            <div v-for="field in section.fields" :key="field.key" class="field">
              <label class="label">
                {{ field.label }}
                <span v-if="field.required" class="required">*</span>
              </label>

              <template v-if="field.type === 'text'">
                <input class="control" type="text" v-model="form[field.key]" :placeholder="field.placeholder" />
              </template>

              <template v-else-if="field.type === 'password'">
                <input class="control" type="password" v-model="form[field.key]" :placeholder="field.placeholder" />
              </template>

              <template v-else-if="field.type === 'number'">
                <input
                  class="control"
                  type="number"
                  v-model.number="form[field.key]"
                  :min="field.min"
                  :max="field.max"
                  :step="field.step"
                  :placeholder="field.placeholder"
                />
              </template>

              <template v-else-if="field.type === 'textarea'">
                <textarea class="control" :rows="field.rows || 6" v-model="form[field.key]" :placeholder="field.placeholder"></textarea>
              </template>

              <template v-else-if="field.type === 'checkbox'">
                <label class="checkbox">
                  <input type="checkbox" v-model="form[field.key]" />
                  <span class="checkbox-text">Enabled</span>
                </label>
              </template>

              <template v-else-if="field.type === 'select'">
                <select class="control" v-model="form[field.key]">
                  <option disabled value="">Select...</option>
                  <option v-for="opt in field.options || []" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </template>

              <template v-else-if="field.type === 'multicheck'">
                <div class="multi">
                  <label v-for="opt in field.items || []" :key="opt.value" class="multi-item">
                    <input type="checkbox" :value="opt.value" v-model="form[field.key]" />
                    <span>{{ opt.label }}</span>
                  </label>
                </div>
              </template>

              <template v-else-if="field.type === 'file'">
                <FileUpload
                  :label="field.label"
                  :accept="field.accept || 'image/*'"
                  :preview="(form[field.key] as string) || ''"
                  @update:file="(f) => onFile(field.key, f)"
                />
              </template>

              <p v-if="field.hint" class="hint">{{ field.hint }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="page.type === 'list'" class="page-card">
        <div class="list-head">
          <div class="list-title">
            <h3>{{ page.title }}</h3>
            <p class="muted">Add, edit, enable/disable and remove items.</p>
          </div>
          <button class="btn primary" type="button" @click="addRow" :disabled="isBusy">{{ page.list?.addLabel || 'Add' }}</button>
        </div>

        <div v-if="!page.list" class="muted">List schema missing.</div>

        <div v-else class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th v-for="c in page.list.columns" :key="c.key">{{ c.label }}</th>
                <th class="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in rows" :key="idx">
                <td v-for="c in page.list.columns" :key="c.key">
                  <template v-if="c.type === 'checkbox'">
                    <input type="checkbox" v-model="row[c.key]" />
                  </template>
                  <template v-else-if="c.type === 'select'">
                    <select class="control small" v-model="row[c.key]">
                      <option disabled value="">Select...</option>
                      <option v-for="opt in c.options || []" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </template>
                  <template v-else-if="c.type === 'number'">
                    <input class="control small" type="number" v-model.number="row[c.key]" :placeholder="c.placeholder" />
                  </template>
                  <template v-else-if="c.type === 'password'">
                    <input class="control small" type="password" v-model="row[c.key]" :placeholder="c.placeholder" />
                  </template>
                  <template v-else>
                    <input class="control small" type="text" v-model="row[c.key]" :placeholder="c.placeholder" />
                  </template>
                </td>
                <td class="actions-col">
                  <button class="btn ghost" type="button" @click="removeRow(idx)" :disabled="isBusy">Remove</button>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td :colspan="(page.list.columns.length + 1)">
                  <div class="empty">No items yet.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="page.type === 'matrix'" class="page-card">
        <div class="list-head">
          <div class="list-title">
            <h3>{{ page.title }}</h3>
            <p class="muted">Toggle which columns (roles/plans) get each row (permission/feature).</p>
          </div>
        </div>

        <div v-if="!page.matrix" class="muted">Matrix schema missing.</div>
        <div v-else class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>{{ page.matrix.rowKey }}</th>
                <th v-for="c in page.matrix.cols" :key="c.id">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in page.matrix.rows" :key="r.id">
                <td class="row-label">{{ r.label }}</td>
                <td v-for="c in page.matrix.cols" :key="c.id">
                  <input type="checkbox" v-model="matrix[r.id][c.id]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="page.type === 'logs' || page.type === 'status'" class="page-card">
        <div class="list-head">
          <div class="list-title">
            <h3>{{ page.title }}</h3>
            <p class="muted">This is a UI placeholder. Connect to your backend/API to populate real logs.</p>
          </div>
          <button class="btn ghost" type="button" @click="seedLogs" :disabled="isBusy">Generate Sample</button>
        </div>

        <div v-if="!page.logs" class="muted">Logs schema missing.</div>
        <div v-else class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th v-for="c in page.logs.columns" :key="c.key">{{ c.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in logs" :key="idx">
                <td v-for="c in page.logs.columns" :key="c.key">{{ row[c.key] }}</td>
              </tr>
              <tr v-if="logs.length === 0">
                <td :colspan="page.logs.columns.length">
                  <div class="empty">No records.</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else class="page-card">
        <p class="muted">Unsupported settings page type.</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/shared/PageHeader.vue'
import FileUpload from '@/components/shared/FileUpload.vue'
import { settingsPagesByKey } from './settingsSchema'
import { loadPageSettings, resetPageSettings, saveLastSettingsPage, savePageSettings } from './settingsStorage'

const route = useRoute()

type Toast = { type: 'success' | 'error'; message: string }

const toast = ref<Toast | null>(null)
const isBusy = ref(false)

const pageKey = computed(() => route.meta.settingsKey as string | undefined)
const page = computed(() => (pageKey.value ? settingsPagesByKey[pageKey.value] : undefined))

const form = reactive<Record<string, any>>({})
const rows = ref<Record<string, any>[]>([])
const matrix = reactive<Record<string, Record<string, boolean>>>({})
const logs = ref<Record<string, any>[]>([])

const read = () => {
  toast.value = null

  if (!page.value || !pageKey.value) return

  saveLastSettingsPage({
    key: pageKey.value,
    path: route.fullPath,
    title: page.value.title,
    updatedAt: Date.now()
  })

  if (page.value.type === 'form' || page.value.type === 'builder') {
    const fallback: Record<string, any> = {}
    for (const s of page.value.sections || []) {
      for (const f of s.fields) {
        if (f.type === 'checkbox') fallback[f.key] = false
        else if (f.type === 'multicheck') fallback[f.key] = []
        else fallback[f.key] = ''
      }
    }

    const data = loadPageSettings(pageKey.value, fallback)
    for (const k of Object.keys(form)) delete form[k]
    Object.assign(form, data)
  }

  if (page.value.type === 'list') {
    const fallback: Record<string, any> = { items: [] }
    const data = loadPageSettings(pageKey.value, fallback)
    rows.value = Array.isArray((data as any).items) ? (data as any).items : []
  }

  if (page.value.type === 'matrix') {
    const fallback: any = { matrix: {} }
    const data = loadPageSettings(pageKey.value, fallback)

    const base: Record<string, Record<string, boolean>> = {}
    for (const r of page.value.matrix?.rows || []) {
      base[r.id] = {}
      for (const c of page.value.matrix?.cols || []) {
        base[r.id][c.id] = false
      }
    }

    const saved = (data as any).matrix || {}
    for (const r of Object.keys(base)) {
      matrix[r] = matrix[r] || {}
      for (const c of Object.keys(base[r])) {
        matrix[r][c] = !!(saved[r] && saved[r][c])
      }
    }
  }

  if (page.value.type === 'logs' || page.value.type === 'status') {
    const fallback: any = { rows: [] }
    const data = loadPageSettings(pageKey.value, fallback)
    logs.value = Array.isArray((data as any).rows) ? (data as any).rows : []
  }
}

watch(
  () => route.fullPath,
  () => read(),
  { immediate: true }
)

const save = async () => {
  if (!pageKey.value || !page.value) return
  isBusy.value = true
  try {
    if (page.value.type === 'form' || page.value.type === 'builder') {
      savePageSettings(pageKey.value, { ...form })
    } else if (page.value.type === 'list') {
      savePageSettings(pageKey.value, { items: rows.value })
    } else if (page.value.type === 'matrix') {
      savePageSettings(pageKey.value, { matrix: matrix })
    } else if (page.value.type === 'logs' || page.value.type === 'status') {
      savePageSettings(pageKey.value, { rows: logs.value })
    }

    toast.value = { type: 'success', message: 'Settings saved.' }
  } catch {
    toast.value = { type: 'error', message: 'Failed to save settings.' }
  } finally {
    isBusy.value = false
  }
}

const reset = () => {
  if (!pageKey.value) return
  resetPageSettings(pageKey.value)
  read()
  toast.value = { type: 'success', message: 'Settings reset to defaults.' }
}

const addRow = () => {
  rows.value.push({})
}

const removeRow = (idx: number) => {
  rows.value.splice(idx, 1)
}

const seedLogs = () => {
  const cols = page.value?.logs?.columns || []
  const now = new Date().toISOString()
  logs.value = [
    Object.fromEntries(cols.map((c) => [c.key, c.key === 'timestamp' || c.key === 'requestedAt' || c.key === 'createdAt' ? now : 'Sample']))
  ]
}

const onFile = (key: string, file: File | null) => {
  if (!file) {
    form[key] = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    form[key] = typeof reader.result === 'string' ? reader.result : ''
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

 :root.light .settings-page :deep(.page-title) {
   color: #111827;
 }

 :root.light .settings-page :deep(.page-subtitle) {
   color: #4b5563;
 }

.page-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
}

.page-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.page-card {
  background: radial-gradient(circle at top left, rgba(239, 68, 68, 0.14), transparent 55%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 55%),
    rgba(2, 6, 23, 0.92);
  border-radius: 1.25rem;
  padding: 1.25rem 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.9);
}

:root.light .page-card {
  background: #ffffff;
  border-color: rgba(209, 213, 219, 1);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.section + .section {
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

:root.light .section + .section {
  border-top-color: rgba(209, 213, 219, 1);
}

.section-title {
  margin: 0;
  color: #f9fafb;
  font-weight: 700;
  font-size: 1.05rem;
}

:root.light .section-title {
  color: #111827;
}

.section-desc {
  margin: 0.35rem 0 0;
  color: #9ca3af;
}

:root.light .section-desc {
  color: #4b5563;
}

.fields {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
  font-weight: 700;
}

:root.light .label {
  color: #4b5563;
}

.required {
  color: #ef4444;
  margin-left: 6px;
}

.control {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.55);
  padding: 0.65rem 0.85rem;
  color: #e5e7eb;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.control.small {
  padding: 0.5rem 0.65rem;
  border-radius: 0.65rem;
  font-size: 0.85rem;
}

:root.light .control {
  background: #ffffff;
  color: #111827;
  border-color: rgba(209, 213, 219, 1);
}

.control:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.35);
  background: rgba(15, 23, 42, 1);
}

:root.light .control:focus {
  background: #ffffff;
}

.hint {
  margin: 0;
  font-size: 0.82rem;
  color: #9ca3af;
}

:root.light .hint {
  color: #4b5563;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 12px;
  padding: 10px 12px;
  color: #e5e7eb;
}

:root.light .checkbox {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
  color: #111827;
}

.multi {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
}

.multi-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 12px;
  color: #e5e7eb;
}

:root.light .multi-item {
  background: #f9fafb;
  border-color: rgba(209, 213, 219, 1);
  color: #111827;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
  margin-top: 12px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  padding: 10px 10px;
  color: #e5e7eb;
  text-align: left;
  vertical-align: top;
}

:root.light .table th,
:root.light .table td {
  color: #111827;
  border-bottom-color: rgba(209, 213, 219, 1);
}

.table th {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
}

:root.light .table th {
  color: #4b5563;
}

.actions-col {
  width: 120px;
}

.row-label {
  font-weight: 700;
}

.list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.list-title h3 {
  margin: 0;
  color: #f9fafb;
  font-weight: 700;
}

:root.light .list-title h3 {
  color: #111827;
}

.muted {
  color: #9ca3af;
}

:root.light .muted {
  color: #4b5563;
}

.empty {
  padding: 14px 0;
  color: #9ca3af;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.7);
  color: #e5e7eb;
}

.toast.success {
  border-color: rgba(34, 197, 94, 0.35);
}

.toast.error {
  border-color: rgba(239, 68, 68, 0.35);
}

.toast-close {
  margin-left: auto;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}

.btn {
  border-radius: 999px;
  padding: 0.55rem 1.2rem;
  font-size: 0.9rem;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.1s ease, box-shadow 0.18s ease;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn.ghost {
  background: transparent;
  color: #e5e7eb;
  border-color: rgba(148, 163, 184, 0.6);
}

:root.light .btn.ghost {
  color: #111827;
}

.btn.ghost:hover:not(:disabled) {
  background: rgba(15, 23, 42, 0.9);
}

:root.light .btn.ghost:hover:not(:disabled) {
  background: #f3f4f6;
}

.btn.primary {
  background: linear-gradient(90deg, #f97316, #ef4444);
  color: #f9fafb;
  box-shadow: 0 14px 30px rgba(248, 113, 113, 0.25);
}

.btn.primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(248, 113, 113, 0.35);
}
</style>
