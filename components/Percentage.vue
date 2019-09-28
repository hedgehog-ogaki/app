<template lang="pug">
  .percentage
    p 
      span 目標距離：
      span(v-html="`${distance}m`")
    p
      span 走った距離：
      span(v-html="`${current}m`")
    p
      span 進捗率：
      span(v-html="`${percent}%`")
    el-progress(:percentage="percent", :text-inside="true", :stroke-width="18")

</template>

<script>
import { mapGetters } from 'vuex'
import firebase from "~/plugins/firebase.js"
const db = firebase.database()

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'users',
      'app'
    ]),
    distance () {
      // 全部の距離
      return this.app[0].distance
    },
    periodValues () {
      // TODO: 該当期間だけフィルタ
      return this.users
    },
    percent () {
      if (this.current <= 0) return 0
      return Math.floor(this.current / this.distance * 100)
    },
    current () {
      // 現在の距離
      // 仮に1カウント 25cm = 0.25m
      let current = 0
      for (let i in this.users) {
        let count = this.users[i].count
        current += count * 0.25
      }
      return current
    }
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.percentage {
  .el-progress-bar__inner {
  }
  .el-progress-bar__innerText {
    font-size: 11px;
  }
}
</style>
