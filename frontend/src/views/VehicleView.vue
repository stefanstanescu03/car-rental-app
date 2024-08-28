<template>
  <navbar />
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
      <div class="flex w-10 h-10 bg-gray-900 border rounded-md justify-center items-center">
        <h1 class="text-white font-rubik font-bold">{{ Math.round(rating * 10) / 10 }}</h1>
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
        <input
          v-model="pickup.date"
          type="date"
          class="w-2/3 border border-gray-900 rounded-md outline-none p-1"
        />
        <input
          v-model="pickup.hour"
          type="time"
          class="w-1/3 border border-gray-900 rounded-md outline-none p-1"
        />
      </div>
    </div>
    <div class="w-1/4 flex flex-col gap-1">
      <h1 class="font-semibold text-xl p-1">Drop-off</h1>
      <input
        v-model="dropoff.location"
        type="text"
        class="w-full border border-gray-900 rounded-md outline-none p-1"
      />
      <div class="flex flex-row w-full gap-1">
        <input
          v-model="dropoff.date"
          type="date"
          class="w-2/3 border border-gray-900 rounded-md outline-none p-1"
        />
        <input
          v-model="dropoff.hour"
          type="time"
          class="w-1/3 border border-gray-900 rounded-md outline-none p-1"
        />
      </div>
    </div>
  </div>
  <div class="font-rubik w-full flex pt-10 justify-center">
    <div class="flex flex-col w-1/4">
      <h1 class="text-lg">
        Total price:
        {{
          ((Date.parse(this.dropoff.date) - Date.parse(this.pickup.date)) / (1000 * 3600 * 24)) *
          vehicle.price_per_day
        }}
        EUR
      </h1>
      <button
        @click="handleRent"
        class="w-full border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
      >
        Continue to book
      </button>
      <h1 v-if="shouldAppear == true" class="text-red-700 text-sm pt-5 text-center">
        Please fill every field
      </h1>
    </div>
  </div>
</template>

<script>
import navbar from '../components/navBar.vue'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'vehicle',
  components: { navbar },
  data() {
    return {
      vehicle_id: this.$route.params.id,
      vehicle: {},
      pickup: {
        date: '',
        hour: ''
      },
      dropoff: {
        date: '',
        hour: '',
        location: ''
      },
      rating: 0,
      shouldAppear: false
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
      await axios
        .get(`http://localhost:3000/review/${this.vehicle_id}`)
        .then((response) => {
          const reviews = response.data.reviews
          reviews.forEach((review) => {
            this.rating += review.rating
          })
          this.rating /= reviews.length
          console.log(this.rating)
        })
        .catch((error) => console.log(error))
    },
    getImgUrl() {
      return `http://localhost:3000/images/${this.vehicle_id}.jpg`
    },
    async handleRent() {
      if (
        this.pickup.date == '' ||
        this.pickup.hour == '' ||
        this.dropoff.date == '' ||
        this.dropoff.hour == '' ||
        this.dropoff.location == ''
      ) {
        this.shouldAppear = true
      } else {
        if (!Cookies.get('token')) {
          this.$router.push('/login')
        } else {
          const rentInfo = JSON.stringify({
            vehicle_id: this.vehicle_id,
            rent_date: new Date(this.pickup.date + ' ' + this.pickup.hour),
            return_date: new Date(this.dropoff.date + ' ' + this.dropoff.hour),
            return_location: this.dropoff.location,
            days:
              (Date.parse(this.dropoff.date) - Date.parse(this.pickup.date)) / (1000 * 3600 * 24)
          })

          this.$router.push(
            `/payment/infos=${rentInfo}&price=${
              ((Date.parse(this.dropoff.date) - Date.parse(this.pickup.date)) /
                (1000 * 3600 * 24)) *
              this.vehicle.price_per_day
            }`
          )
        }
      }
    }
  },
  mounted() {
    this.handleFetch()
  }
}
</script>
