<template>
  <div>
      <img src="../assets/2.jpg" alt="">
      <h2>考试结束！</h2>
  </div>
</template>

<script>
export default {
    data(){
        return {
            total: ""
        }
    },
    created(){
        this.total = this.$route.query.total;
    }
}
</script>

<style scoped>
img{
    display: block;
    width: 100%;
}
h2{
    padding-top: 10%;
    text-align: center;
}
</style>