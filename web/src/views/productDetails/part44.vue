<template>
  <div id="part44" style="background-color: white">
    <div>
      <el-row>
        <el-col style="margin-top:8%;">
          <!-- Left -->
          <el-col :span="6" :offset="1" style="margin-top:60px;">
            <p class="imgStyle">
              <img :src="baseURL.DATAURL + list.icon.url" style="width:80px;" />
            </p>
            <div class="fontChiese" style="margin-top:15px;">
              {{ list.name }}
            </div>
            <div class="fontCenter" style="margin-top:43px;">
              <el-button class="btnStyle" @click="linkBuy()">
                立即申请
              </el-button>
            </div>
            <div style="margin-top:45px;">
              <el-col :offset="7" :span="13">
                <el-tabs
                  ref="ulWid"
                  v-model="activeName"
                  tab-position="left"
                  @tab-click="handleClick"
                >
                  <el-tab-pane
                    v-for="(item, index) in list2"
                    :key="index"
                    :name="item.id"
                  >
                    <span slot="label">
                      <i class="el-icon-date" />
                      {{ item.title }}
                      <div style="float: right;">
                        <i class="el-icon-arrow-right" />
                      </div>
                    </span>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </div>
          </el-col>
          <!--  Center  -->
          <el-col
            :span="13"
            :offset="1"
            class="detail1"
            style="margin-top:60px;"
          >
            <p
              v-for="(item, index) in list2"
              :key="index"
              class="centerContent"
              @tab-click="handleClick"
            >
              <span v-if="activeName == item.id">
                <p v-html="item.content" />
              </span>
            </p>
          </el-col>
          <!--  Right  -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBar";
