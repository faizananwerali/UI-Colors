<template>
  <h2>Find Closest Color</h2>
  <ColorInput @color-input="colorInputChange" />

  <div style="width:100;height:100px" :style="{ backgroundColor: colorInput}">
    {{ colorInput }}
  </div>
  <pre v-if="closestColorFamily">{{ closestColorFamily.name }} - {{ closestColorFamily.closestShade.number }}</pre>
  <div v-if="closestColorFamily" style="width:100;height:100px" :style="{ backgroundColor: closestColorFamily.closestShade.hexcode }">
    {{ closestColorFamily.closestShade.hexcode }}
  </div>
  <!-- <pre v-if="closestColorFamily">{{ closestColorFamily.name }} - {{ closestColorFamily.closestShadeLightness.number }}</pre>   -->

  <div style="margin:100px 0"></div>

  <div v-for="colorFamily in generatedColorFamilies" :key="colorFamily.id">
    <ColorFamily :color-family=colorFamily @add-to-editor="addToEditor" />
  </div>

</template>

<script>
const ntc = require('ntcjs');

import { v4 as uuidv4 } from 'uuid'
import { tailwindColors } from '../colors/tailwind'
import { findClosestColor } from '../functions/findClosestColor'
import chroma from 'chroma-js'
import ColorInput from '../components/ColorInput'
import ColorFamily from '../components/ColorFamily'

export default {
  name: 'ColorFamilyCreator',
  components: { ColorInput, ColorFamily },
  props: {},
  data() {
    return {
      colorInput: '',
      closestColorFamily: '',
      generatedColorFamilies: [],
    }
  },
  methods: {
    addToEditor(value) {
      this.$emit('add-to-editor', value)
    },
    colorInputChange(hexcode) {
      this.colorInput = hexcode
      this.closestColorFamily = findClosestColor(hexcode, tailwindColors)
      this.generateColorFamilyVariants()
    },
    generateColorFamily(flatHue = false, flatSaturation = false) {
      let inputHue = chroma(this.colorInput).get('hsl.h');
      let matchHue = chroma(this.closestColorFamily.closestShadeLightness.hexcode).get('hsl.h');

      let hueDifference = (inputHue - (matchHue || 0) );

      let saturationRatio = chroma(this.colorInput).get('hsl.s') /  chroma(this.closestColorFamily.closestShadeLightness.hexcode).get('hsl.s');

      if (hueDifference > 0) {
        hueDifference = '+' + hueDifference;
      } else {
        hueDifference = hueDifference.toString();
      }

      let generatedColorFamily = {}

      generatedColorFamily.id = uuidv4()
      generatedColorFamily.name = ntc.name(`${this.colorInput}`)[1]

      generatedColorFamily.shades = this.closestColorFamily.shades.map( (color) => {
        let newColor = color.hexcode
        let newSaturation =  chroma(newColor).get('hsl.s') * saturationRatio

        if (flatSaturation == true) {
          newColor = chroma(newColor).set('hsl.s', chroma(this.colorInput).get('hsl.s')).hex();
        } else {
          newColor = chroma(newColor).set('hsl.s', newSaturation).hex()
        }

        if (flatHue == true) {
          newColor = chroma(newColor).set('hsl.h', inputHue).hex();
        } else {
          newColor = chroma(newColor).set('hsl.h', hueDifference).hex()
        }

        if (this.closestColorFamily.closestShadeLightness.number == color.number) {
          newColor = chroma(this.colorInput).hex()
        }

        return {
          number: color.number,
          hexcode: newColor,
          hue: Math.round(chroma(newColor).get('hsl.h')),
          saturation: Math.round(chroma(newColor).get('hsl.s') * 100),
          lightness: Math.round(chroma(newColor).get('hsl.l') * 100),
        }
      })

      return generatedColorFamily
    },
    generateColorFamilyVariants() {
      this.generatedColorFamilies = []
      this.generatedColorFamilies.push( this.generateColorFamily(false, false) )
      this.generatedColorFamilies.push( this.generateColorFamily(true, false) )
      this.generatedColorFamilies.push( this.generateColorFamily(false, true) )
      this.generatedColorFamilies.push( this.generateColorFamily(true, true) )
    },
  },
  emits: ['add-to-editor'],
}
</script>
