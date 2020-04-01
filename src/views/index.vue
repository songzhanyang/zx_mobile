<template>
  <div class="main">
    <div class="top">
        <span>{{ttype.t1}}</span>
        <Time class="ti-me" :endTime="etime" :startTime="stime"/>
    </div>
    <div class="content">
        <div class="form">
          <div class="timi-cont">
            <span class="timu" v-if="ttype.t2==0">{{list[current_pid].key[0]}}</span>
            <input v-if="ttype.t2==0" class="timu-daan" type="text" v-model.trim="tiankong">
            <span v-if="ttype.t2==0" class="timu">{{list[current_pid].key[1]}}</span>
          </div>
          <div class="sel">
            <div class="sel-se" v-if="ttype.t2==1">
              <p>{{list[current_pid].key}}</p>
              <div class="left">
                <input type="radio" name="duicuo" :value="1" v-model="dui">对
              </div>
              <div class="right">
                <input type="radio" name="duicuo" :value="0" v-model="dui">错
              </div>
            </div>
            <div class="sel-ch" v-if="ttype.t2==2">
              <p>{{current_key.k1}}</p>
              <div class="xuanxiang" v-for="(item,index) in current_key.k2" :key="index">
                <input type="radio" name="danxuan" :value="index+1" v-model="danxuan">{{item}}
              </div>
            </div>
          </div>
        </div>
    </div>
    <footer class="footer">
        <button class="butn" @click="subm">{{btnNmae}}</button>
    </footer>
  </div>
</template>

<script>
import arr from './cont.js';
import Time from '../components/Time';
import https from '../axios.js';
export default {
  name: "login",
  data() {
    return {
      name: "",
      ttype: {t1:"填空题",t2:0},
      list: arr,
      total: 0,
      tiankong: "",
      current_pid: 0,
      current_key: {
        k1: "",
        k2: []
      },
      dui: "q",
      danxuan:"",
      stime: "",
      etime: "",
      btnNmae: '下一题',
      isBtn: false
    }
  },
  watch: {
    current_pid(val){
      if(val==49){
        this.btnNmae = "提交";
      }
      if(this.list[this.current_pid].type==0){
        this.ttype = {t1:"填空题",t2:0};
      }else if(this.list[this.current_pid].type==1){
        this.ttype = {t1:"判断题",t2:1};
      }else{
        this.ttype = {t1:"选择题",t2:2};
        this.current_key = {
          k1: this.list[this.current_pid].key[0],
          k2: this.list[this.current_pid].key.slice(1)
        }
      }
    },
  },
  created(){
    if(localStorage.getItem("current_pid") && localStorage.getItem("current_pid")!=0){
      this.total = localStorage.getItem("total");
      this.current_pid = localStorage.getItem("current_pid");
    }else{
      this.total = this.$route.query.total;
      this.current_pid = this.$route.query.current_pid;
    }
    // console.log(this.$route.query);
    this.stime = this.$route.query.create_time;
    this.etime = this.$route.query.end_time;
    this.$on("time-end",(flag)=>{
      console.log(flag);
      if(flag){
        https.fetchPost(`/user/${this.$route.query.id}`,{
          current_pid: this.current_pid,
          total: this.total
          }).then(({data})=>{
          if(data.error_code==0){
            this.$router.push({path:"/sub",query:{total: this.total}});
          }else{
            this.$Message.error(data.error_msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    });
  },
  components:{
    Time
  },
  methods: {
      subm(){
        if(this.isBtn){
          return false;
        }
        if(this.ttype.t2==0){
          if(this.tiankong==""){
            this.$Message.error("请输入答案");
            return false;
          }else{
            let _v = this.list[this.current_pid].value;
            if((typeof _v)=="string"){
              if(_v==this.tiankong){
                let _t = parseInt(this.total);
                this.total=_t+2;
              }
            }else{
              let flag = false;
              _v.forEach(el=>{
                if(el==this.tiankong){
                  flag = true;
                }
              });
              if(flag){
                let _t = parseInt(this.total);
                this.total=_t+2;
              }
            }
            let _c = parseInt(this.current_pid);
            this.current_pid= _c+1;
            localStorage.setItem("current_pid",this.current_pid);
            localStorage.setItem("total",this.total);
            this.tiankong = "";
          }
        }else if(this.ttype.t2==1){
          if(this.dui=="q"){
            this.$Message.error("请输入答案");
            return false;
          }else{
            let _v = this.list[this.current_pid].value;
            if(this.dui==_v){
              let _t = parseInt(this.total);
                this.total=_t+2;
            }
            let _c = parseInt(this.current_pid);
            this.current_pid= _c+1;
            localStorage.setItem("current_pid",this.current_pid);
            localStorage.setItem("total",this.total);
            this.dui = "q";
          }
        }else{
          if(!this.danxuan){
            this.$Message.error("请输入答案");
            return false;
          }else{
            let _v = this.list[this.current_pid].value;
            if(this.danxuan==_v){
              let _t = parseInt(this.total);
              this.total=_t+2;
            }
            let _c = parseInt(this.current_pid);
            this.current_pid= _c+1;
            localStorage.setItem("current_pid",this.current_pid);
            localStorage.setItem("total",this.total);
            this.danxuan = "0";
          }
        }
        if(this.current_pid==50){
          this.isBtn = true;
          https.fetchPost(`/user/${this.$route.query.id}`,{
            current_pid: this.current_pid,
            total: this.total
            }).then(({data})=>{
            if(data.error_code==0){
              this.$router.push({path:"/sub",query:{total: this.total}});
            }else{
              this.$Message.error(data.error_msg);
            }
          }).catch(err=>{
            console.log(err);
          })
        }
      }
  }
};
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
}
.top {
  height: 96px;
  position: relative;
  text-align: center;
  line-height: 96px;
  background: #04CBD8;
  color: #fff;
}
.top span:nth-child(1){
    font-size: 36px;
}
.ti-me{
    position: absolute;
    display: block;
    width: 132px;
    height: 66px;
    background: #ff9900;
    border-radius: 50%;
    right: 4%;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 66px;
}
.content {
    flex: 1;
    overflow: hidden;
}
.content .form{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 4% 155px;
    overflow-y: auto;
}
.timu-daan{
  border-bottom: 1px solid #000;
  padding-left: 20px;
}

.footer{
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
}
</style>