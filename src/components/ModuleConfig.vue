<template>
  <el-form :model="getModuleConfig[index]">
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
    <el-tooltip class="item" effect="dark" content="在此模块下新增接口" placement="right">
      <el-button icon="el-icon-connection" size="medium" class="addInterface" @click="addInterface"/>
    </el-tooltip>

    <InterfaceConfig />
  </el-form>
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
        console.log(to,from)
        this.index = to.params.index  //获取实时最新的 后缀 index，然后index 变化时，整个表单变化
      }
    },
    methods:{
      addInterface(){
        /*
        * 这里不能push 路由跳转，要把tree node 拿过来，
        * 判断 当前模块节点下面有没有子接口如果有，那就显示
        * 打算在模块信息展示下面 弄个收缩盒子，把接口信息藏在里边
        *
        * */
        //this.$router.push({name:'InterfaceConfig'})
      }
    },
    mounted() {
      console.log(this.$route.params)
    }
  };
</script>

<style scoped lang="scss">
  .el-form{
    height: auto;
    border-bottom: 1px dashed #999999;
    margin-top: 20px;
    position: relative;
    .addInterface{
      position: absolute;
      top:50%;
      left: 105%;
      transform: translateY(-50%);
      font-size: 2rem;
      border: none;

      &:hover{
        background: transparent;
      }
      &:focus{
        background: transparent;
      }
    }
  }
  .input-selec{
    width: 100%;

  }
</style>
