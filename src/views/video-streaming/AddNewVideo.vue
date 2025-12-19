<template>
  <div class="video-management-page">
    <PageHeader 
      title="Add New Video" 
      subtitle="Upload movies, series, documentaries, and more to KFLIX"
      icon="bi-camera-video"
    />

    <!-- Step Indicator -->
    <div class="step-indicator">
      <div 
        v-for="(step, index) in steps" 
        :key="step.title"
        class="step-item"
        :class="{ 
          active: currentStep === index + 1 && !allStepsCompleted, 
          completed: currentStep > index + 1 || allStepsCompleted 
        }"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-title">{{ step.title }}</div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="video-form">
      <!-- Step 1: Basic Information -->
      <div v-if="currentStep === 1">
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

        <FormSection v-if="isSeries" title="Series / Episode Details">
          <FormField label="Select Series" :required="true">
            <input
              v-model="formData.seriesId"
              class="form-input"
              list="series-options"
              placeholder="Type or choose a series..."
              required
            />
            <datalist id="series-options">
              <option 
                v-for="series in mockSeries" 
                :key="series" 
                :value="series.toLowerCase()"
              >
                {{ series }}
              </option>
            </datalist>
          </FormField>

          <div class="form-grid">
            <FormField label="Season Number" :required="true">
              <input 
                v-model.number="formData.seasonNumber"
                type="number"
                class="form-input"
                min="1"
                required
              />
            </FormField>

            <FormField label="Episode Number" :required="true">
              <input 
                v-model.number="formData.episodeNumber"
                type="number"
                class="form-input"
                min="1"
                required
              />
            </FormField>
          </div>

          <div class="form-grid">
            <FormField label="Duration" :required="true">
              <input 
                v-model="formData.duration"
                type="text"
                class="form-input"
                placeholder="e.g., 45:30"
                required
              />
            </FormField>
          </div>

          <FormField label="Subtitles">
            <div class="subtitle-uploader">
              <input 
                type="file"
                accept=".srt,.vtt"
                multiple
                @change="handleSubtitlesChange"
                class="file-input-subtitle"
                id="subtitle-input"
              />
              <label for="subtitle-input" class="subtitle-label">
                <i class="bi-file-text"></i> Upload Subtitle Files (.srt, .vtt)
              </label>
              <div v-if="formData.subtitles.length > 0" class="subtitle-list">
                <div 
                  v-for="(sub, idx) in formData.subtitles" 
                  :key="idx" 
                  class="subtitle-item"
                >
                  <i class="bi-file-earmark-text"></i>
                  <span>{{ sub.name }}</span>
                </div>
              </div>
            </div>
          </FormField>
        </FormSection>
      </div>

      <!-- Step 2: Media Files -->
      <div v-if="currentStep === 2">
        <FormSection title="Media Files">
          <FormField class="upload-group upload-video" label="Video File (will be processed by MUX)" :required="true">
            <div v-if="!formData.videoFile" class="video-upload-full">
              <FileUpload 
                :key="videoUploadKey"
                label="Upload Video File"
                accept="video/*"
                @update:file="handleVideoFileChange"
              />
            </div>
            <div v-else class="video-upload-split">
              <div class="upload-section">
                <FileUpload 
                  :key="videoUploadKey"
                  label="Upload Video File"
                  accept="video/*"
                  @update:file="handleVideoFileChange"
                />
                <div class="file-info">
                  <i class="bi-file-earmark-play"></i>
                  <span>{{ formData.videoFile.name }}</span>
                  <span class="file-size">
                    ({{ (formData.videoFile.size / 1024 / 1024).toFixed(2) }} MB)
                  </span>
                  <button
                    type="button"
                    @click="clearVideoFile"
                    aria-label="Remove uploaded video"
                    style="margin-left: 10px; background: transparent; border: none; color: inherit; cursor: pointer; padding: 0;"
                  >
                    <i class="bi-x-lg"></i>
                  </button>
                </div>
              </div>
              <div class="preview-section">
                <video :src="videoPreviewUrl" controls preload="metadata" style="width: 100%; border-radius: 10px; max-height: 300px;"></video>
              </div>
            </div>
          </FormField>

          <div class="form-grid">
            <FormField class="upload-group upload-thumbnail" label="Thumbnail" :required="true">
              <FileUpload 
                label="Upload Thumbnail"
                accept="image/*"
                :preview="thumbnailPreview"
                @update:file="handleThumbnailChange"
              />
            </FormField>

            <FormField class="upload-group upload-trailer" label="Trailer (Optional)">
              <FileUpload 
                label="Upload Trailer"
                accept="video/*"
                @update:file="(file: File | null) => (formData.trailer = file)"
              />
            </FormField>
          </div>
        </FormSection>
      </div>

      <!-- Step 3: Access & Restrictions -->
      <div v-if="currentStep === 3">
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
      </div>

      <div v-if="isUploading" class="upload-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
        <p class="progress-text">Uploading to MUX... {{ uploadProgress }}%</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="form-actions">
        <button 
          type="button" 
          class="btn-secondary" 
          @click="handleCancel"
          v-if="currentStep === 1"
        >
          <i class="bi-x-circle"></i> Cancel
        </button>
        <button 
          type="button" 
          class="btn-secondary" 
          @click="previousStep"
          v-if="currentStep > 1"
        >
          <i class="bi-arrow-left"></i> Previous
        </button>
        <button 
          type="button" 
          class="btn-primary" 
          @click="nextStep"
          v-if="currentStep < 3"
        >
          Next <i class="bi-arrow-right"></i>
        </button>
        <button 
          type="submit" 
          class="btn-primary" 
          :disabled="isUploading"
          v-if="currentStep === 3"
        >
          <i class="bi-cloud-upload"></i> Upload Video
        </button>
      </div>
    </form>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <i class="bi-check-circle-fill success-icon"></i>
          <h3>Success!</h3>
        </div>
        <div class="modal-body">
          <p>Movie successfully uploaded and is being processed by MUX.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-primary" @click="goToList">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onBeforeUnmount } from 'vue'
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

