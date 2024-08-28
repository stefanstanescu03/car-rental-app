<template>
  <div class="flex flex-col py-10 gap-4 items-center content-center">
    <h1 class="font-rubik font-semibold text-gray-900 text-xl">Modify account details</h1>
    <h1 v-if="shouldAppear == true" class="text-center text-red-700">Please fill every field</h1>
    <div class="flex flex-col w-1/3">
      <label for="firstname" class="font-rubik text-gray-600">First name</label>
      <input
        v-model="first_name"
        type="text"
        name="firstname"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="lastname" class="font-rubik text-gray-600">Last name</label>
      <input
        v-model="last_name"
        type="text"
        name="lastname"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="phone" class="font-rubik text-gray-600">Phone</label>
      <input
        v-model="phone_number"
        type="tel"
        name="phone"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="email" class="font-rubik text-gray-600">Email</label>
      <input
        v-model="email"
        type="email"
        name="email"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <button
      class="w-1/3 border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
      @click="handleModify"
    >
      Modify
    </button>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'modify',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      shouldAppear: false
    }
  },
  methods: {
    async handleFetch() {
      await axios
        .get('http://localhost:3000/account/info', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          this.email = response.data.user.email
          this.first_name = response.data.user.first_name
          this.last_name = response.data.user.last_name
          this.phone_number = response.data.user.phone_number
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async handleModify() {
      if (
        this.first_name != '' &&
        this.last_name != '' &&
        this.phone_number != '' &&
        this.email != ''
      ) {
        await axios
          .put(
            'http://localhost:3000/account/modify',
            {
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              phone_number: this.phone_number
            },
            {
              headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            }
          )
          .then((response) => {
            console.log(response)
            this.$router.push('/account')
          })
          .catch((error) => console.log(error))
      } else {
        this.shouldAppear = true
      }
    }
  },
  mounted() {
    this.handleFetch()
  }
}
</script>
