<template>
  <div class="flex flex-col items-center space-y-4 justify touch-none">
    <div
        ref="circle"
        class="touch-none w-60 h-60 bg-gray-100 inline-block relative rounded-full"
        style="
                background: conic-gradient(from 90deg at 50% 50%, red, yellow, lime, aqua, blue, magenta, red);
                box-shadow: inset 0px 0px 20px -1px rgba(0, 0, 0, .5);
            "
    >
      <div class="absolute top-0 left-0 rounded-full w-60 h-60 touch-none"
           style="background: radial-gradient(circle, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0%) 70%);"></div>
      <div
          class="absolute left-1/2 top-1/2 w-1/2 h-12 flex z-10 touch-none"
          style="transform-origin: center left; touch-action:none"
          :style="{ transform: `translateY(-50%) rotate(${hueData}deg)` }"
      >
        <div
            ref="thumb"
            class="h-12 w-12 rounded-full border-2 border-white absolute shadow-lg touch-none"
            style="border-width:8px; cursor: grab; touch-action:none; transform: translateX(50%);"
            :style="{ right: deltaThumb + '%' }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HueSaturationWheel',
  props: {
    hue: Number,
    saturation: Number,
  },
  data() {
    return {
      center: '',
      hueData: null,
      saturationData: null,
      deltaThumb: null,
    };
  },
  methods: {
    calcDistance(event) {
      return Math.hypot(event.pageY - this.center.y, event.pageX - this.center.x)
    },
    rotate(event) {
      const angle = Math.atan2(event.pageY - this.center.y, event.pageX - this.center.x) * 180 / Math.PI
      const distance = this.calcDistance(event)

      this.saturationData = distance > 100 ? 100 : distance
      this.deltaThumb = distance > 100 ? 0 : 100 - distance

      this.hueData = this.normaliseHue(angle)
      this.$emit('hue-change', {hue: this.hueData, saturation: this.saturationData })
    },
    normaliseHue(hue) {
      return hue % 360 < 0 ? hue += 360 : hue % 360
    },
  },
  mounted() {
    this.hueData = this.hue
    this.saturationData = this.saturation
    this.deltaThumb = 100 - this.saturation

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

    this.rotate
  },
  emits: ['hue-change'],
}
</script>
