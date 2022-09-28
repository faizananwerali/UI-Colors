<template>

  <div v-if="$route.path != '/playground' && $route.path != '/hue'  && $route.path != '/tailwind-color-wheel'"
       class="h-14 border-b flex items-center  px-6">
    <router-link to="/" class="flex items-center space-x-1 mr-4">
      <div class="rounded-lg bg-gray-800 text-white text-lg flex items-center justify-center font-semibold w-8 h-8">
        UI
      </div>
      <div class="font-medium text-xl tracking-normal">
        Colors
      </div>
    </router-link>

    <div class="ml-auto flex items-center">
      <router-link class="router-link" to="/create">Create</router-link>
      <router-link class="router-link ml-2" to="/edit">Edit</router-link>
      <button
          v-if="colorFamiliesInEditor.length == 0"
          class="text-sm px-4 py-2 rounded-lg bg-gray-300 text-white ml-6 cursor-not-allowed"
      >
        Save
      </button>
      <button v-else
              class="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white ml-6"
              @click="saveToUrl()"
      >
        Save
      </button>
    </div>
  </div>

  <SaveColors @hide="hideSaveModal()" :save-modal-shown=saveModalShown :url="colorFamiliesInEditorToUrl"/>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component
          :is="Component"
          v-bind="currentProperties"
          v-on="currentEventListeners"
      />
    </keep-alive>
  </router-view>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import chroma from 'chroma-js'
import SaveColors from './components/SaveColors'
import ColorFamilyCreator from './pages/ColorFamilyCreator'
import ColorFamilyEditor from './pages/ColorFamilyEditor'
import FindClosestColor from './pages/FindClosestColor'
import TailwindColorWheel from './pages/TailwindColorWheel'

