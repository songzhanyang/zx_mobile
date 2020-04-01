<template>
  <div>
    <img src="../assets/timg.png" width="100%" />
    <div class="inpname">
      <p class="ppp">请在此输入您的姓名</p>
      <input class="inp" v-model.trim="name" placeholder="请输入姓名" clearable />
    </div>
    <footer class="footer">
        <button class="butn" @click="subm">开始考试</button>
    </footer>
  </div>
</template>

<script>
import https from '../axios.js';
export default {
  name: "login",
  data() {
    return {
      name: ""
    }
  },
  methods: {

      btn(){
        let reg = /^[\u4E00-\u9FA5]{2,4}$/;
        if(this.name=="" || !reg.test(this.name)){
            this.$Message.error("请输入正确的姓名");
            return false;
        }
        https.fetchPost("/user/"+"123",{name: this.name}).then(({data})=>{
          if(data.error_code==0){
            localStorage.clear();
            console.log(data);
            // this.$router.push({path:"/index",query:{...data.data}});
          }else{
            this.$Message.error(data.error_msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      subm(){
        let reg = /^[\u4E00-\u9FA5]{2,4}$/;
        if(this.name=="" || !reg.test(this.name)){
            this.$Message.error("请输入正确的姓名");
            return false;
        }
        https.fetchPost("/user/login",{name: this.name}).then(({data})=>{
          if(data.error_code==0){
            localStorage.clear();
            data.data.end_time = data.data.end_time*1000;
            data.data.create_time = data.data.create_time*1000;
            this.$router.push({path:"/index",query:{...data.data}});
          }else{
            this.$Message.error(data.error_msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
  }
};
</script>

<style scoped>
.inpname {
  width: 75%;
  height: 45px;
  margin: 2% 12.5%;
}
.ppp{
    font-family:PingFangSC-Semibold,PingFang SC;
    color: #515a6e;
    font-size: 32px;
    margin: 40px 0 30px 10px;
}

.footer{
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
}
.butn{
  border: 1px solid #edd;
}

</style>