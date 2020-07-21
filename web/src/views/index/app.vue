<template>
  <div id="app" :style="{height:screenHeight+ 'px'}">
    <el-carousel :height="screenHeight + 'px'" style="position: relative;">
      <el-carousel-item
        v-for="(pic,index) in list"
        :key="index"
        :style="{backgroundImage: 'url('+baseURL.DATAURL +pic.cover.url +')'}"
      >
        <el-row>
          <el-col
            :span="10"
            :offset="2"
            style="color:#fff;"
            :style="{marginTop:screenHeight*0.2+ 'px'}"
          >
            <el-row
              v-if="screenWidth>1024"
              class="banner-title"
              :style="{marginTop:screenHeight*0.09+ 'px'}"
            >
              {{ pic.title }}
            </el-row>
            <el-row v-else-if="screenWidth<=1024" class="banner-title">
              {{ pic.title }}
            </el-row>
            <el-row class="banner-message">
              {{ pic.message }}
            </el-row>
            <el-row>
              <a :href="pic.url">
                <el-button
                  style="border:none;;color:#fbfbfb;background:#0261a7;margin-top:20px"
                >立即抢购</el-button>
              </a>
            </el-row>
          </el-col>
          <el-col :span="6" :offset="3">
            <img
              :src="baseURL.DATAURL+pic.logo[0].url"
              style="width:100%;heihgt:50%;object-fit: cover;"
              :style="{marginTop:screenHeight*0.25+ 'px'}"
            >
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <div id="searchBar" class="head-footer" :class="searchBarFixed == true ? 'isFixed' :''">
      <el-row>
        <el-col :offset="2" :span="20">
          <el-row>
            <el-col v-for="(item,index) in advantage" :key="index" :span="6" class="hov">
              <div class="topNew" :class="index == 0 ? 'topNewLeft' : '' ">
                <a :href="item.href" style="color: #ffffff;">
                  <h3 class="navigationTitle">{{ item.title }}</h3>
                  <div :class="searchBarFixed == true ? 'spanShow' :''">
                    <span class="navigationDetail">{{ item.detail }}</span>
                  </div>
                </a>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <el-backtop :bottom="40">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <i class="el-icon-arrow-up" />
      </div>
    </el-backtop>
    <div class="aa right-fixed" style="bottom:95px;right:40px;">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        <i class="el-icon-s-grid" />
      </div>
      <div class="mod_hang_qrcode_show">
        <div class="mod_hang_qrcode_show_bg" />
        <p>扫码关注</p>
        <p>中国海油平台</p>
      </div>
    </div>

    <!-- <div style="bottom:140px;right:40px;" class="right-fixed">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
        }"
      >
        <i class="el-icon-chat-dot-round"></i>
      </div>
    </div> -->
  </div>
</template>

<script>
import baseURL from '../../api/app';

import { getrRecommendationsType,getRecommendationarrays } from '../../api/CMSApi';
import { requestParams, parseHash } from '../../utils/urlParam';

import { getLocation, removeLocation,getUserInfo } from '../../utils/auth';
export default {
  name: 'App',
  components: {},
  data: function() {
    return {
      searchBarFixed: false,
      baseURL: baseURL,
      offsetTop: 0,
      pics: null,
      list: [
        // { url: "/web/static/images/slideshow/pictures1.png" },
        // { url: "/web/static/images/slideshow/pictures2.png" }
      ],
      bannerHeight: '',
      screenWidth: '',
      screenHeight: '',
      advantage: [
        {
          href: '#part3',
          title: '新闻资讯',
          detail: '看企业看行业看世界'
        },
        {
          href: '#part4',
          title: '海油云产品',
          detail: '云网融合专享定制'
        },
        {
          href: '#part5',
          title: '产品优势',
          detail: '云市场提供一站式服务'
        },
        {
          href: '#part6',
          title: '应用案例',
          detail: '提供全方位解决方案服务'
        }
        // {
        //   title: "合规专区",
        //   detail: "多项国内外权威认证"
        // }
      ]
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
      })();
    };


  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.handleScroll);
  },
  created() {
    // this.getApplication();

    this.getType();
    // 获取上次
    // console.log('跳转的url');
    // console.log(document.referrer);
    // console.log('监听端口');
    // console.log(window.location.host);
  },
  methods: {
    async getType(){
      // let params = { type: "首页图片" };
      let params={recordID:null};
      const res=await requestParams(getrRecommendationsType);
      for (let i = 0; i < res.length; i++) {
        if(res[i].type=='首页图片'){
          params.recordID=res[i].id;
        }
        
      }
      const list=await requestParams(getRecommendationarrays,params);
      this.list=list;
    },
    handleScroll() {
      let scrollTop1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.querySelector('#searchBar').offsetTop;
      if (this.offsetTop == 0) this.offsetTop = offsetTop;
      scrollTop1 > this.offsetTop + 45
        ? (this.searchBarFixed = true)
        : (this.searchBarFixed = false);
    },




  }
};
</script>

<style lang="scss">
.right-fixed{
  position: fixed;
    background-color: #FFF;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 20px;
    -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    z-index: 100;
}
.aa:hover .mod_hang_qrcode_show {
  display: block;
}
.spanShow{
  display: none;
}
.mod_hang_qrcode_show {
  min-height: 226px;
  padding-bottom: 5px;
  margin-top: 0;
  background-image: none;
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
.head-footer {
  position: relative;
  top: -100px;
  z-index: 2;
  // opacity: 0.7;
  height: 100px;

  background: transparent;
  &:hover {
    background: #11151c;
  }
}
.isFixed {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  height: 65px;
  width: 100%;
  background: #11151c;
}
.banner-title {
  width: 240px;
  height: 80px;
  color: #fbfbfb;
  font-family: "Microsoft YaHei";
  font-size: 38px;
  font-weight: 290;
  line-height: 80px;
}
.banner-message {
  height: 62px;
  color: #fbfbfb;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-weight: 290;
  line-height: 32px;
  height: auto;
}
.el-carousel__indicator--horizontal {
  position: relative;
  display: inline-block;
  margin-right: 15px;
  height: 32px;
  width: 32px;
  cursor: pointer;
}
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
a:active {
  text-decoration: none;
}
.el-carousel__indicators--horizontal {
  bottom: 100px;
  position: absolute;
  color: #fff;
  text-align: center;
  width: 100%;
  z-index: 10;
}

.el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
}
.el-carousel__container {
  position: relative;
  height: 25rem;
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
.topNew {
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.topNewLeft {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
}
.topNew:hover {
  cursor: pointer;
}
.navigationTitle {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 100;
}
.navigationDetail {
  font-size: 14px;
  color: #fbfbfb;
}
.hov:hover {
  .navigationTitle,
  .navigationDetail {
    color: #0261a7;
  }
}
</style>

