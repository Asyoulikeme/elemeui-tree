
/*
* @todo 该函数在对象数组中寻找 key为value 的下标，返回
* */
 export const objectArrayFoundKeyIndex = (objectArray,key,value) =>{
   console.log(objectArray)
    for (let item of objectArray){
      if (item[key] == value) {

        return objectArray.indexOf(item)
      }
    }
    return "not found"
  }

  /*Console.log 控制台个性化输出*/
  const BASE_STYLE = "border-radius:3px;padding:.05rem .2rem;margin:0;text-align:center"
  export const LOGSTYLE = {
    blackBackColor:"background:#333333;color:#ffffff;" + BASE_STYLE,
    vueBackColor:"background:#4fc08d;color:#ffffff;" + BASE_STYLE,
    errorBackColor:"background:red;color:#ffffff;" + BASE_STYLE,
    warnBackColor:'',
    lightRed:'background:#ec7259;color:#ffffff;' + BASE_STYLE
  }
