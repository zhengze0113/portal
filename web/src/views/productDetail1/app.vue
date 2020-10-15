<template>
  <div id="app" style>
    <el-row
      class="header1"
      :style="{
        backgroundImage: 'url(' + baseURL.DATAURL + list.cover.url + ')',
      }"
    >
      <el-col :span="10" :offset="2">
        <el-col class="header1-title">
          {{ list.name }}
        </el-col>
        <el-col class="header1-detail" :span="24">
          {{ list.productintroduction }}
        </el-col>
        <el-col>
          <el-button class="header1-btn" @click="linkBuy()">
            立即申请
          </el-button>
          <el-button class="header1-btn1" @click="jump1(list.id, productId, 2)">
            查看详情
          </el-button>
        </el-col>
      </el-col>
      <el-col :span="10" :offset="2">
        <div class="header1-logo" style="position:relative;top:185px;left:0px;">
          <img
            style="width:300px;"
            :src="baseURL.DATAURL + list.logo.url"
            alt
          />
        </div>
      </el-col>
    </el-row>
    <el-row style="background-color: white;height:70px;">
      <el-col :span="20" :offset="2">
        <el-col
          v-for="(item, index) in list2"
          :key="index"
          class="jump"
          :span="4"
          style="line-height:70px;text-align: center;"
        >
          <p class="jump1" @click="jump1(item.productId, item.id, index)">
            {{ item.title }}
          </p>
        </el-col>
      </el-col>
    </el-row>
    <div>
      <el-row style="margin-top:50px;">
        <!-- Left -->
        <el-col :span="5" :offset="1">
          <p class="imgStyle">
            <img :src="baseURL.DATAURL + list.icon.url" style="width:80px;" />
          </p>
          <div class="fontChiese" style="margin-top:55px;margin-bottom: 55px">
            {{ list.name }}
          </div>
        </el-col>
        <!--  Center  -->
        <el-col :span="15" :offset="1" class="detail1">
          <p class="centerContent" v-html="list.productintroduction" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBar";
import { getProductDetail, getProducts } from "../../api/productDetail";
import {
  getServiceCatalogsInfo,
  getCloudServiceCatalogsC,
} from "../../api/serviceOperating";
import { getProductMessage } from "../../api/CMSApi";
import baseURL from "../../api/app";
import { getAccessToken } from "../../utils/auth";
import {
  requestParams,
  parseHash,
  appendParamsToUrl,
} from "../../utils/urlParam";

