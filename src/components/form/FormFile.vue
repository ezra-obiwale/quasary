<template>
  <div>
    <q-btn v-if="ready" @click="openFile" v-bind="btnAttrs" :label="btnLabel" />
    <br />
    <img v-for="(path, index) in paths"
      class="q-mt-sm q-mr-xs"
      :key="index"
      :src="path"
      :alt="`File ${index + 1}`"
      :title="fileName(index)" />
    <input type="file" ref="input" v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  name: 'FormFile',
  inheritAttrs: false,
  props: {
    btnAttrs: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      paths: [],
      ready: false
    }
  },
  computed: {
    btnLabel () {
      if (!this.paths.length) {
        return this.btnAttrs.label || 'Select File'
      }
      return `${this.paths.length} files selected`
    },
    fileCount () {
      return Object.keys(this.paths).length
    }
  },
  mounted () {
    this.watchFileInput(this.$refs.input, paths => {
      this.paths = paths
    })
    this.ready = true
  },
  methods: {
    fileName (index) {
      return this.$refs.input.files[index] ? this.$refs.input.files[index].name : 'file not found'
    },
    openFile () {
      this.$set(this, 'paths', [])
      this.$refs.input.click()
    }
  }
}
</script>

<style scoped>
  img {
    width: 30px;
    height: 30px;
  }
</style>