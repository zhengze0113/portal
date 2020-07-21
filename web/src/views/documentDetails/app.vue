<template>
  <div id="app" style="background:white;">
    <el-row :gutter="20" style="box-shadow: 0px -2px 2px rgba(213, 213, 213, 0.65);">
      <el-col :span="7" style="margin-top: 10%;">
        <el-row>
          <el-col :span="8">
            <div style="color: white;" class="grid-content bg-purple">2</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple" style="background:#ECECEC;height: 800px;">
              <a
                class="top_nav"
                href="/html/help.html"
                style="margin-left:15px;margin-top: 2%;"
              >文档首页</a>
              <h3
                style="margin-left:15px; color: #171717;font-family:Microsoft YaHei; font-size: 20px;font-weight: 400;line-height: 26px;padding-top: 6%;"
              >{{advantage.title}}</h3>
              <el-divider></el-divider>
              <el-tree
                v-if="a"
                class="tree_data"
                :data="data"
                node-key="id"
                accordion
                :default-expanded-keys="[advantage.helptype.id, advantage.id]"
                style="background:#ECECEC;"
                @node-click="handleNodeClick"
                :props="defaultProps"
              ></el-tree>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="13" style="margin-top: 10%;">
        <el-breadcrumb
          class="tree_data"
          separator-class="el-icon-arrow-right"
          style=" font-size: 12px;padding-bottom: 20px;"
        >
          <el-breadcrumb-item>
            <span ><a
                href="/html/help.html"
                style="color:#0261a7"
              >帮助中心</a></span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{advantage.helptype.type}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{advantage.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="grid-content bg-purple" style="padding-bottom: 20px;">

          <div class="content">
            <div class="con" v-for="(item,index) in advantage.helpcontents" :key="index">
              <!-- <el-row style="font-size:24px;margin:10px 0;">{{item.title}}</el-row> -->
              <el-row v-html="item.content"></el-row>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" style=" margin-top: 10%;">
        <el-tabs
          :tab-position="tabPosition"
          v-model="activeName"
          style="float: left"
          @tab-click="scrollTo"
          id="searchBar"
          :class="searchBarFixed == true ? 'isFixed' :''"
        >
          <el-tab-pane
            v-for="(item,index) in advantage.helpcontents"
            :key="index"
            :label="item.title"
          >{{item.title}}</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import topBar from "../../components/hd1/topBarBlack";
import baseURL from "../../api/app";
import { requestParams, parseHash } from "../../utils/urlParam";
import {
  getHelpTitle,
  getHelpArticle,
  getHelpType,
  getHelpArticleOne,
  getHelpTypeOne,
  getHelpTitleOne
} from "../../api/helpCMS";
export default {
  name: "App",
  components: {
    topBar
  },
  data: function() {
    return {
      username: "",
      password: "",
      tabPosition: "right",
      activeName: "",
      pics: [
        "/web/static/images/banner.jpg",
        "/web/static/images/banner1.jpg",
        "/web/static/images/banner2.jpg"
      ],
      searchBarFixed: false,
      a: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      advantage: [],
      active: 0
    };
  },
  created() {
    this.getType(this.getId("_id"));
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    registerUser() {
      alert("注册");
    },
    updatePasswrod() {
      alert("修改密码");
    },
    async handleNodeClick(data) {
      if (!data.children) {
        const artic = await requestParams(getHelpArticleOne, data.id);
        this.advantage = artic;
        console.log(this.advantage)
      }
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
    async getType(id) {
      const artic = await requestParams(getHelpArticleOne, id);
      this.advantage = artic;
      const res = await requestParams(
        getHelpTitleOne,
        artic.helptype.helptitle
      );

      for (var i = 0; i < res.helptypes.length; i++) {
        this.data.push({
          id: res.helptypes[i].id,
          label: res.helptypes[i].type
        });
      }
      for (var i = 0; i < this.data.length; i++) {
        const types = await requestParams(getHelpTypeOne, this.data[i].id);
        var data = [];
        for (var j = 0; j < types.helparticles.length; j++) {
          data.push({
            id: types.helparticles[j].id,
            label: types.helparticles[j].title
          });
        }
        this.data[i].children = data;
      }
      this.a = true;
    },
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".content div");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop);
      });
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义当前点亮的导航下标
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n;
        }
      }
      // 把下标赋值给 vue 的 data
      this.active = navIndex;
    }, // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.querySelectorAll(".con")[index.index]
        .offsetTop;
      // 获取当前 offsetTop
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50;
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
      } else {
        // 往下滑
        smoothDown();
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.querySelector("#searchBar").offsetTop;
      scrollTop > offsetTop
        ? (this.searchBarFixed = true)
        : (this.searchBarFixed = false);
    }
  }
};
</script>

<style>
body {
}
a {
  text-decoration: none;
}
.isFixed {
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
}

.con {
  color: #666666;
  font-family: Microsoft YaHei;
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
}
.m-topBar {
  background-color: #11151c !important;
}
.tree_data {
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
}
.top_nav {
  color: #999999;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
}
.el-divider--horizontal {
  margin: 17px 0;
}

.el-tabs__content {
  display: none;
}
.el-breadcrumb__inner a {
  color: #409eff;
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
  width: 350px;
  height: 350px;
  background: white;
  margin-top: 11%;
  margin-left: -25%;
  border-top: 2px solid #0261a7;
}

