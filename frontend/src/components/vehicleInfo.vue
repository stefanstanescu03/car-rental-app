<template>
  <div class="flex flex-row gap-x-5 p-10 items-center justify-start w-full">
    <img :src="getImgUrl(id)" alt="img" class="w-44" />
    <div class="flex flex-col gap-y-2 w-2/5">
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
          @click="() => handleRent(id)"
          class="border p-1 w-44 border-gray-900 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
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
    'id'
  ],
  methods: {
    getImgUrl(id) {
      return `http://localhost:3000/images/${id}.jpg`
    },
    handleRent(id) {
      this.$router.push(`/vehicle/${id}`)
    }
  }
}
</script>
