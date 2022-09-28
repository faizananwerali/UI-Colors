<template>

  <div v-if="mode == 'gradient'" class="h-screen" :style="{ backgroundImage: gradient }">
  </div>

  <div v-if="mode == 'shades'" class="flex">
    <div v-for="(color, index) in colors" :key=index class="h-screen w-full">
      <div class="h-screen" :style="{ backgroundColor: color }"></div>
    </div>
  </div>

  <div class="overflow-scroll max-h-96 fixed w-auto p-4 shadow-lg rounded-t-2xl bg-white bottom-0 right-0 left-0">
    <!-- <div class="flex justify-center space-x-4">
        <div @click="mode = 'shades'" class="py-2 cursor-pointer">Shades</div>
        <div @click="mode = 'gradient'" class="py-2 cursor-pointer">Gradient</div>
    </div> -->

    <div class="grid grid-row-3 gap-4">
      <HueWheel :hue=40 :hueShift=-40 @hue-change="hueChange" />

      <div class="space-y-4">
        <div class="text-center">
          {{ startColor.c }}<br>
          <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="startColor.c" min="0" max="100">
        </div>
        <div class="text-center">
          {{ startColor.l }}<br>
          <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="startColor.l" min="0" max="100">
        </div>
      </div>
      <div class="space-y-4">
        <div class="text-center">
          {{ endColor.c }}<br>
          <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="endColor.c" min="0" max="100">
        </div>
        <div class="text-center">
          {{ endColor.l }}<br>
          <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="endColor.l" min="0" max="100">
        </div>
      </div>
    </div>
  </div>


  <!-- <div class="hidden grid grid-cols-2 gap-6 p-6">
      <div class="grid grid-row-3 gap-6">
          <div class="text-center">
              {{ startColor.h }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="startColor.h" min="0" max="360">
          </div>
          <div class="text-center">
              {{ startColor.c }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="startColor.c" min="0" max="100">
          </div>
          <div class="text-center">
              {{ startColor.l }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="startColor.l" min="0" max="100">
          </div>
      </div>
      <div class="grid grid-row-3 gap-6">
          <div class="text-center">
              {{ endColor.h }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="endColor.h" min="0" max="360">
          </div>
          <div class="text-center">
              {{ endColor.c }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="endColor.c" min="0" max="100">
          </div>
          <div class="text-center">
              {{ endColor.l }}<br>
              <input @input="colorSteps()" type="range" class="rounded-full w-full bg-white bg-opacity-50" v-model="endColor.l" min="0" max="100">
          </div>
      </div>
  </div> -->
  <!-- {{ hueSteps() }}<br>
  {{ saturationSteps() }}<br>
  {{ lightnessSteps() }}<br>
  {{ colorSteps() }}<br> -->
</template>

<script>
import chroma from 'chroma-js'
import HueWheel from '../components/HueWheel'

export default {
  name: 'Playground',
  components: { HueWheel },
  data() {
    return {
      mode: 'shades',
      steps: 10,
      startColor: {h: 330, c: 25, l: 95},
      endColor: {h: 260, c: 75, l: 10},
      colors: [],
    };
  },
  methods: {
    hueChange(value) {
      console.log(value)
      this.startColor.h = value.start
      this.endColor.h = value.end
      this.colorSteps()
    },
    hueSteps() {
      let hueDiff = this.endColor.h - this.startColor.h

      hueDiff = hueDiff > 180 ? hueDiff - 360: hueDiff
      hueDiff = hueDiff < -180 ? hueDiff + 360 : hueDiff

      console.log(hueDiff)

      const hueStep = hueDiff / (this.steps - 1)
      const hueSteps = []

      for (let index = 0; index < this.steps; index++) {
        hueSteps.push( Math.round(parseInt(this.startColor.h) + (hueStep * index)))
      }
      return hueSteps
    },
    saturationSteps() {
      const saturationDiff = this.endColor.c - this.startColor.c
      const saturationStep = saturationDiff / (this.steps - 1)
      const saturationSteps = []

      for (let index = 0; index < this.steps; index++) {
        saturationSteps.push( Math.round(parseInt(this.startColor.c) + (saturationStep * index)))
      }
      return saturationSteps
    },
    lightnessSteps() {
      const lightnessDiff = this.endColor.l - this.startColor.l
      const lightnessStep = lightnessDiff / (this.steps - 1)
      const lightnessSteps = []

      for (let index = 0; index < this.steps; index++) {
        lightnessSteps.push( Math.round(parseInt(this.startColor.l) + (lightnessStep * index)))
      }
      return lightnessSteps
    },
    colorSteps() {
      let colors = []

      for (let index = 0; index < this.steps; index++) {
        colors.push( chroma( this.hueSteps()[index], this.saturationSteps()[index] / 100, this.lightnessSteps()[index] / 100, 'hsl').hex() )
      }
      this.colors = colors
    }
  },
  computed: {
    startColorHexcode() {
      return chroma(this.startColor.h, this.startColor.c / 100, this.startColor.l / 100, 'hsl').hex()
    },
    endColorHexcode() {
      return chroma(this.endColor.h, this.endColor.c / 100, this.endColor.l / 100, 'hsl').hex()
    },
    gradient() {
      let array = []

      for (let index = 0; index < this.colors.length; index++) {
        array.push( `${this.colors[index]} ${100 / (this.colors.length - 1) * index}%` )
      }

      return `linear-gradient(90deg, ${array.join(',')})`
    }
  },
  mounted() {
    this.colorSteps()
  },
}
</script>
