<template>
  <div>
      <Table :columns="columns1" :data="data1"></Table> 
      <Page :total="total" :current="current_page" :page-size="per_page" @on-change="chang"/>
  </div>
</template>

<script>
import https from '../axios.js';
export default {
    name: 'admin',
    data(){
        return {
            columns1:[
                {
                    title: "姓名",
                    key: "name"
                },
                {
                    title: "成绩",
                    key: "total"
                }
            ],
            data1:[],
            total: 0,
            current_page: 1,
            per_page: 10
        }
    },
    created(){
        this.getList();
    },
    methods:{
      chang(val){
        this.current_page = val;
        this.getList();
      },
      getList(){
        https.fetchGet("/users",{page:this.current_page,per_page:this.per_page}).then(({data})=>{
          console.log(data);
          if(data.error_code==0){
            this.data1 = data.data.data;
            this.total = data.data.total;
          }else{
            this.$Message.error(data.error_msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    }
}
</script>

<style>

</style>