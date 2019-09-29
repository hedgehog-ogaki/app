<template lang="pug">
  .success
    .title ＼やったね！クリア！／
    .img
      img(src="~/assets/images/Achievement.png")
    .link(@click="handleReStart") >スタートに戻る

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
  },
  methods: {
    handleReStart () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.success {
  width: 100vw;
  height: 100vh;
  background: #e0e06e;
  .title {
    text-align: center;
    padding-top: 130px;
    font-weight: bold;
    font-size: 20px;
  }
  .link {
    text-align: center;
    position: absolute;
    bottom: 100px;
    left: 50%;
    text-decoration: underline;
    transform: translate(-50%, -50%);
  }
  .img {
    width: 90%;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
    }
  }
}
</style>
