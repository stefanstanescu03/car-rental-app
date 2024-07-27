<template>
  <button
    class="cursor-pointer border border-white rounded-md p-1 duration-300 hover:border-gray-900"
    @click="$emit(type)"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'btn',
  props: {
    label: String,
    type: String
  }
}
</script>
