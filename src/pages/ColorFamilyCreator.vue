<template>
  <div class="max-w-2xl px-6 mx-auto mt-8 md:mt-20 md:mb-12 mb-6">

    <div class="md:my-12">
      <div class="text-3xl md:text-5xl tracking-tight font-semibold text-gray-900 text-center">Create Tailwind CSS<br>color families</div>
      <p class="text-gray-500 md:text-lg mt-4 text-center">Enter a hexcode and I will create a color family for you.</p>
    </div>
    <ColorInput
        :hexcode="colorInput"
        @color-input="colorInputChange"
        @random-color="randomColor"
    />
  </div>

  <div class="max-w-5xl px-6 pb-6 mx-auto space-y-8">
    <div v-for="colorFamily in generatedColorFamilies" :key="colorFamily.id" class="space-y-6">
      <ColorFamily :highlight-shade="closestColorFamily.closestShadeLightness.number" :color-family=colorFamily @add-to-editor="addToEditor" />
      <ColorFamilyPreview :color-family=colorFamily />
    </div>

  </div>
</template>

<script>
import { tailwindColors } from '@/colors/tailwind'
import { defaultHexcodes } from '@/colors/defaultHexcodes'
import { findClosestColor } from '@/functions/findClosestColor'
import { generateTailwindColorFamily } from '@/functions/generateTailwindColorFamily'
import chroma from 'chroma-js'
import ColorInput from '../components/ColorInput'
import ColorFamily from '../components/ColorFamily'
import ColorFamilyPreview from '../components/ColorFamilyPreview'

export default {
  name: 'ColorFamilyCreator',
  components: { ColorInput, ColorFamily, ColorFamilyPreview },
  props: {
    colorFamilies: Array
  },
  data() {
    return {
      colorInput: '',
      referenceColorFamilies: [],
      generatedColorFamilies: [],
      closestColorFamily: '',
    }
  },
  methods: {
    addToEditor(value) {
      this.$emit('add-to-editor', value)
    },
    colorInputChange(hexcode) {
      this.colorInput = hexcode
      console.log('colorInput', this.colorInput)
      console.log('referenceColorFamilies', this.referenceColorFamilies)
      this.closestColorFamily = findClosestColor(hexcode, this.referenceColorFamilies)
      this.generatedColorFamilies = [ generateTailwindColorFamily(hexcode, this.referenceColorFamilies) ]
      console.log('closestColorFamily', this.closestColorFamily)
      console.log('generatedColorFamilies', this.generatedColorFamilies)
    },
    spacebarPress(e) {
      if (e.keyCode == 32 ) {
        e.preventDefault();
        this.colorInputChange( chroma.random() )
      }
    },
    randomColor() {
      this.colorInputChange( chroma.random() )
    }
  },
  created() {
    window.addEventListener("keydown", this.spacebarPress)
  },
  mounted() {
    this.referenceColorFamilies = tailwindColors.filter( (item) => {
      return item.name !== 'warmGray' &&
          item.name !== 'trueGray' &&
          item.name !== 'gray' &&
          item.name !== 'coolGray' &&
          item.name !== 'blueGray'
    })

    const random = Math.floor(Math.random() * defaultHexcodes.length);
    this.colorInputChange( chroma(defaultHexcodes[random]) )
  },
  activated() {
    window.addEventListener("keydown", this.spacebarPress)
  },
  deactivated() {
    window.removeEventListener("keydown", this.spacebarPress)
  },
  emits: ['add-to-editor', 'define-color-families-generated'],
}
</script>
