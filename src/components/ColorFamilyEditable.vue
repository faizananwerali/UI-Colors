<template>

  <div class="md:flex items-center mb-2">
    <div class="hidden md:block font-medium text-lg">
      <input type="text" :value="colorFamily.name" @input="$emit('update-name', $event.target.value, colorFamily.id)">
    </div>

    <div class="ml-auto flex items-center justify-center md:justify-items-end">
      <button @click="showCodeModal()" class="text-gray-500 px-3 py-1.5 text bg-white hover:bg-gray-100 rounded-md">Export code</button>
      <button class="text-gray-500 px-3 py-1.5 text bg-white hover:bg-gray-100 rounded-md" @click="deleteColorFamily()">
        Delete
      </button>
    </div>
  </div>

  <div
      @click="editColorFamily()"
      class="color-family cursor-pointer flex flex-col md:flex-row mb-6 mt-3 rounded-xl overflow-hidden"
      :class="selected ? 'selected' : ''"
      style="border:3px solid white;"
      :style="{ outlineColor: middleShade }"
  >
    <div
        class="py-2 md:py-4 w-full px-2 flex flex-col flex-grow group"
        :class="showControls == true ? 'h-44' : 'h-16 md:h-36'"
        v-for="shade in colorFamily.shades"
        :key="shade.number"
        :style="{ backgroundColor: shade.hexcode, color: contrastingColor(shade.luminance) }"
    >
      <CopyableShadeHexcode
          :shade-number=shade.number
          :shade-hexcode=shade.hexcode
          :text-color="contrastingColor(shade.luminance)"
      />
    </div>
  </div>

  <ColorFamilyCode @hide="hideCodeModal()" :code-modal-shown=codeModalShown :color-family=colorFamily />
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
    selected: Boolean,
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
    editColorFamily() {
      this.$emit('edit-color-family', this.colorFamily.id)
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
    }
  },
  emits: [
    'delete-color-family',
    'edit-color-family',
    'adjust-hsl',
    'adjust-color-family',
    'update-name',
  ],
}
</script>
