import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
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

    getModuleConfig(state){
      return state.moduleConfig
    },
    getCurrentInterfaceNode(state){
      return state.interfaceNode
    }
  },
  mutations: {

    pushEmptyModuleConfig(state){
      state.moduleConfig.push({
        moduleKey:"",
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
    },
    setModuleConfig(state,data){
      ;

      console.log("----------" + data.length + "-----------")

      for (let i = 0 ; i < data.length ;i++)
      {
        let newModuleConfigObj = {
            // 必须放在这里，放在循环体外面就是浅拷贝，
        }
        newModuleConfigObj.name = "新模块"
        newModuleConfigObj.moduleKey = data[i].moduleKey
        newModuleConfigObj.dbtype = data[i].dbtype
        newModuleConfigObj.dataSourceType = data[i].dataSourceType
        newModuleConfigObj.dbUrl = data[i].dbUrl
        newModuleConfigObj.dbUser = data[i].dbUser
        newModuleConfigObj.dbPassword = data[i].dbPassword
        newModuleConfigObj.useCustomDialect = data[i].useCustomDialect
        /*
        newModuleConfigObj.batchSeperator = data[i].customDialectObj.batchSeperator
        newModuleConfigObj.openQuote = data[i].customDialectObj.openQuote
        newModuleConfigObj.identitySql = data[i].customDialectObj.identitySql
        newModuleConfigObj.closeQuote = data[i].customDialectObj.closeQuote
        newModuleConfigObj.pagingSqlTemplate = data[i].customDialectObj.pagingSqlTemplate
        newModuleConfigObj.parameterPrefix = data[i].customDialectObj.parameterPrefix
        newModuleConfigObj.supportsMultipleStatements = data[i].customDialectObj.supportsMultipleStatements*/

        newModuleConfigObj.interfaceConfig = []

        state.moduleConfig.push(newModuleConfigObj)
      }
    }
  },
  actions: {

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
    },
    async fillModuleConfig({commit}){
      await axios({
        method:'post',
        url:'http://192.168.15.16:8482/educloud-report/report/getHttpModuleList',

      }).then(function (response) {
        //console.log(response.data.list)
        commit('setModuleConfig',response.data.list)

      })

    }
  },
  modules: {
  },
});
