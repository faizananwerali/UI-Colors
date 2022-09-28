<template>

  <div class="font-semibold mt-4 text-gray-600 flex items-center space-x-2">
    <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: middleShade }"></div>
    <div>Color family</div>
  </div>

  <div class="flex items-center mt-3 space-x-2">
    <input class="bg-gray-100 px-4 py-1.5 w-full rounded-lg" type="text" :value="colorFamily.name" @input="$emit('update-name', $event.target.value, colorFamily.id)">
  </div>

  <div class="border-t my-4"></div>

  <div class="flex items-baseline mt-4">
    <div class="font-semibold text-gray-600 flex-grow">Hue</div>
    <div class="text-sm text-gray-500 italic">{{ lowestHue }} ... {{ highestHue }}</div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">All shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-down')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-up')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift lightest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-down-lighter')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-up-lighter')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift darkest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-down-darker')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('hue-up-darker')">+</button>
      </div>
    </div>
  </div>

  <div class="border-t my-4"></div>

  <div class="flex items-baseline mt-4">
    <div class="font-semibold text-gray-600 flex-grow">Saturation</div>
    <div class="text-sm text-gray-500 italic">{{ lowestSaturation }} ... {{ highestSaturation }}</div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">All shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-down')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-up')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift lightest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-down-lighter')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-up-lighter')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift darkest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-down-darker')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('saturation-up-darker')">+</button>
      </div>
    </div>
  </div>
  <div class="border-t my-4"></div>

  <div class="flex items-baseline mt-4">
    <div class="font-semibold text-gray-600 flex-grow">Lightness</div>
    <div class="text-sm text-gray-500 italic">{{ lowestLightness }} ... {{ highestLightness }}</div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">All shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-down')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-up')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift lightest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-down-lighter')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-up-lighter')">+</button>
      </div>
    </div>
  </div>
  <div class="flex my-3">
    <div class="text-gray-500 ">Shift darkest shades</div>
    <div class="ml-auto">
      <div class="flex">
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-l-md flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-down-darker')">-</button>
        <button class="hover:bg-gray-100 bg-white w-7 h-7 rounded-r-md -ml-px flex items-center justify-center border border-gray-300" @click="adjustColorFamily('lightness-up-darker')">+</button>
      </div>
    </div>
  </div>

  <div class="border-t my-4"></div>
  <div class="mt-4 mb-6 flex flex-col space-y-3">
    <div
        class=""
        v-for="shade in colorFamily.shades"
        :key="shade.number"
    >

      <div class="grid grid-cols-4 flex-grow border border-gray-300 rounded-lg overflow-hidden ml-auto divide-x">
        <div class="h-7 text-sm flex items-center justify-center" :style="{ backgroundColor: shade.hexcode, color: contrastingColor(shade.luminance) }">
          {{ shade.number }}
        </div>
        <HslController
            label='h'
            :min=0
            :max=360
            :value=shade.hue
            :luminance=shade.luminance
            @adjust-hsl="adjustHsl('hue', $event, colorFamily.id, shade.number)"
        />
        <HslController
            label='s'
            :min=0
            :max=100
            :value=shade.saturation
            :luminance=shade.luminance
            @adjust-hsl="adjustHsl('saturation', $event, colorFamily.id, shade.number)"
        />
        <HslController
            label='l'
            :min=0
            :max=100
            :value=shade.lightness
            :luminance=shade.luminance
            @adjust-hsl="adjustHsl('lightness', $event, colorFamily.id, shade.number)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HslController from '../components/HslController'
import ColorFamilyCode from '../components/ColorFamilyCode'
import CopyableShadeHexcode from '../components/CopyableShadeHexcode'

export default {
  name: 'ColorFamilyEditable',
  components: { HslController, ColorFamilyCode, CopyableShadeHexcode },
  data() {
    return {
      codeModalShown: false,
      showControls: false,
    }
  },
  props: {
    colorFamily: Object,
    colorFamilyName: String,
  },
  methods: {
    showCodeModal() {
      this.codeModalShown = true
    },
    hideCodeModal() {
      this.codeModalShown = false
    },
    adjustHsl(type, value, colorFamilyId, shadeNumber) {
      this.$emit('adjust-hsl', type, value, colorFamilyId, shadeNumber)
    },
    deleteColorFamily() {
      this.$emit('delete-color-family', this.colorFamily.id)
    },
    adjustColorFamily(type) {
      this.$emit('adjust-color-family', this.colorFamily.id, type)
    },
    contrastingColor(luminance) {
      if (luminance < 40) {
        return this.colorFamily.shades.find( item => item.number == 50).hexcode
      }
      return this.colorFamily.shades.find( item => item.number == 900).hexcode
    },
  },
  computed: {
    middleShade() {
      return this.colorFamily.shades[this.colorFamily.shades.length / 2].hexcode
    },
    lowestHue() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.hue < curr.hue ? prev : curr).hue
    },
    highestHue() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.hue > curr.hue ? prev : curr).hue
    },
    lowestLightness() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.lightness < curr.lightness ? prev : curr).lightness
    },
    highestLightness() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.lightness > curr.lightness ? prev : curr).lightness
    },
    lowestSaturation() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.saturation < curr.saturation ? prev : curr).saturation
    },
    highestSaturation() {
      return this.colorFamily.shades.reduce( (prev, curr) => prev.saturation > curr.saturation ? prev : curr).saturation
    },
  },
  emits: [
    'delete-color-family',
    'adjust-hsl',
    'adjust-color-family',
    'update-name',
  ],
}
</script>
