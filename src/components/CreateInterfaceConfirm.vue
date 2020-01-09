<template>
  <el-dialog title="新建接口" :visible="getCreateInterfaceConfirmStatus"
    @close="close"
    :destroy-on-close="true"
  >
    <el-form :model="form">
      <el-form-item label="接口名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="良好的接口名能帮助你使用"></el-input>
      </el-form-item>
      <el-form-item label="接口类型" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择接口类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveAndSwitch">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: 'CreateInterfaceConfirm',
    props:{
      parentNode:{
        type:Object,
      },
      parentData:{
        type:Object,
      },
      treeObj:{
        type:Object
      }
    },
    data(){
      return{
        form: {
          name: '',
          region: '',
        },
        formLabelWidth: '120px'
      }
    },
    computed:{
      ...mapGetters(['getCreateInterfaceConfirmStatus'])
    },
    methods:{
      ...mapActions(['switchCreateInterfaceConfirm']),
      close(done){
        console.log("close")
        let status = false
        this.switchCreateInterfaceConfirm({status})
      },
      saveAndSwitch(){
        // 向 store 中保存
        let status = false
        this.switchCreateInterfaceConfirm({status})

      },
      cancel(){
        let status = false
        this.switchCreateInterfaceConfirm({status})
      }

    }
  };
</script>

<style scoped>

</style>
