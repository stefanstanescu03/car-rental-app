<template>
  <navbar />
  <reviewModal v-if="should_appear == true" :vehicle_id="returned_vehicle_id" />
  <div class="flex flex-col p-10 font-rubik text-gray-900">
    <h1 class="font-bold text-xl">Personal details</h1>
    <h1>First Name: {{ user.first_name }}</h1>
    <h1>Last Name: {{ user.last_name }}</h1>
    <h1>Email: {{ user.email }}</h1>
    <h1>Phone Number: {{ user.phone_number }}</h1>
    <button
      @click="handleLogin"
      class="w-1/4 border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
    >
      Modify
    </button>
    <h1 class="font-bold text-xl pt-5">Cars rented</h1>
    <rentInfo
      v-for="car in cars_rented"
      :id="car.id"
      :vehicle_id="car.vehicle_id"
      :vehicle_name="car.vehicle_name"
      :rent_location="car.rent_location"
      :return_location="car.return_location"
      :rent_date="car.rent_date"
      :return_date="car.return_date"
      @returned="handleReview(car.vehicle_id)"
    />
  </div>
</template>

<script>
import navbar from '../components/navBar.vue'
import rentInfo from '../components/rentInfo.vue'
import reviewModal from '../components/reviewModal.vue'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: 'account',
  components: { navbar, rentInfo, reviewModal },
  data() {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
      },
      cars_rented: [],
      should_appear: false,
      returned_vehicle_id: ''
    }
  },
  methods: {
    async headleFetch() {
      await axios
        .get('http://localhost:3000/account/info', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          this.user.email = response.data.user.email
          this.user.first_name = response.data.user.first_name
          this.user.last_name = response.data.user.last_name
          this.user.phone_number = response.data.user.phone_number
        })
        .catch((error) => {
          console.log(error)
        })

      await axios
        .get('http://localhost:3000/rent/find', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          this.cars_rented = response.data.rents
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleReview(id) {
      this.returned_vehicle_id = id
      this.should_appear = true
    }
  },
  mounted() {
    this.headleFetch()
  }
}
</script>
