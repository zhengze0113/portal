import request from '../utils/request';
import baseURL from './app';


// 帮助标题
export function getHelpTitle() {
  return request({
    url: baseURL.DATAURL + '/helptitles',
    method: 'get'
  });
}
// 帮助标题单条
export function getHelpTitleOne(params) {
  return request({
    url: baseURL.DATAURL + '/helptitles/'+params,
    method: 'get'
  });
}


// 帮助类型下的标题
export function getHelpArticle(params) {
  return request({
    url: baseURL.DATAURL + '/helparticles',
    method: 'get',
    params
  });
}
// 单条帮助类型下的标题
export function getHelpArticleOne(params) {
    return request({
      url: baseURL.DATAURL + `/helparticles/${params}`,
      method: 'get'
    });
  }
// 帮助类型
export function getHelpType(params) {
  return request({
    url: baseURL.DATAURL + '/helptypes',
    method: 'get',
    params
  });
}
// 帮助类型单条
export function getHelpTypeOne(params) {
  return request({
    url: baseURL.DATAURL + '/helptypes/'+params,
    method: 'get'
  });
}
