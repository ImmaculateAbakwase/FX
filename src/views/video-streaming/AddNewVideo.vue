<template>
  <div class="video-management-page">
    <PageHeader 
      title="Add New Video" 
      subtitle="Upload movies, series, documentaries, and more to KFLIX"
      icon="bi-camera-video"
    />

    <form @submit.prevent="handleSubmit" class="video-form">
      <FormSection title="Basic Information">
        <div class="form-grid">
          <FormField label="Title" :required="true">
            <input 
              v-model="formData.title"
              type="text"
              class="form-input"
              placeholder="Enter video title"
              required
            />
          </FormField>

          <FormField label="Category" :required="true">
            <select 
              v-model="formData.category"
              class="form-select"
            >
              <option 
                v-for="cat in categories" 
                :key="cat" 
                :value="cat.toLowerCase()"
              >
                {{ cat }}
              </option>
            </select>
          </FormField>
        </div>

        <FormField label="Description" :required="true">
          <textarea 
            v-model="formData.description"
            class="form-textarea"
            placeholder="Provide a detailed description..."
            rows="4"
            required
          />
        </FormField>

        <FormField label="Genres" :required="true">
          <div class="genre-grid">
            <label 
              v-for="genre in genres" 
              :key="genre" 
              class="genre-checkbox"
            >
              <input 
                type="checkbox"
                :value="genre"
                v-model="formData.genre"
              />
              <span>{{ genre }}</span>
            </label>
          </div>
        </FormField>
      </FormSection>

      <FormSection title="Media Files">
        <FormField class="upload-group upload-video" label="Video File (will be processed by MUX)" :required="true">
          <FileUpload 
            label="Upload Video File"
            accept="video/*"
            @change="handleVideoFileChange"
          />
          <div v-if="formData.videoFile" class="file-info">
            <i class="bi-file-earmark-play"></i>
            <span>{{ formData.videoFile.name }}</span>
            <span class="file-size">
              ({{ (formData.videoFile.size / 1024 / 1024).toFixed(2) }} MB)
            </span>
          </div>
        </FormField>

        <div class="form-grid">
          <FormField class="upload-group upload-thumbnail" label="Thumbnail" :required="true">
            <FileUpload 
              label="Upload Thumbnail"
              accept="image/*"
              :preview="thumbnailPreview"
              @change="handleThumbnailChange"
            />
          </FormField>

          <FormField class="upload-group upload-trailer" label="Trailer (Optional)">
            <FileUpload 
              label="Upload Trailer"
              accept="video/*"
              @change="(file) => formData.trailer = file"
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Access & Restrictions">
        <div class="form-grid">
          <FormField label="Access Type" :required="true">
            <select 
              v-model="formData.accessType"
              class="form-select"
            >
              <option value="free">Free</option>
              <option value="premium">Premium Only</option>
              <option value="ppv">Pay-Per-View</option>
            </select>
          </FormField>

          <FormField label="Age Rating" :required="true">
            <select 
              v-model="formData.ageRating"
              class="form-select"
            >
              <option 
                v-for="rating in ageRatings" 
                :key="rating" 
                :value="rating"
              >
                {{ rating }}
              </option>
            </select>
          </FormField>
        </div>

        <FormField label="Region Locks">
          <div class="region-grid">
            <label 
              v-for="region in regions" 
              :key="region" 
              class="region-checkbox"
            >
              <input 
                type="checkbox"
                :value="region"
                v-model="formData.regionLocks"
              />
              <span>{{ region }}</span>
            </label>
          </div>
        </FormField>
      </FormSection>

      <div v-if="isUploading" class="upload-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
        <p class="progress-text">Uploading to MUX... {{ uploadProgress }}%</p>
      </div>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="handleCancel">
          <i class="bi-x-circle"></i> Cancel
        </button>
        <button type="submit" class="btn-primary" :disabled="isUploading">
          <i class="bi-cloud-upload"></i> Upload Video
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
import type { VideoFormData } from '@/types/video-management.types'

const router = useRouter()

const categories = ['Movie', 'Series', 'Documentary', 'Show', 'Trailer', 'Original Content']
const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Adventure']
const regions = ['US', 'UK', 'EU', 'Asia', 'Africa', 'South America', 'Australia']
const ageRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-MA']

const formData = reactive<VideoFormData>({
  title: '',
  description: '',
  category: 'movie',
  genre: [],
  thumbnail: null,
  trailer: null,
  videoFile: null,
  accessType: 'free',
  regionLocks: [],
  ageRating: 'G',
  subtitles: []
})

const thumbnailPreview = ref('')
const uploadProgress = ref(0)
const isUploading = ref(false)

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

const handleVideoFileChange = (file: File | null) => {
  formData.videoFile = file
}

const handleSubmit = async () => {
  isUploading.value = true
  
  // Simulate upload progress to MUX
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 200))
    uploadProgress.value = i
  }
  
  // Here you would integrate with your actual MUX API
  console.log('Uploading video to MUX:', formData)
  
  isUploading.value = false
  alert('Video uploaded successfully! Processing with MUX...')
  
  // Reset form or redirect
  // router.push('/video-streaming/list')
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
    router.back()
  }
}
</script>

<style scoped src="@/assets/styles/VideoManagementStyles.css"></style>