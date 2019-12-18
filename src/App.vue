<template>
  <div id="app">
    <header></header>
    <div id="main-body">
      <div id="left-box">
        <el-tree
          :props="defaultProps"
          :load="loadNode"
          :render-content="renderContent"
          lazy
          node-key="id"
          :expand-on-click-node="true"

        >

        </el-tree>
      </div>
      <div id="right-box">
      <router-view />
      </div>
    </div>

  </div>
</template>
<script>
  let id = 1000;
export default {
  data(){
    return{
      defaultProps: {
        label: 'labelName',
        children: 'children',
        isLeaf: 'leaf'

      }
    }
  },
  methods:{
    renderContent(h,{node,data}){  //每生成一个节点，就会触发渲染
      return (
        <span>
          {node.label}
          <i class="el-icon-circle-plus plus" title="新增模块" on-click={() =>this.editBizFolder(node,"add")}/>
        </span>
      )
    },
    editBizFolder(node,type){
      if (node.level === 3)
      {
        return ; //不允许再增加了
      }
      // 新增编辑目录
      console.log("增加了一层")
      event.stopPropagation();// 阻止冒泡给nodeClick
      const data = node.data //node 代表当前节点，不是这个加号

      const title = "新增目录"


      this.append(node,data) // node 传过去，方便点击添加按钮的时候 马上展开

    },
    loadNode(node, resolve) {
     // console.log(resolve)
      if (node.level === 0) {
        // 如果为根节点，就返回

        return resolve([{labelName:'root'}]); // 数组中有几条就会返回几个 1级节点
      }
      if (node.level > 1) return resolve([]);

      setTimeout(() => { //延时模拟懒加载
        const data = [{
          labelName: 'module', //指定这个
          leaf: false
        }];
        resolve(data);
      }, 500);
    },
    append(node,data){
      let labelname = ""
      if(node.level === 1){
        labelname = "module"
      }
      else if(node.level === 2)
      {
        labelname = "Interface"
      }
      const newChild = {
        id: id++,
        labelName: labelname,
        children: []
      };

      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      node.expanded = true  //展开父级
      console.log(node.level)

    }
  }
}
</script>
<style lang="scss">
 *{
  margin:0;
   padding: 0;
   box-sizing: border-box;
   *border: 1px solid red;
 }
 html,body{
   width: 100%;
   height: 100%;
 }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  header{
    width: 100%;
    height: 95px;
    background: #f4f4f4;
  }
}

#main-body{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: calc(100% - 105px);
  margin-top: 10px;
  #left-box{
    width: 200px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0 2px 15px -8px rgba(0,0,0,.5);
    overflow: auto;

    .root{
      margin:10px 0 0 10px;
    }
  }

  #right-box{
    width: calc(100% - 210px);
    height: 100%;
    background: #f4f4f4;
  }
}
.el-tree-node__content{
  height: 45px !important;

  border: 1px dashed #ccc;
  .plus{
    margin-left: 1rem;
  }
}

</style>
