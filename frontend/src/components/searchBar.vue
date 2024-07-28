<template>
  <div class="flex flex-row justify-center p-20">
    <input
      type="text"
      class="border border-gray-900 border-r-0 rounded-tl-md rounded-bl-md w-1/2 outline-none p-2 font-rubik"
      v-model="searched_location"
      placeholder="Enter Location"
    />
    <button
      class="border border-gray-900 p-2 rounded-tr-md rounded-br-md duration-300 hover:bg-gray-900 hover:text-white"
      @click="search"
    >
      Find
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'searchbar',
  data() {
    return { searched_location: '' }
  },
  methods: {
    async search() {
      if (this.searched_location != '') {
        await axios
          .get(`http://localhost:3000/vehicle/search/${this.searched_location}`)
          .then((response) => this.$emit('searched', response.data.values))
      }
    }
  }
}
</script>