.jdc-side {
  display: none;
  position: fixed;
  right: 20px;
  bottom: 20%;
  z-index: 300;
  width: 60px;
}
.mod_hang_qrcode {
  position: relative;
}
.mod_hang_qrcode_show {
  display: none;
  position: absolute;
  right: 70px;
  top: -65px;
  width: 138px;
  min-height: 166px;
  border: 0 none;
  background: #fff;
  -webkit-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  -moz-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
}
.mod_hang_appeal_show:hover {
  display: block; /*opacity: 0.5;*/
}
.mod_hang_qrcode_show p {
  margin-top: 5px;
  line-height: 16px;
  color: #666;
  font-size: 12px;
  text-align: center;
}
.mod_hang_qrcode_show_bg {
  width: 124px;
  height: 124px;
  margin: 8px auto 0;
  background-position: 0 0;
  background-repeat: no-repeat;
  -moz-background-size: 124px auto;
  background-size: 124px auto;
  background-image: url(../../../static/images/logoCode.png);
}
.jdc_hang_qrcode .mod_hang_qrcode_show_bg {
  background-image: url(../../../static/images/logoCode.png);
}
.jdc_hang_qrcode p {
  padding-bottom: 5px;
}
.mod_hang_qrcode_btn {
  display: block;
  width: 60px;
  height: 60px;
  color: #0989c5;
  font-size: 40px;
  cursor: pointer;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.mod_hang_top {
  display: block;
  width: 60px;
  height: 60px;
  margin: 5px 0 0;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.25s ease;
  -moz-transition: all 0.25s ease;
  transition: all 0.25s ease;
  background-color: transparent;
}
.mod_hang_qrcode:hover .mod_hang_qrcode_show {
  display: block;
}
.mod_hang_qrcode_btn {
  position: relative;
  margin-top: 5px;
  text-align: center;
  background-color: transparent;
  -webkit-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  -moz-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
}
.mod_hang_qrcode_btn span {
  display: none;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 30px;
  line-height: 15px;
  font-size: 12px;
  text-align: center;
}
.mod_hang_qrcode_btn:hover {
  color: #fff;
}
.mod_hang_top {
  -webkit-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  -moz-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
}
.mod_hang_top .mod_hang_qrcode_btn {
  background: 0 0;
  margin: 0;
}
.mod_hang_appeal_btn {
  display: block;
  width: 60px;
  height: 60px;
  color: #0989c5;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  -webkit-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  -moz-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
}

.mod_hang_appeal_btn i,
.mod_hang_qrcode_btn i {
  display: inline-block;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  color: #0989c5;
  background-color: #fff;
}
.mod_hang_appeal_btn span {
  display: none;
  position: absolute;
  top: 25px;
  left: 25px;
  width: 30px;
  line-height: 15px;
  font-size: 12px;
  text-align: center;
}
.mod_hang_appeal.show .mod_hang_appeal_show {
  display: block;
}
.mod_hang_appeal_show {
  opacity: 0;
  z-index: -9;
  right: -500px;
  position: absolute;
  right: 70px;
  bottom: 0;
  background: #fff;
  -webkit-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  -moz-box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  box-shadow: 0 0 10px 0 rgba(20, 34, 67, 0.1);
  width: 300px;
}
.mod_hang_appeal_show li {
  *zoom: 1;
  cursor: pointer;
}
.mod_hang_appeal_show li:hover {
  background: #f3f5fb;
}
.mod_hang_appeal_show li:after,
.mod_hang_appeal_show li:before {
  content: "";
  display: block;
  clear: both;
  height: 0;
  line-height: 0;
  visibility: hidden;
}
.mod_hang_appeal_show .icon_box,
.mod_hang_appeal_show .text_box {
  float: left;
  width: 215px;
  height: 90px;
  cursor: pointer;
}
.mod_hang_appeal_show .icon_box {
  width: 78px;
  line-height: 90px;
  text-align: center;
}
.mod_hang_appeal_show .icon_box i {
  color: #0989c5;
  font-size: 30px;
}
.mod_hang_appeal_show .text_box h5 {
  margin-top: 10px;
  font-size: 16px;
  color: #03004c;
  line-height: 24px;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mod_hang_appeal_show .text_box p {
  margin-top: 10px;
  max-height: 36px;
  overflow: hidden;
  line-height: 18px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
.jdc_feedback_qrcode .mod_hang_qrcode_btn {
  margin-bottom: 5px;
}
.jdc_feedback_qrcode .mod_hang_qrcode_show {
  min-height: 226px;
}
.jdc_feedback_qrcode .mod_hang_qrcode_show p {
  padding-bottom: 5px;
}
.jdc_feedback_qrcode .mod_hang_qrcode_show_bg {
  margin-top: 0;
  background-image: none;
}
@media (max-width: 768px) {
  .jdc-rwd .jdc-side {
    display: none !important;
  }
}
.jdc-lang-en .jdc_hang_qrcode .mod_hang_qrcode_show_bg {
  background-image: url(../../../static/images/logoCode.png);
}

@font-face {
  font-family: jdcfont;
  src: url(../../../fonts/jdcfont.eot);
  src: url(../../../fonts/jdcfont.eot#iefix) format("embedded-opentype"),
    url(../../../fonts/jdcfont.woff) format("woff"),
    url(../../../fonts/jdcfont.ttf) format("truetype");
  /*url(../../../fonts/jdcfont.svg#jdcfont) format("svg")*/
}
.jdcfont {
  font-family: jdcfont !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
