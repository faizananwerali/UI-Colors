<template>
  <transition name="fade" v-on:enter="enter">
    <div v-if="message.visible" class="fixed top-8 inset-x-1/2 flex justify-center z-20">
      <div class="bg-gray-900 text-white text-center py-4 px-8 rounded-xl shadow-xl whitespace-nowrap" v-html="message.text">
      </div>
    </div>
  </transition>

  <div class="px-4 md:px-0 md:mt-auto cursor-pointer flex items-center justify-between md:block" :style="{ color: textColor }" @click="copy(shadeHexcode, shadeNumber)">
    <div class="text-center font-medium">
      {{ shadeNumber }}
    </div>
    <div class="text-center text-xs uppercase opacity-90">
      {{ noHashtag(shadeHexcode) }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'CopyableShadeHexcode',
  props: {
    shadeNumber: Number,
    shadeHexcode: String,
    textColor: String,
  },
  data() {
    return {
      message: {visible: false, text: ''},
    }
  },
  methods: {
    noHashtag(input) {
      return input.replace('#', '')
    },
    copy: function (text, context) {
      let input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = text;
      input.select();
      document.execCommand('Copy');
      input.remove();

      this.messenger(text + ' copied to clipboard');
    },
    messenger: function(text) {
      this.message.text = text;
      this.message.visible = true;
    },
    enter: function() {
      setTimeout(() => { this.message.visible = false }, 1500)
    },
  }
}
</script>
