<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(HttpAction,HttpActionIndex) in getHttpActionInterfaceConfig" :key="HttpActionIndex">

      <div slot="title" class="title-desc">
        <i class="header-icon el-icon-info"> HttpAction -- {{HttpAction.itemKey}}</i>
      </div>
      <el-form :model="HttpAction">
        <el-form-item label="actionName" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="actionId" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="actionType" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.actionType" autocomplete="off" />
        </el-form-item>
        <el-form-item label="AppID" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.appId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="插入时间" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.insertTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="插入用户ID" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.insertUserId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="method">
          <el-radio-group v-model="HttpAction.method">
            <el-radio label="GET" />
            <el-radio label="POST" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属模块" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.module" autocomplete="off" />
        </el-form-item>
        <el-form-item label="release">
          <el-radio-group v-model="HttpAction.release">
            <el-radio label="true" />
            <el-radio label="false" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="returnType" :label-width="formLabelWidth">
          <el-select v-model="HttpAction.returnType" placeholder="请选择可用类型"  popper-class="input-selec">
            <el-option class="select-option" label="String" value="String" />
            <el-option class="select-option" label="Int" value="Int" />
            <el-option class="select-option" label="BigInt" value="BigInt" />
            <el-option class="select-option" label="DateTime" value="DateTime" />
            <el-option class="select-option" label="Boolean" value="Boolean" />
            <el-option class="select-option" label="Double" value="Double" />
            <el-option class="select-option" label="Money" value="Money" />
            <el-option class="select-option" label="Text" value="Text" />
          </el-select>
        </el-form-item>
        <el-form-item label="sql" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.sql" autocomplete="off"></el-input>
        </el-form-item>
        <!--sqlColumns-->
        <fieldset>
          <legend>sqlColumns[ ]</legend>
          <i class="el-icon-circle-plus" @click.stop="addSqlColumns(HttpActionIndex)"> 添加</i>
          <el-collapse accordion>
            <el-collapse-item v-for="(sqlColumns,sqlColumnsIndex) in HttpAction.sqlColumns" :key="sqlColumnsIndex">

              <div slot="title" class="title-desc">
                sqlColumns -- {{sqlColumnsIndex}}
              </div>
              <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="sqlColumns.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="type" :label-width="formLabelWidth">
                <el-input v-model="sqlColumns.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </fieldset>
        <!--sqlParams-->
        <fieldset>
          <legend>sqlParams[ ]</legend>
          <i class="el-icon-circle-plus" @click.stop="addSqlParams(HttpActionIndex)"> 添加</i>
          <el-collapse accordion>
            <el-collapse-item v-for="(sqlParams,sqlParamsIndex) in HttpAction.sqlParams" :key="sqlParamsIndex">

              <div slot="title" class="title-desc">
                sqlParams -- {{sqlParamsIndex}}
              </div>
              <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="sqlParams.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="type" :label-width="formLabelWidth">
                <el-input v-model="sqlParams.type" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="value" :label-width="formLabelWidth">
                <el-input v-model="sqlParams.value" autocomplete="off" placeholder="请填写json格式字符串"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </fieldset>

        <el-form-item label="updateTime" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.updateTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="updateUserId" :label-width="formLabelWidth">
          <el-input v-model="HttpAction.updateUserId" autocomplete="off" />
        </el-form-item>
      </el-form>

    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'HttpAction',
    data(){
      return{
        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{
      ...mapState(['moduleConfig']),
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
    methods:{
      addSqlColumns(indexOf){
        let item = {
          name:"",
          type:""
        }
        //console.log(this.moduleConfig[this.index])
        this.moduleConfig[this.index].interfaceConfig.HttpAction[indexOf].sqlColumns.push(item)
      },
      addSqlParams(indexOf){
        let item = {
          name:"",
          type:"",
          value:""  // 这里原本要求是 一个对象，请在表单填写的时候使用 json 格式填写
        }
        this.moduleConfig[this.index].interfaceConfig.HttpAction[indexOf].sqlParams.push(item)
      }
    }
  };
</script>

<style scoped>

</style>
