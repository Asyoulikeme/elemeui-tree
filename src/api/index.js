import ajax from './ajax';
const BASE_URL = 'http://192.168.15.16:8482/educloud-report/report'


/*------初始化阶段--------*/
export const getHttpModuleList = () => ajax(BASE_URL + '/getHttpModuleList',"POST")

export const getHttpActionList = () => ajax(BASE_URL + '/getHttpActionList','POST')

/*------更新阶段--------*/
export const addHttpModule = (data) => ajax(BASE_URL + '/saveHttpModule','POST',data)

export const deleteHttpModule = (data) => ajax(BASE_URL + '/deleteHttpModule','POST',data)

export const addHttpAction = (data) => ajax(BASE_URL + '/saveHttpAction','POST',data)

export const deleteHttpAction = (data) => ajax(BASE_URL + '/deleteHttpAction','POST',data)
