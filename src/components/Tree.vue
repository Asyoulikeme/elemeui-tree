<template>
  <el-tree
    :data="nodeData"
    :props="defaultProps"
    :render-content="renderContent"
    :highlight-current="true"
    :accordion="true"
    node-key="id"
    @node-click="showParameterEdit"

    :expand-on-click-node="false"
  >

  </el-tree>
</template>

<script>

  import {mapState,mapGetters,mapActions} from 'vuex'
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
        thatNode:Object
      }
    },
    computed:{

      ...mapGetters(['getModuleConfig'])
    },
    mounted() {
      console.log("this is Tree Component")


      this.fillModuleConfig().then(()=>{

        for (let i = 0 ; i < this.getModuleConfig.length ; i++)
        {
          let newChild = {};
          newChild = {
            id: nodeKeyId += 1,
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
      }).then(()=>{
        console.log("Module 处理完毕，开始处理 interface")
        this.fillInterfaceConfig()
      })

        /*
        * 首先明白一点，数据已经在store中发ajax读过来了，也处理好了，我不需要塞数据到tree里面，我只需要正确的构建出 tree 就行
        * 只有 tree 的 key 对应上就行
        * */

    },
    methods:{

      renderContent(h,{node,data,store}){  //每生成一个节点，就会触发渲染
        console.log("this is a render function")
        // console.log(store)
        if (node.level === 1)
        {
          //在无法得到 node 的情况下，往vue实例中保存一个 node，便于进行首次渲染Module的时候使用
          this.thatNode = node;
          return (
            <span>
              root
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
              <i class="el-icon-success save-all" title="保存所有更改" on-click={() =>this.saveAll()}/>
            </span>
        )
        }
        //当在root下建立 module，并且之前有在其它 module下建立过 interface
        // 这导致了 key id 的增长 所以要额外处理
        // 并且注重这几个 if 的排序
        if (node.level === 2 && node.childNodes.length === 0 && childrenNodeKeyID > 0)
        {
          let n = node.data.id - 1
          console.log("要去的下标是：" + n)
          return (
            <span>
              {this.getModuleConfig[n].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>
            </span>
          )
        }
        if (node.level === 2 && node.childNodes.length === 0 )
        {
          //console.log("在渲染模块,此时还未有子节点")
          return (
            <span>
              {this.getModuleConfig[node.data.id - 1].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>
            </span>
          )
        }
        if (node.level === 2 && node.childNodes.length > 0)
        {
          //console.log("在渲染模块,此时模块下面有子节点了")
          console.log("node level ==" + node.level)
          return (
            <span>
              {this.getModuleConfig[node.data.id - 1].name}
              <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
              <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeModuleNode(node, data)} />
              <i class="el-icon-s-claim save-current-module" title="保存模块" on-click={()=>this.saveCurrentModule(node)}/>
            </span>
          )
        }
        if (node.level === 3)
        {
          //console.log("在渲染接口")
          return (
            <span>
            接口
            <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.removeInterfaceNode(node, data)} />
            </span>

        )
        }
      },//初始化渲染，并且在每次添加的时候也会被调用
      beforeAdd(node){
        if (node.level === 3)
        {
          return ; //不允许再增加了
        }

        event.stopPropagation();// 阻止冒泡给nodeClick
        const data = node.data //node 代表当前节点，不是这个加号
        this.append(node,data) // node 传过去，方便点击添加按钮的时候 马上展开

      },//点击增加按钮的事件处理,在增加节点之前处理一些事情
      append(node,data){
        //console.log("增加的ID为：" + node.id)
        let labelname = ""

        let newChild = {};

        if(node.level === 1){ //在根目录下新建的时候 添加一个模块
          let index = node.childNodes.length ; //作为 itemKey的值
          console.log("传过去的值:" + index)
          this.addModuleConfig(index)
          newChild = {
            id: nodeKeyId += 1,
            labelName: "Module",
            children: []
          };
        }else if(node.level === 2) //在模块下新增 接口的时候
        {
          let index = node.data.id - 1;
          let interfaceNodeKey = 0;
          /*
          * 此处的 index 代表要放入的 module node tree 的下标
          * interfaceNodeKey 为附加属性，该属性用于删除下标
          *
          * */

          labelname = "Interface"
          newChild = {
            id: childrenNodeLength += 1, //子节点个数增长
            labelName: labelname,
          };
          childrenNodeKeyID += 1 // 标识ID 增长
          interfaceNodeKey = childrenNodeKeyID
          this.addInterfaceConfig({index,interfaceNodeKey})
        }

        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild); //增加子节点
        node.expanded = true  //展开父级

      },//执行添加节点时的动作
      removeModuleNode(node, data) {
        event.stopPropagation();// 阻止冒泡给nodeClick
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        //console.log(node.childNodes.length)
        childrenNodeKeyID -= node.childNodes.length // 清除模块下的子节点
        console.log("index:" + (node.data.id - 1))
        this.deleteModuleConfig(node.data.id - 1)//并且删除 对应的ModuleConfig item
        //nodeKeyId -= 1; // 下标减一
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      removeInterfaceNode(node, data) {
        event.stopPropagation();// 阻止冒泡给nodeClick
        const parent = node.parent;
        const children = parent.data.children || parent.data;

        console.log(parent.data.id - 1,node.data.id - 1)
        let parent_index = parent.data.id - 1;
        let self_index = node.data.id - 1;
        this.deleteInterfaceConfig({parent_index,self_index})//并且删除 对应的InterfaceConfig item
        childrenNodeKeyID -= 1 // 下标减一

        // 删除对应的 tree node
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1)
      },
      showParameterEdit(obj,node){
        console.log("当前所点击的node id 是:" + node.id)
        console.log("当前节点ID 已经增长到了:" + (nodeKeyId + childrenNodeKeyID )+ "个")
        console.log(("当前interface 的数量:" + childrenNodeKeyID))
        console.log("先看一下node里的的id:")
        console.log(node.data.id)
        switch (node.level) {
          case 1:{
            return ;
          };break;
          case 2:{
            /*
            * node id是你点击的这个节点的ID
            * */

            let n = node.data.id -1
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
        console.log(node)

        // 保存信息
        axios({
          method:'post',
          url:'http://192.168.15.16:8482/educloud-report/report/updateHttpModule',
          data:{
            useCustomDialect:this.getModuleConfig[node.data.id -1].useCustomDialect,
            batchSeperator:this.getModuleConfig[node.data.id -1].batchSeperator,
            openQuote:this.getModuleConfig[node.data.id -1].openQuote,
            identitySql:this.getModuleConfig[node.data.id -1].identitySql,
            closeQuote:this.getModuleConfig[node.data.id -1].closeQuote,
            pagingSqlTemplate:this.getModuleConfig[node.data.id -1].pagingSqlTemplate,
            parameterPrefix:this.getModuleConfig[node.data.id -1].parameterPrefix,
            supportsMultipleStatements:this.getModuleConfig[node.data.id -1].supportsMultipleStatements,
            dbType:this.getModuleConfig[node.data.id -1].dbType,
            dataSourceType:this.getModuleConfig[node.data.id -1].dataSourceType,
            dbUser:this.getModuleConfig[node.data.id -1].dbUser,
            dbPassword:this.getModuleConfig[node.data.id -1].dbPassword,
            dbUrl:this.getModuleConfig[node.data.id -1].dbUrl,
           // itemKey:node.data.id -1,
            moduleKey:this.getModuleConfig[node.data.id -1].moduleKey,

          }
        }).then((data)=>{
          console.log("保存更新成功")
          console.log(data)
        }).catch((error)=>{
          console.log("保存更新失败")
          console.log(error)
        })
      },
      ...mapActions(['fillModuleConfig','fillInterfaceConfig','addModuleConfig','addInterfaceConfig','deleteModuleConfig','deleteInterfaceConfig'])
    }
  };
</script>

<style scoped>

</style>
