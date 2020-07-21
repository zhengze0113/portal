<template>
  <div class="m-toolbar-container">
    <ul style="float:right;" class="head-icon">
      <li>
        <el-dropdown @command="handleCommand">
          <a class="link">
            <span>云工作台</span>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="baseURL.DataInterfaceConsole + '/#/workbench/main'"
            >
              容器控制台
            </el-dropdown-item>
            <el-dropdown-item
              :command="baseURL.DataInterfaceConsole + '/#/workbench/devops'"
            >
              DevOps
            </el-dropdown-item>
            <el-dropdown-item
              :command="
                baseURL.DataInterfaceConsole + '/#/workbench/microservice'
              "
            >
              微服务
            </el-dropdown-item>
            <el-dropdown-item
              :command="baseURL.DataInterfaceConsole + '/#/'"
            >
              中间件控制台
            </el-dropdown-item>
            <el-dropdown-item :command="baseURL.DataInterface3scale">
              3scale
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <li v-if="admin">
        <a class="link" @click="yunying()">
          运营中心
        </a>
      </li>
      <li v-if="tenant">
        <a class="link" @click="tenantJump()">
          <!-- <i class="el-icon-bell"></i> -->
          租户中心
        </a>
      </li>
      <li>
        <a class="link" @click="user()">
          <!-- <img src="@/static/images/caidan.png" alt=""> -->
          个人中心
        </a>
      </li>

      <!--<li>-->
      <!--<a class="link" @click="help()">-->
      <!--&lt;!&ndash; <el-button type="text">登录</el-button> &ndash;&gt;-->
      <!--帮助中心-->
      <!--</a>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
import "./index.scss";
import baseURL from "../../../api/app";
import { getAccessToken, setLocation, getUserInfo } from "../../../utils/auth";
import { getProject } from "../../../api/serviceOperating";
export default {
  data() {
    return {
      baseURL: baseURL,
      userInfo: {},
      tenant: null,
      admin: null
    };
  },
  created() {
    this.roles();
  },
  methods: {
    verification() {
      getProject().then(r => {});
    },
    roles() {
      this.tenant = false;
      this.admin = false;
      if (getUserInfo() != undefined) {
        this.userInfo = JSON.parse(getUserInfo());
        for (let i = 0; i < this.userInfo.role.length; i++) {
          if (this.userInfo.role[i].search("TENANT") != -1) {
            this.tenant = true;
          }
          if (this.userInfo.role[i].search("ADMIN") != -1) {
            this.admin = true;
          }
        }
      } else {
        this.tenant = true;
        this.admin = true;
      }
    },
   
    page() {
      location.href = "/html/shopList.html";
    },
    ErrorMessage() {
      location.href = "/html/500.html";
    },
    help() {
      location.href = "/html/help.html";
    },
    tenantJump() {
      if (getAccessToken() != undefined) {
        location.href = baseURL.DataInterfaceConsole+"/#/tenementCentre/organization";
      } else {
        location.href = baseURL.LoginHref;
      }
    },
    yunying() {
      if (getAccessToken() != undefined) {
        location.href = baseURL.DataInterfaceConsole+"/#/operatingCentre/operationOverview";
      } else {
        setLocation(location.href);
        location.href = baseURL.LoginHref;
      }
    },
    user() {
      if (getAccessToken() != undefined) {
        location.href = baseURL.DataInterfaceConsole+ "/#/userCentre/userShoppingCart";
      } else {
        location.href = baseURL.LoginHref;
      }
    },
    handleCommand(command) {
      if (getAccessToken() != undefined) {
        getProject().then(r => {
          if (r.content.content.length > 0) {
            if (command == this.baseURL.DataInterface3scale) {
              window.open(command);
            } else {
              location.href = command;
            }
          } else {
            this.$notify({
              type: "warning",
              message:
                "您目前没有所属项目，无权限查看。请联系相关项目经理，为您添加项目。"
            });
          }
        });
      } else {
        location.href = baseURL.LoginHref;
      }
      // this.$message('click on item ' + command);
    }
  }
};
</script>

<style scoped lang="scss">
.el-dropdown {
  color: #fff;
}
.el-dropdown-menu {
  background: #11151c;
  opacity: 0.7;
  border: none;
  margin: 5px -25px;
}
.el-dropdown-link {
  &:hover {
    color: #3a8ee6;
  }
}
.el-dropdown-menu__item {
  color: #fff;
}
.el-dropdown-menu__item:hover {
  background: #11151c;
}
/deep/ .popper__arrow {
  display: none;
}
.link {
  cursor: pointer;
}
.link:hover {
  color: #3a8ee6;
}
.head-icon {
  list-style: none;
  /*position: relative;*/
  left: -18rem;
}
.head-icon li {
  display: inline-block;
  margin: 0 10px;
  &:last-child {
    margin-right: 30px;
  }
}
.head-icon li img {
  width: 1rem;
  height: auto;
}
</style>
