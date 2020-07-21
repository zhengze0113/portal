import { login, logout, getInfo, loginApi, refresh } from "../../api/login";
import { Message, MessageBox } from "element-ui";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  setExpiresIn,
  removeExpiresIn,
  setRefreshExpiresIn,
  removeRefreshExpiresIn,
  setRefreshToken,
  removeRefreshToken,
  setLoginDate,
  removeLoginDate,
  setLoadAccessTokenDate,
  removeLoadAccessTokenDate,
  removeLocation,
  setUserInfo,
  removeUserInfo,
  getRefreshToken,
  getUserName,
  setUserName,
  removeUserName
} from "../../utils/auth";
import Cookies from "js-cookie";
const user = {
  state: {
    token: getAccessToken(),
    name: getUserName(),
    avatar: "",
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginApi(username, userInfo.password)
          .then(response => {
            if (response.content.tokenInfo.access_token != null) {
              const data = response.content;
              const loginData = new Date().getTime() / 1000;
              setAccessToken(data.tokenInfo.access_token);
              setExpiresIn(data.tokenInfo.expires_in);
              setRefreshToken(data.tokenInfo.refresh_token);
              setRefreshExpiresIn(data.tokenInfo.refresh_expires_in);
              setLoginDate(loginData);
              setLoadAccessTokenDate(loginData);
              setUserInfo(data.userTokenInfo);
              setUserName(data.userTokenInfo.preferred_username);
              Cookies.set("pinpoint_id", 220);
              Cookies.set("newBuyDetail_id", 16);
              Cookies.set("dataPVBuy_id", 17);
              commit("SET_TOKEN", data.tokenInfo.access_token);
              resolve();
            } else {
              Message({
                center: true,
                message: "账号或密码错误",
                type: "error",
                duration: 5 * 1000
              });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // cas登录
    // Login({ commit }, userInfo) {
    //   console.log(userInfo);
    //   // const username = userInfo.username.trim();
    //   let username = Cookies.get("username");
    //   console.log(username);
    //   return new Promise((resolve, reject) => {
    //     loginApi(username)
    //       .then(response => {
    //         console.log(response)
    //         if (response.tokenInfo.access_token != null) {
    //           console.log(response);
    //           const data = response;
    //           const loginData = new Date().getTime() / 1000;
    //           console.log(loginData)
    //           setAccessToken(data.tokenInfo.access_token);
    //           setExpiresIn(data.tokenInfo.expires_in);
    //           setRefreshToken(data.tokenInfo.refresh_token);
    //           setRefreshExpiresIn(data.tokenInfo.refresh_expires_in);
    //           setLoginDate(loginData);
    //           setLoadAccessTokenDate(loginData);
    //           setUserInfo(data.userTokenInfo);
    //           setUserName(data.userTokenInfo.preferred_username);
    //           Cookies.set("pinpoint_id", 220);
    //           Cookies.set("newBuyDetail_id", 16);
    //           Cookies.set("dataPVBuy_id", 17);
    //           commit("SET_TOKEN", data.tokenInfo.access_token);
    //           resolve();
    //         } else {
    //           Message({
    //             center: true,
    //             message: "账号或密码错误",
    //             type: "error",
    //             duration: 5 * 1000
    //           });
    //         }
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    // 刷新token
    refreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        refresh(getRefreshToken())
          .then(response => {
            const data = response.content;

            console.log(response);
            const loginData = new Date().getTime() / 1000;
            setAccessToken(data.tokenInfo.access_token);
            setExpiresIn(data.tokenInfo.expires_in);
            setRefreshToken(data.tokenInfo.refresh_token);
            setRefreshExpiresIn(data.tokenInfo.refresh_expires_in);
            setLoadAccessTokenDate(loginData);
            setUserInfo(data.userTokenInfo);
            setUserName(data.preferred_username);
            commit("SET_TOKEN", data.tokenInfo.access_token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            // const data = response.data;
            console.log(response);
            // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            //   commit('SET_ROLES', data.roles);
            // } else {
            //   reject('getInfo: roles must be a non-null array !');
            // }
            // commit('SET_NAME', data.name);
            // commit('SET_AVATAR', data.avatar);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
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
        removeUserName();
        resolve();
        // }).catch(error => {
        //   reject(error);
        // });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        Cookies.remove("pinpoint_id");
        Cookies.remove("newBuyDetail_id");
        Cookies.remove("dataPVBuy_id");
        removeAccessToken();
        removeExpiresIn();
        removeRefreshExpiresIn();
        removeRefreshToken();
        removeLoginDate();
        removeLoadAccessTokenDate();
        removeUserInfo();
        resolve();
        removeLocation();
        removeUserName();
      });
    }
  }
};

export default user;
