<template>
  <div class="video-management-page">
    <PageHeader 
      title="Add New Game" 
      subtitle="Upload games to KFLIX Play platform"
      icon="bi-controller"
    />

    <form @submit.prevent="handleSubmit" class="video-form">
      <FormSection title="Game Information">
        <FormField label="Game Title" :required="true">
          <input 
            v-model="formData.title"
            type="text"
            class="form-input"
            placeholder="Enter game title"
            required
          />
        </FormField>

        <FormField label="Description" :required="true">
          <textarea 
            v-model="formData.description"
            class="form-textarea"
            placeholder="Describe the game..."
            rows="4"
            required
          />
        </FormField>

        <div class="form-grid">
          <FormField label="Category" :required="true">
            <select 
              v-model="formData.category"
              class="form-select"
            >
              <option 
                v-for="cat in gameCategories" 
                :key="cat" 
                :value="cat.toLowerCase()"
              >
                {{ cat }}
              </option>
            </select>
          </FormField>

          <FormField label="Age Rating" :required="true">
            <select 
              v-model="formData.ageRating"
              class="form-select"
            >
              <option value="E">E - Everyone</option>
              <option value="E10+">E10+ - Everyone 10+</option>
              <option value="T">T - Teen</option>
              <option value="M">M - Mature</option>
            </select>
          </FormField>
        </div>

        <FormField label="Game Tags">
          <div class="genre-grid">
            <label 
              v-for="tag in suggestedTags" 
              :key="tag" 
              class="genre-checkbox"
            >
              <input 
                type="checkbox"
                :value="tag"
                v-model="formData.tags"
              />
              <span>{{ tag }}</span>
            </label>
          </div>
        </FormField>
      </FormSection>

      <FormSection title="Game Files">
        <div class="html5-toggle">
          <label class="toggle-label">
            <input 
              v-model="formData.isHTML5"
              type="checkbox"
            />
            <span class="toggle-switch"></span>
            <span>HTML5 Game</span>
          </label>
        </div>

        <FormField class="upload-group upload-video" label="Game File" :required="true">
          <FileUpload 
            :label="formData.isHTML5 ? 'Upload Game ZIP' : 'Upload Game Package'"
            :accept="formData.isHTML5 ? '.zip' : '*'"
            @update:file="(file: File | null) => (formData.gameFile = file)"
          />
          <div v-if="formData.gameFile" class="file-info">
            <i class="bi-file-earmark-zip"></i>
            <span>{{ formData.gameFile.name }}</span>
            <span class="file-size">
              ({{ (formData.gameFile.size / 1024 / 1024).toFixed(2) }} MB)
            </span>
          </div>
        </FormField>

        <FormField class="upload-group upload-thumbnail" label="Game Thumbnail" :required="true">
          <FileUpload 
            label="Upload Thumbnail"
            accept="image/*"
            :preview="thumbnailPreview"
            @change="handleThumbnailChange"
          />
        </FormField>

        <FormField label="Game Metadata (JSON)">
          <textarea 
            v-model="formData.metadata"
            class="form-textarea code-textarea"
            placeholder='{"controls": "WASD + Mouse", "requirements": "WebGL 2.0", "multiplayer": true}'
            rows="6"
          />
          <p class="input-hint">
            <i class="bi-info-circle"></i>
            Add technical requirements, controls, and other metadata in JSON format
          </p>
        </FormField>
      </FormSection>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="handleCancel">
          <i class="bi-x-circle"></i> Cancel
        </button>
        <button type="submit" class="btn-primary">
          <i class="bi-controller"></i> Add Game
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/shared/PageHeader.vue'
import FormSection from '@/components/shared/FormSection.vue'
import FormField from '@/components/shared/FormField.vue'
import FileUpload from '@/components/shared/FileUpload.vue'
import type { GameFormData } from '@/types/video-management.types'

const router = useRouter()

const gameCategories = ['Action', 'Puzzle', 'Adventure', 'Racing', 'Sports', 'Strategy']
const suggestedTags = ['Multiplayer', 'Single Player', '3D', '2D', 'Casual', 'Competitive']

const formData = reactive<GameFormData>({
  title: '',
  description: '',
  category: 'action',
  thumbnail: null,
  gameFile: null,
  isHTML5: true,
  tags: [],
  ageRating: 'E',
  metadata: ''
})

const thumbnailPreview = ref('')

const handleThumbnailChange = (file: File | null) => {
  formData.thumbnail = file
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      thumbnailPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  } else {
    thumbnailPreview.value = ''
  }
}

const handleSubmit = () => {
  console.log('Adding game:', formData)
  alert('Game added successfully to KFLIX Play!')
  // router.push('/gaming/list')
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
    router.back()
  }
}
</script>

<style scoped src="@/assets/styles/VideoManagementStyles.css"></style>