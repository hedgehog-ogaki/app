<template lang="pug">
  .graph
    Percentage
    .chart-wrap
      .chart
        p １週間の記録
        ChartLine(:chartdata="chartdata", :options="options")

</template>

<script>
import { mapGetters } from 'vuex'
import ChartLine from '~/components/ChartLine'
import Percentage from '~/components/Percentage'
import firebase from "~/plugins/firebase.js"
const db = firebase.database()

export default {
  computed: {
    ...mapGetters([
      'users',
      'app'
    ]),
    weeks () {
      let startWeek = this.$moment().startOf('isoWeek')
      let weekArray = []
      for (let i = 0; i < 7; i++) {
        let tmp = this.$moment(startWeek).add(i, 'days')
        let day = this.$moment(tmp).format('M/D')
        weekArray.push(day)
      }
      return weekArray
    },
    weekKeys () {
      let startWeek = this.$moment().startOf('isoWeek')
      let weekArray = []
      for (let i = 0; i < 7; i++) {
        let tmp = this.$moment(startWeek).add(i, 'days')
        let day = this.$moment(tmp).format('YYYYMMDD')
        weekArray.push(day)
      }
      return weekArray
    },
    weekData () {
      let dataArray = []
      if (!this.users) return []
      this.weekKeys.forEach(week => {
        let tmp = this.users[week] ? this.users[week]  : null
        console.log(this.users)
        let value = tmp ? tmp.count : null
        dataArray.push(value)
      })
      return dataArray
    },
    chartdata () {
      return {
        labels: this.weeks,
        datasets: [{
          label: '',
          data: this.weekData,
          borderColor: 'rgba(255, 100, 100, 1)',
        }]
      }
    },
    options () {
      return {
        legend: {
          display: false,
          labels: {
            defaultFontSize: 10
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[0].data[tooltipItem.index] + 'm'
            }
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              userCallback: function(tick) {
                return  `${tick}m`
              }
            },
          }]
        }
      }
    }
  },
  created () {
    // firestoreのpostsをバインド
    //this.$store.dispatch('setDataRef', db.ref('users'))
    //this.$store.dispatch('setAppRef', db.ref('app'))
  },
  components: {
    ChartLine,
    Percentage
  },
  methods: {
    handleStart () {
      this.$router.push('/graph')
    }
  }
}
</script>

<style lang="scss">
.graph {
  width: 100vw;
  height: 100vh;
  background: #ffecb1;
  .chart {
    padding: 10px 10px 10px;
    background: #fff;
    width: calc(100% - 40px);
    max-width: 300px;
    margin: 0 auto;
    p {
      text-align: center;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 15px;
    }
  }
  .chart-wrap {
    padding-top: 10px;
  }
}
</style>
