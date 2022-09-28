<template>

  <div v-show="saveModalShown" class="fixed inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center px-6">
    <div class="h-auto overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-lg">
      <div class="h-14 bg-white flex items-center px-6">
        <div class="space-x-6 flex items-center font-medium text-lg">
          Save & Share
        </div>
        <div @click="this.$emit('hide')" class="cursor-pointer ml-auto text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="px-6 pt-0 pb-6 relative">
        <div class="text-gray-600 mb-6">
          Copy this URL and store it as a comment in your Tailwind config or CSS file for example or share it with others.
        </div>
        <input type="text" :value=currentURL readonly class="bg-gray-100 border px-3 py-2 rounded-lg w-full">

        <button @click="copy(currentURL)" class="mt-4 text-sm px-4 py-2 text-white bg-gray-800 rounded-lg flex items-center justify-center">
          {{ copyUrlText }}
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'SaveColors',
  props: {
    saveModalShown: Boolean,
    url: String,
  },
  data() {
    return {
      copyUrlText: 'Copy URL',
    }
  },
  methods: {
    copy: function (text, context) {
      let input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = text;
      input.select();
      document.execCommand('Copy');
      input.remove();

      this.copyUrlText = 'URL copied!';
      setTimeout( () => { this.copyUrlText = 'Copy URL' }, 1000);
    },
  },
  computed: {
    currentURL() {
      return (new URL(window.location.href)).origin + `${this.$route.fullPath}`
    }
  },
  emits: ['hide'],
}
</script>
