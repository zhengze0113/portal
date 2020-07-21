<template>
  <div id="app">
    <img
      style="width: 100%;margin-bottom: -4px;"
      src="@/static/images/loginImage2.jpg"
      :height="screenHeight + 'px'"
    />
    <div class="userPassword">
      <el-row>
        <el-col :span="21" :offset="3" style="margin-top:16%;">
          用户登录
        </el-col>
        <el-col :span="18" :offset="3" style="margin-top:6%;">
          <el-input
            v-model="loginForm.username"
            placeholder="手机号/邮箱/会员ID"
          />
        </el-col>
        <el-col :span="18" :offset="3" style="margin-top:6%;">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            show-password
          >
            >
          </el-input>
        </el-col>
        <el-col :span="18" :offset="3" style="margin-top:6%;">
          <el-button
            style="width:100%;"
            type="primary"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-col>
        <el-col
          :offset="9"
          :span="10"
          style="font-size:12px;margin-top:3%;color:#666666;"
        >
          <div style="margin-bottom:25%;" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBar";
import { loginApi } from "../../api/login";
import { isvalidUsername } from "../../utils/validate";
import {
  getLocation,
  removeLocation,
  getUserInfo,
  getUserName,
  getLastUserName,
  getUserLocation,
  removeUserLocation
} from "../../utils/auth";
import Cookies from "js-cookie";
export default {
  name: "App",
  components: {
    topBar
  },
  data: function() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      username: "",
      password: "",
      bannerHeight: "",
      screenWidth: "",
      screenHeight: "",
      pics: [
        "/web/static/images/banner.jpg",
        "/web/static/images/banner1.jpg",
        "/web/static/images/banner2.jpg"
      ],
      loginForm: {
        username: "liuxu",
        password: "P@as142716"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined,
      errorMsg: "用户名或密码错误",
      loginError: false
    };
  },
  mounted() {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
      })();
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.handleLogin(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    registerUser() {
      location.href = "/html/register.html";
    },
    updatePasswrod() {
      location.href = "/html/retrievePassword.html";
    },
    test() {
      location.href = "/html/workPlatform.html";
    },
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      // if (valid) {
      this.loading = true;
      this.$store
        .dispatch("Login", this.loginForm)
        .then(() => {
          this.loading = false;
          // this.$router.push({ path: this.redirect || "/" });
          // location.href="/html/index.html"
          // window.history.back()
          if (getUserLocation() !== undefined) {
            if (getLastUserName() != undefined) {
              if (getLastUserName() == getUserName()) {
                if (getLocation() != undefined) {
                  const href = getLocation();
                  location.href = href;
                } else {
                  const href = getUserLocation();
                  location.href = href;
                }
              } else {
                const href = getUserLocation();
                location.href = href;
              }
            } else {
              const href = getUserLocation();
              location.href = href;
            }
            removeUserLocation();
          } else {
            window.history.back();
            window.history.reload();
          }
        })
        .catch(() => {
          this.loading = false;
        });
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
body {
}

.el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
}
.el-carousel__container {
  position: relative;
  height: 420px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 420px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.userPassword {
  position: absolute;
  width: 26%;
  background: white;
  /*margin-top:11%;*/
  /*margin-left:-25%;*/
  border-top: 2px solid #0261a7;
  z-index: 999;
  top: 30%;
  right: 15%;
}
</style>
