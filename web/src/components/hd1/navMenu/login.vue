<template>
  <div class="m-toolbar-container">
    <div style="float:right;">
      <!-- <a class="link" @click="handleConsole1()">
        <img src="@/static/images/shop1.png" style="width:30px;margin-top: 12.2px;" alt />
      </a>-->
      <el-button v-if="isToken == false" type="primary" @click="handleConsole">
        登录
      </el-button>
      <!-- <el-button v-else-if="isToken == true" type="primary" @click="logout()">
        退出
      </el-button> -->
    </div>
  </div>
</template>
<script>
import {
  getAccessToken,
  removeAccessToken,
  removeExpiresIn,
  removeRefreshExpiresIn,
  removeRefreshToken,
  removeLoginDate,
  removeLoadAccessTokenDate,
  removeLocation,
  removeUserInfo,
  getLoginDate,
  getRefreshExpiresIn,
  getLoadAccessTokenDate,
  getExpiresIn
} from "../../../utils/auth";
import store from "../../../store";
import Cookies from "js-cookie";
import baseURL from './../../../api/app';
export default {
  data() {
    return {
      isToken: false
    };
  },
  created() {
    if (store.getters.token !== undefined) {
      const nowDate = new Date().getTime() / 1000;
      if (nowDate - getLoginDate() < getRefreshExpiresIn() - 30) {
        if (nowDate - getLoadAccessTokenDate() < getExpiresIn() - 100) {
          this.isToken = true;
        } else {
          store.dispatch("refreshToken").then((this.isToken = true));
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
    }
  },
  methods: {
    handleConsole() {
      location.href = baseURL.LoginHref;
    },
    handleConsole1() {
      location.href = "/html/shopList.html";
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      if (store.getters.token !== undefined) {
        this.isToken = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  margin-right: 10px;
}
/deep/ .el-button {
  width: 116px;
  height: 50px;
  background: #0261a7;
  border-radius: 0;
  position: relative;
  top: 0px;
  border: none;
}
</style>
