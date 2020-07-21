import request from '../utils/request';

//获取列表
export function getCarts(params) {
  return request({
    url: '/api/cloud/osms/v1/carts',
    method: 'get',
    params
  });
}
//获取单个商品信息
export function getCart(params) {
  return request({
    url: `/api/cloud/osms/v1/carts/${params}`,
    method: 'get',
  });
}
//删除单条数据
export function deleteCarts(params) {
  return request({
    url: `/api/cloud/osms/v1/carts/${params}`,
    method: 'delete'
  });
}
//批量删除
export function batchDeleteCarts(data) {
  return request({
    url: '/api/cloud/osms/v1/carts',
    method: 'batchDelete',
    data
  });
}
//获取资源sku信息

export function getResourcesSkuInfo(params) {
  return request({
    url: `/api/cloud/osms/v1/skus/${params}`,
    method: 'get'
  });
}

//创建订单
export function postOrders(data) {
  return request({
    url: '/api/cloud/osms/v1/orders',
    method: 'post',
    data,
  });
}

//更新订单
export function updateOrders(id, data) {
  return request({
    url: `/api/cloud/osms/v1/orders/${id}`,
    method: 'put',
    data
  });
}
// 获取订单详细信息
export function getOrdersInfo(params) {
  return request({ url: `/api/cloud/osms/v1/orders/${params}`, method: 'get' });
}
