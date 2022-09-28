<template>
  <!-- <div class="flex items-center mb-3">
      <div class="text-lg flex-grow">{{ colorFamily.name }}</div>
      <div class="flex space-x-1 justify-center">
          <button @click="showCodeModal()" class="text-gray-500 px-3 py-1.5 text bg-white hover:bg-gray-100 rounded-md">Export colors</button>
          <button @click="addToEditor()" class="text-gray-500 px-3 py-1.5 text bg-white hover:bg-gray-100 rounded-md">Edit colors</button>
      </div>
  </div> -->
  <div
      class="flex flex-col md:flex-row overflow-hidden relative"
  >
    <!-- <div class="hidden md:flex absolute h-2 top-1/2 transform -translate-y-1/2 items-center justify-center" style="width:10%" :style="{ left: highlightShadeLeftPosition}">
        <div
            class="h-2 w-2 -mt-2 rounded-full shadow"
            :style="{ backgroundColor: contrastingColor(highlightShadeLuminance) }"
        >
        </div>
    </div> -->
    <div
        class="h-16 md:h-32 w-full p-4 flex justify-center flex-col"
        v-for="shade in colorFamily.shades"
        :key="shade.number"
        :style="{ backgroundColor: shade.hexcode, color: contrastingColor(shade.luminance) }"
    >
      <div class="flex items-center">
        <div class="uppercase text-sm font-medium  md:hidden">
          {{ shade.number }}
        </div>
        <div class="uppercase text-sm font-medium ml-auto md:mx-auto ">
          {{ noHashtag(shade.hexcode) }}
        </div>
      </div>
      <!-- <CopyableShadeHexcode
          :shade-number=shade.number
          :shade-hexcode=shade.hexcode
          :text-color="contrastingColor(shade.luminance)"
      /> -->
    </div>
  </div>

  <ColorFamilyCode @hide="hideCodeModal()" :code-modal-shown=codeModalShown :color-family=colorFamily />
</template>

<script>
import chroma from 'chroma-js'
import ColorFamilyCode from '../components/ColorFamilyCode'
import CopyableShadeHexcode from '../components/CopyableShadeHexcode'

export default {
  name: 'ColorFamily',
  components: { ColorFamilyCode,  CopyableShadeHexcode},
  props: {
    colorFamily: Object,
    highlightShade: Number,
  },
  data() {
    return {
      codeModalShown: false,
      message: {visible: false, text: ''},
    }
  },
  methods: {
    noHashtag(input) {
      return input.replace('#', '')
    },
    showCodeModal() {
      this.codeModalShown = true
    },
    hideCodeModal() {
      this.codeModalShown = false
    },
    addToEditor() {
      this.$emit('add-to-editor', this.colorFamily)
    },
    deleteColorFamily() {
      this.$emit('delete-color-family', this.colorFamily)
    },
    luminance(hexcode) {
      return Math.round( chroma(hexcode).luminance() * 100 )
    },
    contrastingColor(luminance) {
      if (luminance < 40) {
        return this.colorFamily.shades.find( item => item.number == 100).hexcode
      }
      return this.colorFamily.shades.find( item => item.number == 900).hexcode
    },
  },
  computed: {
    middleShade() {
      return this.colorFamily.shades[this.colorFamily.shades.length / 2].hexcode
    },
    highlightShadeLuminance() {
      return this.colorFamily.shades.find( item => item.number == this.highlightShade).luminance
    },
    highlightShadeLeftPosition() {
      let index = this.colorFamily.shades.findIndex( item => item.number == this.highlightShade)
      let length = this.colorFamily.shades.length
      let step = 100 / length
      let calculatedStep = index * step
      return `${calculatedStep}%`
    }
  },
  emits: ['add-to-editor', 'delete-color-family'],
}
</script>
