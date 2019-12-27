<template>
  <el-collapse accordion>

    <el-collapse-item v-for="(HttpAction,indexof) in getHttpActionInterfaceConfig" :key="indexof">
      <div slot="title" class="title-desc">
        {{HttpAction.actionName}}<i class="header-icon el-icon-info"></i>
      </div>
      <el-form :model="item">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口ID" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="itemKey" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.itemKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口类型" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="AppID" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.appId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="插入时间" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.insertTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="插入用户ID" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.insertUserId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="method">
          <el-radio-group v-model="HttpAction.method">
            <el-radio label="GET"></el-radio>
            <el-radio label="POST"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属模块" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.module" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="release" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.release" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="returnType" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.returnType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sql" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.sql" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sqlColumns" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.sqlColumns" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sqlParams" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.sqlParams" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="updateTime" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.updateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="updateTime" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.updateUserId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>

  </el-collapse>
</template>

<script>
  import {mapGetters} from 'vuex'

  /*
  * 这个组件的显示有点复杂，
  * 首先要弄 四个 el-collapse-item
  * */
  export default {
    name: 'InterfaceConfig',
    data(){
      return{

        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{

      getHttpActionInterfaceConfig(){
        return this.$store.state.moduleConfig[this.index].interfaceConfig.HttpAction
      }
    },
    watch:{
      '$route'(to,from){
        //console.log(to,from)
        this.index = to.params.index  //获取实时最新的 后缀 index，然后index 变化时，整个表单变化
      }
    },
  };
</script>

<style scoped lang="scss">

.el-collapse{
  width: 500px;
  min-height: 80%;
  margin-top: 20px;

  border: 1px solid #EBEEF5;
  position: relative;
  .empty-holder{
    font-size:1rem;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.title-desc{
  text-indent: 1rem !important;
}

</style>
