<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(item,indexof) in getInterfaceConfig" :key="indexof">
      <template slot="title">
        {{item.actionName}}<i class="header-icon el-icon-info"></i>
      </template>
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
       /* interfaceArr:[
          {
            title:'一致性 Consistency',
            content1:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            content2:'在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }
        ],*/
        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{
        /*
        * 下次来 把 interfaceArr 定义到 store state中去，
        * 然后把 interfaceArr 放在 computed中
        * 每一项都增加一个 删除按钮，
        * 初始化显示 interface 的title （名字）
        * 点击展开 编辑 interface 的表单
        *
        * watch 中监听路由的变化，按照对应的下标找到对应的 module 下面的 interface
        * 要能点击路由跳转的时候就能动态的获取到（watch）实时更新的对应的 module 的 interface
        * */
        //...mapGetters(['getInterfaceConfig'])
      getInterfaceConfig(){
        return this.$store.state.moduleConfig[this.index].interfaceConfig
      }
    },
    watch:{
      '$route'(to,from){
        console.log(to,from)
        this.index = to.params.index  //获取实时最新的 后缀 index，然后index 变化时，整个表单变化
      }
    },
  };
</script>

<style scoped lang="scss">

.el-collapse{
  width: 500px;
  margin-top: 20px;
}
.el-collapse-item__header{
  border: 10px solid red;
  text-indent: 3rem !important;

  i{
    margin-left: 1rem;
  }
}
</style>
