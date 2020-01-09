
/*
* @todo 该函数在对象数组中寻找 key为value 的下标，返回
* */
 export const objectArrayFoundKeyIndex = (objectArray,key,value) =>{
    for (let item of objectArray){
      if (item[key] == value) {

        return objectArray.indexOf(item)
      }
    }
    return "not found"
  }

  /*Console.log 控制台个性化输出*/
  const BASE_STYLE = "border-radius:3px;padding-top:1px;padding-bottom:1px;padding-left:1px;padding-right:6.5px;margin:2px 0;text-align:center;Font-family: consolas,Helvetica, Tahoma, Arial, STXihei, '华文细黑', 'Microsoft YaHei', '微软雅黑', SimSun, '宋体', Heiti, '黑体', sans-serif;-webkit-font-smoothing: subpixel-antialiased"
  export const LOGSTYLE = {
    blackBackColor:"background:#333333;color:#ffffff;" + BASE_STYLE,
    vueBackColor:"background:#4fc08d;color:#ffffff;" + BASE_STYLE,
    errorBackColor:"background:red;color:#ffffff;text-shadow:1px 1px 1px #000000;" + BASE_STYLE,
    warnBackColor:'',
    lightRed:'background:#ec7259;color:#ffffff;' + BASE_STYLE
  }
