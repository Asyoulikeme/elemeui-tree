<template>
  <el-collapse accordion>
    <div v-if="getInterfaceConfig.length == 0" class="empty-holder">暂无数据</div>
    <el-collapse-item v-for="(item,indexof) in getInterfaceConfig" :key="indexof">
      <div slot="title" class="title-desc">
        {{item.actionName}}<i class="header-icon el-icon-info"></i>
      </div>
      <el-form :model="item">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="item.actionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口ID" :label-width="formLabelWidth">
          <el-input v-model="item.actionId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="itemKey" :label-width="formLabelWidth">
          <el-input v-model="item.itemKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口类型" :label-width="formLabelWidth">
          <el-input v-model="item.actionType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="AppID" :label-width="formLabelWidth">
          <el-input v-model="item.appId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="插入时间" :label-width="formLabelWidth">
          <el-input v-model="item.insertTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="插入用户ID" :label-width="formLabelWidth">
          <el-input v-model="item.insertUserId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="method">
          <el-radio-group v-model="item.method">
            <el-radio label="GET"></el-radio>
            <el-radio label="POST"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属模块" :label-width="formLabelWidth">
          <el-input v-model="item.module" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="release" :label-width="formLabelWidth">
          <el-input v-model="item.release" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="returnType" :label-width="formLabelWidth">
          <el-input v-model="item.returnType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sql" :label-width="formLabelWidth">
          <el-input v-model="item.sql" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sqlColumns" :label-width="formLabelWidth">
          <el-input v-model="item.sqlColumns" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sqlParams" :label-width="formLabelWidth">
          <el-input v-model="item.sqlParams" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="updateTime" :label-width="formLabelWidth">
          <el-input v-model="item.updateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="updateTime" :label-width="formLabelWidth">
          <el-input v-model="item.updateUserId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-collapse-item>

  </el-collapse>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'InterfaceConfig',
    data(){
      return{

        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{

      getInterfaceConfig(){
        return this.$store.state.moduleConfig[this.index].interfaceConfig
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
