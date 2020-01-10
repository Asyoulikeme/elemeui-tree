<template>
  <div id="interface-container" v-show="totalInterfaceLength > 0">

      <i class="iconfont ext-icon-view eye" title="隐藏模块信息" v-if="eyeStatus" @click="setEyeStatus(false)" />
      <i class="iconfont ext-icon-view-off eye" title="显示模块信息" v-else @click="setEyeStatus(true)" />

    <HttpAction />
    <HttpQueryAction />
    <HttpActionReport />
    <HttpQueryActionReport />
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HttpQueryAction from './interfaceConfig/HttpQueryAction';
  import HttpAction from './interfaceConfig/HttpAction';
  import HttpActionReport from './interfaceConfig/HttpActionReport'
  import HttpQueryActionReport from './interfaceConfig/HttpQueryActionReport';
  export default {
    name: 'InterfaceConfig',
    props:{
      index:Number
    },
    components:{
      HttpAction,
      HttpQueryAction,
      HttpActionReport,
      HttpQueryActionReport
    },
    computed:{
      ...mapState(['eyeStatus','moduleConfig']),
      totalInterfaceLength(){
        /* 只有当四大接口里面有记录时才显示接口信息一览 */
        let typeLength = 0
        typeLength += this.moduleConfig[this.index].interfaceConfig.HttpAction.length
        typeLength += this.moduleConfig[this.index].interfaceConfig.HttpQueryAction.length
        typeLength += this.moduleConfig[this.index].interfaceConfig.HttpActionReport.length
        typeLength += this.moduleConfig[this.index].interfaceConfig.HttpQueryActionReport.length

        return typeLength
      }
    },
    methods:{
      setEyeStatus(val){
        this.$store.commit('setEyeStatus',{val})
      }
    }
  };
</script>

<style lang="scss">
 #interface-container{

   width: 580px;
   min-height: 516px;
   display: flex;
   justify-content: center;
   align-items: flex-start;
   flex-wrap: wrap;
   flex-direction: row;
   box-shadow: 0 2px 15px -20px #000000,
   0 0 13px -11px #000000;
   padding-top: 3rem;
   position: relative;
   .eye{
     display: block;
     position: absolute;
     top: 1.5rem;
     left: 50%;
     transform: translateX(-50%);
     font-size: 2rem;
     opacity: .5;
     &:hover{
       cursor: pointer;
       opacity: 1;
     }
   }
   .el-collapse{
     width: 80%;
     border-bottom:0 ;
     border-top: 0;
     margin-top: 40px;
     transition:box-shadow .2s ease-in;

     .el-collapse-item__header{
       margin-left: 1rem;
     }
     .el-collapse-item{
       &:first-child{
         border-top:1px solid #EBEEF5;
       }

       transition: all .3s ease;
       &:hover{

       }
     }
     .el-form {
       width: 100%;
       height: auto;
       margin-top: 20px;
       position: relative;
       &:hover{

       }
       fieldset{

         display: flex;
         justify-content: center;
         align-items: flex-start;
         padding-top: 1.5rem;
         padding-bottom: 0;
         overflow: hidden;
         border: 1px solid #999999;
         text-indent: 0;
         color: #999999;
         margin-bottom: 2rem;
         position: relative;
         &:hover{
           color: #409eff;
           border: 1px solid #409eff;
         }
         .el-icon-circle-plus{
           position: absolute;
           right: 10px;
           top: 25px;
           transition: all .5s ease;
           color: #409eff;
           &:hover{
             cursor: pointer;
           }
         }
         .el-collapse{
           width: 100%;
           &:hover{
             box-shadow: none;
           }
         }
         .el-collapse-item__header{
           margin-left: 1rem;
         }
       }

       .el-input__inner {
         width: 80%;

       }
       .el-select{
         width: 100%;
         .el-input__suffix{
           width: 100%;
           .el-input__suffix-inner{
             position: absolute;
             right: 0;
             transform: translateX(-70px);
           }
         }
       }
     }
   }

 }


</style>