const mockSeries = ['Breaking Bad', 'Stranger Things', 'The Crown', 'Mandalorian', 'The Witcher']

const steps = [
  { title: 'Basic Information' },
  { title: 'Media Files' },
  { title: 'Access & Restrictions' }
]

const currentStep = ref(1)
const allStepsCompleted = ref(false)
const showSuccessModal = ref(false)

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
  subtitles: [],
  seriesId: '',
  episodeNumber: 1,
  seasonNumber: 1,
  duration: ''
})

const thumbnailPreview = ref('')
const videoPreviewUrl = ref('')
const videoUploadKey = ref(0)
const uploadProgress = ref(0)
const isUploading = ref(false)

const isSeries = ref(formData.category === 'series')

const validateStep = (step: number): boolean => {
  switch (step) {
    case 1:
      if (!formData.title.trim()) return false
      if (!formData.description.trim()) return false
      if (formData.genre.length === 0) return false
      if (isSeries.value) {
        if (!formData.seriesId?.trim()) return false
        if (!formData.duration?.trim()) return false
      }
      return true
    case 2:
      if (!formData.videoFile) return false
      if (!formData.thumbnail) return false
      return true
    case 3:
      return true // All fields are optional or have defaults
    default:
      return false
  }
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < 3) {
      currentStep.value++
    }
  } else {
    alert('Please fill in all required fields before proceeding.')
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

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
  if (videoPreviewUrl.value) {
    URL.revokeObjectURL(videoPreviewUrl.value)
    videoPreviewUrl.value = ''
  }
  if (file) {
    videoPreviewUrl.value = URL.createObjectURL(file)
  }
}

const clearVideoFile = () => {
  handleVideoFileChange(null)
  videoUploadKey.value += 1
}

const handleSubtitlesChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    formData.subtitles = Array.from(target.files)
  }
}

watch(
  () => formData.category,
  (cat) => {
    const nextIsSeries = cat === 'series'
    isSeries.value = nextIsSeries
    if (!nextIsSeries) {
      formData.seriesId = ''
      formData.episodeNumber = 1
      formData.seasonNumber = 1
      formData.duration = ''
      formData.subtitles = []
    }
  }
)

onBeforeUnmount(() => {
  if (videoPreviewUrl.value) {
    URL.revokeObjectURL(videoPreviewUrl.value)
  }
})

const handleSubmit = async () => {
  if (!validateStep(3)) {
    alert('Please fill in all required fields.')
    return
  }

  isUploading.value = true
  
  // Simulate upload progress to MUX
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 200))
    uploadProgress.value = i
  }
  
  // Here you would integrate with your actual MUX API
  console.log('Uploading video to MUX:', formData)
  
  isUploading.value = false
  
  // Save uploaded movie to localStorage for frontend display
  const uploadedMovie = {
    id: Date.now(), // Use timestamp as unique ID
    title: formData.title,
    badge: 'NEW UPLOAD',
    rating: 0, // Default rating
    year: new Date().getFullYear(),
    imageUrl: formData.thumbnail ? URL.createObjectURL(formData.thumbnail) : ''
  }
  
  const existingUploads = JSON.parse(localStorage.getItem('uploadedMovies') || '[]')
  existingUploads.unshift(uploadedMovie) // Add to beginning so latest appears first
  localStorage.setItem('uploadedMovies', JSON.stringify(existingUploads))
  
  // Mark all steps as completed and reset to step 1
  allStepsCompleted.value = true
  currentStep.value = 1
  
  // Show success modal
  showSuccessModal.value = true
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
    router.back()
  }
}

const closeModal = () => {
  showSuccessModal.value = false
}

const goToList = () => {
  showSuccessModal.value = false
  router.push('/admin/video-streaming/list')
}
</script>

<style scoped src="@/assets/styles/VideoManagementStyles.css"></style>