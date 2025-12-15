<template>
  <div class="video-management-page">
    <PageHeader 
      title="Add New Episode" 
      subtitle="Add episodes to existing series on KFLIX"
      icon="bi-collection-play"
    />

    <form @submit.prevent="handleSubmit" class="video-form">
      <FormSection title="Series Selection">
        <FormField label="Select Series" :required="true">
          <select 
            v-model="formData.seriesId"
            class="form-select"
            required
          >
            <option value="">Choose a series...</option>
            <option 
              v-for="series in mockSeries" 
              :key="series" 
              :value="series.toLowerCase()"
            >
              {{ series }}
            </option>
          </select>
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
      </FormSection>

      <FormSection title="Episode Details">
        <FormField label="Episode Title" :required="true">
          <input 
            v-model="formData.title"
            type="text"
            class="form-input"
            placeholder="Enter episode title"
            required
          />
        </FormField>

        <FormField label="Description" :required="true">
          <textarea 
            v-model="formData.description"
            class="form-textarea"
            placeholder="Describe what happens in this episode..."
            rows="4"
            required
          />
        </FormField>

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

          <FormField label="Access Type" :required="true">
            <select 
              v-model="formData.accessType"
              class="form-select"
            >
              <option value="free">Free</option>
              <option value="premium">Premium Only</option>
            </select>
          </FormField>
        </div>
      </FormSection>

      <FormSection title="Media Files">
        <FormField class="upload-group upload-video" label="Episode Video File" :required="true">
          <FileUpload 
            label="Upload Episode Video"
            accept="video/*"
            @update:file="(file: File | null) => (formData.videoFile = file)"
          />
          <div v-if="formData.videoFile" class="file-info">
            <i class="bi-file-earmark-play"></i>
            <span>{{ formData.videoFile.name }}</span>
            <span class="file-size">
              ({{ (formData.videoFile.size / 1024 / 1024).toFixed(2) }} MB)
            </span>
          </div>
        </FormField>

        <FormField class="upload-group upload-thumbnail" label="Episode Thumbnail">
          <FileUpload 
            label="Upload Thumbnail"
            accept="image/*"
            :preview="thumbnailPreview"
            @change="handleThumbnailChange"
          />
        </FormField>

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

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="handleCancel">
          <i class="bi-x-circle"></i> Cancel
        </button>
        <button type="submit" class="btn-primary">
          <i class="bi-plus-circle"></i> Add Episode
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
import type { EpisodeFormData } from '@/types/video-management.types'

const router = useRouter()

const mockSeries = ['Breaking Bad', 'Stranger Things', 'The Crown', 'Mandalorian', 'The Witcher']

const formData = reactive<EpisodeFormData>({
  seriesId: '',
  episodeNumber: 1,
  seasonNumber: 1,
  title: '',
  description: '',
  videoFile: null,
  thumbnail: null,
  subtitles: [],
  accessType: 'premium',
  duration: ''
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

const handleSubtitlesChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    formData.subtitles = Array.from(target.files)
  }
}

const handleSubmit = () => {
  console.log('Adding episode:', formData)
  alert('Episode added successfully!')
  // router.push('/video-streaming/list')
}

const handleCancel = () => {
  if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
    router.back()
  }
}
</script>

<style scoped src="@/assets/styles/VideoManagementStyles.css"></style>