<template>
  <div id="app" style="background-color: white">
    <el-row
      class="header1"
      :style="{backgroundImage: 'url('+baseURL.DATAURL + list[0].cover.url + ')'}"
    >
      <el-col class="header1-title">{{list[0].title}}</el-col>
      <el-col class="header1-detail" :span="10">{{list[0].content}}</el-col>
      <el-col>
        <el-button class="header1-btn">立即申请</el-button>
      </el-col>
    </el-row>

    <div>
      <el-row style="margin-top:50px;">
        <!-- Left -->
        <el-col :span="4" :offset="1">
          <p class="imgStyle">
            <img :src="baseURL.DATAURL+list[0].icon.url" />
          </p>
          <div class="fontChiese" style="margin-top:15px;">{{objectCloud.name}}</div>
          <div class="fontEnglish" style="margin-top:12px;margin-bottom:22px;">Container deployment</div>
          <div class="fontCenter">
            <el-button @click="linkBuy()" class="btnStyle">加入清单</el-button>
          </div>
          <div style="margin-top:45px;">
            <el-col :offset="7" :span="13">
              <el-tabs tab-position="left" v-model="activeName" ref="ulWid">
                <el-tab-pane label="产品概括" name="first"></el-tab-pane>
                <el-tab-pane label="产品详细信息" name="second"></el-tab-pane>
                <el-tab-pane label="定价" name="third"></el-tab-pane>
                <el-tab-pane label="入门" name="fourth"></el-tab-pane>
                <el-tab-pane label="文档与详情" name="fifth"></el-tab-pane>
                <el-tab-pane label="常见问题" name="sixth"></el-tab-pane>
              </el-tabs>
            </el-col>
          </div>
        </el-col>
        <!--  Center  -->
        <el-col :span="10" :offset="1" class="detail1">
          <span class="centerFont">{{objectCloud.name}}</span>

          <p class="centerContent">
            <span v-if="activeName=='first'">{{list[0].productSummary}}</span>
            <span v-else-if="activeName=='second'">{{list[0].productDetail}}</span>
            <span v-else-if="activeName=='third'">{{list[0].productPrice}}</span>
            <span v-else-if="activeName=='fourth'">{{list[0].productNovice}}</span>
            <span v-else-if="activeName=='fifth'">{{list[0].docAndResources}}</span>
            <span v-else-if="activeName=='sixth'">{{list[0].problem}}</span>
            <!-- <span class="centerFont">详细信息</span> -->
          </p>
          <div>
            <br />
            <p
              style="font-size:12px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(51,51,51,1);margin-bottom:15px;"
            >基础配置</p>
            <span class="configFont">计算方式：包年包月</span>
            <span class="configFont">&emsp;&emsp;&emsp;地域：华东1（杭州）/随机分配</span>
            <br />
            <span class="configFont">购买数量：1台</span>
            <span class="configFont">&emsp;&emsp;&emsp;镜像：Windows Server Version 1903 数据中心版 64位英文版</span>
            <br />
            <span class="configFont">购买数量：1台</span>
            <span class="configFont">&emsp;&emsp;&emsp;镜像：Windows Server Version 1903 数据中心版 64位英文版</span>
          </div>
        </el-col>
        <!--  Right  -->
        <el-col :span="5" :offset="1" style="margin-bottom:30px;">
          <p class="right-font">相关产品</p>
          <div
            class="rightDiv"
            v-for="(item,index) in compatriotsObject"
            :key="item.id"
            @click="link(item.id)"
            v-if="index<3"
          >
            <el-row style="display:table-cell;">
              <el-col :span="8" style="padding-top:1%;">
                <img style="text-align: center; vertical-align: middle;width:55%;" :src="item.icon" />
              </el-col>
              <el-col :span="16">
                <span class="rightServiceSpan">{{item.name}} : {{item.content}}</span>
                <br />
                <span class="rightServiceSpan">服务： 云产品</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBar";
import { getProductDetail } from "../../api/productDetail";
import {
  getServiceCatalogsInfo,
  getCloudServiceCatalogsC
} from "../../api/serviceOperating";

import baseURL from "../../api/app";

import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from "../../utils/urlParam";

export default {
  name: "App",
  components: {
    topBar
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
      search: { productId: undefined },
      list: [{ cover: { url: "" }, icon: { url: "" } }],
      activeName: "first",
      list1: [{ cover: { url: "" }, icon: { url: "" } }]
    };
  },
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
      window.location.href = "/html/newBuyDetail.html?id=" + this.id;
    },


    link(id) {
      window.location.href = "/html/productDetail.html?id=" + id;
    },
    async getProduct() {
      this.search.productId = this.id;
      const res = await requestParams(getProductDetail, this.search);
      this.list = res;
    },
    async getProductList() {
      const res = await requestParams(getProductDetail);
      this.list1 = res;
      for (var j = 0; j < this.list1.length; j++) {
        for (var i = 0; i < this.compatriotsObject.length; i++) {
          if (this.list1[j].productId == this.compatriotsObject[i].id) {
            var img = baseURL.DATAURL + this.list1[j].icon.url;
            this.compatriotsObject[i].icon = img;
            this.compatriotsObject[i].content = this.list1[j].content;
          }
        }
      }
    }
  },
  created() {
    this.id = this.getId("id");
    this.getProduct(this.id);
  },
  mounted() {
    // this.screenWidth = document.documentElement.clientWidth;
    // this.screenHeight = document.documentElement.clientHeight;
    // this.ulWid = this.$refs.ulWid.clientWidth + "px";
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.documentElement.clientWidth;
    //     this.screenHeight = document.documentElement.clientHeight;
    //     this.ulWid = this.$refs.ulWid.clientWidth + "px";
    //   })();
    // };
  }
};
</script>

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

.header1 {
  background-size: auto 100%;
  height: 700px;
  width: 100%;
  // background-repeat: no-repeat;
  .header1-title {
    font-size: 38px;
    position: relative;
    left: 192px;
    top: 254px;
    color: #fff;
  }
  .header1-detail {
    font-size: 14px;
    position: relative;
    left: 191px;
    top: 312px;
    color: #fff;
    line-height: 20px;
  }
  .header1-btn {
    font-size: 14px;
    position: relative;
    left: 192px;
    top: 379px;
    color: #fff;
    line-height: 12px;
    background: #0261a7;
    width: 115px;
    border: none;
    border-radius: 0px;
  }
}

.imgStyle {
  text-align: center;
  img {
    width: 40px;
  }
}

.fontChiese {
  text-align: center;
  font-family: MicrosoftYaHei-Bold;
  font-size: 24px;
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
  border-right: 1px solid rgba(224, 224, 224, 1);
  border-left: 1px solid rgba(224, 224, 224, 1);
  padding-right: 4.16667%;
  padding-left: 4.16667%;
  height: 520px;
}
// @media screen and (max-width: 1024px) {
//   .detail1 {

//   }
// }
</style>
