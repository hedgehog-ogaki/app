<template lang="pug">
  .percentage
    | aa

</template>

<script>
import { mapGetters } from 'vuex'
import firebase from "~/plugins/firebase.js"
const db = firebase.firestore()

export default {
  data () {
    return {
      start: null,
      goal: null,
    }
  },
  computed: {
    ...mapGetters([
      'users',
      'app'
    ]),
  },
  created () {
    // firestoreのpostsをバインド
    //this.$store.dispatch('setDataRef', db.collection('users'))
    //this.$store.dispatch('setAppRef', db.collection('app'))
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.graph {
  width: 100vw;
  height: 100vh;
  background: #e0e06e;
  .chart {
    padding: 10px;
    background: #fff;
    width: calc(100% - 40px);
    max-width: 300px;
    margin: 0 auto;
  }
  .chart-wrap {
    padding-top: 10px;
  }
}
</style>
