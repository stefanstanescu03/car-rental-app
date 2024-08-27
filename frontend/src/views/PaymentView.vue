<template>
  <div class="w-full p-5 flex justify-center">
    <div class="flex flex-col gap-5 w-1/3">
      <h1 class="font-rubik text-gray-900 text-xl">Payment details</h1>
      <div class="flex flex-row gap-5">
        <div class="flex flex-col">
          <label for="first_name" class="font-rubik text-gray-600">First name</label>
          <input
            type="text"
            name="first_name"
            class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
          />
        </div>
        <div class="flex flex-col">
          <label for="last_name" class="font-rubik text-gray-600">Last name</label>
          <input
            type="text"
            name="last_name"
            class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <label for="country" class="font-rubik text-gray-600">Country/Region</label>
        <input
          type="text"
          name="country"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-col">
        <label for="city" class="font-rubik text-gray-600">Town/City</label>
        <input
          type="text"
          name="city"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-col">
        <label for="country" class="font-rubik text-gray-600">Billing address</label>
        <input
          type="text"
          name="country"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-col">
        <label for="zip" class="font-rubik text-gray-600">ZIP code</label>
        <input
          type="text"
          name="zip"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-col">
        <label for="phone" class="font-rubik text-gray-600">Phone number</label>
        <input
          type="text"
          name="phone"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-col">
        <label for="card" class="font-rubik text-gray-600">Card number</label>
        <input
          type="text"
          name="card"
          class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
        />
      </div>
      <div class="flex flex-row gap-5">
        <div class="flex flex-col">
          <label for="expiration" class="font-rubik text-gray-600">Expiration date</label>
          <input
            type="text"
            name="expiration"
            class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
          />
        </div>
        <div class="flex flex-col">
          <label for="cvv" class="font-rubik text-gray-600">Card security code</label>
          <input
            type="text"
            name="cvv"
            maxlength="3"
            class="w-full border border-gray-900 rounded-md outline-none p-1 font-rubik"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between gap-5 items-center">
        <div class="flex w-1/2">
          <h1 class="font-rubik text-gray-900 text-xl">Total: {{ price }} EUR</h1>
        </div>
        <div class="flex w-1/2">
          <button
            @click="handleRent"
            class="w-full border border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'payment',
  data() {
    return {
      infos: this.$route.params.infos,
      price: this.$route.params.price
    }
  },
  methods: {
    async handleRent() {
      await axios
        .post('http://localhost:3000/rent/create', JSON.parse(this.infos), {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => console.log(response.data))
        .catch((error) => {
          console.log(error)
        })
      this.$router.push('/account')
    }
  }
}
</script>
