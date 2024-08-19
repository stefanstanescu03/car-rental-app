<template>
  <!-- <div class="flex w-full justify-center"> -->
  <navbar />
  <div class="flex flex-col py-10 gap-4 items-center content-center">
    <h1 class="font-rubik font-semibold text-gray-900 text-xl">Log in</h1>
    <h1 v-if="shouldAppear == true" class="text-center text-red-700">Please fill every field</h1>
    <h1 v-if="invalidAccount == true" class="text-center text-red-700">Incorrect email</h1>
    <h1 v-if="invalidPassword == true" class="text-center text-red-700">Incorrect password</h1>
    <div class="flex flex-col w-1/3">
      <label for="email" class="font-rubik text-gray-600">Email</label>
      <input
        v-model="email"
        type="text"
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
      @click="handleLogin"
      class="w-1/3 border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
    >
      Log in
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
import navbar from '../components/navBar.vue'
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'login',
  components: { navbar },
  data() {
    return {
      email: '',
      password: '',
      shouldAppear: false,
      invalidPassword: false,
      invalidAccount: false
    }
  },
  methods: {
    async handleLogin() {
      if (this.email != '' && this.password != '') {
        await axios
          .post('http://localhost:3000/account/login', {
            email: this.email,
            password: this.password
          })
          .then((response) => {
            if (response.data.status == 'account not found') {
              this.invalidAccount = true
              this.invalidPassword = false
              this.shouldAppear = false
            } else if (response.data.status == 'incorrect') {
              this.invalidAccount = false
              this.invalidPassword = true
              this.shouldAppear = false
            } else {
              const token = response.data.token
              Cookies.set('token', token, {
                expires: 1,
                secure: true,
                sameSite: 'None'
              })
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.invalidAccount = false
        this.invalidPassword = false
        this.shouldAppear = true
      }
    }
  }
}
</script>
