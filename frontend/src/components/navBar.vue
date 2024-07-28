<template>
  <div class="flex w-full flex-row justify-between items-center p-2 border-b border-gray-900">
    <h1 class="text-2xl font-rubik font-bold">Car Rental</h1>
    <div class="flex flex-row gap-4">
      <btn type="go-home" label="Home" @go-home="goToHome" />
      <btn type="go-login" label="Log in" @go-login="goToLogin" />
      <btn type="go-signup" label="Sign up" @go-signup="goToSignup" />
    </div>
  </div>
</template>

<script>
import btn from './btn.vue'

export default {
  name: 'navbar',
  components: { btn },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    goToSignup() {
      this.$router.push('/signup')
    },
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>