export default {
  name: 'App',
  components: {
    ColorFamilyCreator, ColorFamilyEditor, FindClosestColor, SaveColors, TailwindColorWheel
  },
  data() {
    return {
      currentTab: 'color-family-creator',
      colorFamiliesInEditor: [],
      showTabbar: false,
      saveModalShown: false,
    }
  },
  methods: {
    hideSaveModal() {
      this.saveModalShown = false
    },
    addToEditor(value) {
      this.colorFamiliesInEditor.unshift(
          // Added JSON stringify and PARSE to disable reactivity
          JSON.parse(JSON.stringify(value))
      )
      this.changePage('color-family-editor')
      this.showTabbar = true
      this.$router.push('edit')
    },
    adjustHsl(type, value, colorFamilyId, shadeNumber) {
      let intValue = parseInt(value)

      if (type == 'hue') {
        this.colorFamiliesInEditor.find((item) => {
          return item.id == colorFamilyId
        }).shades.find((item) => {
          return item.number == shadeNumber
        }).hue = intValue > 360 ? intValue - 360 : (intValue < 0) ? 360 - intValue : intValue
      }

      if (type == 'saturation') {
        this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).saturation = intValue
      }
      if (type == 'lightness') {
        this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).lightness = intValue
      }

      let hexcode = chroma.hsl(
          this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).hue,
          this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).saturation / 100,
          this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).lightness / 100
      ).hex()

      this.updateColorShade('hexcode', hexcode, colorFamilyId, shadeNumber)
    },
    updateColorShade(type, value, colorFamilyId, shadeNumber) {
      if (type == 'hexcode') {
        this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).hexcode = value
        this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).shades.find(item => item.number == shadeNumber).luminance = Math.round(chroma(value).luminance() * 100)
      }
    },
    updateName(name, colorFamilyId) {
      this.colorFamiliesInEditor.find(item => item.id == colorFamilyId).name = name
    },
    deleteColorFamily(value) {
      this.colorFamiliesInEditor = this.colorFamiliesInEditor.filter((item) => item.id !== value)

      if (this.colorFamiliesInEditor.length == 0) {
        this.$router.push('create')
      }
    },
    adjustColorFamily(value, type) {
      this.colorFamiliesInEditor.find((item) => item.id == value).shades = this.colorFamiliesInEditor.find((item) => item.id == value).shades.map((item, index) => {

        // Hue
        if (type == 'hue-down') {
          return {...item, hue: item.hue - 5}
        }
        if (type == 'hue-up') {
          return {...item, hue: item.hue + 5}
        }
        if (type == 'hue-down-darker') {
          return {...item, hue: item.hue - (1 * index)}
        }
        if (type == 'hue-up-darker') {
          return {...item, hue: item.hue + (1 * index)}
        }
        if (type == 'hue-down-lighter') {
          return {
            ...item,
            hue: item.hue - (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
        if (type == 'hue-up-lighter') {
          return {
            ...item,
            hue: item.hue + (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
        // Saturation
        if (type == 'saturation-down') {
          return {...item, saturation: item.saturation - 5}
        }
        if (type == 'saturation-up') {
          return {...item, saturation: item.saturation + 5}
        }
        if (type == 'saturation-down-darker') {
          return {...item, saturation: item.saturation - (1 * index)}
        }
        if (type == 'saturation-up-darker') {
          return {...item, saturation: item.saturation + (1 * index)}
        }
        if (type == 'saturation-down-lighter') {
          return {
            ...item,
            saturation: item.saturation - (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
        if (type == 'saturation-up-lighter') {
          return {
            ...item,
            saturation: item.saturation + (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
        // Lightness
        if (type == 'lightness-down') {
          return {...item, lightness: item.lightness - 1}
        }
        if (type == 'lightness-up') {
          return {...item, lightness: item.lightness + 1}
        }
        if (type == 'lightness-down-darker') {
          return {...item, lightness: item.lightness - (1 * index)}
        }
        if (type == 'lightness-up-darker') {
          return {...item, lightness: item.lightness + (1 * index)}
        }
        if (type == 'lightness-down-lighter') {
          return {
            ...item,
            lightness: item.lightness - (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
        if (type == 'lightness-up-lighter') {
          return {
            ...item,
            lightness: item.lightness + (1 * (this.colorFamiliesInEditor.find((item) => item.id == value).shades.length - 1 - index))
          }
        }
      })

      this.colorFamiliesInEditor.find((item) => item.id == value).shades = this.colorFamiliesInEditor.find((item) => item.id == value).shades.map(item => {
        let hue = item.hue > 360 ? item.hue - 360 : (item.hue < 0) ? 360 - item.hue : item.hue
        let saturation = item.saturation > 100 ? 100 : (item.saturation < 0) ? 0 : item.saturation
        let lightness = item.lightness > 100 ? 100 : (item.lightness < 0) ? 0 : item.lightness

        return {
          ...item,
          hue: hue,
          saturation: saturation,
          lightness: lightness,
          hexcode: chroma.hsl(hue, saturation / 100, lightness / 100).hex(),
          luminance: Math.round(chroma.hsl(hue, saturation / 100, lightness / 100).luminance() * 100)
        }
      })
    },
    changePage(value) {
      this.currentTab = value
    },
    getColorsFromUrl() {
      let colorFamilies = this.$route.query.sv1.split(';')

      let colorFamily = colorFamilies.map(item => {
        let shades = item.split(':')[1].split('/').map(shade => {

          let hexcode = chroma(shade.split('-')[1]).hex()

          return {
            number: shade.split('-')[0],
            hexcode: hexcode,
            luminance: Math.round(chroma(hexcode).luminance() * 100),
            hue: Math.round(chroma(hexcode).get('hsl.h')),
            saturation: Math.round(chroma(hexcode).get('hsl.s') * 100),
            lightness: Math.round(chroma(hexcode).get('hsl.l') * 100),
          }
        })
        return {
          id: uuidv4(),
          name: item.split(':')[0].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
          shades: shades,
        }
      })

      return colorFamily
    },
    saveToUrl() {
      this.saveModalShown = true

      this.$router.push({
        path: '/edit',
        query: {sv1: this.colorFamiliesInEditorToUrl}
      })
    },
  },
  created() {
    this.$router.isReady().then(() => {
      if (this.$route.query.sv1) {
        this.colorFamiliesInEditor = this.getColorsFromUrl()
        this.showTabbar = true
      }
    })
  },
  computed: {
    colorFamiliesInEditorToUrl() {
      let colorFamilies = this.colorFamiliesInEditor.map(colorFamily => {
        let shades = colorFamily.shades.map(shade => {
          return `${shade.number}-${shade.hexcode.replace('#', '')}`
        })
        return `${colorFamily.name.toLowerCase().split(' ').join('-')}:${shades.join('/')}`
      })
      return colorFamilies.join(';')
    },
    currentProperties() {
      if (this.$route.path === '/edit') {
        return {
          colorFamilies: this.colorFamiliesInEditor
        }
      }
      // if (this.$route.path === '/create') {
      //     return {
      //         colorFamilies: this.colorFamiliesGenerated
      //     }
      // }
      return {};
    },
    currentEventListeners() {
      if (this.$route.path === '/edit') {
        return {
          deleteColorFamily: this.deleteColorFamily,
          adjustColorFamily: this.adjustColorFamily,
          adjustHsl: this.adjustHsl,
          updateName: this.updateName,
        }
      }
      if (this.$route.path === '/create' || this.$route.path === 'find-closest-color' || this.$route.path === '/tailwind-color-wheel') {
        return {
          addToEditor: this.addToEditor,
        }
      }
      return null
    }
  },
}
</script>
