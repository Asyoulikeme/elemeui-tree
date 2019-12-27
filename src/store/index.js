import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import commons from '../assets/js/commons';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    createInterfaceConfirm:false,
    moduleConfig:[
    ]
  },
  getters:{

    getModuleConfig(state){
      return state.moduleConfig
    },
    getCreateInterfaceConfirmStatus(state){
      return state.createInterfaceConfirm
    }
  },
  mutations: {
    setCreateInterfaceConfirmStatus(state,status){
      state.createInterfaceConfirm = status
    },
    pushEmptyModuleConfig(state,index){
      state.moduleConfig.push({
        //itemKey:index,
        moduleKey:index,
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
        interfaceConfig:{
          HttpAction:[

          ],
          HttpQueryAction:[

          ],
          HttpActionReport:[

          ],
          HttpQueryActionReport:[

          ]
        }
      })
    },
    pushEmptyInterfaceConfig(state,{index,interfaceNodeKey}){
      // 这里要加确认新建，新建一个什么接口

      console.log(index)
      state.moduleConfig[index].interfaceConfig.push({
        interfaceNodeKey:interfaceNodeKey,
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
    deleteInterfaceConfigItem(state,{parent_index,self_index,interfaceType}){
      /*
      * parent_index 所处模块下标
      * self_index 第N 条
      * interfaceType 类型
      * */
      console.log(parent_index,self_index)
      /*
      * 找到当前 id 在数组的哪个位置
      * 为此需要在 addInterfaceConfig，fillInterfaceConfig 的时候，给interface多增加一个属性为 :interfaceNodeKey
      * */
      //let index = commons.objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig,"interfaceNodeKey",self_index)
      state.moduleConfig[parent_index].interfaceConfig[interfaceType].splice(self_index,1)
    },
    setModuleConfig(state,data){

      console.log("----------totalled Module length: " + data.length + "-----------")

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
        //console.log(data[i].customDialectObj.batchSeperator)
        newModuleConfigObj.batchSeperator = data[i].customDialectObj == null? "":data[i].customDialectObj.batchSeperator
        newModuleConfigObj.openQuote = data[i].customDialectObj == null? "":data[i].customDialectObj.openQuote
        newModuleConfigObj.identitySql = data[i].customDialectObj == null? "":data[i].customDialectObj.identitySql
        newModuleConfigObj.closeQuote = data[i].customDialectObj == null? "":data[i].customDialectObj.closeQuote
        newModuleConfigObj.pagingSqlTemplate = data[i].customDialectObj == null? "":data[i].customDialectObj.pagingSqlTemplate
        newModuleConfigObj.parameterPrefix = data[i].customDialectObj == null? "":data[i].customDialectObj.parameterPrefix
        newModuleConfigObj.supportsMultipleStatements = data[i].customDialectObj == null? "":data[i].customDialectObj.supportsMultipleStatements

        newModuleConfigObj.interfaceConfig = {
        HttpAction:[

        ],
          HttpQueryAction:[

        ],
          HttpActionReport:[

        ],
          HttpQueryActionReport:[

        ]
      }

        state.moduleConfig.push(newModuleConfigObj)
      }
    },
    setInterfaceConfig(state,data){
      /*
      * 如果需求描述中每一个 HttpAction 都属于某一个module，
      * 那么，现在要明确module 的唯一标识是什么，
      * 在 interface 里面找到对应标识 module 的 id
      * 通过 id 查找 module列表，
      * 将 interface 插入到对应的 module 下面
      * */
      console.log(data)
    },
    setHttpActionInterface(state,{index,name,interfaceNodeKey}){
      state.moduleConfig[index].interfaceConfig.HttpAction.push({
        interfaceNodeKey:interfaceNodeKey,
        actionId:"",
        actionName:name,
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
    }
  },
  actions: {

    addModuleConfig({commit},index){
      commit('pushEmptyModuleConfig',index)
      console.log("添加的itemKey为:" + index)
      axios({
        method:'post',
        url:'http://192.168.15.16:8482/educloud-report/report/saveHttpModule',
        data:{
         // itemKey:index,
          moduleKey:index,
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
        }
      }).then((data)=>{
        console.log(data)
        console.log("添加成功")
      }).catch((error)=>{
        console.log(error)
        console.log("添加失败")
      })
    },
    addInterfaceConfig({commit},{index,interfaceNodeKey}){

      commit('pushEmptyInterfaceConfig',{index,interfaceNodeKey})
    },
    saveCurrentInterfaceNode({commit},currNode){
      commit('setInterfaceNode',currNode)
    },
    deleteModuleConfig({commit},index){
      commit('deleteModuleConfigItem',index)
    },
    deleteInterfaceConfig({commit},{parent_index,self_index,interfaceType}){
      commit('deleteInterfaceConfigItem',{parent_index,self_index,interfaceType})
    },
    async fillModuleConfig({commit}){
      await axios({
        method:'post',
        url:'http://192.168.15.16:8482/educloud-report/report/getHttpModuleList',

      }).then(function (response) {
        //console.log(response.data.list)
        commit('setModuleConfig',response.data.list)

      })

    },
    async fillInterfaceConfig({commit}){
      await axios({
        method:'post',
        url:'http://192.168.15.16:8482/educloud-report/report/getHttpActionList'
      }).then((response)=>{
        commit('setInterfaceConfig',response.data.list)
      })
    },
    switchCreateInterfaceConfirm({commit},{status}){
      commit('setCreateInterfaceConfirmStatus',status)
      //this.addInterfaceConfig({})
    },
    addHttpActionInterface({commit},{index,name,interfaceNodeKey}){
      commit('setHttpActionInterface',{index,name,interfaceNodeKey})
    }
  },
  modules: {
  },
});
