<template>
  <!-- <div class="flex w-full justify-center"> -->
  <navbar />
  <div class="flex flex-col py-10 gap-4 items-center content-center">
    <h1 class="font-rubik font-semibold text-gray-900 text-xl">Sign up</h1>
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
        v-model="phone"
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
    <div class="flex flex-col w-1/3">
      <label for="password" class="font-rubik text-gray-600">Password</label>
      <input
        v-model="password"
        type="password"
        name="password"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <button
      class="w-1/3 border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
      @click="handleSignUp"
    >
      Sign up
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
import navbar from '../components/navBar.vue'
import axios from 'axios'

export default {
  name: 'signup',
  data() {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      password: '',
      shouldAppear: false
    }
  },
  components: { navbar },
  methods: {
    async handleSignUp() {
      if (
        this.first_name != '' &&
        this.last_name != '' &&
        this.phone_number != '' &&
        this.email != '' &&
        this.password != ''
      ) {
        await axios
          .post('http://localhost:3000/account/create', {
            first_name: this.first_name,
            last_name: this.last_name,
            phone_number: this.phone,
            email: this.email,
            password: this.password,
            admin: false
          })
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error)
          })
        this.$router.push('/login')
      } else {
        this.shouldAppear = true
      }
    }
  }
}
</script>
