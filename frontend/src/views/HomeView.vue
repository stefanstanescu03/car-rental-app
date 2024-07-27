<template>
  <div class="flex flex-col">
    <navbar />
    <searchbar />
  </div>
</template>

<script>
import searchbar from '../components/searchBar.vue'
import navbar from '../components/navBar.vue'

export default {
  name: 'home',
  components: { searchbar, navbar }
}
</script>
