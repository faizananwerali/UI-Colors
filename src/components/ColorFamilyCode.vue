<template>

  <div v-show="codeModalShown"
       class="fixed inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center px-6">
    <div class="h-auto overflow-hidden rounded-2xl bg-gray-900 shadow-2xl w-full max-w-2xl">
      <div class="h-14 bg-gray-800 flex items-center px-6">
        <div class="space-x-6 flex items-center">
          <div @click="changeTab('tailwind')" class="cursor-pointer"
               :class="currentTab == 'tailwind' ? 'text-gray-100' : 'text-gray-500'">
            Tailwind
          </div>
          <div @click="changeTab('scss')" class="cursor-pointer"
               :class="currentTab == 'scss' ? 'text-gray-100' : 'text-gray-500'">
            SCSS
          </div>
          <div @click="changeTab('css')" class="cursor-pointer"
               :class="currentTab == 'css' ? 'text-gray-100' : 'text-gray-500'">
            CSS
          </div>
          <div @click="changeTab('svg')" class="cursor-pointer"
               :class="currentTab == 'svg' ? 'text-gray-100' : 'text-gray-500'">
            SVG <span class="hidden md:inline">(Figma)</span>
          </div>
        </div>
        <div @click="this.$emit('hide')" class="cursor-pointer ml-auto text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>
      <div class="px-6 py-8 relative text-white">

        <button @click="copyInnerHTML(currentTab)"
                class="border border-gray-700 z-50 text-sm px-3 py-1.5 bg-gray-800  hover:bg-gray-700 rounded absolute right-4 top-4 flex items-center justify-center">
          {{ copyCodeText }}
        </button>

        <pre id="tailwind" v-show="currentTab == 'tailwind'">
'{{ nameForExport() }}': {<span v-for="shade in colorFamily.shades" :key="shade.number">
    '{{ shade.number }}': '{{ shade.hexcode }}',</span>
},
</pre>

        <pre id="css" v-show="currentTab == 'css'">
<span v-for="shade in colorFamily.shades" :key="shade.number">--{{ nameForExport() }}-{{
    shade.number
  }}: {{ shade.hexcode }};
</span>
</pre>

        <pre id="scss" v-show="currentTab == 'scss'">
<span v-for="shade in colorFamily.shades" :key="shade.number">${{ nameForExport() }}-{{
    shade.number
  }}: {{ shade.hexcode }};
</span>
</pre>

        <pre id="svg" v-show="currentTab == 'svg'">
<span>&#60;</span><span>svg width="{{
            colorFamily.shades.length * 100
          }}" height="100" viewBox="0 0 {{ colorFamily.shades.length * 100 }} 100" fill="none" xmlns="http://www.w3.org/2000/svg"</span>&#62;<span
            v-for="(shade, shadeIndex) in colorFamily.shades" :key="shade.number">
    <span>&#60;</span>rect width="100" height="100" fill="{{ shade.hexcode }}" x="{{ shadeIndex * 100 }}" y="0"/<span>&#62;</span></span>
<span>&#60;</span>/svg<span>&#62;</span>
</pre>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ColorFamilyCode',
  props: {
    colorFamily: Object,
    codeModalShown: Boolean,
  },
  data() {
    return {
      currentTab: 'tailwind',
      copyCodeText: 'Copy code',
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab
    },
    nameForExport() {
      return this.colorFamily.name.toLowerCase().split(' ').join('-');
    },
    copy: function (text, context) {
      let input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = text;
      input.select();
      document.execCommand('Copy');
      input.remove();

      this.copyCodeText = 'Code copied!';
      setTimeout(() => {
        this.copyCodeText = 'Copy code'
      }, 1000);
    },
    copyInnerHTML: function (elementId) {
      let html = document.getElementById(elementId).innerHTML;
      let doc = new DOMParser().parseFromString(html, 'text/html');
      let text = doc.body.textContent;

      return this.copy(text, elementId);
    },
  },
  emits: ['hide'],
}
</script>
