import request from '../utils/request';
import baseURL from './app';


// 存储平台中活动列表
export function getActivityList(params) {

  return request({
    url: baseURL.DATAURL+'/activitycenters',
    method: 'get',
    params
  });
}

