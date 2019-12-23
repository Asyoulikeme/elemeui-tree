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

  let nodeKeyId = 0; // 代表 module 节点的ID
  let childrenNodeKeyID = 0;
  export default {
    name: 'Tree',
    data(){
      return{
        nodeData: [{
          id:1,
          labelName:"root"
        }],
        defaultProps: {
          label: 'labelName',
          children: 'children',
          isLeaf: 'leaf'
        },

      }
    },
    computed:{
      ...mapGetters(['getModuleConfig'])
    },

    methods:{
      renderContent(h,{node,data,store}){  //每生成一个节点，就会触发渲染

        // console.log(store)
        if (node.level === 1)
        {
          return (
            <span>
            root
            <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>

        <i class="el-icon-success save-all" title="保存所有更改" on-click={() =>this.saveAll()}/>
        </span>
        )
        }
        //当是在root下建立 module，并且之前有在其它 module下建立过 interface
        // 这导致了 key id 的增长 所以要额外处理
        // 并且注重这几个 if 的排序
        if (node.level === 2 && node.childNodes.length === 0 && childrenNodeKeyID > 0)
        {
          console.log("进来了")
          let n = node.data.id - 1
          console.log("要去的下标是：" + n)
          return (
            <span>
            {this.getModuleConfig[n].name}
            <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
        <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.remove(node, data)} />
        </span>
        )
        }
        if (node.level === 2 && node.childNodes.length === 0 )
        {
          console.log("在渲染模块1")
          console.log(node.data.id)
          return (
            <span>
            {this.getModuleConfig[node.data.id - 1].name}
            <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
        <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.remove(node, data)} />
        </span>
        )
        }
        if (node.level === 2 && node.childNodes.length > 0)
        {
          return (
            <span>
            {this.getModuleConfig[node.data.id - 1].name}
            <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.beforeAdd(node)}/>
        <i class="el-icon-delete-solid delete" title="删除模块" on-click={() => this.remove(node, data)} />
        </span>
        )
        }
        if (node.level === 3)
        {
          console.log("在渲染接口")
          return (
            <span>
            接口
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
          this.addModuleConfig()

          newChild = {
            id: nodeKeyId += 1,
            labelName: "Module",
            children: []
          };
        }else if(node.level === 2) //在模块下新增 接口的时候
        {
          let n = node.data.id - 1;
          console.log("把生成的interface放到路由下标：" + n)
          this.addInterfaceConfig(n)
          labelname = "Interface"
          newChild = {
            id: childrenNodeKeyID += 1,
            labelName: labelname,
          };
          console.log("childrenNodeKeyID 改变了：childrenNodeKeyID = " + childrenNodeKeyID)
        }

        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild); //增加子节点
        node.expanded = true  //展开父级
        // 产生一个JSON数据


      },//执行添加节点时的动作
      remove(node, data) {
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
      showParameterEdit(obj,node,curr){
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
      },//展示编辑框
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
      },
      ...mapActions(['addModuleConfig','deleteModuleConfig','addInterfaceConfig'])
    }
  };
</script>

<style scoped>

</style>
