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
      console.log(this.app)
      if (!this.app || !this.app["20190920"]) return 0
      return this.app["20190920"].distance
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
      console.log(this.users)
      if (!this.users) return 0
      let current = 0
      for (let i in this.users) {
        if (i == '.key') continue
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
    position: relative;
    &::after {
      position: absolute;
      content: "";
      background: url('~assets/images/animal_harinezumi.png');
      width: 50px;
      height: 50px;
      background-size: contain;
      display: inline-block;
      background-position: center;
      z-index: 100;
      margin: -30px 0 0 -10px;
    }
  }
  .el-progress-bar__innerText {
    font-size: 11px;
  }
  .el-progress-bar__outer {
    overflow: initial;
  }
}
</style>
