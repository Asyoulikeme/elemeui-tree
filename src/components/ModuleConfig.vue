<template>
  <div class="module-interface-container">
    <el-form :model="getModuleConfig[index]">
      <el-form-item label="moduleKey" :label-width="formLabelWidth">
        <el-input v-model="getModuleConfig[index].moduleKey" placeholder="主键" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="getModuleConfig[index].name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据库产品" :label-width="formLabelWidth">
        <el-select v-model="getModuleConfig[index].dbtype" placeholder="请选择您将要使用的数据库" class="input-selec">
          <el-option label="MySql" value="Mysql"></el-option>
          <el-option label="Oracle" value="Oracle"></el-option>
          <el-option label="SQLite" value="Sqlite"></el-option>
          <el-option label="SqlServer" value="SqlServer"></el-option>
          <el-option label="PostgreSql" value="PostgreSql"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接池类型" :label-width="formLabelWidth">
        <el-select v-model="getModuleConfig[index].dataSourceType" placeholder="请选择数据库连接池的类型" class="input-selec">
          <el-option label="C3P0" value="C3P0"></el-option>
          <el-option label="DBCP" value="DBCP"></el-option>
          <el-option label="Druid" value="Druid"></el-option>

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
    <InterfaceConfig />
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
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
      ...mapGetters(['getModuleConfig','getCurrentInterfaceNode'])
    },
    watch:{
      '$route'(to,from){
        //console.log(to,from)
        this.index = to.params.index  //获取实时最新的 后缀 index，然后index 变化时，整个表单变化
        console.log("index数据：" + this.index)
        console.log(this.getModuleConfig[this.index].name)
      }
    },
    methods:{

    },
    mounted() {

    }
  };
</script>

<style scoped lang="scss">
  .module-interface-container{
    *border: 1px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
  }
  .el-form{
    height: auto;
    *border-bottom: 1px dashed #999999;
    margin-top: 20px;
    position: relative;

  }
  .input-selec{
    width: 100%;

  }



</style>
