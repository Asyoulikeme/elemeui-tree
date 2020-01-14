<template>
  <div id="app">
    <header>
    </header>
    <div id="main-body">
      <div id="left-box">
        <Tree />
      </div>
      <div id="right-box">
        <router-view />
      </div>

    </div>

  </div>
</template>
<script>


  import Tree from './components/Tree';

  export default {
  components: {
    Tree
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
    display: flex;
    justify-content: center;
    align-items: center;

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
    width: 290px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0 2px 15px -8px rgba(0,0,0,.5);
    overflow: auto;

    .outer-span{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      .inner-span{
        display: block;
        margin-right: 2rem;
      }
    }
    .root{
      margin:10px 0 0 10px;
    }

    .el-tree-node__content{
      position: relative;

      &::after{

        content: '';
        width: 3px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateY(-80%);
        background: red;
        opacity: 0;
        transition: all .4s cubic-bezier(.22,.5,.16,1.66);;

      }

      &:hover::after{
        opacity: 1;
        position: absolute;
        transform: translateY(0%);
      }
    }
  }

  #right-box{
    width: calc(100vw - 290px - 20px);
    height: 100%;
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 24px;

    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar{

      background: #ffffff;
      width: 10px;
      -webkit-border-radius:6px;

    }

    &::-webkit-scrollbar-thumb{
      background: transparent;

    }



  }
}

.el-tree-node__content{
  height: 45px !important;

  border-bottom: 1px solid #f4f4f4;

  .plus{
    opacity: .7;
    margin-left: 1rem;
    color: #409eff;
    transition: all .1s linear;
    &:hover{
      opacity: 1;
    }
  }
  .delete{
    opacity: .7;
    margin-left: 1rem;
    font-size: 1.05rem;
    color: red;
    font-weight: bold;
    &:hover{
      opacity: 1;
    }
  }
  .save-current-module{
    opacity: .7;
    margin-left: 1rem;
    color: #999999;
    &:hover{
      opacity: 1;
    }
  }
  .save-current-interface{
    display: inline-block;
    font-size: 1.25rem;
    margin-left: 1rem;
    *border:1px solid red;
    font-weight: bold;
    opacity: .8;
    transform: translateY(.079rem);
    color: #333333;
    &:hover{
      opacity: 1;
    }
  }
  .save-all{
    opacity: .7;
    margin-left: 1rem;
    color: #4fc08d;
    &:hover{
      opacity: 1;
    }
  }
}

  .input-selec{
    min-width: 270px !important;
  }

</style>
