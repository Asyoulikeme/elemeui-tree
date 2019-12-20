<template>
  <el-dialog :title="getDialogFormTitle" :visible.sync="getDialogFormVisible" :before-close="btnclose">
    <el-form :model="form">
      <el-form-item label="模块名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据库产品" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择您将要使用的数据库" class="input-selec">
          <el-option label="Mysql" value="Mysql"></el-option>
          <el-option label="Oracle" value="Oracle"></el-option>
          <el-option label="Sqlite" value="Sqlite"></el-option>
          <el-option label="SqlServer" value="SqlServer"></el-option>
          <el-option label="PostgreSql" value="PostgreSql"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接池类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择数据库连接池的类型" class="input-selec">
          <el-option label="C3P0" value="Mysql"></el-option>
          <el-option label="DBCP" value="Oracle"></el-option>
          <el-option label="Druid" value="SQLite"></el-option>

        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogSwitch">取 消</el-button>
      <el-button type="primary" @click="dialogSwitch">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: 'MoudelForm',
    data(){
      return{
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      ...mapGetters(['getDialogFormTitle','getDialogFormVisible'])
    },
    methods: {
        ...mapActions(['dialogSwitch']),
      btnclose(done){
        console.log(done)
        this.$store.dispatch('dialogSwitch')

      }
    }
  };
</script>

<style scoped>
.input-selec{
  width: 280px;

}
</style>
