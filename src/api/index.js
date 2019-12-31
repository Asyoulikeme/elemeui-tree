import ajax from './ajax';
const BASE_URL = 'http://192.168.8.230:8482/educloud-report/report'


/*------初始化阶段--------*/
export const getHttpModuleList = () => ajax(BASE_URL + '/getHttpModuleList',"POST")

export const getHttpActionList = () => ajax(BASE_URL + '/getHttpActionList','POST')

/*------更新阶段--------*/
export const saveHttpModule = (data) => ajax(BASE_URL + '/saveHttpModule','POST',data)

export const deleteHttpModule = (data) => ajax(BASE_URL + '/deleteHttpModule','POST',data)

export const addHttpAction = (data) => ajax(BASE_URL + '/saveHttpAction','POST',data)


