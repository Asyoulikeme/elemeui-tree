import Vue from 'vue';
import Vuex from 'vuex';
import {getHttpModuleList,getHttpActionList,deleteHttpModule,addHttpAction} from '../api/index'
import {objectArrayFoundKeyIndex} from '../assets/js/commons';

import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    createInterfaceConfirm:false,
    moduleConfig:[
    ],
    interfaceCollection:[]
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
        itemKey:index,
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

    setInterfaceNode(state,currNode){
      state.interfaceNode = currNode
    },
    deleteModuleConfigItem(state,index){
      state.moduleConfig[index] = {}
    },
    deleteInterfaceConfigItem(state,{parent_index,self_id,interfaceType}){
      /*
      * parent_index 所处模块下标
      * self_index 第N 条
      * interfaceType 类型
      * */
      console.log(parent_index,self_id)
      /*
      * 找到当前 id 在数组的哪个位置
      * 为此需要在 addInterfaceConfig，fillInterfaceConfig 的时候，给interface多增加一个属性为 :interfaceNodeKey
      * */
      //let index = commons.objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig,"interfaceNodeKey",self_index)
      let index = objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig[interfaceType],'interfaceNodeKey',self_id)

      state.moduleConfig[parent_index].interfaceConfig[interfaceType].splice(index,1)
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
    initSetHttpActionConfig(state,list){
      console.log(list)
      let belongWithModule = 0;
      for (let item of list)
      {
        // 要将对象处理一下再填充
        item.sqlParams[0].value =  JSON.stringify(item.sqlParams[0].value)
        belongWithModule = item.module
        state.moduleConfig[belongWithModule].interfaceConfig.HttpAction.push(item)

      }
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
    },
    setHttpQueryActionInterface(state,{index,name,interfaceNodeKey}){
      state.moduleConfig[index].interfaceConfig.HttpQueryAction.push({
        interfaceNodeKey:interfaceNodeKey,
        appId:'',
        actionId:'',
        actionName:name,
        sqlSelect:'',
        sqlColumns:[
          {
            name:'',
            type:''
          }
        ],
        conditions:[
          {
            appId:'',
            condictionId:'',
            conditionType:'',
            groupOperator:'',
            inserTime:Date,
            insertUserId:'',
            isGroup:'',
            release:'',
            updateTime:Date,
            updateUserId:''
          }
        ],
        sorts:[
          {
            coumnName:'',
            isAscending:Boolean,
            sortId:''
          }
        ],
        itemKey:'',
        method:'',
        module:''

      })
    }
  },
  actions: {

    addModuleConfig({commit},index){
      /*
      * 该函数作为 模块的创建，
      * step 1:在前端创建一个空的模块对象，方便前端显示
      * step 2:发送ajax请求给后端保存一个(add)模块，这里不能使用 state.moduleConfig，因为后端接收的数据结构有所不同
      * step 3: 请求成功 添加，请求失败 回滚
      * */
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

    saveCurrentInterfaceNode({commit},currNode){
      commit('setInterfaceNode',currNode)
    },
    deleteModuleConfig({state,commit},index){

      let key = state.moduleConfig[index].moduleKey
      console.log("要删除的是 moduleKey：" + key)
      return new Promise((resolve,reject)=>{
        commit('deleteModuleConfigItem',index)
        deleteHttpModule({
          itemKey:key
        }).then((response)=>{
          console.log(response)
          if (response.code !== 0)
          resolve(response)
          else
          reject("失败了")

        }).catch((error)=>{
          reject(error)
        })
      })

    },
    deleteInterfaceConfig({commit},{parent_index,self_id,interfaceType}){
      commit('deleteInterfaceConfigItem',{parent_index,self_id,interfaceType})
    },
     fillModuleConfig({commit}){
      return new Promise((resolve, reject)=>{

        let promise = getHttpModuleList()
        /*await axios({
          method:'post',
          url:'http://192.168.15.16:8482/educloud-report/report/getHttpModuleList',

        }).then(function (response) {
          //console.log(response.data.list)
          commit('setModuleConfig',response.data.list)

        })*/

        promise.then(res =>{
          commit('setModuleConfig',res.list)
          resolve()
        }).catch(error =>{
          alert("error 666")
          reject()
        })
      })


    },
    async fillInterfaceConfig({commit}){
      await getHttpActionList().then((response)=>{
        commit('initSetHttpActionConfig',response.list)
      })

    },
    switchCreateInterfaceConfirm({commit},{status}){
      commit('setCreateInterfaceConfirmStatus',status)
      //this.addInterfaceConfig({})
    },
    addHttpActionInterface({commit},{index,name,interfaceNodeKey}){
      return new Promise((resolve, reject) => {
        let currentDate = new Date()

        addHttpAction({
          actionId:'',
          actionName:'New HttpAction',
          actionType:'None',
          appId:'',
          insertTime: "",
          insertUserId:'',
          itemKey:interfaceNodeKey,
          method:'',
          module:index,
          release:"false",
          returnType:'',
          sql:'',
          sqlColumns:[
            {
              name:'',
              type:''
            }
          ],
          sqlParams:[
            {
              name:'',
              type:'',
              value:"" // 这里原本要求是 一个对象，请在表单填写的时候使用 json 格式填写
            }
          ],
          updateTime:"", // 此处如果传下列封装好的对象 后端会报 空指针异常，暂时不处理
          /*
          * {
            date: currentDate.getDate(),
            day: currentDate.getDay(),
            hours: currentDate.getHours(),
            minutes: currentDate.getMinutes(),
            month: currentDate.getMonth(),
            nanos: currentDate.getMilliseconds(),
            seconds: currentDate.getSeconds(),
            time: currentDate.getTime(),
            timezoneOffset: currentDate.getTimezoneOffset(),
            year: currentDate.getFullYear(),
          }
          * */
          updateUserId:''
        })
          .then((response)=>{
            if (response.code !== 0){
              console.log("添加 HttpAction 成功")
              commit('setHttpActionInterface',{index,name,interfaceNodeKey})
              resolve(response)
            }
            else {
              console.log(response)
              reject("未知错误添加失败")
            }
          })
          .catch((error)=>{
            console.log("错误")
            reject("执行出错")
          })

      })

    },
    addHttpQueryActionInterface({commit},{index,name,interfaceNodeKey}){
      commit('setHttpQueryActionInterface',{index,name,interfaceNodeKey})
    }
  },
  modules: {
  },
});
