<template>
  <div>
    <h1 @click="testInterface">点击测试单个 接口</h1>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'test',
    methods:{
      testInterface(){
        axios({
          method:'post',
          url:'http://192.168.15.16:8482/educloud-report/report/getHttpModule',
          data:{
            itemKey:'8'
          }
        }).then((data)=>{
          console.log(data)
        }).catch((error)=>{
          console.log("errror" ,error)
        })
      }
    }
  };
</script>

<style scoped>

</style>
