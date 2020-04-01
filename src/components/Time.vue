<template>
  <span>{{time}}</span>
</template>



<script>
  export default{
    data () {
      return {
        time : '',
        flag : false
      }
    },
    mounted () {
      let timeS = setInterval(()=>{
        if(this.flag == true){
          clearInterval(timeS)
        }
        this.timeDown()
      },1000)
    },
    props : ["endTime","startTime"],
    methods : {
      timeDown () {
        let endTime = Number(this.endTime);
        let sTime = localStorage.getItem("startTime");
        if(!sTime){
          sTime = this.startTime;
          localStorage.setItem("startTime",this.startTime);
        }else{
          sTime=Number(sTime)+1000;
          localStorage.setItem("startTime",sTime);
        }
        const nowTime = (new Date(sTime)).getTime();
        // console.log(endTime);
        let leftTime = parseInt((endTime-nowTime)/1000)
        // let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime<=0){
          this.flag = true
          this.$emit('time-end',this.flag)
        }
        this.time = `${h}:${m}:${s}`
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      }
    }
  }
</script>

<style scoped>
</style>