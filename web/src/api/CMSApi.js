import request from '../utils/request';
import baseURL from './app';


// 服务目录
export function getServicecatalogs(params) {
    return request({
        url: baseURL.DATAURL + '/servicecatalogs',
        method: 'get',
        params
    });
}
// 获取云产品详情
export function getProductMessage(params) {
    return request({
        url: baseURL.DATAURL + `/cloudproducts/${params}`,
        method: "get",
    });
}
// 获取云产品文章内容
export function getDocuments(params) {
    return request({
        url: baseURL.DATAURL + `/documents/${params}`,
        method: "get",
    });
}
// 根据服务目录获取云产品列表
export function getcloudproductInfo(params) {
    return request({
        url: baseURL.DATAURL + `/content-manager/explorer/cloudproduct`,
        method: "get",
        params
    });
}
// 存储平台中产品的资料
export function getProductss() {
    return request({
        url: baseURL.DATAURL + '/products',
        method: 'get'
    });
}

//轮播图类型
export function getrRecommendationsType(params) {
    return request({
        url: baseURL.DATAURL + '/recommendations',
        method: 'get',
        params
    });
}

// 获取轮播图列表
export function getRecommendationarrays(params) {
    return request({
        url: baseURL.DATAURL + '/recommendationarrays',
        method: 'get',
        params
    });
}
//新闻资讯

export function getJournalism(params) {

    return request({
        url: baseURL.DATAURL + '/journalisms',
        method: 'get',
        params
    });
}
//获取单个新闻消息
export function getJournalismonly(params) {
    return request({
        url: `
        $ { baseURL.DATAURL }
        /journalisms/$ { params }
        `,
        method: 'get'

    });
}
//产品优势
export function getproductadvantages() {
    return request({
        url: baseURL.DATAURL + '/productadvantages',
        method: 'get'
    });
}
//联系我们
export function getcontacts(params) {
    return request({
        url: baseURL.DATAURL + '/contacts',
        method: 'get',
        params
    });
}
//关于我们-特色服务
export function getservices() {
    return request({
        url: baseURL.DATAURL + '/services',
        method: 'get'
    });
}
//关于我们-公司概览
export function getintros() {
    return request({
        url: baseURL.DATAURL + '/intros',
        method: 'get'
    });
}
//服务治理下分布式服务
export function fenbu(envId, data) {
    return request({
        url: `
        http: //10.64.39.58:8080//api/cloud/amcs/v1/clusters/${envId}/componentInstall/addComponentDtm`,
        method: 'post',
        data
    });
}