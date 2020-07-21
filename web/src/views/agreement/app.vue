<template>
  <div id="app">
    <el-row style="background-color: white">
      <el-col
        :offset="2"
        :span="20"
        style="border-bottom:1px solid rgba(224, 224, 224, 1);    margin-top: 8%;background-color: white；"
      >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">协议中心</el-breadcrumb-item>
          <el-breadcrumb-item>服务协议</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col
        style="margin-top: 20px;background-color: white"
        :offset="2"
        :span="20"
      >
        <el-col :span="4">
          <el-tabs :tab-position="tabPosition" style="height: 80px;">
            <el-tab-pane style="font-size:14px" label="服务协议"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="1" style="height:100%;">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :offset="1" :span="18">
          <span class="title">服务协议</span>
          <br />
          <br />
          <span class="title1">一、服务可用性</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;容器服务目前将尽力并持续为用户提供安全、稳定、可靠的容器平台。</span
          >
          <br />
          <br />
          <span>&emsp;&emsp;1. 在单可用区的区域。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的容器服务可用性为99.5%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的应用中间件服务可用性为99.5%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的数据库服务可用性为99.5%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的软件开发管理服务可用性为99.5%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;2. 在多可用区的区域</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的容器服务可用性为99.95%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的应用中间件服务可用性为99.95%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的数据库服务可用性为99.95%。</span>
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;容器云平台的软件开发管理服务可用性为99.95%。</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;&emsp;&emsp;通过容器服务自动创建或者手动加入的云服务器实例、负载均衡实例等资源的可用性，以云产品各自的服务等级协议为准。</span
          >
          <br />
          <br />
          <span>&emsp;&emsp;3. 可用性计算方式</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;服务可用性按服务周期统计，一个服务周期为一个自然月，如不满一个月不计算为一个服务周期，统计的业务单元为单个虚拟主机实例，时间单位为分钟。以日历月为单位计算可用性的公式如下：</span
          >
          <br />
          <br />
          <span
            >&emsp;&emsp;[(承诺的月有效服务时长－月内总服务不可用时长)/承诺的月有效服务时长]x100%</span
          >
          <br />
          <br />
          <span class="title1">二、服务响应能力</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;容器云平台为付费用户提供5×8小时的基础运行维护服务，并以在线工单和电话报障等方式提供技术支持。</span
          >
          <br />
          <br />
          <span class="title1">三、免责声明</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;容器服务旨在为用户提供稳定、可靠的企业级容器平台，但对于以下场景发生的问题，容器服务免责：</span
          >
          <br />
          <br />
          <span
            >&emsp;&emsp;1. 使用容器云平台提供之外的第三方或开源软件引起风险造成的业务损失。</span
          >
          <br />
          <br />
          <span
            >&emsp;&emsp;2. 不规范操作，例如未通过容器服务升级集群版本、未通过容器服务修改
            SLB 的配置、误删除资源等。</span
          >
          <br />
          <br />
          <span
            >&emsp;&emsp;3. 自行修改 OpenShift/Kubernetes的关键配置，例如以下文件的路径、链接和内容</span
          >
          <br />
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;/var/lib/kubelet</span>
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;/var/lib/docker</span>
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;/etc/kubernetes</span>
          <br />
          <span>&emsp;&emsp;&emsp;&emsp;/etc/kubeadm</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;4.
            模板中使用了OpenShift/Kubernetes集群预留的Annotation造成的资源不可用、申请失败、异常等影响。kubernetes.io/，k8s.io/开头的标签为核心组件预留标签。例如，pv.kubernetes.io/bind-completed:
            "yes"</span
          >
          <br />
          <br />
          <span
            >&emsp;&emsp;5.
            在容器控制台通过接入已有集群功能接入外部OpenShift/Kubernetes集群时，由于外部集群与容器云平台之间的网络不稳定，从而导致集群访问不稳定而造成的业务损失。</span
          >
          <br />
          <br />
          <span>&emsp;&emsp;6. 其他一切影响集群稳定运行的不当操作。</span>
          <br />
          <br />
          <span class="title1">四、服务计量准确性</span>
          <br />
          <br />
          <span
            >&emsp;&emsp;容器云平台具备准确、透明的计量、计费系统，容器云平台根据用户的服务实际使用情况据实结算，具体计费标准以用户订单生效时平台公布的价格为准。用户的原始计费信息默认最少保留3年备查。</span
          >
          <br />
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBarBlack";
export default {
  name: "App",
  components: {
    topBar
  },
  data: function() {
    return {
      tabPosition: "left",
      username: "",
      password: "",
      pics: [
        "web/static/images/banner.jpg",
        "web/static/images/banner1.jpg",
        "web/static/images/banner2.jpg"
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    registerUser() {
      alert("注册");
    },
    updatePasswrod() {
      alert("修改密码");
    }
  }
};
</script>
<style>
.m-topBar {
  background-color: #11151c !important;
}
</style>
<style lang="scss" scoped>
span {
  font-family: MicrosoftYaHei;
  font-size: 12px;
  color: #666;
}
.aa {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 20%;
}
.title {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.title1 {
  font-size: 14px;
  font-weight: 700;
  font-family: MicrosoftYaHei-Bold;
  color: rgba(51, 51, 51, 1);
}
.title2 {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: rgba(51, 51, 51, 1);
}
.grid-content {
  margin-top: 15%;
}
.xiazai {
  display: inline-block;
  cursor: pointer;
}
.xiazai img {
  width: 8%;
}
.box {
  width: 1px;
  height: 6px;
  color: #999;
  border: 8px solid transparent;
  border-top: 8px solid;
  box-shadow: 0 -12px 0 -4px;
  background: linear-gradient(to bottom, #ffffff 50%, #999 50%) repeat-x;
}
/deep/ .el-divider--vertical {
  height: 122rem;
  margin: -20px 45px;
}
/deep/.el-tabs--left .el-tabs__active-bar.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  right: 0;
  right: auto;
}
/deep/.el-submenu .el-menu-item {
  padding: 0 20px !important;
}
/deep/.el-tabs--left .el-tabs__nav-wrap.is-left::after,
.el-tabs--left .el-tabs__nav-wrap.is-right::after,
.el-tabs--right .el-tabs__nav-wrap.is-left::after,
.el-tabs--right .el-tabs__nav-wrap.is-right::after {
  height: 0;
}
/deep/.el-breadcrumb {
  line-height: 4;
}
/deep/ .el-breadcrumb__inner {
  color: #409eff;
  font-size: 14px;
}
.el-menu {
  border: 0;
}
/deep/.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: transparent;
}
@media screen and (max-width: 1024px) {
  /deep/ .el-divider--vertical {
    height: 145rem;
    margin: -20px 45px;
  }
  /deep/.el-breadcrumb {
    margin-top: 2%;
  }
  .el-submenu__title i {
    margin-left: 5%;
  }
}
</style>
