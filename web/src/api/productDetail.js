import request from '../utils/request';
import baseURL from './app';


// 存储平台中活动列表
export function getProductDetail(params) {

  return request({
    url: baseURL.DATAURL+'/productdetails',
    method: 'get',
    params
  });
}

//获取产品详情
export function getProducts(params) {
  return request({
    url: baseURL.DATAURL+'/productdocs',
    method: 'get',
    params
  });
}


