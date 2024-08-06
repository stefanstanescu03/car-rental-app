<template>
  <div class="flex w-full flex-row justify-between items-center p-2 border-b border-gray-900">
    <h1 class="text-2xl font-rubik font-bold">Car Rental</h1>
    <div class="flex flex-row gap-4">
      <btn type="go-home" label="Home" @go-home="goToHome" />
      <btn v-if="token == undefined" type="go-login" label="Log in" @go-login="goToLogin" />
      <btn v-if="token == undefined" type="go-signup" label="Sign up" @go-signup="goToSignup" />
      <btn v-if="token != undefined" type="logout" label="Log out" @logout="handleLogout" />
    </div>
  </div>
</template>

<script>
import btn from './btn.vue'
import Cookies from 'js-cookie'

export default {
  name: 'navbar',
  components: { btn },
  data() {
    return {
      token: Cookies.get('token')
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    goToSignup() {
      this.$router.push('/signup')
    },
    goToHome() {
      this.$router.push('/')
    },
    handleLogout() {
      Cookies.remove('token', { path: '/' })
      this.$router.push('/login')
    }
  }
}
</script>
