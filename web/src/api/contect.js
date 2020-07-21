import request from '../utils/request';

export function getContacts(params) {
  return request({
    url: '/api/cloud/iams/v1/contacts',
    method: 'get',
    params
  });
}


export function getActivity(params) {
  return request({
    url: '/api/cloud/osms/v1/activities',
    method: 'get',
    params
  });
}

// 获取详细信息
export function getActivityInfo(params) {
  return request({
    url: '/api/cloud/osms/v1/activities/'+params+'',
    method: 'get',
  });
}

//增加活动
export function createdActivityInfo(data) {
  return request({
    url: '/api/cloud/osms/v1/activities/',
    method: 'post',
    data
  });
}

export function credentials(data) {
  return request({
    url: '/api/cloud/iams/v1/credentials',
    method: 'post',
    data
  });
}
