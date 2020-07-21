import request from '../utils/request';
import baseURL from './app';



// 应用案列
export function getApplication() {
  return request({
    url: baseURL.DATAURL+'/applications',
    method: 'get'
  });
}

//案例详情页
export function getApplicationInfo(params) {
  return request({
    url: baseURL.DATAURL+`/applications/${params}`,
    method: 'get',
  });
}
