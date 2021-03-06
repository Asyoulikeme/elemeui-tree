import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index'
import {objectArrayFoundKeyIndex} from '../assets/js/commons';

import {LOGSTYLE} from '../assets/js/commons';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    createInterfaceConfirm:false,
    eyeStatus:true,
    moduleConfig:[
      // 所有的关键数据都存储在这里
    ],
    interfaceCollection:[
      // 处理后的四大类接口信息存储在这里
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
    //对话框状态处理
    setCreateInterfaceConfirmStatus(state,status){
      state.createInterfaceConfirm = status
    },
    // 小眼睛的状态处理
    setEyeStatus(state,{val}){
      state.eyeStatus = val
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
    deleteInterfaceConfigItem(state,{parent_index,itemKey,interfaceType}){
      /*
      * parent_index 所处模块下标
      * self_index 第N 条
      * interfaceType 类型
      * itemKey  itemKey
      * */
      /*
      * 找到当前 id 在数组的哪个位置
      * 为此需要在 addInterfaceConfig，fillInterfaceConfig 的时候，给interface多增加一个属性为 :interfaceNodeKey
      * */
      //console.log(parent_index,interfaceType,self_id)
      try {
        let index = objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig[interfaceType],'itemKey',itemKey)

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
    initSetInterfaceConfig(state,{list,key}){
      let belongWithModule = 0;
      for (let item of list)
      {
        belongWithModule = item.module  //属于moduleKey 为几的模块？
        let index = objectArrayFoundKeyIndex(state.moduleConfig,"moduleKey",parseInt(belongWithModule))
        try{
          state.moduleConfig[index].interfaceConfig[key].push(item)
        }
        catch (e) {
          console.log(e)
          //为防止异常情况发生，请查看输出中的list，参照list 中的 module 值来确认该HttpAction属于哪一个模块
          console.warn("%c 有一个"+ key + "接口渲染失败,原因:" + "数据库中没有属于该接口的模块",LOGSTYLE.errorBackColor)
        }
      }
    },
    //添加HttpAction接口后时前端数据结构的变化
    setHttpActionInterface(state,{index,item}){

      state.moduleConfig[index].interfaceConfig.HttpAction.push(item)
    },
    //添加 HttpQueryAction 接口后时前端数据结构的变化
    setHttpQueryActionInterface(state,{index,item}){
      state.moduleConfig[index].interfaceConfig.HttpQueryAction.push(item)
    },
    //添加 HttpActionReport 接口后时前端数据结构的变化
    setHttpActionReportInterface(state,{index,item}){
      state.moduleConfig[index].interfaceConfig.HttpActionReport.push(item)
    },
    //添加 HttpQueryActionReport 接口后时前端数据结构的变化
    setHttpQueryActionReportInterface(state,{index,item}){
      state.moduleConfig[index].interfaceConfig.HttpQueryActionReport.push(item)
    }
  },
  actions: {
    /* 模块的 增删查改*/
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
        api.addHttpModule(item).then((response)=>{
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
    // 删除模块的异步
    deleteModuleConfig({state,commit},index){
      let key = state.moduleConfig[index].moduleKey
      console.log("要删除的是 moduleKey：" + key)
      return new Promise((resolve,reject)=>{
        commit('deleteModuleConfigItem',index)
        api.deleteHttpModule({
          itemKey:key
        }).then((response)=>{
          if (response.code === 1)
          {
            response.key = key
            resolve(response)
          }
          else
            reject(response.msg)

        }).catch((error)=>{
          console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
        })
      })

    },
    // 读取模块信息并初始化
    fillModuleConfig({commit}){
      return new Promise((resolve, reject)=>{

        let promise = api.getHttpModuleList()

        promise.then(res =>{
          commit('initSetModuleConfig',res.list)
          resolve()
        }).catch(error =>{
          alert("error 666")
          reject()
        })
      })


    },
    // 更新模块的异步
    updateModuleConfig({state,commit},{index}){
      let item = state.moduleConfig[index] // 此处的index 既是模块所处的下标，也是保存要用的itemKey
      return new Promise((resolve,reject)=>{
        api.updateHttpModule(item).then((response)=>{
          if (response.code === 1)
          {
            resolve()
          }
          else
          {
            reject(response.msg)
          }
        }).catch((e)=>{
          console.log("%c 执行过程中失败，原因: "+ e)
        })
      })
    },

    /* 接口的 增删查改*/
    // 更新接口的异步
    updateInterfaceConfig({state,commit},{index,interfaceType,itemKey}){
      /*
      * index 所处模块下标
      * interfaceType  接口类型，选择发送何种请求访问接口
      * itemKey 要保存的接口类型的 itemKey
      * hasInterface 在 state.moduleConfig[index].interfaceConfig[interfaceType] 数组中存在的位置
      * */
      let hasInterface = objectArrayFoundKeyIndex(state.moduleConfig[index].interfaceConfig[interfaceType],"itemKey",itemKey)
      console.log("%c 所处模块下标：" + "%c" +index +
        "%c 接口类型为：" + "%c" + interfaceType +
        "%c 主键为：" + "%c" + itemKey +
        "%c 在数组中的位置：" + "%c" + hasInterface,
        LOGSTYLE.vueBackColor,LOGSTYLE.lightRed,
        LOGSTYLE.vueBackColor,LOGSTYLE.lightRed,
        LOGSTYLE.vueBackColor,LOGSTYLE.lightRed,
        LOGSTYLE.vueBackColor,LOGSTYLE.lightRed
        )

      let item = state.moduleConfig[index].interfaceConfig[interfaceType][hasInterface]

      return new Promise((resolve,reject)=>{
        if (interfaceType === 'HttpAction')
        api.updateHttpAction(item).then((response)=>{
          if (response.code === 1)
          {
            resolve()
          }
          else
          {
            reject(response.msg)
          }
        }).catch((e)=>{
          console.log("%c 执行过程中失败，原因: "+ e)
        })
        if (interfaceType === 'HttpQueryAction')
          api.updateHttpQueryAction(item).then((response)=>{
            if (response.code === 1)
            {
              resolve()
            }
            else
            {
              reject(response.msg)
            }
          }).catch((e)=>{
            console.log("%c 执行过程中失败，原因: "+ e)
          })
        if (interfaceType === 'HttpActionReport')
          api.updateHttpActionReport(item).then((response)=>{
            if (response.code === 1)
            {
              resolve()
            }
            else
            {
              reject(response.msg)
            }
          }).catch((e)=>{
            console.log("%c 执行过程中失败，原因: "+ e)
          })
        if (interfaceType === 'HttpQueryActionReport')
          api.updateHttpQueryActionReport(item).then((response)=>{
            if (response.code === 1)
            {
              resolve()
            }
            else
            {
              reject(response.msg)
            }
          }).catch((e)=>{
            console.log("%c 执行过程中失败，原因: "+ e)
          })
      })
    },
    // 删除接口的异步
    deleteInterfaceConfig({state,commit},{parent_index,self_id,interfaceType,currentChildNodeindex}){
      //console.log(parent_index,self_id,interfaceType,currentChildNodeindex)
      /*
      * parent_index  当前接口位于哪个模块（moduleConfig 的下标）
      * self_id       当前节点的 node.data.id,也就是 itemKey
      * interfaceType 确保删除某个类型的节点
      * currentChildNodeindex   当前节点在模块的第 n 个下标位置
      * */
      /*
      * 当前函数仅仅是删除 HttpAction ,等后台做完了再在这个函数里面写其它的几个接口
      * */
      let index = objectArrayFoundKeyIndex(state.moduleConfig[parent_index].interfaceConfig[interfaceType],"itemKey",self_id)
      let itemKey = state.moduleConfig[parent_index].interfaceConfig[interfaceType][index].itemKey
      console.log("%c 即将删除的是当前下标为:" + "%c " + parent_index + "%c 的模块下面的接口，它在模块中的下标为:" + "%c " + currentChildNodeindex + "%c ,它的itemKey为:"+"%c " + itemKey ,
        LOGSTYLE.vueBackColor,LOGSTYLE.blackBackColor,LOGSTYLE.vueBackColor,LOGSTYLE.blackBackColor,LOGSTYLE.vueBackColor,LOGSTYLE.lightRed)
      console.log("%c 删除的接口类型是: " + interfaceType,LOGSTYLE.lightRed)

      return new Promise((resolve,reject)=>{
        api["delete" + interfaceType](
          {
            itemKey
          }
        ).then((response)=>{
          if (response.code === 1)
          {
            console.log("删除"+interfaceType +"成功")
            commit('deleteInterfaceConfigItem',{parent_index,itemKey,interfaceType})
            resolve()
          }
          else {
            console.log(response.msg)
          }
        }).catch((error)=>{
            reject(error)
        })

      })

    },
    // 读取接口信息并初始化
    async fillInterfaceConfig({commit}){
      await api.getHttpActionList().then((response)=>{
          if (response.code === 1)
          {
            let list = response.list
            let key = "HttpAction"
            console.log("HttpActionList:")
            console.log(response.list)
            commit('initSetInterfaceConfig',{list,key})
           // resolve();
          }
          else
          {
            console.log("读取HttpActionList失败")
           // reject(response)
          }

        }).catch((error)=>{
          console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
        })
      await api.getHttpQueryActionList().then((response)=>{
        if (response.code === 1)
        {
          let list = response.list
          let key = "HttpQueryAction"
          console.log("HttpQueryActionList:")
          console.log(response.list)
          commit('initSetInterfaceConfig',{list,key})
         // resolve();
        }
        else
        {
          console.log("读取HttpQueryActionList失败")
         // reject(response)
        }

      }).catch((error)=>{
        console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
      })
      await api.getHttpActionReportList().then((response)=>{
        if (response.code === 1)
        {
          let list = response.list
          let key = "HttpActionReport"
          console.log("HttpActionReportList:")
          console.log(response.list)
          commit('initSetInterfaceConfig',{list,key})
          // resolve();
        }
        else
        {
          console.log("读取HttpActionReportList失败")
          // reject(response)
        }

      }).catch((error)=>{
        console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
      })
      await api.getHttpQueryActionReportList().then((response)=>{
        if (response.code === 1)
        {
          let list = response.list
          let key = "HttpQueryActionReport"
          console.log("HttpQueryActionReportList:")
          console.log(response.list)
          commit('initSetInterfaceConfig',{list,key})
          // resolve();
        }
        else
        {
          console.log("读取HttpQueryActionReportList失败")
          // reject(response)
        }

      }).catch((error)=>{
        console.error("%c 执行过程中出错:" + error,LOGSTYLE.errorBackColor)
      })
    },
    // 添加HttpAction时的异步
    addHttpActionInterface({commit},{index,name,interfaceNodeKey}){
       /* console.log("添加的接口的 itemKey为:" + interfaceNodeKey)
        let currentDate = new Date()
        console.log(index,name,interfaceNodeKey)*/
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
          release:"false", //boolean
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
        //console.log(item)
      return new Promise((resolve, reject) => {
        api.addHttpAction(item).then((response)=>{
            if (response.code === 1){
              console.log("%c 添加 HttpAction 成功",LOGSTYLE.vueBackColor)
              commit('setHttpActionInterface',{index,item})
              resolve()
            }
            else {
              reject(response.msg)
            }
          }).catch((error)=>{
            reject("执行过程中出错" + error)
          })

      })

    },
    // 添加HttpQueryAction时的异步
    addHttpQueryActionInterface({commit},{index,name,interfaceNodeKey}){
      let item = {
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
            isGroup:'',   //Boolean
            release:'',   //Boolean
            inserTime:"",   //Date
            insertUserId:'',
            updateTime:"",  //Date
            updateUserId:''
          }
        ],
        sorts:[
          {
            sortId:'',
            coumnName:'',
            isAscending:"", //Boolean
          }
        ],
        itemKey:interfaceNodeKey + "",
        method:'',
        module:index

      }
      return new Promise((resolve, reject) => {
        api.addHttpQueryAction(item).then((response)=>{
          if (response.code === 1){
            console.log("%c 添加 HttpQueryAction 成功",LOGSTYLE.vueBackColor)
            commit('setHttpQueryActionInterface',{index,item})
            resolve()
          }
          else {
            reject(response.msg)
          }
        }).catch((error)=>{
          reject("执行过程中出错" + error)
        })

      })

    },
    // 添加HttpActionReport时的异步
    addHttpActionReportInterface({commit},{index,name,interfaceNodeKey}){
      let item =  {
        appId:'',
        actionId:'',
        actionName:name,
        actionType:"",
        insertTime:"",
        insertUserId: "",
        updateTime: "",
        updateUserId: "",
        sql:'',
        sqlColumns:[
          {
            name:'',
            type:''
          }
        ],
        sqlParams: [
          {
            name:"",
            type:"",
            value:""  //Object
          }
        ],
        itemKey:interfaceNodeKey + "",
        method:'get',
        module:index,
        release:"", //Boolean
        returnType:"",
        viewName:"",
        viewType:""
      }
      return new Promise((resolve, reject) => {
        api.addHttpActionReport(item).then((response)=>{
          if (response.code === 1){
            console.log("%c 添加 HttpActionReport 成功",LOGSTYLE.vueBackColor)
            commit('setHttpActionReportInterface',{index,item})
            resolve()
          }
          else {
            reject(response.msg)
          }
        }).catch((error)=>{
          reject("执行过程中出错" + error)
        })

      })

    },  // 接口有问题，明天查
    // 添加HttpQueryActionReport时的异步
    addHttpQueryActionReportInterface({commit},{index,name,interfaceNodeKey}){
      console.log(index,name,interfaceNodeKey)
      let item =  {
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
            isGroup:'',   //Boolean
            release:'',   //Boolean
            inserTime:"",   //Date
            insertUserId:'',
            updateTime:"",  //Date
            updateUserId:''
          }
        ],
        sorts:[
          {
            sortId:'',
            coumnName:'',
            isAscending:"" //Boolean
          }
        ],
        itemKey:interfaceNodeKey,
        method:'get',
        module:index,
        viewName:"",
        viewType:""
      }
      return new Promise((resolve, reject) => {
        api.addHttpQueryActionReport(item).then((response)=>{
          if (response.code === 1){
            console.log("%c 添加 HttpQueryActionReport 成功",LOGSTYLE.vueBackColor)
            commit('setHttpQueryActionReportInterface',{index,item})
            resolve()
          }
          else {
            reject(response.msg)
          }
        }).catch((error)=>{
          reject("执行过程中出错" + error)
        })

      })

    },// 接口有问题，明天查

    // 确认对话框的状态改变
    switchCreateInterfaceConfirm({commit},{status}){
      commit('setCreateInterfaceConfirmStatus',status)

    }
  }
});