import {
  getProductDetail,
  getProducts,
  getProductone,
} from "../../api/productDetail";
import {
  getServiceCatalogsInfo,
  getCloudServiceCatalogsC,
} from "../../api/serviceOperating";
import { getProductMessage, getDocuments } from "../../api/CMSApi";
import baseURL from "../../api/app";

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
      id: 0,
      ids: 0,
      itemid: 0,
      productName: "",
      catalogId: 0,
      catalog: "",
      search: { productId: undefined },
      seardh: { productId: undefined },
      list: [{ cover: { url: "" }, icon: { url: "" } }],
      activeName: 2,
      list2: [{ cover: { url: "" }, icon: { url: "" } }],
      servicecatalogId: "",
    };
  },
  created() {
    this.id = this.getId("id"); //this.getFatherId(this.id);
    this.productName = this.getId("productName");
    this.catalogId = this.getId("catalogId");
    this.catalog = this.getId("catalog");
    this.servicecatalogId = this.getId("productId");
    this.itemid = this.getQueryVariable("ll");
    this.activeName = this.itemid;
    this.getProduct(this.id);
  },
  mounted() {},
  methods: {
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    linkBuy() {
      let name = this.list.name;
      if (name == "数据存储PVC") {
        window.location.href = `/html/dataPVBuy.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "服务路由(Route)") {
        window.location.href = `/html/serviceRoute.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "熔断监控服务") {
        window.location.href = `/html/fusingMonitoring.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "分布式服务") {
        window.location.href = `/html/distributed.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "注册中心服务（单机版）") {
        window.location.href = `/html/registryService.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "注册中心服务（高可用）") {
        window.location.href = `/html/registryService.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "调用链服务") {
        window.location.href = `/html/callChain.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "网关服务") {
        window.location.href = `/html/gateway.html?id=${this.id}&productName=${
          this.productName
        }&catalogId=${this.catalogId}&catalog=${this.catalog}`;
        return;
      }
      if (name == "Apm性能管理") {
        window.location.href = `/html/pinpoint.html?id=${this.id}&productName=${
          this.productName
        }&catalogId=${this.catalogId}&catalog=${this.catalog}`;
        return;
      }
      if (name == "配置中心服务") {
        window.location.href = `/html/configurationCenter.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "一键安装微服务") {
        window.location.href = `/html/Installmicroservices.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "项目管理服务（Jira）") {
        window.location.href = `/html/jiraService.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "开通SonarQube") {
        window.location.href = `/html/sonarQube.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "开通Gitlab") {
        window.location.href = `/html/gitlabService.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "开通Hitchhiker") {
        window.location.href = `/html/hitchhiker.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      if (name == "开通Jenkins") {
        window.location.href = `/html/jenkins.html?id=${this.id}&productName=${
          this.productName
        }&catalogId=${this.catalogId}&catalog=${this.catalog}`;
        return;
      }
      if (name == "开通Nexus") {
        window.location.href = `/html/nexusService.html?id=${
          this.id
        }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
          this.catalog
        }`;
        return;
      }
      window.location.href = `/html/newBuyDetail.html?id=${
        this.id
      }&productName=${this.productName}&catalogId=${this.catalogId}&catalog=${
        this.catalog
      }`;
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == this.list2[0].id) {
        this.second();
      } else {
        this.first();
      }
    },
    first() {
      console.log("我是用户管理");
    },
    /**
     * 触发‘配置管理’事件
     */
    second() {
      window.location.href = `/html/productDetail1.html?id=${this.id}
      &productId=${this.servicecatalogId}&ll=${this.itemid}&productName=${
        this.productName
      }
      &catalogId=${this.catalogId}&catalog=${this.catalog}`;
    },
    //获取地址栏id
    getQueryVariable(variable) {
      //获取参数id
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    async getProduct() {
      const res = await requestParams(getProductMessage, this.servicecatalogId);
      this.list = res;
      console.log(this.list);
      this.list2 = [
        { title: "概览", id: "" },
        { title: "产品详细信息", id: this.list.id, content: this.list.content },
      ];
      if (this.list.pricing_id != "" && this.list.pricing_id != null) {
        this.list2.push({
          title: "定价",
          id: this.list.pricing_id,
          content: "",
        });
      }
      if (
        this.list.introduction_id != "" &&
        this.list.introduction_id != null
      ) {
        this.list2.push({
          title: "入门",
          id: this.list.introduction_id,
          content: "",
        });
      }
      if (this.list.document_id != "" && this.list.document_id != null) {
        this.list2.push({
          title: "文档与资源",
          id: this.list.document_id,
          content: "",
        });
      }
      if (this.list.problem_id != "" && this.list.problem_id != null) {
        this.list2.push({
          title: "常见问题",
          id: this.list.problem_id,
          content: "",
        });
      }
      for (var i = 0; i < this.list2.length; i++) {
        if (i > 1) {
          const document = await requestParams(getDocuments, this.list2[i].id);
          console.log(i);
          console.log(document);
          this.list2[i].content = document.content;
        }
      }

      // this.list2 =
      // this.ids = this.getQueryVariable("productId");
      // this.itemid = this.getQueryVariable("ll");
      // this.activeName = this.itemid;
      // this.search.productId = this.id;

      // const res = await requestParams(getProductDetail, this.search);
      // console.log(res);
      // this.list = res;
      // var productParams = {
      //   productId: this.ids
      // };
      // const r = await requestParams(getProducts, productParams);
      // this.list2 = r;
      // console.log(this.list2);

      // this.seardh.productId = this.ids;
      // const rs = await requestParams(getProductDetail, this.seardh);
      // this.list3 = rs;
    },
  },
};
</script>
<style>
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
/deep/ .el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}

.title1 {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.title2 {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
}
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
.imgStyle {
  text-align: center;
  img {
    width: 150px;
  }
}

.fontChiese {
  text-align: center;
  font-family: Microsoft YaHei;
  font-size: 20px;
  font-weight: bold;
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
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
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

  border-left: 1px solid rgba(224, 224, 224, 1);
  padding-right: 4.16667%;
  padding-left: 4.16667%;
}
@media screen and (max-width: 1024px) {
  .detail1 {
  }
}
</style>
