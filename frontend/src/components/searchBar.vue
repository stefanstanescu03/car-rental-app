<template>
  <div class="flex flex-row justify-center p-20">
    <input
      type="text"
      class="border border-gray-900 border-r-0 rounded-tl-md rounded-bl-md w-1/2 outline-none p-2 font-rubik"
      placeholder="Enter Location"
    />
    <button
      class="border border-gray-900 p-2 rounded-tr-md rounded-br-md duration-300 hover:bg-gray-900 hover:text-white"
    >
      Find
    </button>
  </div>
</template>

<script>
export default {
  name: 'searchbar'
}
</script>
