<template>
  <div class="module-container">
    <div v-show="eyeStatus" :class="{'module-config-container':true,'move-right':eyeStatus}">
      <el-form :model="getModuleConfig[index]">
        <el-form-item label="moduleKey" :label-width="formLabelWidth">
          <el-input v-model="getModuleConfig[index].moduleKey" placeholder="主键" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="getModuleConfig[index].name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数据库产品" :label-width="formLabelWidth">
          <el-select v-model="getModuleConfig[index].dbtype" placeholder="请选择您将要使用的数据库"  popper-class="input-selec">
            <el-option class="select-option" label="MySql" value="Mysql"></el-option>
            <el-option class="select-option" label="Oracle" value="Oracle"></el-option>
            <el-option class="select-option" label="SQLite" value="Sqlite"></el-option>
            <el-option class="select-option" label="SqlServer" value="SqlServer"></el-option>
            <el-option class="select-option" label="PostgreSql" value="PostgreSql"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="连接池类型" :label-width="formLabelWidth">
          <el-select v-model="getModuleConfig[index].dataSourceType" placeholder="请选择数据库连接池的类型" popper-class="input-selec"  >
            <el-option class="select-option" label="C3P0" value="C3P0"></el-option>
            <el-option class="select-option" label="DBCP" value="DBCP"></el-option>
            <el-option class="select-option" label="Druid" value="Druid"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="数据库Url" :label-width="formLabelWidth">
          <el-input v-model="getModuleConfig[index].dbUrl" autocomplete="off" placeholder="连接数据库的Url"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户名" :label-width="formLabelWidth">
          <el-input v-model="getModuleConfig[index].dbUser" autocomplete="off" placeholder="连接数据库的用户名"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码" :label-width="formLabelWidth">
          <el-input v-model="getModuleConfig[index].dbPassword" autocomplete="off" placeholder="连接数据库的密码"></el-input>
        </el-form-item>

        <el-form-item label="开启自定义" :label-width="formLabelWidth" >
          <el-switch v-model="getModuleConfig[index].useCustomDialect"></el-switch>
        </el-form-item>
        <div class="custom-container" v-show="getModuleConfig[index].useCustomDialect">
          <el-form-item label="batchSeperator" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].batchSeperator" autocomplete="off" placeholder="batchSeperator"></el-input>
          </el-form-item>
          <el-form-item label="openQuote" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].openQuote" autocomplete="off" placeholder="openQuote"></el-input>
          </el-form-item>
          <el-form-item label="identitySql" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].identitySql" autocomplete="off" placeholder="identitySql"></el-input>
          </el-form-item>
          <el-form-item label="closeQuote" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].closeQuote" autocomplete="off" placeholder="closeQuote"></el-input>
          </el-form-item>
          <el-form-item label="pagingSqlTemplate" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].pagingSqlTemplate" autocomplete="off" placeholder="pagingSqlTemplate"></el-input>
          </el-form-item>
          <el-form-item label="parameterPrefix" :label-width="formLabelWidth">
            <el-input v-model="getModuleConfig[index].parameterPrefix" autocomplete="off" placeholder="parameterPrefix"></el-input>
          </el-form-item>
          <el-form-item label="MultipleStatements" :label-width="formLabelWidth" >
            <el-switch v-model="getModuleConfig[index].supportsMultipleStatements"></el-switch>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <InterfaceConfig :index="index"/>
  </div>

</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import InterfaceConfig from './InterfaceConfig';
  export default {
    name: 'ModuleConfig',

    data(){
      return{
        moduleObj:{
          name:"232",
          dbType:"",
          dataSourceType:"",
          dbUrl:"",
          dbUser:"",
          dbPassword:""
        },
        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    components:{
      InterfaceConfig
    },
    computed:{
      ...mapState(['eyeStatus']),
      ...mapGetters(['getModuleConfig'])
    },
    watch:{
      '$route'(to,from){
        //console.log(to,from)
        this.index = to.params.index  //获取实时最新的 后缀 index，然后index 变化时，整个表单变化

      }
    }
  };
</script>

<style lang="scss">
  .module-container{
    *border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;

    .move-right{
      animation: move .3s  cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes move {
      from{
        transform: translateX(-50%);
      }
      to{
        transform: translateX(0);
      }
    }
    .module-config-container{
      width: 460px;
      box-shadow: 0 2px 15px -20px #000000,
      0 0 13px -11px #000000;
      transition: all .5s ease;
      transform: translateX(-50%);
    }
    .el-form{
      width: 100%;

      height: auto;
      margin-top: 20px;
      position: relative;



      .el-input__inner{
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
    .custom-container{
      padding-top: 40px;
      border-top: 1px solid #ebebeb;
    }


  }




</style>
