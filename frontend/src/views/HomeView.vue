<template>
  <div class="flex flex-col">
    <navbar />
    <searchbar @searched="dsiplay" />
    <h1 v-if="this.vehicles.length == 0" class="text-center text-red-700">No vehicle found</h1>
    <div class="flex flex-wrap">
      <vehicleinfo
        v-for="vehicle in this.vehicles"
        :car_model="vehicle.car_model"
        :type="vehicle.type"
        :seats="vehicle.seats"
        :transmission="vehicle.transmission"
        :capacity="vehicle.capacity"
        :price_per_day="vehicle.price_per_day"
        :id="vehicle.id"
      />
    </div>
  </div>
</template>

<script>
import searchbar from '../components/searchBar.vue'
import navbar from '../components/navBar.vue'
import vehicleinfo from '@/components/vehicleInfo.vue'

export default {
  name: 'home',
  data() {
    return {
      vehicles: []
    }
  },
  components: { searchbar, navbar, vehicleinfo },
  methods: {
    dsiplay(vehicles) {
      this.vehicles = vehicles
    }
  }
}
</script>
