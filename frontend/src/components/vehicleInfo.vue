<template>
  <div class="flex flex-row p-5 w-1/2 items-center justify-center">
    <!-- <img :src="getImgUrl()" alt="img" /> -->
    <div class="flex flex-col gap-y-2 w-1/2">
      <div class="flex flex-row gap-2 items-baseline">
        <h1 class="text-gray-900 text-xl font-semibold font-rubik">{{ car_model }}</h1>
        <h1 class="text-sm text-gray-600 font-medium font-rubik">{{ type }}</h1>
      </div>
      <div class="flex flex-row gap-10">
        <div class="flex flex-row gap-2">
          <img src="../static/car-seat.png" alt="img" width="25" height="25" />
          <h1 class="text-gray-900 font-rubik">{{ seats }} seats</h1>
        </div>
        <div class="flex flex-row gap-2">
          <img src="../static/gearshift.png" alt="img" width="25" height="25" />
          <h1 class="text-gray-900 font-rubik">{{ transmission }}</h1>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <img src="../static/suitcase.png" alt="img" width="25" height="25" />
        <h1 class="text-gray-900 font-rubik">{{ capacity }}</h1>
      </div>
      <div class="flex flex-row items-center gap-x-5">
        <h1 class="text-gray-900 font-rubik font-semibold">{{ price_per_day }} EUR/DAY</h1>
        <button
          class="border p-1 w-1/6 border-gray-900 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
        >
          Rent
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vehicleinfo',
  props: [
    'car_model',
    'price_per_day',
    'type',
    'transmission',
    'seats',
    'capacity',
    'supplier',
    'img'
  ],
  methods: {
    getImgUrl() {
      return ''
    }
  }
}
</script>
