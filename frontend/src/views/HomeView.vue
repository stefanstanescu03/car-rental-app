<template>
  <div class="flex flex-col">
    <navbar />
    <searchbar @searched="dsiplay" />
    <h1 v-if="this.vehicles.length == 0" class="text-center text-red-700">No vehicle found</h1>
    <div class="flex flex-row pl-40">
      <div class="flex flex-col w-2/3 pl-5">
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
      <vehicleFilter
        @sort_inc="sort_inc"
        @sort_dec="sort_dec"
        @add_type="filter_add_type"
        @add_transmission="filter_add_transmission"
      />
    </div>
  </div>
</template>

<script>
import searchbar from '../components/searchBar.vue'
import navbar from '../components/navBar.vue'
import vehicleinfo from '../components/vehicleInfo.vue'
import vehicleFilter from '../components/vehicleFilter.vue'

export default {
  name: 'home',
  data() {
    return {
      vehicles: [],
      original_vehicles: [],
      filter_props: {
        type: [],
        transmission: []
      }
    }
  },
  components: { searchbar, navbar, vehicleinfo, vehicleFilter },
  methods: {
    dsiplay(vehicles) {
      this.vehicles = vehicles
      this.original_vehicles = vehicles
    },
    sort_inc() {
      this.vehicles.sort((a, b) => a.price_per_day - b.price_per_day)
    },
    sort_dec() {
      this.vehicles.sort((a, b) => b.price_per_day - a.price_per_day)
    },
    filter_add_type(value, type) {
      if (value) {
        this.filter_props.type.push(type)
      } else {
        this.filter_props.type = this.filter_props.type.filter((car_type) => car_type != type)
      }
      this.filter_vehicles()
    },
    filter_add_transmission(value, type) {
      if (value) {
        this.filter_props.transmission.push(type)
      } else {
        this.filter_props.transmission = this.filter_props.transmission.filter(
          (car_transmission) => car_transmission != type
        )
      }
      this.filter_vehicles()
    },
    filter_vehicles() {
      if (this.filter_props.type.length != 0 && this.filter_props.transmission.length != 0) {
        this.vehicles = this.original_vehicles
          .filter((vehicle) => this.filter_props.type.includes(vehicle.type))
          .filter((vehicle) => this.filter_props.transmission.includes(vehicle.transmission))
      } else {
        if (this.filter_props.transmission.length == 0 && this.filter_props.type.length == 0) {
          this.vehicles = this.original_vehicles
        } else {
          if (this.filter_props.type.length == 0) {
            this.vehicles = this.original_vehicles.filter((vehicle) =>
              this.filter_props.transmission.includes(vehicle.transmission)
            )
          }
          if (this.filter_props.transmission.length == 0) {
            this.vehicles = this.original_vehicles.filter((vehicle) =>
              this.filter_props.type.includes(vehicle.type)
            )
          }
        }
      }
    }
  }
}
</script>
