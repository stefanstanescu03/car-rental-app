<template>
  <div class="w-full flex flex-row text-gray-900 font-rubik p-5 items-center">
    <img :src="getImgUrl(vehicle_id)" alt="img" class="w-44 pr-5" />
    <div class="flex flex-col">
      <h1 class="font-bold text-base">{{ vehicle_name }}</h1>
      <div class="flex flex-row gap-10 items-center">
        <div class="flex flex-col">
          <h1>{{ rent_location }}</h1>
          <h1>{{ rent_date }}</h1>
        </div>
        <img src="../static/right-arrow.png" alt="img" class="w-6 h-6" />
        <div class="flex flex-col">
          <h1>{{ return_location }}</h1>
          <h1>{{ return_date }}</h1>
        </div>
        <button
          @click="handleReturn(id)"
          class="border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
        >
          Return
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'rentInfo',
  props: [
    'id',
    'vehicle_id',
    'rent_location',
    'return_location',
    'rent_date',
    'return_date',
    'vehicle_name'
  ],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    getImgUrl(id) {
      return `http://localhost:3000/images/${id}.jpg`
    },
    async handleReturn(id) {
      await axios.delete('http://localhost:3000/rent/delete', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        data: {
          rent_id: id
        }
      })
    }
  }
}
</script>
