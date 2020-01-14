import ajax from './ajax';
const BASE_URL = 'http://192.168.15.16:8482/educloud-report/report'

const api = {
  /*------初始化阶段--------*/
  getHttpModuleList:() =>ajax(BASE_URL + '/getHttpModuleList',"POST"),

  getHttpActionList:() =>ajax(BASE_URL + '/getHttpActionList','POST'),

  getHttpQueryActionList:() =>ajax(BASE_URL + '/getHttpQueryActionList','POST'),

  getHttpActionReportList:() =>ajax(BASE_URL + '/getHttpActionReportList','POST'),

  getHttpQueryActionReportList:() =>ajax(BASE_URL + '/getHttpQueryActionReportList','POST'),



  /*------更新阶段--------*/
  addHttpModule:(data) => ajax(BASE_URL + '/saveHttpModule','POST',data),

  deleteHttpModule:(data) => ajax(BASE_URL + '/deleteHttpModule','POST',data),

  updateHttpModule:(data) => ajax(BASE_URL + '/updateHttpModule','POST',data),

  addHttpAction:(data) => ajax(BASE_URL + '/saveHttpAction','POST',data),

  addHttpQueryAction:(data) => ajax(BASE_URL + '/saveHttpQueryAction','POST',data),

  addHttpActionReport:(data) => ajax(BASE_URL + '/saveHttpActionReport','POST',data),

  addHttpQueryActionReport:(data) => ajax(BASE_URL + '/saveHttpQueryActionReport','POST',data),



  deleteHttpAction:(data) => ajax(BASE_URL + '/deleteHttpAction','POST',data),

  deleteHttpActionReport:(data) => ajax(BASE_URL + '/deleteHttpActionReport','POST',data),

  deleteHttpQueryAction:(data) => ajax(BASE_URL + '/deleteHttpQueryAction','POST',data),

  deleteHttpQueryActionReport:(data) => ajax(BASE_URL + '/deleteHttpQueryActionReport','POST',data),

  updateHttpAction:(data) => ajax(BASE_URL + '/updateHttpAction','POST',data),

  updateHttpQueryAction:(data) => ajax(BASE_URL + '/updateHttpQueryAction','POST',data),

  updateHttpActionReport:(data) => ajax(BASE_URL + '/updateHttpActionReport','POST',data),

  updateHttpQueryActionReport:(data) => ajax(BASE_URL + '/updateHttpQueryActionReport','POST',data)

}

export default api
