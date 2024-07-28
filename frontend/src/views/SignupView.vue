<template>
  <!-- <div class="flex w-full justify-center"> -->
  <navbar />
  <div class="flex flex-col py-10 gap-4 items-center content-center">
    <h1 class="font-rubik font-semibold text-gray-900 text-xl">Sign up</h1>
    <div class="flex flex-col w-1/3">
      <label for="firstname" class="font-rubik text-gray-600">First name</label>
      <input
        type="text"
        name="firstname"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="lastname" class="font-rubik text-gray-600">Last name</label>
      <input
        type="text"
        name="lastname"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="phone" class="font-rubik text-gray-600">Phone</label>
      <input
        type="tel"
        name="phone"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="email" class="font-rubik text-gray-600">Email</label>
      <input
        type="email"
        name="email"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <div class="flex flex-col w-1/3">
      <label for="password" class="font-rubik text-gray-600">Password</label>
      <input
        type="password"
        name="password"
        class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
      />
    </div>
    <button
      class="w-1/3 border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
    >
      Sign up
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
import navbar from '../components/navBar.vue'

export default {
  name: 'signup',
  components: { navbar }
}
</script>
