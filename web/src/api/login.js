import request from "../utils/request";

export function loginApi(username, password) {
  return request({
    url: '/api/cloud/iams/login',
    method: 'post',
    data: {
      password,
      username
    }
  });
}
export function refresh(data) {
  return request({
    url: '/api/cloud/iams/refresh',
    method: 'post',
    data
  });
}

/**
 * 对接 cas server
 */
// export function loginApi(username) {
//   return request({
//     url: `/acs/loginSso?username=${username}`,
//     method: "get"
//   });
// }

// export function refresh(data) {
//   return request({
//     url: "/acs/logoutSso",
//     method: "post",
//     data
//   });
// }
