<template>
  <!-- <div class="flex w-full justify-center"> -->
  <navbar />
  <div class="flex flex-col py-10 gap-4 items-center content-center">
    <h1 class="font-rubik font-semibold text-gray-900 text-xl">Log in</h1>
    <div class="flex flex-col w-1/3">
      <label for="email" class="font-rubik text-gray-600">Email</label>
      <input
        type="text"
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
      Log in
    </button>
  </div>
  <!-- </div> -->
</template>

<script>
import navbar from '../components/navBar.vue'

export default {
  name: 'login',
  components: { navbar }
}
</script>
