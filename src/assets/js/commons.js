
/*
* @todo 该函数在对象数组中寻找 key为value 的下标，返回
* */
 export const objectArrayFoundKeyIndex = (objectArray,key,value) =>{
    for (let item of objectArray){
      if (item.key == value) {
        return objectArray.indexOf(item)
      }
    }
    return "not found"
  }

