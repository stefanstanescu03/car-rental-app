<template>
  <div class="flex items-center">
    <label
      class="flex items-center justify-center pr-2 rounded-full cursor-pointer"
      htmlFor="check"
    >
      <input
        v-model="status"
        @change="emitCheck"
        type="checkbox"
        class="before:content[''] h-5 w-5 peer cursor-pointer appearance-none rounded-md border border-gray-900"
        id="check"
      />
      <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100">
        <img src="../static/check.png" alt="img" width="15" height="15" />
      </span>
    </label>
    <label class="text-gray-900 cursor-pointer select-none" htmlFor="check">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'chbx',
  data() {
    return {
      status: false
    }
  },
  props: {
    label: String,
    action: String
  },
  methods: {
    emitCheck() {
      this.$emit(this.action, this.status)
    }
  }
}
</script>
