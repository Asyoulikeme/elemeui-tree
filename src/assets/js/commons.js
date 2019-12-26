export default {
 objectArrayFoundKeyIndex(objectArray,key,value) {
    for (let item of objectArray){
      if (item.key == value) {
        return objectArray.indexOf(item)
      }
    }
    return "not found"
  },

}