export default {
  name: "App",
  components: {
    topBar,
  },
  data: function() {
    return {
      baseURL: baseURL,
      screenWidth: 0,
      screenHeight: 0,
      ulWid: "",
      compatriotsObject: [],
      objectCloud: {},
      id: 0, //云产品id
      productName: "", //云产品名称
      catalogId: 0, //服务目录Id
      catalog: "", //服务目录名称
      search: { productId: undefined },
      list: { cover: {}, logo: {}, icon: {} },
      activeName: "first",
      list1: [{ cover: { url: "" }, icon: { url: "" } }],
      list2: [],
      productId: "",
      servicecatalogId: "",
    };
  },
  created() {
    this.id = this.getId("id");
    this.servicecatalogId = this.getId("productId");
    this.productName = this.getId("productName");
    this.catalogId = this.getId("catalogId");
    this.catalog = this.getId("catalog");
    this.productId = this.getId("productId");
    this.getProduct(this.id);
  },
  mounted() {},
  methods: {
    linkBuy() {
      if (getAccessToken() != undefined) {
        console.log(this.list.name);
        let name = this.list.name;
        if (name == "数据存储PVC") {
          window.location.href = `/html/dataPVBuy.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "服务路由(Route)") {
          window.location.href = `/html/serviceRoute.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "熔断监控服务") {
          window.location.href = `/html/fusingMonitoring.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "分布式服务 tx-lcn（提供sdk）") {
          window.location.href = `/html/distributed.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "注册中心服务") {
          window.location.href = `/html/registryService.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "注册中心服务（高可用）") {
          window.location.href = `/html/registryService.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "调用链服务") {
          window.location.href = `/html/callChain.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "网关服务") {
          window.location.href = `/html/gateway.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "Apm性能管理") {
          window.location.href = `/html/pinpoint.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "配置中心服务") {
          window.location.href = `/html/configurationCenter.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "一键安装微服务") {
          window.location.href = `/html/Installmicroservices.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "项目管理服务（Jira）") {
          window.location.href = `/html/jiraService.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "开通SonarQube") {
          window.location.href = `/html/sonarQube.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "开通Gitlab") {
          window.location.href = `/html/gitlabService.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "开通Hitchhiker") {
          window.location.href = `/html/hitchhiker.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "开通Jenkins") {
          window.location.href = `/html/jenkins.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "开通Nexus") {
          window.location.href = `/html/nexusService.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }

        if (name == "缓存中间件（redis）") {
          window.location.href = `/html/middlewareRedis.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
          if (name == "nginx中间件") {
          window.location.href = `/html/middlewareNginx.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        
        if (name == "索引中间件（elasticsearch）") {
          window.location.href = `/html/middlewareElasticearch.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        if (name == "mysql中间件") {
          window.location.href = `/html/middlewareMysql.html?id=${
            this.id
          }&productName=${this.productName}&catalogId=${
            this.catalogId
          }&catalog=${this.catalog}&productId=${this.productId}`;
          return;
        }
        window.location.href = `/html/newBuyDetail.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }&productId=${this.productId}`;
      } else {
        location.href = baseURL.LoginHref;
      }
    },
    jump1(id, itemid, index) {
      if (index == 0) {
        return;
      }
      window.location.href = `/html/productDetails.html?id=${
        this.id
      }&productId=${this.productId}&ll=${itemid}&productName=${
        this.productName
      }&catalogId=${this.catalogId}&catalog=${this.catalog}`;
    },
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    link(id) {
      window.location.href = "/html/productDetail.html?id=" + id;
    },
    async getProduct() {
      const res = await requestParams(getProductMessage, this.servicecatalogId);
      this.list = res;
      console.log(this.list);
      this.list2 = [
        { title: "概览", id: "" },
        { title: "产品详细信息", id: this.list.id },
      ];
      if (this.list.pricing_id != "" && this.list.pricing_id != null) {
        this.list2.push({ title: "定价", id: this.list.pricing_id });
      }
      if (
        this.list.introduction_id != "" &&
        this.list.introduction_id != null
      ) {
        this.list2.push({ title: "入门", id: this.list.introduction_id });
      }
      if (this.list.document_id != "" && this.list.document_id != null) {
        this.list2.push({ title: "文档与资源", id: this.list.document_id });
      }
      if (this.list.problem_id != "" && this.list.problem_id != null) {
        this.list2.push({ title: "常见问题", id: this.list.problem_id });
      }
      // this.search.productId = this.id;
      // //获取云产品
      // const res = await requestParams(getProductDetail, this.search);
      // this.list = res;
      // console.log(this.list);
      // var productParams = {
      //   productId: this.id,
      // };
      // const re = await requestParams(getProducts, productParams);
      // this.list2 = re;
      // console.log(this.list2);

      // this.productId = this.list2[1].id;

      if (res.length == 0) {
        //该服务暂未开放，请尽情期待
        // this.$alert('该服务暂未开放，请尽情期待', '', {
        //   confirmButtonText: '确定',
        //   callback: action => {
        //     window.location.href = "/html";
        //   }
        // });
        alert("该服务暂未开放，请尽情期待");
        window.location.href = "/html";
        return;
      }
    },
  },
};
</script>
<style>
.d-table {
  clear: both;
  margin-bottom: 20px;
}
.d-table-mod {
  margin-bottom: 40px;
}
.c-media-heading {
  text-align: center;
  font-size: 18px;
  color: #333;
  margin: 0;
  padding: 0;
  font-weight: 400;
  line-height: 1.5;
}
.c-media-info {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 1.7;
  word-wrap: break-word;
}
.c-media-body {
  display: table-cell;
  vertical-align: top;
  margin-top: 0;
}
</style>
<style scoped lang="scss">
/deep/ .el-tabs--left .el-tabs__active-bar.is-left {
  width: 0px;
}

/deep/ .el-tabs__nav-wrap.is-left::after {
  width: 0px;
}

/deep/ .el-tabs {
  // width: 100%;
}

/deep/ .el-tabs__item {
  // margin-right: 144px;
  // margin-left: 8px;
  padding: 0;
}
.jump1 {
  cursor: pointer;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.jump:first-child .jump1 {
  cursor: default;
}
// .jump:first-child{
//   cursor:auto;
// }
.header1 {
  background-size: 100%;
  height: 500px;
  width: 100%;
  .header1-title {
    font-size: 38px;
    position: relative;
    //left: 192px;
    top: 200px;
    color: #fff;
  }
  .header1-detail {
    font-size: 14px;
    position: relative;
    // left: 191px;
    top: 215px;
    color: #fff;
    line-height: 20px;
  }
  .header1-btn {
    font-size: 14px;
    position: relative;
    //left: 192px;
    top: 235px;
    color: #fff;
    line-height: 12px;
    background: #0261a7;
    width: 115px;
    border: none;
    border-radius: 0px;
  }
  .header1-btn1 {
    font-size: 14px;
    position: relative;
    // left: 192px;
    top: 235px;
    color: #fff;
    line-height: 12px;
    background: #0e1726;
    border: 1px solid rgba(255, 255, 255, 1);
    width: 115px;
    border-radius: 0px;
  }
}
.el-button + .el-button {
  margin-left: 62px;
}
.imgStyle {
  text-align: center;
  img {
    width: 151px;
  }
}
.fontChiese {
  text-align: center;
  font-family: MicrosoftYaHei-Bold;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
}
.fontCenter {
  text-align: center;
}

.fontEnglish {
  text-align: center;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}

.btnStyle {
  width: 87px;
  height: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: white;
  background: rgba(3, 97, 167, 1);
  padding-top: 7px;
  padding-left: 16px;
  color: rgba(255, 255, 255, 1);
  border-radius: 2px;
}

ul {
  list-style-type: none;
  cursor: pointer;
}

.padBottom-20 {
  padding-bottom: 20px;
  display: table-cell;
}

.liSpan {
  margin-left: 13px;
  margin-right: 80px;
}

.spanStyle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  vertical-align: middle;
}

.right-font {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}

.rightServiceSpan {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.rightDiv {
  padding: 10px;
  margin-top: 18px;
}

.rightDiv:hover {
  transition: 0.25s;
  cursor: pointer;
  box-shadow: darkgrey 1px 1px 4px;
}

.centerFont {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  margin-bottom: 20px;
  display: inline-block;
}

.centerContent {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
}

.configFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.detail1 {
  margin-bottom: 50px;
  //border-right: 1px solid rgba(224, 224, 224, 1);
  //border-left: 1px solid rgba(224, 224, 224, 1);
  padding-right: 4.16667%;
  padding-left: 4.16667%;
  height: 0px;
}
@media screen and (max-width: 1024px) {
  /*.detail1 {*/
  /*height: 650px;*/
  /*}*/
}
</style>
