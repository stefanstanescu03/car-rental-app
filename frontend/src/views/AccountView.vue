<template>
  <navbar />
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
  </div>
</template>

<script>
import navbar from '../components/navBar.vue'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: 'account',
  components: { navbar },
  data() {
    return {
      // token: Cookies.get('token')
      user: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
      }
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
    }
  },
  mounted() {
    this.headleFetch()
  }
}
</script>
