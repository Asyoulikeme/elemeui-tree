import Vue from 'vue';
import Vuex from 'vuex';
import {getHttpModuleList,getHttpActionList,deleteHttpModule,deleteHttpAction,addHttpModule,addHttpAction} from '../api/index'
import {objectArrayFoundKeyIndex} from '../assets/js/commons';

import {LOGSTYLE} from '../assets/js/commons';

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
    //对话框状态处理
    setCreateInterfaceConfirmStatus(state,status){
      state.createInterfaceConfirm = status
    },
    //添加模块时前端数据结构的变化
    pushEmptyModuleConfig(state,item){
      state.moduleConfig.push(item)
    },
    //保存接口信息时前端数据结构的变化
    setInterfaceNode(state,currNode){
      state.interfaceNode = currNode
    },
    //删除模块信息时前端动作
    deleteModuleConfigItem(state,index){
      /*console.log("删除 moduleConfig的下标为：" + index)
      state.moduleConfig.splice(index,1)
      * 使用splice 会破坏数组，渲染会出问题，所以只能设置为空对象
      */
      state.moduleConfig[index] = {}
    },
    //删除接口时前端数据结构的变化
    deleteInterfaceConfigItem(state,{parent_index,self_id,interfaceType}){
      /*
      * parent_index 所处模块下标
      * self_index 第N 条
      * interfaceType 类型
      * */
      /*
      * 找到当前 id 在数组的哪个位置
      * 为此需要在 addInterfaceConfig，fillInterfaceConfig 的时候，给interface多增加一个属性为 :interfaceNodeKey
      * */
      console.log(parent_index,interfaceType,self_id)
      try {
        let index = objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig[interfaceType],'interfaceNodeKey',self_id)
        state.moduleConfig[parent_index].interfaceConfig[interfaceType].splice(index,1)
      }
      catch (e) {
        console.log("错误的迭代查询" + e)
      }


    },
    //首次渲染模块时前端数据结构的变化
    initSetModuleConfig(state,data){

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
    //首次渲染接口时前端数据结构的变化
    initSetHttpActionConfig(state,list){
      let belongWithModule = 0;
      for (let item of list)
      {
        // 要将对象处理一下再填充
        item.sqlParams[0].value =  JSON.stringify(item.sqlParams[0].value)
        belongWithModule = item.module  //属于moduleKey 为几的模块？
        let index = objectArrayFoundKeyIndex(state.moduleConfig,"moduleKey",parseInt(belongWithModule))
        try{
          state.moduleConfig[index].interfaceConfig.HttpAction.push(item)
        }
        catch (e) {
          console.log(e)
          console.warn("%c 有一个接口渲染失败,原因:" + "数据库中没有属于该接口的模块",LOGSTYLE.errorBackColor)
        }
      }
    },
    //
    setHttpActionInterface(state,{index,item}){
      console.log("视图层数据结构操作被调用")
      console.log("添加到下标为" + index + "的模块中去")
      state.moduleConfig[index].interfaceConfig.HttpAction.push(item)
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
    //添加模块的异步
    addModuleConfig({commit},index){
      console.log("添加的Module itemKey为:" + index)
      let item = {
        moduleKey:index + "",
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
      }
      return new Promise((resolve, reject)=>{
        addHttpModule(item).then((response)=>{
          if (response.code === 1){
            commit('pushEmptyModuleConfig',item)
            resolve()
          }
          else {
            reject(response.msg)
          }
        }).catch((error)=>{
          console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
        })
      })
    },
    // 保存接口的异步
    saveCurrentInterfaceNode({commit},currNode){
      commit('setInterfaceNode',currNode)
    },
    // 删除模块的异步
    deleteModuleConfig({state,commit},index){
      let key = state.moduleConfig[index].moduleKey
      console.log("要删除的是 moduleKey：" + key)
      return new Promise((resolve,reject)=>{
        commit('deleteModuleConfigItem',index)
        deleteHttpModule({
          itemKey:key
        }).then((response)=>{
          if (response.code === 1)
          resolve(response)
          else
          reject(response.msg)

        }).catch((error)=>{
          console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
        })
      })

    },
    deleteInterfaceConfig({state,commit},{parent_index,self_id,interfaceType,currentChildNodeindex}){
      console.log(parent_index,self_id,interfaceType,currentChildNodeindex)
      /*
      * parent_index  当前接口位于哪个模块（moduleConfig 的下标）
      * self_id       当前节点的 node.data.id
      * interfaceType 确保删除某个类型的节点
      * currentChildNodeindex   当前节点在模块的第 n 个下标位置，也就代表了要用itemKey 来删除
      * */

      let itemKey = state.moduleConfig[parent_index].interfaceConfig[interfaceType][currentChildNodeindex].itemKey
      console.log("%c 即将删除的是当前下标为:" + "%c " + parent_index + "%c 的模块下面的第:" + "%c " + currentChildNodeindex + "%c 个节点,它的itemKey为:"+"%c " + itemKey ,
        LOGSTYLE.vueBackColor,LOGSTYLE.blackBackColor,LOGSTYLE.vueBackColor,LOGSTYLE.blackBackColor,LOGSTYLE.vueBackColor,LOGSTYLE.lightRed)

      return new Promise((resolve,reject)=>{
        deleteHttpAction(
          {
            itemKey
          }
        ).then((response)=>{
          if (response.code === 1)
          {
            console.log("删除"+interfaceType +"成功")
            commit('deleteInterfaceConfigItem',{parent_index,self_id,interfaceType})
            resolve(response)
          }
          else {
            console.log(response.msg)
          }
        }).catch((error)=>{
            reject(error)
        })

      })

    },
     fillModuleConfig({commit}){
      return new Promise((resolve, reject)=>{

        let promise = getHttpModuleList()

        promise.then(res =>{
          commit('initSetModuleConfig',res.list)
          resolve()
        }).catch(error =>{
          alert("error 666")
          reject()
        })
      })


    },
    async fillInterfaceConfig({commit}){
      await getHttpActionList().then((response)=>{
        console.log(response.list)
        commit('initSetHttpActionConfig',response.list)
      }).catch((error)=>{
        console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
      })

    },
    switchCreateInterfaceConfirm({commit},{status}){
      commit('setCreateInterfaceConfirmStatus',status)

    },
    addHttpActionInterface({commit},{index,name,interfaceNodeKey}){
        console.log("添加的接口的 itemKey为:" + interfaceNodeKey)
        let currentDate = new Date()
        console.log(index,name,interfaceNodeKey)
        let item = {
          actionId:'',
          actionName:'New HttpAction',
          actionType:'None',
          appId:'',
          insertTime: "",
          insertUserId:'',
          itemKey:interfaceNodeKey + "",
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
        }
        console.log(item)
      return new Promise((resolve, reject) => {
        addHttpAction(item).then((response)=>{
            if (response.code === 1){
              console.log("%c 添加 HttpAction 成功",LOGSTYLE.vueBackColor)
              commit('setHttpActionInterface',{index,item})
              resolve(response)
            }
            else {
              console.log(response)
              reject(response.msg)
            }
          }).catch((error)=>{
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
