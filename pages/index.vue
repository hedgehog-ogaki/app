<template lang="pug">
  .start
    .img
      img(src="~/assets/images/logo.png")
    el-form
      el-input(placeholder="出発地点" v-model="start")
      el-input(placeholder="ゴール地点" v-model="goal")
      .error(v-html="error")


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
      goal: '岐阜駅',
      error: '',
      distance: 0
    }
  },
  computed: {
    ...mapGetters([
      'data',
      'app'
    ]),
    googlemapUrl () {
      return `https://maps.googleapis.com/maps/api/js?key=${process.env.googleMapsId}&callback=initMap`
    }
  },
  created () {
    // firestoreのpostsをバインド
    //this.$store.dispatch('setDataRef', db.collection('data'))
    //this.$store.dispatch('setAppRef', db.collection('app'))
  },
  watch: {
    async distance () {
      console.log(this.distance)
      let key = this.$moment().format('YYYYMMDD')
      await firebase.database().ref('app/' + key).set({
        done: false,
        goal: this.goal,
        start: this.start,
        start_time: this.$moment().format('YYYY/MM/DD HH:mm'),
        distance: this.distance
      })
      this.$router.push('/graph')
    }
  },
  head: {
    script: [{
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBu6jkBe-3ONbs07Q5qOd3L8q-AfRyEtUI&callback=initMap',
      defer: true
    }]
  },
  mouted () {
    initMpp()
  },
  methods: {
    async handleStart () {
      let _this = this
      let service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins: [this.start],
          destinations: [this.goal],
          travelMode: 'WALKING',
        }, callback)

      function callback(response, status) {
        console.log(response)
        if (status == 'OK') {
          if (!response.rows[0].elements[0].distance) {
            _this.error = "見つかりませんでした！"
            return
          }
          const value = response.rows[0].elements[0].distance.value
          if (!value) {
            _this.error = "見つかりませんでした！"
            return
          }
          _this.distance = value
        }
      }



      //let url = `/api/distancematrix/json?origins=${this.start}&destinations=${this.goal}&mode=walking&language=ja&key=${process.env.googleMapId}`
      /*
      let url = `https://maps.googleapis.com/maps/api
/distancematrix/json?origins=${this.start}&destinations=${this.goal}&mode=walking&language=ja&key=${process.env.googleMapId}`
      let response = await this.$axios.$get(url, {headers: this.headers})
      let key = this.$moment().format('YYYYMMDD')

      if (response.status === 'OK') {
        if (!response.rows[0].elements[0].distance) {
          this.error = "見つかりませんでした！"
          return
        }
        const value = response.rows[0].elements[0].distance.value
        if (!value) {
          this.error = "見つかりませんでした！"
          return
        }
        await firebase.database().ref('app/' + key).set({
          done: false,
          goal: this.goal,
          start: this.start,
          start_time: this.$moment().format('YYYY/MM/DD HH:mm'),
          distance: value
        })
        this.$router.push('/graph')
      } else {
        this.error = "見つかりませんでした！"
      }

*/
    }
  }
}
</script>

<style lang="scss">
.start {
  width: 100vw;
  height: 100vh;
  background: #e0e06e;
  .error {
    color: red;
    text-align: center;
    height: 20px;
  }
  .img {
    max-width: 250px;
    width: 70%;
    margin: 0 auto;
    position: absolute;
    top: 34%;
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
