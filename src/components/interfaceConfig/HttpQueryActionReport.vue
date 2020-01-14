<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(HttpQueryActionReport,HttpQueryActionReportIndex) in getHttpQueryActionReportInterfaceConfig" :key="HttpQueryActionReportIndex">
      <div slot="title" class="title-desc">
        <i class="header-icon el-icon-info"> HttpQueryActionReport -- {{HttpQueryActionReport.itemKey}}</i>
      </div>
      <el-form :model="HttpQueryActionReport">
        <el-form-item label="AppId" :label-width="formLabelWidth">
          <el-input v-model="HttpQueryActionReport.appId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="HttpQueryActionReport.actionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口ID" :label-width="formLabelWidth">
          <el-input v-model="HttpQueryActionReport.actionId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sqlSelect" :label-width="formLabelWidth">
          <el-input v-model="HttpQueryActionReport.sqlSelect" autocomplete="off"></el-input>
        </el-form-item>
        <!--sqlColumns object array-->
        <fieldset>
          <legend>sqlColumns[ ]</legend>
          <i class="el-icon-circle-plus" @click.stop="addSqlColumns(HttpQueryActionReportIndex)"> 添加</i>
          <el-collapse accordion>
            <el-collapse-item v-for="(sqlColumns,sqlColumnsIndex) in HttpQueryActionReport.sqlColumns" :key="sqlColumnsIndex">

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
        <!--conditions object array-->
        <fieldset>
          <i class="el-icon-circle-plus" @click.stop="addConditions(HttpQueryActionReportIndex)"> 添加</i>
          <legend>conditions[ ]</legend>
          <el-collapse accordion>
            <el-collapse-item v-for="(conditions,indexof) in HttpQueryActionReport.conditions" :key="indexof">
              <div slot="title" class="title-desc">
                conditions -- {{indexof}}
              </div>
              <el-form-item label="appId" :label-width="formLabelWidth">
                <el-input v-model="conditions.appId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="condictionId" :label-width="formLabelWidth">
                <el-input v-model="conditions.condictionId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="conditionType" :label-width="formLabelWidth">
                <el-select v-model="conditions.conditionType" placeholder="请选择可用类型"  popper-class="input-selec">
                  <el-option class="select-option" label="CompareToValue" value="CompareToValue"></el-option>
                  <el-option class="select-option" label="CompareToColumn" value="CompareToColumn"></el-option>
                  <el-option class="select-option" label="Custom" value="Custom"></el-option>
                  <el-option class="select-option" label="Group" value="Group"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="groupOperator" :label-width="formLabelWidth">
                <el-select v-model="conditions.groupOperator" placeholder="请选择可用类型"  popper-class="input-selec">
                  <el-option class="select-option" label="And" value="And"></el-option>
                  <el-option class="select-option" label="Or" value="Or"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="insertUserId" :label-width="formLabelWidth">
                <el-input v-model="conditions.insertUserId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="isGroup" :label-width="formLabelWidth">
                <el-input v-model="conditions.isGroup" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="release" :label-width="formLabelWidth">
                <el-input v-model="conditions.release" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="inserTime" :label-width="formLabelWidth">
                <el-input v-model="conditions.inserTime" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="updateTime" :label-width="formLabelWidth">
                <el-input v-model="conditions.updateTime" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="updateUserId" :label-width="formLabelWidth">
                <el-input v-model="conditions.updateUserId" autocomplete="off"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>

        </fieldset>
        <fieldset>
          <i class="el-icon-circle-plus" @click.stop="addSorts(HttpQueryActionReportIndex)"> 添加</i>
          <legend>sorts[ ]</legend>
          <el-collapse accordion>
            <el-collapse-item v-for="(sorts,indexof) in HttpQueryActionReport.sorts" :key="indexof">
              <div slot="title" class="title-desc">
                sorts -- {{indexof}}
              </div>
              <el-form-item label="coumnName" :label-width="formLabelWidth">
                <el-input v-model="sorts.coumnName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="isAscending" :label-width="formLabelWidth">
                <el-radio-group v-model="sorts.isAscending">
                  <el-radio label="true"></el-radio>
                  <el-radio label="false"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="sortId" :label-width="formLabelWidth">
                <el-input v-model="sorts.sortId" autocomplete="off"></el-input>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </fieldset>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    name: 'HttpQueryActionReport',
    data(){
      return{

        formLabelWidth: '120px',
        index: this.$route.params.index
      }
    },
    computed:{
      ...mapState(['moduleConfig']),
      getHttpQueryActionReportInterfaceConfig(){
        return this.$store.state.moduleConfig[this.index].interfaceConfig.HttpQueryActionReport
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
        this.moduleConfig[this.index].interfaceConfig.HttpQueryActionReport[indexOf].sqlColumns.push(item)
      },
      addConditions(indexOf){
        let item = {
          appId:'',
          condictionId:'',
          conditionType:'',
          groupOperator:'',
          isGroup:'',
          release:'',
          inserTime:"",
          insertUserId:'',
          updateTime:"",
          updateUserId:''
        }

        this.moduleConfig[this.index].interfaceConfig.HttpQueryActionReport[indexOf].conditions.push(item)
      },
      addSorts(indexOf){
        let item = {
          sortId:'',
          coumnName:'',
          isAscending:Boolean
        }
        this.moduleConfig[this.index].interfaceConfig.HttpQueryActionReport[indexOf].sorts.push(item)
      }
    }
  };
</script>

<style scoped>

</style>
