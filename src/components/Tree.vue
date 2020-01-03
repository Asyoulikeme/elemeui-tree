<template>
  <div id="tree-container">
    <el-tree
      :data="nodeData"
      :props="defaultProps"
      :render-content="renderContent"
      :highlight-current="true"
      :accordion="true"
      node-key="id"
      @node-click="showParameterEdit"
      :indent="12"
      :expand-on-click-node="false"
    >

    </el-tree>

    <el-dialog title="新建接口" :visible="getCreateInterfaceConfirmStatus"
               @close="closeDialog"
               :destroy-on-close="true"
    >
      <el-form :model="form">
        <el-form-item label="接口名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="良好的接口名能帮助你使用" />
        </el-form-item>
        <el-form-item label="接口类型" :label-width="formLabelWidth">
          <el-select v-model="form.interfaceType" placeholder="请选择接口类型">
            <el-option label="HttpAction" value="HttpAction"></el-option>
            <el-option label="HttpQueryAction" value="HttpQueryAction"></el-option>
            <el-option label="HttpActionReport" value="HttpActionReport"></el-option>
            <el-option label="HttpQueryActionReport" value="HttpQueryActionReport"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveAndSwitch">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {mapState,mapGetters,mapActions} from 'vuex'
  import {LOGSTYLE} from '../assets/js/commons';
  import axios from 'axios'
  let nodeKeyId = 0; // 代表 整棵树下面一共有多少个 module （level == 2） 也是其标识ID，随着add 增长
  let childrenNodeKeyID = 0; // 整颗树下面一共有多少个 interface（level == 3）
  let childrenNodeLength = 0; //是其标识ID，随着add 增长
  export default {
    name: 'Tree',
    data(){
      return{
        nodeData: [
          {
            id:999,
            labelName:"root",

            children:[]
          }
        ],
        defaultProps: {
          label: 'labelName',
          children: 'children',
          isLeaf: 'leaf'
        },
        thatNode:Object,
        treeObj:{},
        parentNode:{},
        dialogFormVisible: true,
        form: {
          name: '',
          interfaceType: '',
        },
        formLabelWidth: '120px'
      }
    },
    computed:{
      ...mapGetters(['getModuleConfig','getCreateInterfaceConfirmStatus'])
    },
    async mounted() {
      console.log("%c this is a Tree Component",LOGSTYLE.blackBackColor)
      await this.fillModuleConfig().then(()=>{

        for (let i = 0 ; i < this.getModuleConfig.length ; i++)
        {
          let newChild = {};
          newChild = {
            id: nodeKeyId ++,
            labelName: "Module",
            children: []
          };

          let data = this.thatNode.data
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild); //增加子节点
          this.thatNode.expanded = true  //展开父级
        }
      }).catch(()=>{
        alert("error")
      })
      console.log("ModuleConfig 处理完毕，开始处理 InterfaceConfig")
      await this.fillInterfaceConfig().then(()=>{
        // 先找到所在的 module，然后再往 module 里面渲染
       for(let i = 0 ; i < this.getModuleConfig.length ;i++)
        {
          console.log("out infinite")
          /*
          *  i 代表 Module tree node 的下标 （index）
          *  在 module[i].interfaceConfig.HttpAction下面找
          *  如果 module[i].interfaceConfig.HttpAction.length >0 则说明有接口节点 要渲染到当前的 模块节点下面
          *  module node（模块节点） 通过拿到 root 节点，然后 root.childNodes[i]
          *  实际为已经存储好的： this.thatNode.childNodes[i], （直接用）
          * */
          let interfaceNodeKey = 0; // 初始化,该属性用于标识node，用来删除
          // 一共四种接口，处理第一种：HttpAction
          for (let j = 0;j < this.getModuleConfig[i].interfaceConfig.HttpAction.length ; j++){
            console.log("in infinite")
            let interfaceType = "HttpAction"
            let labelName = "interface" + j
            interfaceNodeKey = (++childrenNodeKeyID) // 接口节点的 ID +1
            let newChild = {
              id:  interfaceNodeKey,
              labelName,
              interfaceType
            };
            childrenNodeLength += 1 //总共接口数 +1

            if (!this.thatNode.childNodes[i].data.children) {
              this.thatNode.childNodes[i].$set(this.thatNode.childNodes[i].data, 'children', []);
            }
            this.thatNode.childNodes[i].data.children.push(newChild); //增加子节点
            this.thatNode.childNodes[i].expanded = true  //展开父级
          }
          console.log("InterfaceConfig.HttpAction 处理完毕")
          // 处理第二种: HttpQueryAction

        }
      }).catch(()=>{
            console.log("最终失败")
      })
        /*
        * 首先明白一点，数据已经在store中发ajax读过来了，也处理好了，我不需要塞数据到tree里面，我只需要正确的构建出 tree 就行
        * 只有 tree 的 key 对应上就行
        * */
    },
    methods:{

      renderContent(h,{node,data}){  //每生成一个节点，就会触发渲染
        //console.log("%c render function be called in Tree Component",LOGSTYLE.lightRed)

        if (node.level === 1)
        {
          //在无法得到 node 的情况下，往vue实例中保存一个 node，便于进行首次渲染Module的时候使用
          this.thatNode = node;
          return (
            <span>
              root
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.append(node)}/>
              <i class="el-icon-success save-all" title="保存所有更改" on-click={() =>this.saveAll()}/>
            </span>
        )
        }
        //当在root下建立 module，并且之前有在其它 module下建立过 interface
        // 这导致了 key id 的增长 所以要额外处理
        // 并且注重这几个 if 的排序
        if (node.level === 2 && node.childNodes.length === 0 && childrenNodeKeyID > 0)
        {
          let n = node.data.id
          console.log("要去的下标是：" + n)
          return (
            <span>
              {this.getModuleConfig[n].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.append(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>

            </span>
          )
        }
        /*
        * 代表在当前的 module 下面还未有任何子节点
        * */
        if (node.level === 2 && node.childNodes.length === 0 )
        {
          return (
            <span>
              {this.getModuleConfig[node.data.id].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.append(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>

            </span>

          )
        }
        /*
        * 代表在当前的 module 下面有子节点一个或以上
        * */
        if (node.level === 2 && node.childNodes.length > 0)
        {

          return (
            <span>
              {this.getModuleConfig[node.data.id].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.append(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>
            </span>
          )
        }
        if (node.level === 3 )
        {
          //console.log("在渲染接口,此时改模块下有1个接口,渲染的id为:" + n)
          let val = "Interface"
          return (
            <span>
              {val}
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeInterfaceNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存接口" on-click={()=>this.saveCurrentInterface(node)}/>
            </span>

          )
        }

      },//初始化渲染，并且在每次添加的时候也会被调用
      beforeAdd(node){
      },//点击增加按钮的事件处理,在增加节点之前处理一些事情
      append(node){
        event.stopPropagation();// 阻止冒泡给nodeClick
        const data = node.data //node 代表当前节点，不是这个加号

        let newChild = {};

        if(node.level === 1){ //在根目录下新建的时候 添加一个模块

          this.addModuleConfig(nodeKeyId + childrenNodeKeyID).then(()=>{
            newChild = {
              id: nodeKeyId,
              labelName: "Module",
              children: []
            };

            if (!data.children) {
              this.$set(data, 'children', []);
            }
            data.children.push(newChild); //增加子节点
            node.expanded = true  //展开父级
            this.$router.push({name:'ModuleConfig',params:{index:(nodeKeyId)}}) // 添加成功后跳转路由
            nodeKeyId += 1 //
            console.log("%c 添加HttpModule成功",LOGSTYLE.vueBackColor)
          }).catch((error)=>{
            console.log("%c 添加HttpModule失败,原因:" + error,LOGSTYLE.errorBackColor)
          })

        }
        else if(node.level === 2) //在模块下新增 接口的时候
        {
          //进来先不执行其它操作，先展示
          // 开启确认对话框
          let status = true
          this.switchCreateInterfaceConfirm({status})
          //  存储当前的 node
          this.parentNode = node;
          this.treeObj = this
        }

      },//执行添加节点时的动作
      removeModuleNode(node, data) {
        event.stopPropagation();// 阻止冒泡给nodeClick
        const parent = node.parent;
        const children = parent.data.children || parent.data;

        childrenNodeKeyID -= node.childNodes.length // 清除模块下的子节点

        //删除 对应的ModuleConfig item
        this.deleteModuleConfig(node.data.id).then((response)=>{
          console.log("%c 删除HttpModule成功",LOGSTYLE.vueBackColor)
          //nodeKeyId --; // 下标不能减一，否则产生bug

          //删除tree node
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.$router.push('/') //关闭右侧路由页面
        }).catch((error)=>{
          console.log("%c 删除失败,原因:" + error,LOGSTYLE.errorBackColor)
        })



      },
      removeInterfaceNode(node, data) {
        event.stopPropagation();// 阻止冒泡给nodeClick
        const parent = node.parent;
        const children = parent.data.children || parent.data;

        let parent_index = parent.data.id;
        let self_id = node.data.id;

        let interfaceType = node.data.interfaceType
        /* 找到当前节点所在父节点的下标*/
        let currentChildNodeindex
        for (let i = 0 ; i < node.parent.childNodes.length ;i++)
        {
          if (node.parent.childNodes[i].data.id === node.data.id)
          {
            currentChildNodeindex = i
            break
          }
        }
        console.log("%c 当前点击的节点是父节点的第" + currentChildNodeindex +"个元素",LOGSTYLE.lightRed)
        this.deleteInterfaceConfig({parent_index,self_id,interfaceType,currentChildNodeindex})//并且删除 对应的InterfaceConfig item
        childrenNodeKeyID -= 1 // 下标减一

        // 删除对应的 tree node
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1)
      },
      showParameterEdit(obj,node){
        console.log("当前所点击节点的id 是:" + node.id)
        console.log("%c 当前所点击节点的data.id 是:" + node.data.id,LOGSTYLE.vueBackColor)

        console.log("Root下的节点数 已经增长到了:" + (nodeKeyId + childrenNodeKeyID )+ "个")
        console.log(("当前interface 的数量:" + childrenNodeKeyID))

        switch (node.level) {
          case 1:{
            this.$router.push('/')
            return ;
          };break;
          case 2:{
            /*
            * node id是你点击的这个节点的ID
            * */

            let n = node.data.id
            console.log("---------总共子节点数不为0--------------");
            this.$router.push({name:'ModuleConfig',params:{index:(n)}})
            console.log("传递的 index 为：----****:" + n)

          }break;
          case 3:{
            this.$store.dispatch("saveCurrentInterfaceNode",node)
          }break;
        }
      },//展示编辑框,改变路由
      saveAll(){
        //去除空对象
        let newModuleConfig = [];
        let obj ;
        for(let item of this.getModuleConfig)
        {
          obj = Object.getOwnPropertyNames(item)
          if (obj.length != 0)
          {
            newModuleConfig.push(item)
          }
        }
        console.log(newModuleConfig)
      },// 点击绿色的勾勾发起保存动作
      saveCurrentModule(node){
        event.stopPropagation();// 阻止冒泡给nodeClick

        // 保存信息
        axios({
          method:'post',
          url:'http://192.168.15.16:8482/educloud-report/report/updateHttpModule',
          data:{
            useCustomDialect:this.getModuleConfig[node.data.id].useCustomDialect,
            batchSeperator:this.getModuleConfig[node.data.id].batchSeperator,
            openQuote:this.getModuleConfig[node.data.id].openQuote,
            identitySql:this.getModuleConfig[node.data.id].identitySql,
            closeQuote:this.getModuleConfig[node.data.id].closeQuote,
            pagingSqlTemplate:this.getModuleConfig[node.data.id].pagingSqlTemplate,
            parameterPrefix:this.getModuleConfig[node.data.id].parameterPrefix,
            supportsMultipleStatements:this.getModuleConfig[node.data.id].supportsMultipleStatements,
            dbType:this.getModuleConfig[node.data.id].dbType,
            dataSourceType:this.getModuleConfig[node.data.id].dataSourceType,
            dbUser:this.getModuleConfig[node.data.id].dbUser,
            dbPassword:this.getModuleConfig[node.data.id].dbPassword,
            dbUrl:this.getModuleConfig[node.data.id].dbUrl,
           // itemKey:node.data.id -1,
            moduleKey:this.getModuleConfig[node.data.id].moduleKey,

          }
        }).then((data)=>{
          console.log("保存更新成功")
          console.log(data)
        }).catch((error)=>{
          console.log("保存更新失败")
          console.log(error)
        })
      },
      saveCurrentInterface(node){
        event.stopPropagation();// 阻止冒泡给nodeClick

      },
      closeDialog(){
        console.log("close")
        let status = false
        this.switchCreateInterfaceConfirm({status})
      },
    async saveAndSwitch(){

        let status = false
        this.switchCreateInterfaceConfirm({status})  //关闭对话框
        let index = this.parentNode.data.id //moduleConfig index

        let interfaceNodeKey = childrenNodeKeyID + nodeKeyId; // 初始化
        let interfaceType = this.form.interfaceType
        /*
        * 此处的 index 代表要放入的 module node tree 的下标
        * interfaceNodeKey 为附加属性，该属性用于删除下标
        *
        * */
        let newChild = {
          id:  interfaceNodeKey, //子节点个数增长
          labelName: this.form.name,
          interfaceType
        };
        childrenNodeLength += 1
        childrenNodeKeyID += 1

        let name = this.form.name   // interface name

        switch (interfaceType) {
          case "HttpAction":{
           // console.log(index,name,interfaceNodeKey)
            await this.addHttpActionInterface({index,name,interfaceNodeKey}).then((response)=>{
                console.log(response.msg)
              }).catch((error)=>{
                console.log(error)
                //console.log("执行return")

              })
          }break;
          case "HttpQueryAction":{
            this.addHttpQueryActionInterface({index,name,interfaceNodeKey})
          }break;
          case "HttpActionReport":{

          }break;
          case "HttpQueryActionReport":{

          }break;
          default:{
            alert("类型错误")
            return ;      // 最后一个return 有用，能阻止创建
          }
        }

      //console.log("执行添加节点")
        if (!this.parentNode.data.children) {
          this.treeObj.$set(this.parentNode.data, 'children', []);
        }
        this.parentNode.data.children.push(newChild); //增加子节点
        this.parentNode.expanded = true  //展开父级
      },
      cancel(){
        let status = false
        this.switchCreateInterfaceConfirm({status})
      },
      ...mapActions(['fillModuleConfig',
        'fillInterfaceConfig',
        'addModuleConfig',
        'deleteModuleConfig',
        'deleteInterfaceConfig',
        'switchCreateInterfaceConfirm',
        'addHttpActionInterface',
        'addHttpQueryActionInterface'
      ]),

    }
  };
</script>

<style lang="scss">

  #tree-container{
    .el-input{
      width: 220px;

    }
    .el-dialog{
      width: 500px;
      height: 300px;

    }
  }

</style>
