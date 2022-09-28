<template>
  <div class="flex flex-col fixed inset-0">
    <div class="flex-grow overflow-y-scroll">
      <div class="max-w-5xl mx-auto p-0">
        <div v-for="colorFamily in generatedColorFamilies" :key="colorFamily.id" class="space-y-6">
          <ColorFamilyMobile :highlight-shade="closestColorFamily.closestShadeLightness.number" :color-family=colorFamily @add-to-editor="addToEditor" />
          <ColorFamilyPreview :color-family=colorFamily :dark-mode=true />
        </div>
      </div>
    </div>
    <div class="border-t bg-gray-900 border-gray-700 bg-opacity-85"
         style="box-shadow: 0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)"
    >
      <div class="max-w-2xl p-8 mx-auto">
        <HueSaturationWheel v-if="renderColorWheel" :hue=0  :saturation=50 @hue-change="hueChange" />
      </div>
    </div>
  </div>

</template>

<script>
import { tailwindColors } from '../colors/tailwind'
import { defaultHexcodes } from '../colors/defaultHexcodes'
import { findClosestColor } from '../functions/findClosestColor'
import { generateTailwindColorFamily } from '../functions/generateTailwindColorFamily'
import chroma from 'chroma-js'
import ColorInput from '../components/ColorInput'
import HueSaturationWheel from '../components/HueSaturationWheel'
import ColorFamily from '../components/ColorFamily'
import ColorFamilyMobile from '../components/ColorFamilyMobile'
import ColorFamilyPreview from '../components/ColorFamilyPreview'

export default {
  name: 'TailwindColorWheel',
  components: { ColorInput, ColorFamily, ColorFamilyMobile, ColorFamilyPreview, HueSaturationWheel },
  props: {
    colorFamilies: Array
  },
  data() {
    return {
      colorInput: '',
      referenceColorFamilies: [],
      generatedColorFamilies: [],
      closestColorFamily: '',
      renderColorWheel: false,
    }
  },
  methods: {
    addToEditor(value) {
      this.$emit('add-to-editor', value)
    },
    hueChange(value) {
      this.colorInputChange( chroma.hsl(value.hue, value.saturation / 100, .5).hex() )
    },
    colorInputChange(hexcode) {
      this.colorInput = hexcode
      // console.log('colorInput', this.colorInput)
      // console.log('referenceColorFamilies', this.referenceColorFamilies)
      this.closestColorFamily = findClosestColor(hexcode, this.referenceColorFamilies)
      this.generatedColorFamilies = generateTailwindColorFamily(hexcode, this.referenceColorFamilies)
      // console.log('closestColorFamily', this.closestColorFamily)
      // console.log('generatedColorFamilies', this.generatedColorFamilies)
      // console.log('generatedColorFamilies', this.generatedColorFamilies.shades.map(shade => shade.hexcode).join(', '))
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
    this.renderColorWheel = true

    document.body.classList.add("bg-gray-900");
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
