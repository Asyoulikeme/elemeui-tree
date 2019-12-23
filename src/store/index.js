import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogFormVisible:false,
    dialogFormTitle:"",
    moduleConfig:[
    /* {
        name: '模块1',
        dbtype: 'MySql',
        dataSourceType:'C3P0',
        dbUrl:'',
        dbUser:'',
        dbPassword:'',
        interfaceConfig:[
          {
            actionId:"",
            actionName:'HttpAction',
            actionType:"",
            appId:'',
            insertTime:'',
            insertUserId:'',
            itemKey:'',
            method:'',
            module:'',
            release:'',
            returnType: "",
            sql:'',
            sqlColumns:'',
            sqlParams:'',
            updateTime:'',
            updateUserID:''
          }
        ],
      }*/
    ],

    interfaceNode:{}
  },
  getters:{
    getDialogFormVisible(state){
      return state.dialogFormVisible;
    },
    getDialogFormTitle(state){
      return state.dialogFormTitle
    },
    getModuleConfig(state){
      return state.moduleConfig
    },
    getCurrentInterfaceNode(state){
      return state.interfaceNode
    }
  },
  mutations: {
    setDialogFormVisible(state){
      state.dialogFormVisible = !(state.dialogFormVisible)
    },
    setDialogFormTitle(state,title){
      state.dialogFormTitle = title
    },
    pushEmptyModuleConfig(state){
      state.moduleConfig.push({
        itemKey:"",
        name: '新模块',
        dbtype: 'MySql',
        dataSourceType:'C3P0',
        dbUrl:'',
        dbUser:'',
        dbPassword:'',
        useCustomDialect:false,
        batchSeperator:"",
        openQuote:"",
        identitySql:"",
        closeQuote:"",
        pagingSqlTemplate:"",
        parameterPrefix:"",
        supportsMultipleStatements:false,
        interfaceConfig:[]
      })
    },
    pushEmptyInterfaceConfig(state,index){
      console.log(index)
      state.moduleConfig[index].interfaceConfig.push({
        actionId:"",
        actionName:'HttpAction',
        actionType:"",
        appId:'',
        insertTime:'',
        insertUserId:'',
        itemKey:'',
        method:'',
        module:'',
        release:'',
        returnType: '',
        sql:'',
        sqlColumns:'',
        sqlParams:'',
        updateTime:'',
        updateUserID:''
      })

    },
    setInterfaceNode(state,currNode){
      state.interfaceNode = currNode
    },
    deleteModuleConfigItem(state,index){
      state.moduleConfig[index] = {}
    }
  },
  actions: {
    dialogSwitch({commit}){
      commit('setDialogFormVisible')
    },
    settitle({commit},title){
      commit('setDialogFormTitle',title)
    },
    addModuleConfig({commit}){
      commit('pushEmptyModuleConfig')
    },
    addInterfaceConfig({commit},index){
      console.log(index)
      commit('pushEmptyInterfaceConfig',index)
    },
    saveCurrentInterfaceNode({commit},currNode){
      commit('setInterfaceNode',currNode)
    },
    deleteModuleConfig({commit},index){
      commit('deleteModuleConfigItem',index)
    }
  },
  modules: {
  },
});
