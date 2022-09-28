<template>
  <div v-if="itemsLength != 0" class="flex flex-col md:flex-row" style="height:calc(100vh - 3.5rem)">
    <div class="flex-grow overflow-y-scroll relative">
      <div class="flex justify-center mb-4 py-3 px-6 absolute right-0 top-0 w-full bg-white">
        <button class="py-1.5 px-3 hover:bg-gray-100 text-gray-500 rounded-lg flex items-center space-x-1" @click="showPreview = !showPreview">
          <svg v-if="showPreview" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Toggle UI examples</span>
        </button>
      </div>
      <div class="max-w-5xl mx-auto py-6 px-6 mt-10">
        <div v-for="colorFamily in colorFamilies" :key="colorFamily.id" class="mb-8">
          <ColorFamilyEditable
              :color-family=colorFamily
              :edit-mode=editMode
              :selected="selectedColorFamilyId == colorFamily.id ? true : false"
              @delete-color-family="deleteColorFamily"
              @edit-color-family="editColorFamily"
              @adjust-hsl="adjustHsl"
              @adjust-color-family="adjustColorFamily"
              @update-name="updateName"
          />
          <!-- <ColorFamily
              :color-family=colorFamily
          /> -->

          <ColorFamilyPreview
              v-if="showPreview"
              :color-family=colorFamily
          />

        </div>

        <router-link to="/create">
          <div class="rounded-2xl bg-gray-50 hover:bg-gray-100 h-36 border-2 border-dashed border-gray-200 mt-12 flex items-center justify-center">
            <div class="text-lg text-gray-400">+ Add another color family</div>
          </div>
        </router-link>
        <!-- <Feedback /> -->

        <!-- <div class="flex justify-center">
            <a href="https://www.producthunt.com/posts/ui-colors-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-ui-colors-2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=331924&theme=light" alt="UI Colors - Tailwind CSS color generator & editing tool | Product Hunt" style="width: 250px; height: 40px;" width="250" height="54" /></a>
        </div> -->
      </div>
    </div>
    <div class="md:w-80 px-6 border-t md:border-l overflow-y-scroll" style="min-height:40vh">
      <div v-for="colorFamily in colorFamilies" :key="colorFamily.id">
        <ColorFamilySettings
            v-if="selectedColorFamilyId == colorFamily.id"
            :color-family=colorFamily
            @delete-color-family="deleteColorFamily"
            @adjust-hsl="adjustHsl"
            @adjust-color-family="adjustColorFamily"
            @update-name="updateName"
        />
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col items-center justify-center p-8 pt-32 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mb-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
    <div class="text-2xl text-gray-800 font-medium">There are no color families to edit</div>
    <div class="text-gray-500 mt-1">Create a color family and click on "edit".</div>
    <router-link to="/create" class="text-sm px-4 py-2 rounded-lg bg-gray-900 text-white mt-8">
      Create a color family
    </router-link>
  </div>
</template>

<script>
import Feedback from '../components/Feedback'
import ColorFamily from '../components/ColorFamily'
import ColorFamilyCode from '../components/ColorFamilyCode'
import ColorFamilyPreview from '../components/ColorFamilyPreview'
import ColorFamilyEditable from '../components/ColorFamilyEditable'
import ColorFamilySettings from '../components/ColorFamilySettings'

export default {
  name: 'ColorFamilyEditor',
  components: { Feedback, ColorFamily, ColorFamilyCode, ColorFamilyPreview, ColorFamilyEditable, ColorFamilySettings },
  props: {
    colorFamilies: Array
  },
  data() {
    return {
      sharedColors: [],
      editMode: true,
      selectedColorFamilyId: null,
      showPreview: false,
    }
  },
  methods: {
    adjustHsl(type, value, colorFamilyId, shadeNumber) {
      this.$emit('adjust-hsl', type, value, colorFamilyId, shadeNumber)
    },
    deleteColorFamily(value) {
      this.$emit('delete-color-family', value)
    },
    editColorFamily(value) {
      this.selectedColorFamilyId = value
    },
    adjustColorFamily(value, type) {
      this.$emit('adjust-color-family', value, type)
    },
    updateName(value, colorFamilyId) {
      this.$emit('update-name', value, colorFamilyId)
    },
  },
  computed: {
    itemsLength() {
      return this.colorFamilies.length
    }
  },
  watch: {
    itemsLength (val, oldVal) {
      if (val == 1) {
        this.selectedColorFamilyId = this.colorFamilies[0].id
      }
    }
  },
  created() {
    if (this.itemsLength > 0) {
      this.selectedColorFamilyId = this.colorFamilies[0].id
    }
  },
  emits: [
    'delete-color-family',
    'adjust-hsl',
    'adjust-color-family',
    'update-name',
  ],
}
</script>
