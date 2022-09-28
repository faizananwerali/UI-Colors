<template>
  <div class="flex items-baseline pl-2">
    <div class="text-sm text-gray-300">{{ label }}</div>
    <input class="text-right focus:outline-none w-full h-7 text-sm text-gray-500" type="number" :value=value @input="adjustHsl($event.target.value)" :min=min :max=max>
  </div>
</template>

<script>
export default {
  name: 'HslController',
  props: {
    label: String,
    value: Number,
    luminance: Number,
    min: Number,
    max: Number,
  },
  data() {
    return {
    }
  },
  methods: {
    firstLetter(word) {
      return word.substring(0, 1)
    },
    adjustHsl(value) {
      this.$emit('adjust-hsl', value)
    },
  },
  emits: ['adjust-hsl'],
}
</script>
