<template>
  <div class="flex flex-col">
    <navbar />
    <searchbar />
    <div class="flex flex-wrap">
      <vehicleinfo
        car_model="Toyota Aygo X"
        type="small car"
        seats="4"
        transmission="M"
        capacity="1 small bag and 1 big bag"
        price_per_day="50"
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
  components: { searchbar, navbar, vehicleinfo }
}
</script>
