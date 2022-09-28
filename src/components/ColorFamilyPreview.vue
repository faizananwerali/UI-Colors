<template>
  <!-- <div class="p-6 md:p-12 rounded-xl border" :style="{ borderColor: hexcodeByNumber(200), background: `linear-gradient(135deg, ${hexcodeByNumber(50)} 0%, ${hexcodeByNumber(100)} 100%)` }"> -->
  <div class="p-6 md:p-12 rounded-xl"
       :class="darkMode == true ? 'bg-gray-800' : 'bg-gray-50 border'">
    <div class="grid md:grid-cols-3 gap-6">
      <div
          class="cursor-pointer  mx-auto w-full max-w-sm flex flex-col h-96 rounded-xl shadow-md p-6 relative overflow-hidden"
          :style="{
                    background: `linear-gradient(135deg, ${hexcodeByNumber(700)} 0%, ${hexcodeByNumber(900)} 100%)`
                 }">
        <div class="absolute rounded-full" style="right:-8rem;top:-8rem;width:16rem;height:16rem;" :style="{background: `linear-gradient(135deg, ${hexcodeByNumber(500)} 0%, ${hexcodeByNumber(700)} 100%)` }"></div>
        <div class="absolute rounded-full h-9 w-9" style="left:3rem;top:4rem;" :style="{background: `linear-gradient(135deg, ${hexcodeByNumber(400)} 0%, ${hexcodeByNumber(500)} 100%)` }"></div>
        <div class="mt-auto">
          <div class="uppercase mb-2 text-xs tracking-wider font-semibold" :style="{ color: hexcodeByNumber(400) }">Project</div>
          <div class="font-bold text-white text-3xl leading-tightest mb-4">
            Tailwind CSS colors
          </div>
          <!-- <div class="flex -space-x-1 relative z-0 mb-6">
<img class="relative z-30 inline-block h-8 w-8 rounded-full  ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
<img class="relative z-20 inline-block h-8 w-8 rounded-full  ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
<img class="relative z-10 inline-block h-8 w-8 rounded-full  ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
<img class="relative z-0 inline-block h-8 w-8 rounded-full  ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
</div> -->
          <!-- <img class="w-40" src="https://developer.atlassian.com/platform/forge/images/ui-kit-component-screenshots/avatar-stack-preview.png" alt=""> -->
        </div>
        <div class="h-12 py-3 rounded-full mb-4 px-6 flex items-center text-sm" :style="{ background: hexcodeByNumber(700), color: hexcodeByNumber(100) }">
          Search...
        </div>
      </div>

      <div
          class="h-96 bg-white rounded-xl p-6 flex flex-col shadow-md mx-auto w-full max-w-sm"
      >
        <div class="text-center font-medium text-2xl mb-4 mt-2" :style="{ color: hexcodeByNumber(900)}">Oktober 2021</div>
        <div class="grid grid-cols-7">
          <div class="text-center text-xs text-gray-700 py-2">Mo</div>
          <div class="text-center text-xs text-gray-700 py-2">Tu</div>
          <div class="text-center text-xs text-gray-700 py-2">We</div>
          <div class="text-center text-xs text-gray-700 py-2">Th</div>
          <div class="text-center text-xs text-gray-700 py-2">Fr</div>
          <div class="text-center text-xs text-gray-700 py-2">Sa</div>
          <div class="text-center text-xs text-gray-700 py-2">Su</div>
        </div>
        <div class="grid grid-cols-7">
          <div v-for="day in days" :key="day" class="py-1">

            <div v-if="day == 4">
              <div class="h-8 rounded-l-full" :style="{ background: hexcodeByNumber(100) }">
                <div class="flex h-full rounded-full text-white items-center justify-center text-sm" :style="{ background: hexcodeByNumber(500) }">
                  {{ day }}
                </div>
              </div>
            </div>
            <div v-else-if="day == 13">
              <div class="h-8 rounded-r-full" :style="{ background: hexcodeByNumber(100) }">
                <div class="flex h-full rounded-full text-white items-center justify-center text-sm" :style="{ background: hexcodeByNumber(500) }">
                  {{ day }}
                </div>
              </div>
            </div>
            <div v-else-if="day == 5 || day == 6 || day == 7 || day == 8 || day == 9 || day == 10 || day == 11 || day == 12">
              <div class="h-8" :style="{ background: hexcodeByNumber(100) }">
                <div class="flex h-full items-center justify-center text-sm">
                  {{ day }}
                </div>
              </div>
            </div>
            <div v-else>
              <div class="h-8">
                <div class="flex h-full items-center justify-center text-sm">
                  <span v-if="day > 23 && day < 30" class="text-gray-300">{{ day }}</span>
                  <span v-else>{{ day }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 w-full mt-auto">
          <button class="py-2.5 px-6 rounded-lg text-sm  font-medium" :style="{ backgroundColor: hexcodeByNumber(100), color: hexcodeByNumber(700) }" v-tooltip="`bg-${nameForExport()}-100 text-${nameForExport()}-700`">Cancel</button>
          <button class="py-2.5 px-6 rounded-lg text-sm  font-medium text-white" :style="{ backgroundColor: hexcodeByNumber(500)}" v-tooltip="`bg-${nameForExport()}-500`">Confirm</button>
        </div>
      </div>
      <div class="flex flex-col h-96 space-y-6 mx-auto w-full max-w-sm">
        <div class="h-40 rounded-xl shadow-md p-6" :style="{background: hexcodeByNumber(400) }">
          <div class="font-semibold mb-1 text-lg" :style="{ color: hexcodeByNumber(900)}">Today</div>
          <div class="font-semibold text-5xl tracking-tight" :style="{ color: hexcodeByNumber(900)}">$12.921</div>
          <div class="font-normal" :style="{ color: hexcodeByNumber(800)}">Gross volume</div>
          <!-- <div class="font-semibold text-3xl tracking-tight" :style="{ color: hexcodeByNumber(900)}">2.921</div> -->

        </div>
        <div class="flex-grow bg-white rounded-xl shadow-md px-6 py-4 flex flex-col items-end ">
          <div class="text-xs font-semibold tracking-wide uppercase py-1 px-3 rounded-full" :style="{ backgroundColor: hexcodeByNumber(200), color: hexcodeByNumber(800)}">New</div>

          <div class="grid grid-cols-7 gap-2 flex-grow self-stretch">
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-4 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(200)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">M</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-16 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(400)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">T</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-24 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(400)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">W</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-32 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(500)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">T</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-20 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(400)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">F</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-10 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(200)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">S</div>
            </div>
            <div class="flex flex-col justify-end items-center">
              <div class="w-4 h-10 mx-auto rounded-full" :style="{ backgroundColor: hexcodeByNumber(200)}"></div>
              <div class="text-center text-xs text-gray-400 font-semibold mt-2">S</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorFamilyPreview',
  props: {
    colorFamily: Object,
    darkMode: Boolean,
  },
  data() {
    return {
      days: [24, 25, 26, 27, 28, 29, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    }
  },
  methods: {
    hexcodeByNumber(number) {
      return this.colorFamily.shades.find( shade => shade.number == number).hexcode
    },
    nameForExport() {
      return this.colorFamily.name.toLowerCase().split(' ').join('-');
    },
  },
}
</script>
