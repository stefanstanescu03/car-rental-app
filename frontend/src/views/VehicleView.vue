<template>
  <navbar />
  <!-- <h1>{{ vehicle }}</h1> -->
  <div class="flex flex-row gap-x-5 p-10 items-center justify-start w-full">
    <img :src="getImgUrl()" alt="img" class="w-44" />
    <div class="flex flex-col gap-y-2 w-2/5">
      <div class="flex flex-row gap-2 items-baseline">
        <h1 class="text-gray-900 text-xl font-semibold font-rubik">{{ vehicle.car_model }}</h1>
        <h1 class="text-sm text-gray-600 font-medium font-rubik">{{ vehicle.type }}</h1>
      </div>
      <div class="flex flex-row gap-10">
        <div class="flex flex-row gap-2">
          <img src="../static/car-seat.png" alt="img" width="25" height="25" />
          <h1 class="text-gray-900 font-rubik">{{ vehicle.seats }} seats</h1>
        </div>
        <div class="flex flex-row gap-2">
          <img src="../static/gearshift.png" alt="img" width="25" height="25" />
          <h1 class="text-gray-900 font-rubik">{{ vehicle.transmission }}</h1>
        </div>
      </div>
      <div class="flex flex-row gap-2">
        <img src="../static/suitcase.png" alt="img" width="25" height="25" />
        <h1 class="text-gray-900 font-rubik">{{ vehicle.capacity }}</h1>
      </div>
      <div class="flex flex-row items-center gap-x-5">
        <h1 class="text-gray-900 font-rubik font-semibold">{{ vehicle.price_per_day }} EUR/DAY</h1>
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-evenly font-rubik text-gray-900">
    <div class="w-1/4 flex flex-col gap-1">
      <h1 class="font-semibold text-xl p-1">Pick-up</h1>
      <h1 class="w-full border border-gray-900 rounded-md outline-none p-1">
        {{ vehicle.location }}
      </h1>
      <div class="flex flex-row w-full gap-1">
        <input type="date" class="w-2/3 border border-gray-900 rounded-md outline-none p-1" />
        <input type="time" class="w-1/3 border border-gray-900 rounded-md outline-none p-1" />
      </div>
    </div>
    <div class="w-1/4 flex flex-col gap-1">
      <h1 class="font-semibold text-xl p-1">Drop-off</h1>
      <input type="text" class="w-full border border-gray-900 rounded-md outline-none p-1" />
      <div class="flex flex-row w-full gap-1">
        <input type="date" class="w-2/3 border border-gray-900 rounded-md outline-none p-1" />
        <input type="time" class="w-1/3 border border-gray-900 rounded-md outline-none p-1" />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navBar.vue'
import axios from 'axios'

export default {
  name: 'vehicle',
  components: { navbar },
  data() {
    return {
      vehicle_id: this.$route.params.id,
      vehicle: {}
    }
  },

  methods: {
    async handleFetch() {
      await axios
        .get(`http://localhost:3000/vehicle/id/${this.vehicle_id}`)
        .then((response) => {
          this.vehicle = response.data.vehicle
        })
        .catch((error) => console.log(error))
    },
    getImgUrl() {
      return `http://localhost:3000/images/${this.vehicle_id}.jpg`
    }
  },
  mounted() {
    this.handleFetch()
  }
}
</script>
