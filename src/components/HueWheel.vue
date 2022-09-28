<template>
  <div class="flex flex-col items-center space-y-4 justify touch-none">
    <div
        ref="circle"
        class="touch-none w-60 h-60 bg-gray-100 inline-block relative rounded-full"
        style="background: conic-gradient(from 90deg at 50% 50%, red, yellow, lime, aqua, blue, magenta, red);"
    >
      <div class="bg-white absolute top-12 left-12 rounded-full h-36 w-36 touch-none"></div>
      <div
          class="absolute left-1/2 top-1/2 w-1/2 h-12 flex z-10 touch-none"
          style="transform-origin: center left; touch-action:none"
          :style="{ transform: `translateY(-50%) rotate(${hueData}deg)` }"
      >
        <div
            ref="thumb"
            class="h-12 w-12 rounded-full border-2 border-white ml-auto shadow-lg touch-none"
            style="border-width:8px; cursor: grab; touch-action:none"
        >
        </div>
      </div>

      <div
          class="absolute left-1/2 top-1/2 w-1/2 h-12 flex z-0"
          style="transform-origin: center left;"
          :style="{ transform: `translateY(-50%) rotate(${startHue}deg)` }"
      >
        <div class="h-12 w-12 rounded-full ml-auto flex items-center justify-center">
          <div class="w-4 h-4 bg-white rounded-full shadow"></div>
        </div>
      </div>
      <div
          class="absolute left-1/2 top-1/2 w-1/2 h-12 flex z-0"
          style="transform-origin: center left;"
          :style="{ transform: `translateY(-50%) rotate(${endHue}deg)` }"
      >
        <div class="h-12 w-12 rounded-full ml-auto flex items-center justify-center">
          <div class="w-4 h-4 bg-white rounded-full shadow"></div>
        </div>
      </div>
    </div>
    <input @input="calculateHueRange()" v-model="hueShiftData" type="range" class="w-60" min="-179" max="179">
  </div>
</template>

<script>
export default {
  name: 'Hue',
  props: {
    hue: Number,
    hueShift: Number,
  },
  data() {
    return {
      center: '',
      hueData: null,
      hueShiftData: null,
      startHue: null,
      endHue: null,
    };
  },
  methods: {
    rotate(event) {
      const angle = Math.atan2(event.pageY - this.center.y, event.pageX - this.center.x) * 180 / Math.PI
      this.hueData = this.normaliseHue(angle)
      this.calculateHueRange()
    },
    calculateHueRange() {
      this.startHue = this.normaliseHue(this.hueData - (this.hueShiftData / 2))
      this.endHue = this.normaliseHue(this.hueData + (this.hueShiftData / 2))

      this.$emit('hue-change', {start: this.startHue, middle: this.hueData, end: this.endHue })
    },
    normaliseHue(hue) {
      return hue % 360 < 0 ? hue += 360 : hue % 360
    },
  },
  mounted() {
    this.hueData = this.hue
    this.hueShiftData = this.hueShift

    this.calculateHueRange()

    this.$refs.thumb.addEventListener('pointerdown', () => {
      document.addEventListener('pointermove', this.rotate );
    });
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', this.rotate );
    });

    const rect = this.$refs.circle.getBoundingClientRect()

    this.center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  },
  emits: ['hue-change'],
}
</script>
