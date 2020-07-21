import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import Cookies from "js-cookie";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getExpiresIn,
  setExpiresIn,
  removeExpiresIn,
  getRefreshExpiresIn,
  setRefreshExpiresIn,
  removeRefreshExpiresIn,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getLoginDate,
  setLoginDate,
  removeLoginDate,
  getLoadAccessTokenDate,
  setLoadAccessTokenDate,
  removeLoadAccessTokenDate,
  removeLocation,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getUserName,
  setUserName,
  removeUserName,
  getLastUserName,
  setLastUserName,
  removeLastUserName
} from "./auth";
const baseURL = require("../api/app");
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 100000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (
      (config.url.search(baseURL.DATAURL) != -1) == false &&
      (config.url.search("/acs/loginSso") != -1) == false &&
      (config.url.search("/api/cloud/iams/refresh") != -1) == false &&
      (config.url.search("/api/cloud/osms/v1/catalogs") != -1) == false
    ) {
      console.log(location.pathname);
      if (store.getters.token !== undefined) {
        const nowDate = new Date().getTime() / 1000;
        if (nowDate - getLoginDate() < getRefreshExpiresIn() - 100) {
          if (nowDate - getLoadAccessTokenDate() < getExpiresIn() - 100) {
            config.headers["Authorization"] = "Bearer " + getAccessToken();

            // 让每个请求携带自定义token 请根据实际情况自行修改
          } else {
            store
              .dispatch("refreshToken")
              .then(
                (config.headers["Authorization"] = "Bearer " + getAccessToken())
              );

            // 让每个请求携带自定义token 请根据实际情况自行修改
          }
        } else {
          Cookies.remove("pinpoint_id");
          Cookies.remove("newBuyDetail_id");
          Cookies.remove("dataPVBuy_id");
          removeAccessToken();
          removeExpiresIn();
          removeRefreshExpiresIn();
          removeRefreshToken();
          removeLoginDate();
          removeLoadAccessTokenDate();
          removeLocation();
          removeUserInfo();
        }

        // config.headers['X-Token'] = getAccessToken();
        // 让每个请求携带自定义token 请根据实际情况自行修改
      } else if (location.pathname != baseURL.LoginHref) {
        console.log(location.pathname)
        // location.href = baseURL.LoginHref;
      }
    }

    if (
      config.method.toLocaleLowerCase() === "get" ||
      config.method.toLocaleLowerCase() === "delete"
    ) {
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (
      config.method.toLocaleLowerCase() === "post" ||
      config.method.toLocaleLowerCase() === "put"
    ) {
      config.headers["Content-Type"] = "application/json";
    } else if (config.method.toLocaleLowerCase() === "batchdelete") {
      config.method = "delete";
    }
    console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    console.log(res);
    if (res.code == null) {
      return res;
    }
    if (!/^20\d{1}$/.test(res.code)) {
      Message({
        message: res.message,
        type: "error",
        duration: 5 * 1000
      });

      return Promise.reject("error");
    } else {
      // if (typeof (response.data.content) !== 'object') {
      return response.data || response.data.content;
      // } else {
      //   return ;
      // }
    }
  },
  error => {
    const code = error.message.replace(/[^0-9]/gi, "");
    switch (code) {
      case "400":
        error.message = "错误请求";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      case "401":
        // error.message = '未授权，请重新登录';
        // Message({ center: true,
        //   message: error.message,
        //   type: 'error',
        //   duration: 5 * 1000
        // });
        // removeAccessToken();
        // removeExpiresIn();
        // removeRefreshExpiresIn();
        // removeRefreshToken();
        // removeLoginDate();
        // removeLoadAccessTokenDate();
        // removeLocation();
        // removeUserInfo();
        // location.href = baseURL.LoginHref;
        window.location.reload();
        break;

      case "403":
        error.message = "拒绝访问";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      case "404":
        error.message = "请求错误,未找到该资源";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      case "405":
        error.message = "请求方法未允许";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      case "408":
        error.message = "请求超时";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 10 * 1000
        });

        break;

      case "500":
        if (/login/.test(location.href)) {
          error.message = "账号或密码错误，请重新输入";
          Message({
            center: true,
            message: error.message,
            type: "error",
            duration: 5 * 1000
          });
        } else {
          error.message = "服务器端出错";
          Message({
            center: true,
            message: error.message,
            type: "error",
            duration: 5 * 1000
          });
        }
        break;

      case "501":
        error.message = "网络未实现";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });
        break;

      case "502":
        error.message = "网络错误";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      case "503":
        error.message = "服务不可用";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });
        break;

      case "504":
        error.message = "网络超时";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 10 * 1000
        });

        break;

      case "505":
        error.message = "http版本不支持该请求";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });

        break;

      default:
        error.message = "请求超时";
        Message({
          center: true,
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });
        return Promise.reject(error);
    }
    // if (/401/.test(error)) {
    //   removeAccessToken();
    //   removeExpiresIn();
    //   removeRefreshExpiresIn();
    //   removeRefreshToken();
    //   removeLoginDate();
    //   removeLoadAccessTokenDate();
    //   removeLocation();
    //   removeUserInfo();
    //   location.href = baseURL.LoginHref;
    // } else {
    //   console.log('err' + error); // for debug
    //   Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   });
    //   return Promise.reject(error);
    // }
  }
);

export default service;
