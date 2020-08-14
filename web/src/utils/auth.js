import Cookies from 'js-cookie';
import baseURL from '../api/app';
const accessToken = 'vue_admin_template_token';
const expiresIn = 'vue_admin_template_expires_in';
const refreshToken = 'vue_admin_template_refresh_token';
const refreshExpiresIn = 'vue_admin_template_refresh_expires_in';
const loginDate = 'vue_admin_template_login_date';
const loadAccessTokenDate = 'vue_admin_template_load_access_token_date';
const location = 'vue_admin_template_load_location';
const userLocation = 'vue_admin_template_load_user_location';
const userInfo = 'vue_admin_template_load_user_info';
const userName = 'vue_admin_template_load_user_name';
const lastUserName = 'vue_admin_template_load_last_user_name';

console.log(baseURL);
// accessToken
export function getAccessToken() {
    return Cookies.get(accessToken);
}

export function setAccessToken(token) {
    // return Cookies.set(accessToken, token); // 开发环境
    return Cookies.set(accessToken, token, { expires: 7, path: '/', domain: baseURL.DomainName }); //生产环境
}

export function removeAccessToken() {
    // return Cookie('accessToken'); //开发环境
    return Cookies.remove(accessToken, { domain: baseURL.DomainName, path: '/' }); //生产环境
}
// expiresIn
export function getExpiresIn() {
    return Cookies.get(expiresIn);
}

export function setExpiresIn(token) {
    // return Cookies.set(expiresIn, token);
    return Cookies.set(expiresIn, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeExpiresIn() {
    // return Cookies.remove(expiresIn);
    return Cookies.remove(expiresIn, { domain: baseURL.DomainName, path: '/' });
}

// refreshExpiresIn
export function getRefreshExpiresIn() {
    return Cookies.get(refreshExpiresIn);
}

export function setRefreshExpiresIn(token) {
    // return Cookies.set(refreshExpiresIn, token);
    return Cookies.set(refreshExpiresIn, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeRefreshExpiresIn() {
    // return Cookies.remove(refreshExpiresIn);
    return Cookies.remove(refreshExpiresIn, { domain: baseURL.DomainName, path: '/' });
}

// refreshToken
export function getRefreshToken() {
    return Cookies.get(refreshToken);
}

export function setRefreshToken(token) {
    // return Cookies.set(refreshToken, token);
    return Cookies.set(refreshToken, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeRefreshToken() {
    // return Cookies.remove(refreshToken);
    return Cookies.remove(refreshToken, { domain: baseURL.DomainName, path: '/' });
}

// loginDate
export function getLoginDate() {
    return Cookies.get(loginDate);
}

export function setLoginDate(token) {
    // return Cookies.set(loginDate, token);
    return Cookies.set(loginDate, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeLoginDate() {
    // return Cookies.remove(loginDate);
    return Cookies.remove(loginDate, { domain: baseURL.DomainName, path: '/' });
}

// loadAccessTokenDate
export function getLoadAccessTokenDate() {
    return Cookies.get(loadAccessTokenDate);
}

export function setLoadAccessTokenDate(token) {
    // return Cookies.set(loadAccessTokenDate, token);
    return Cookies.set(loadAccessTokenDate, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeLoadAccessTokenDate() {
    // return Cookies.remove(loadAccessTokenDate);
    return Cookies.remove(loadAccessTokenDate, { domain: baseURL.DomainName, path: '/' });
}

// location
export function getLocation() {
    return Cookies.get(location);
}

export function setLocation(token) {
    // return Cookies.set(location, token);
    return Cookies.set(location, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeLocation() {
    // return Cookies.remove(location);
    return Cookies.remove(location, { domain: baseURL.DomainName, path: '/' });
}

// userLocation
export function getUserLocation() {
    return Cookies.get(userLocation);
}

export function setUserLocation(token) {
    // return Cookies.set(userLocation, token);
    return Cookies.set(userLocation, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeUserLocation() {
    // return Cookies.remove(userLocation);
    return Cookies.remove(userLocation, { domain: baseURL.DomainName, path: '/' });
}

// userInfo
export function getUserInfo() {
    return Cookies.get(userInfo);
}

export function setUserInfo(token) {
    // return Cookies.set(userInfo, token)
    return Cookies.set(userInfo, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeUserInfo() {
    // return Cookies.remove(userInfo);
    return Cookies.remove(userInfo, { domain: baseURL.DomainName, path: '/' });
}

// userName
export function getUserName() {
    return Cookies.get(userName);
}

export function setUserName(token) {
    // return Cookies.set(userName, token);
    return Cookies.set(userName, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeUserName() {
    // return Cookies.remove(userName);
    return Cookies.remove(userName, { domain: baseURL.DomainName, path: '/' });
}


//lastUserName
export function getLastUserName() {
    return Cookies.get(lastUserName);
}

export function setLastUserName(token) {
    // return Cookies.set(lastUserName, token);
    return Cookies.set(lastUserName, token, { expires: 7, path: '/', domain: baseURL.DomainName });
}

export function removeLastUserName() {
    // return Cookies.remove(lastUserName);
    return Cookies.remove(lastUserName, { domain: baseURL.DomainName, path: '/' });
}