<template lang="pug">
  .percentage
    el-progress(:percentage="percent", :text-inside="true", :stroke-width="18")
    p 
      span 目標距離：
      span.bold(v-html="`${distance}m`")
    p
      span 走った距離：
      span.bold(v-html="`${current}m`")
    p
      span 進捗率：
      span.bold(v-html="`${percent}%`")

</template>

<script>
import { mapGetters } from 'vuex'
import firebase from "~/plugins/firebase.js"
const db = firebase.database()

export default {
  data () {
    return {
      success: false
    }
  },
  watch: {
    percent () {
      if (this.percent == 100 && !this.success) {
        let _this = this
        setTimeout(function (){
          _this.$router.push('/success')
        }, 800)
        this.success = true
      }
    },
  },
  computed: {
    ...mapGetters([
      'users',
      'app'
    ]),
    distance () {
      // 全部の距離
      const day = "20190929"
      if (!this.app || !this.app[day]) return 0
      return this.app[day].distance
    },
    periodValues () {
      // TODO: 該当期間だけフィルタ
      return this.users
    },
    percent () {
      if (this.current <= 0 || this.distance <= 0) return 0
      let value = Math.floor(this.current / this.distance * 100)
      return value >= 100 ? 100 : value
    },
    current () {
      // 現在の距離
      // 仮に1カウント 25cm = 0.25m
      if (!this.users) return 0
      let current = 0
      for (let i in this.users) {
        if (i == '.key') continue
        let count = this.users[i].count
        current += count * 120
      }
      return current
    }
  },
  components: {
  },
}
</script>

<style lang="scss">
.percentage {
  margin-bottom: 20px;
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
      transform: scale(-1, 1);
    }
  }
  .el-progress-bar__innerText {
    font-size: 11px;
  }
  .el-progress-bar__outer {
    overflow: initial;
  }
  .bold {
    font-weight: bold;
  }
  p {
    padding: 5px 20px;
  }
  .el-progress {
    padding: 40px 10px 10px;
  }
}
</style>
