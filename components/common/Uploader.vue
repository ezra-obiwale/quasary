<template>
  <div>
    <QImg
      ref="QImg"
      v-if="!canShowUploader"
      class="cursor-pointer"
      :src="preview"
      basic
      contain
      @click="previewClicked"
      :ratio="7/3"
    >
      <div
        v-if="previewText"
        class="absolute-full text-subtitle2 flex flex-center"
      >
        {{ previewText }}
      </div>
    </QImg>

    <QUploader
      ref="QUploader"
      v-show="canShowUploader"
      class="full-width"
      :accept="accept"
      :field-name="fieldName"
      :headers="theHeaders"
      :url="theUrl"
      v-bind="$attrs"
      v-on="$listeners"
      @added="hasFile = true"
      @removed="hasFile = false"
      @uploaded="uploaded"
      @failed="failed"
      hide-upload-btn
    />
  </div>
</template>

<script>
export default {
  name: 'UploaderComponent',
  inheritAttrs: false,
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    fieldName: {
      type: String,
      default: 'file'
    },
    headers: {
      type: Array,
      default: () => []
    },
    method: {
      type: String,
      default: 'POST'
    },
    noChanges: {
      type: Boolean,
      default: false
    },
    preview: {
      type: String,
      default: ''
    },
    previewText: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      hasFile: false
    }
  },
  computed: {
    canShowUploader () {
      return !this.preview || this.hasFile
    },
    theHeaders () {
      return [
        { name: 'Authorization', value: this.$q.cookies.get(this.jwtStorageKey) },
        { name: 'Accept', value: 'application/json' },
        ...this.headers
      ]
    },
    theUrl () {
      return this.backendUrl(this.url)
    }
  },
  methods: {
    failed ({ xhr }) {
      try {
        const resp = JSON.parse(xhr.responseText)
        this.requestError(resp)
      } catch (e) {
        this.$emit('error', e)
      }
    },
    previewClicked () {
      if (!this.noChanges) {
        this.$refs.QUploader.pickFiles()
      }
    },
    reset () {
      this.hasFile = false
      this.$refs.QUploader.reset()
    },
    upload () {
      this.$refs.QUploader.upload()
    },
    uploaded (data) {
      try {
        const resp = JSON.parse(data.xhr.responseText)
        this.$emit('uploaded', { ...data, resp })
      } catch (e) {
        this.$emit('error', e)
      }
    }
  }
}
</script>

<style>
</style>
