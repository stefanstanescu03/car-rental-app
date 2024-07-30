<template>
  <div class="font-rubik flex flex-col gap-5">
    <h1 class="text-lg">Filter</h1>
    <div class="flex flex-col">
      <h1 class="text-lg">Price:</h1>
      <button class="cursor-pointer hover:underline" @click="sort_inc">Low - High</button>
      <button class="cursor-pointer hover:underline" @click="sort_dec">High - Low</button>
    </div>
    <div class="flex flex-col">
      <h1 class="text-lg">Type:</h1>
      <chbx action="small" @small="filter_add_small" label="Small" />
      <chbx action="medium" @medium="filter_add_medium" label="Medium" />
      <chbx action="large" @large="filter_add_large" label="Large" />
      <chbx action="estate" @estate="filter_add_estate" label="Estate" />
      <chbx action="premium" @premium="filter_add_premium" label="Premium" />
      <chbx action="suv" @suv="filter_add_suv" label="SUV" />
      <chbx action="mpv" @mpv="filter_add_mpv" label="MPV" />
    </div>
    <div>
      <h1 class="text-lg">Transmission</h1>
      <chbx action="m" @m="filter_add_manual" label="Manual" />
      <chbx action="a" @a="filter_add_automatic" label="Automatic" />
    </div>
  </div>
</template>

<script>
import chbx from './chbx.vue'
export default {
  name: 'vehicleFilter',
  components: { chbx },
  methods: {
    sort_inc() {
      this.$emit('sort_inc')
    },
    sort_dec() {
      this.$emit('sort_dec')
    },
    filter_add_small(value) {
      this.$emit('add_type', value, 'small-car')
    },
    filter_add_medium(value) {
      this.$emit('add_type', value, 'medium-car')
    },
    filter_add_large(value) {
      this.$emit('add_type', value, 'large-car')
    },
    filter_add_estate(value) {
      this.$emit('add_type', value, 'estate')
    },
    filter_add_premium(value) {
      this.$emit('add_type', value, 'premium')
    },
    filter_add_suv(value) {
      this.$emit('add_type', value, 'SUV')
    },
    filter_add_mpv(value) {
      this.$emit('add_type', value, 'MPV')
    },
    filter_add_manual(value) {
      this.$emit('add_transmission', value, 'M')
    },
    filter_add_automatic(value) {
      this.$emit('add_transmission', value, 'A')
    }
  }
}
</script>
