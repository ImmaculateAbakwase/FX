<template>
  <div
    class="file-upload"
    :class="{ 'drag-active': dragActive }"
    @dragover.prevent="dragActive = true"
    @dragleave="dragActive = false"
    @drop.prevent="handleDrop"
  >
    <template v-if="preview">
      <div class="file-preview">
        <img :src="preview" alt="Preview" class="preview-image" />
        <button class="remove-preview" @click="emit('update:file', null)">
          Remove
        </button>
      </div>
    </template>
    <template v-else>
      <div class="upload-icon"></div>
      <p class="upload-text">{{ label }}</p>
      <p class="upload-hint">Drag & drop or click to browse</p>
      <input
        type="file"
        :accept="accept"
        @change="handleFileChange"
        class="file-input"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  accept: string
  preview?: string
  file?: File | null
}>()

const emit = defineEmits<{
  (e: 'update:file', file: File | null): void
}>()

const dragActive = ref(false)

const handleDrop = (e: DragEvent) => {
  dragActive.value = false
  const file = e.dataTransfer?.files?.[0] || null
  if (file) emit('update:file', file)
}

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] || null
  emit('update:file', file)
}
</script>