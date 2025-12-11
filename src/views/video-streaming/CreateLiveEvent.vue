<template>
  <div class="video-management-page">
    <PageHeader 
      title="Create Live Event" 
      subtitle="Schedule live streaming events and PPV content"
      icon="bi-broadcast"
    />

    <form @submit.prevent="handleSubmit" class="video-form">
      <FormSection title="Event Details">
        <FormField label="Event Title" :required="true">
          <input 
            v-model="formData.title"
            type="text"
            class="form-input"
            placeholder="Enter live event title"
            required
          />
        </FormField>

        <FormField label="Description" :required="true">
          <textarea 
            v-model="formData.description"
            class="form-textarea"
            placeholder="Describe the live event..."
            rows="4"
            required
          />
        </FormField>

        <FormField class="upload-group upload-thumbnail" label="Event Poster" :required="true">
          <FileUpload 
            label="Upload Event Poster"
            accept="image/*"
            :preview="posterPreview"
            @change="handlePosterChange"
          />
        </FormField>
      </FormSection>

      <FormSection title="Schedule & Pricing">
        <div class="form-grid">
          <FormField label="Event Date" :required="true">
            <input 
              v-model="formData.scheduledDate"
              type="date"
              class="form-input"
              required
            />
          </FormField>

          <FormField label="Event Time" :required="true">
            <input 
              v-model="formData.scheduledTime"
              type="time"
              class="form-input"
              required
            />
          </FormField>
        </div>

        <div class="ppv-toggle">
          <label class="toggle-label">
            <input 
              type="checkbox"
              v-model="formData.isPPV"
            />
            <span class="toggle-switch"></span>
            <span>This is a Pay-Per-View Event</span>
          </label>
        </div>

        <FormField v-if="formData.isPPV" label="PPV Price (USD)" :required="true">
          <div class="price-input-wrapper">
            <span class="price-symbol">$</span>
            <input 
              v-model="formData.price"
              type="number"
              class="form-input price-input"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </FormField>
      </FormSection>

      <FormSection title="Stream Configuration">
        <FormField label="Stream URL" :required="true">
          <input 
            v-model="formData.streamUrl"
            type="url"
            class="form-input"
            placeholder="rtmp://stream.kflix.com/live/..."
            required
          />
        </FormField>

        <FormField label="Age Rating" :required="true">
          <select 
            v-model="formData.ageRating"
            class="form-select"
          >
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="TV-MA">TV-MA</option>
          </select>
        </FormField>

        <FormField label="Region Restrictions">
          <div class="region-grid">
            <label 
              v-for="region in regions" 
              :key="region" 
              class="region-checkbox"
            >
              <input 
                type="checkbox"
                :value="region"
                v-model="formData.regionRestrictions"
              />
              <span>{{ region }}</span>
            </label>
          </div>
        </FormField>
      </FormSection>

      <div class="form-actions">
        <button type="button" class="btn-secondary" @click="handleCancel">
          <i class="bi-x-circle"></i> Cancel
        </button>
        <button type="submit" class="btn-primary">
          <i class="bi-broadcast"></i> Create Live Event
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

interface LiveEventFormData {
  title: string
  description: string
  poster: File | null
  price: string
  isPPV: boolean
  scheduledTime: string
  scheduledDate: string
  regionRestrictions: string[]
  ageRating: string
  streamUrl: string
}

const router = useRouter()

const regions = ['US', 'UK', 'EU', 'Asia', 'Africa', 'South America', 'Australia']

const formData = reactive<LiveEventFormData>({
  title: '',
  description: '',
  poster: null,
  price: '0',
  isPPV: false,
  scheduledTime: '',
  scheduledDate: '',
  regionRestrictions: [],
  ageRating: 'TV-MA',
  streamUrl: ''
})

const posterPreview = ref('')

const handlePosterChange = (file: File | null) => {
  formData.poster = file
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      posterPreview.value = reader.result as string
    }
    reader.readAsDataURL(file)
  } else {
    posterPreview.value = ''
  }
}

const handleSubmit = () => {
  alert('Live event created successfully!')
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped src="@/assets/styles/VideoManagementStyles.css"></style>
