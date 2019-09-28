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

export default {
  data () {
    return {
      start: null,
      goal: null
    }
  },
  methods: {
    handleStart () {
      this.$router.push('/graph')
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
    max-width: 400px;
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
