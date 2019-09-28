<template lang="pug">
  .start
    h1.title 旅するハリネズミ
    .img
      img(src="~/assets/images/animal_harinezumi.png")
    el-form
      el-input(placeholder="出発地点" v-model="start")
      el-input(placeholder="ゴール地点" v-model="goal")


    el-button(type="primary" @click="handleStart") スタート

</template>

<script>
import firebase from "~/plugins/firebase.js"
import { mapGetters } from 'vuex'
const db = firebase.firestore()

export default {
  data () {
    return {
      start: '大垣駅',
      goal: '岐阜駅'
    }
  },
  computed: {
    ...mapGetters([
      'data',
      'app'
    ])
  },
  created () {
    // firestoreのpostsをバインド
    //this.$store.dispatch('setDataRef', db.collection('data'))
    //this.$store.dispatch('setAppRef', db.collection('app'))
  },
  methods: {
    async handleStart () {

      let url = `/api/distancematrix/json?origins=${this.start}&destinations=${this.goal}&mode=walking&language=ja&key=${process.env.googleMapId}`
      let response = await this.$axios.$get(url)

      console.log(response)
      if (response.status === 'OK') {
        const value = response.rows[0].elements[0].distance.value
        this.$router.push('/graph')
      }

    }
  }
}
</script>

<style lang="scss">
.start {
  width: 100vw;
  height: 100vh;
  background: #e0e06e;
  .img {
    max-width: 200px;
    width: 60%;
    margin: 0 auto;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
    }
  }
  .title {
    font-size: 20px;
    text-align: center;
    padding-top: 100px;
  }
  .el-button {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #20840e;
    border-color: #20840e;
  }
  .el-form {
    width: 80%;
    position: absolute;
    bottom: 140px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-input {
    margin-bottom: 10px;
  }
}
</style>
