<template>
  <div class="max-w-2xl px-6 mx-auto mt-12 md:mt-20 mb-12">
    <ColorInput
        :hexcode="colorInput"
        @color-input="colorInputChange"
        @random-color="randomColor"
    />
  </div>

  <pre>{{ gyroscopeE }}</pre>
  <pre>{{ gyroscopeX }}</pre>
  <pre>{{ gyroscopeY }}</pre>
  <pre>{{ gyroscopeZ }}</pre>

  <div class="max-w-5xl px-6 pb-6 mx-auto space-y-8">
    <div v-for="colorFamily in generatedColorFamilies" :key="colorFamily.id" class="space-y-6">
      <ColorFamily :highlight-shade="closestColorFamily.closestShadeLightness.number" :color-family=colorFamily @add-to-editor="addToEditor" />
    </div>
  </div>
</template>

<script>
const ntc = require('ntcjs');

import { v4 as uuidv4 } from 'uuid'
import { tailwindColors } from '../colors/tailwind'
import { defaultHexcodes } from '../colors/defaultHexcodes'
import { findClosestColor } from '../functions/findClosestColor'
import chroma from 'chroma-js'
import Feedback from '../components/Feedback'
import ColorInput from '../components/ColorInput'
import ColorFamily from '../components/ColorFamily'
import ColorFamilyPreview from '../components/ColorFamilyPreview'


export default {
  name: 'ColorFamilyCreator',
  components: { ColorInput, ColorFamily, ColorFamilyPreview, Feedback },
  props: {
    colorFamilies: Array
  },
  data() {
    return {
      gyroscopeE: '',
      gyroscopeX: '',
      gyroscopeY: '',
      gyroscopeZ: '',
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
          luminance: Math.round(chroma(newColor).luminance() * 100 ),
        }
      })

      return generatedColorFamily
    },
    generateColorFamilyVariants() {
      let generatedColorFamilies = []

      generatedColorFamilies.push( this.generateColorFamily(false, false) )
      // generatedColorFamilies.push( this.generateColorFamily(true, false) )
      // generatedColorFamilies.push( this.generateColorFamily(false, true) )
      // generatedColorFamilies.push( this.generateColorFamily(true, true) )

      this.generatedColorFamilies = generatedColorFamilies
      // this.$emit('define-color-families-generated', generatedColorFamilies)
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
    this.referenceColorFamilies = tailwindColors
    window.addEventListener("keydown", this.spacebarPress)

    navigator.permissions.query({ name: 'gyroscope' })
        .then(result => {
          if(result.state === 'granted') { // <-- this returns true
            try {
              this.gyroscope = new Gyroscope({frequency: 60});
              this.gyroscope.addEventListener('reading', e => {
                this.gyroscopeX = gyroscope.x
                this.gyroscopeY = gyroscope.y
                this.gyroscopeZ = gyroscope.z
                this.gyroscopeE = e
              });
              this.gyroscope.start();
            } catch(error) {
              // Handle construction errors.
              if (error.name === 'SecurityError') {
                // See the note above about feature policy.
                alert('Sensor construction was blocked by a feature policy.');
              } else if (error.name === 'ReferenceError') {
                alert('Sensor is not supported by the User Agent.');
              } else {
                alert(error);
              }
            }
          } else {
            alert('No gyroscope or denied, computer assumed, falling back to keyboard.');
            // fallback setup here
          }
        });

    // let gyroscope = new Gyroscope({frequency: 60});

    // gyroscope.addEventListener('reading', e => {
    //     console.log("Angular velocity along the X-axis " + gyroscope.x);
    //     console.log("Angular velocity along the Y-axis " + gyroscope.y);
    //     console.log("Angular velocity along the Z-axis " + gyroscope.z);
    // });
    // gyroscope.start();
  },
  mounted() {
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
