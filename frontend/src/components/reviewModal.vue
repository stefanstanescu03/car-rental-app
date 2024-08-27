<template>
  <div class="absolute flex w-full h-full justify-center content-center items-center">
    <div
      class="absolute flex flex-col w-1/2 h-48 bg-white border border-gray-900 rounded-md gap-2 text-center"
    >
      <h1 class="font-rubik text-gray-900 text-xl p-2">
        You just returned your rented vehicle. You can review it below:
      </h1>
      <h1 v-if="shouldAppear == true" class="font-rubik text-center text-red-700">
        Please give a valid rating
      </h1>
      <div class="flex flex-row gap-2 justify-center">
        <img
          v-if="rating < 1"
          @click="setRating(1)"
          src="../static/star.png"
          alt="img"
          width="30"
          height="30"
        />
        <img
          v-else
          @click="setRating(1)"
          src="../static/star(2).png"
          alt="img"
          width="30"
          height="30"
        />

        <img
          v-if="rating < 2"
          @click="setRating(2)"
          src="../static/star.png"
          alt="img"
          width="30"
          height="30"
        />
        <img
          v-else
          @click="setRating(2)"
          src="../static/star(2).png"
          alt="img"
          width="30"
          height="30"
        />

        <img
          v-if="rating < 3"
          @click="setRating(3)"
          src="../static/star.png"
          alt="img"
          width="30"
          height="30"
        />
        <img
          v-else
          @click="setRating(3)"
          src="../static/star(2).png"
          alt="img"
          width="30"
          height="30"
        />

        <img
          v-if="rating < 4"
          @click="setRating(4)"
          src="../static/star.png"
          alt="img"
          width="30"
          height="30"
        />
        <img
          v-else
          @click="setRating(4)"
          src="../static/star(2).png"
          alt="img"
          width="30"
          height="30"
        />

        <img
          v-if="rating < 5"
          @click="setRating(5)"
          src="../static/star.png"
          alt="img"
          width="30"
          height="30"
        />
        <img
          v-else
          @click="setRating(5)"
          src="../static/star(2).png"
          alt="img"
          width="30"
          height="30"
        />
      </div>
      <div class="flex justify-center">
        <button
          @click="handlePostRating(vehicle_id)"
          class="w-1/4 border font-rubik border-gray-900 p-1 rounded-md duration-300 hover:bg-gray-900 hover:text-white"
        >
          Post Rating
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Cookies from 'js-cookie'

export default {
  name: 'reviewModal',
  props: ['vehicle_id'],
  data() {
    return {
      rating: 0,
      shouldAppear: false
    }
  },
  methods: {
    setRating(amount) {
      this.rating = amount
    },
    async handlePostRating(id) {
      if (this.rating == 0) {
        this.shouldAppear = true
      } else {
        console.log(id)

        await axios
          .post(
            'http://localhost:3000/review/create',
            {
              vehicle_id: id,
              rating: this.rating
            },
            {
              headers: { Authorization: `Bearer ${Cookies.get('token')}` }
            }
          )
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error)
          })

        this.$router.push('/')
      }
    }
  }
}
</script>
