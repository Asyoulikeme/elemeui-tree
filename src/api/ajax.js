import axios from 'axios'

export default function ajax(url,type="GET",data={}) {
  return new Promise((resolve, reject)=>{
    let promise
    let dataString = ""

    if (dataString !== "")
    {
      /*
      * www.baidu.com?name=nenglong&password=123456
      * */
      Object.keys(data).forEach((key)=>{
        dataString += key + "=" + data[key] + '&'
      })
      dataString = dataString.substring(0,dataString.lastIndexOf('&'))
      url = url + '?' + dataString
    }
    if(type === 'GET'){
      promise = axios.get(url)
    }
    else{
      promise = axios.post(url,data)
    }

    promise.then(response =>{
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
