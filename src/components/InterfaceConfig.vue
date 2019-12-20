<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(item,index) in interfaceArr" :key="index">
      <template slot="title">
        {{item.title}}<i class="header-icon el-icon-info"></i>
      </template>
      <div>{{item.content1}}</div>
      <div>{{item.content2}}</div>
    </el-collapse-item>

  </el-collapse>
</template>

<script>
  export default {
    name: 'InterfaceConfig',
    data(){
      return{
        interfaceArr:[
          {
            title:'一致性 Consistency',
            content1:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
            content2:'在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
          }
        ]
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
    }
  };
</script>

<style scoped>
div{
  transition: all .5s ease;
}
</style>
