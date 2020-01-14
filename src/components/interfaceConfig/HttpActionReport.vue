<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(HttpActionReport,HttpActionReportIndex) in getHttpActionReportInterfaceConfig" :key="HttpActionReportIndex">
      <div slot="title" class="title-desc">
        <i class="header-icon el-icon-info"> HttpActionReport -- {{HttpActionReport.itemKey}}</i>
      </div>
      <el-form :model="HttpActionReport">
`
        <el-form-item label="AppId" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.appId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="actionName" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.actionName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="actionId" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.actionId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="actionType" :label-width="formLabelWidth">
          <el-select v-model="HttpActionReport.actionType" placeholder="请选择可用类型"  popper-class="input-selec">
            <el-option class="select-option" label="None" value="None" />
            <el-option class="select-option" label="One" value="One" />
            <el-option class="select-option" label="Row" value="Row" />
            <el-option class="select-option" label="RowList" value="RowList" />
          </el-select>
        </el-form-item>
        <el-form-item label="method">
          <el-radio-group v-model="HttpActionReport.method">
            <el-radio label="GET" />
            <el-radio label="POST" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属模块" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.module" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="release">
          <el-radio-group v-model="HttpActionReport.release">
            <el-radio label="true" />
            <el-radio label="false" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="插入时间" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.insertTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="插入用户ID" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.insertUserId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.updateTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="更新的用户ID" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.updateUserId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="sql" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.sql" autocomplete="off" />
        </el-form-item>
        <el-form-item label="returnType" :label-width="formLabelWidth">
          <el-select v-model="HttpActionReport.returnType" placeholder="请选择可用类型"  popper-class="input-selec">
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
        <!--sqlColumns object array-->
        <fieldset>
          <legend>sqlColumns[ ]</legend>
          <i class="el-icon-circle-plus" @click.stop="addSqlColumns(HttpActionReportIndex)"> 添加</i>
          <el-collapse accordion>
            <el-collapse-item v-for="(sqlColumns,sqlColumnsIndex) in HttpActionReport.sqlColumns" :key="sqlColumnsIndex">

              <div slot="title" class="title-desc">
                sqlColumns -- {{sqlColumnsIndex}}
              </div>
              <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="sqlColumns.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="type" :label-width="formLabelWidth">

                <el-select v-model="sqlColumns.type" placeholder="请选择可用类型"  popper-class="input-selec">
                  <el-option class="select-option" label="String" value="String"></el-option>
                  <el-option class="select-option" label="Int" value="Int"></el-option>
                  <el-option class="select-option" label="BigInt" value="BigInt"></el-option>
                  <el-option class="select-option" label="DateTime" value="DateTime"></el-option>
                  <el-option class="select-option" label="Boolean" value="Boolean"></el-option>
                  <el-option class="select-option" label="Double" value="Double"></el-option>
                  <el-option class="select-option" label="Money" value="Money"></el-option>
                  <el-option class="select-option" label="Text" value="Text"></el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </fieldset>
        <!--sqlParams object array-->
        <fieldset>
          <legend>sqlParams [ ]</legend>
          <i class="el-icon-circle-plus" @click.stop="addSqlParams(HttpActionReportIndex)"> 添加</i>
          <el-collapse accordion>
            <el-collapse-item v-for="(sqlParams,sqlParamsIndex) in HttpActionReport.sqlParams" :key="sqlParamsIndex">

              <div slot="title" class="title-desc">
                sqlParams -- {{sqlParamsIndex}}
              </div>
              <el-form-item label="name" :label-width="formLabelWidth">
                <el-input v-model="sqlParams.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="type" :label-width="formLabelWidth">

                <el-select v-model="sqlParams.type" placeholder="请选择可用类型"  popper-class="input-selec">
                  <el-option class="select-option" label="String" value="String" />
                  <el-option class="select-option" label="Int" value="Int" />
                  <el-option class="select-option" label="BigInt" value="BigInt" />
                  <el-option class="select-option" label="DateTime" value="DateTime" />
                  <el-option class="select-option" label="Boolean" value="Boolean" />
                  <el-option class="select-option" label="Double" value="Double" />
                </el-select>
              </el-form-item>
              <el-form-item label="value" :label-width="formLabelWidth">
                <el-input v-model="sqlParams.value" autocomplete="off" />
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </fieldset>
        <el-form-item label="viewName" :label-width="formLabelWidth">
          <el-input v-model="HttpActionReport.viewName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="viewType" :label-width="formLabelWidth">
          <el-select v-model="HttpActionReport.viewType" placeholder="请选择可用类型"  popper-class="input-selec">
            <el-option class="select-option" label="Custom" value="Custom" />
            <el-option class="select-option" label="FreeMaker" value="FreeMaker" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'HttpActionReport',
    data(){
      return{

        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{
      ...mapState(['moduleConfig']),
      getHttpActionReportInterfaceConfig(){
        return this.$store.state.moduleConfig[this.index].interfaceConfig.HttpActionReport
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
        this.moduleConfig[this.index].interfaceConfig.HttpActionReport[indexOf].sqlColumns.push(item)
      },
      addSqlParams(indexOf){
        let item = {
          name:"",
          type:"",
          value:""  // 这里原本要求是 一个对象，请在表单填写的时候使用 json 格式填写
        }
        this.moduleConfig[this.index].interfaceConfig.HttpActionReport[indexOf].sqlParams.push(item)
      }
    }
  };
</script>

<style scoped>

</style>
