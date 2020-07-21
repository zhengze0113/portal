<template>
  <div id="app">
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
            :style="{marginTop:screenHeight*0.25+ 'px'}"
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
          <!-- <el-col :span="6" :offset="3">
            <img
              :src="baseURL.DATAURL+pic.logo[0].url"
              style="width:100%;heihgt:50%;object-fit: cover;"
              :style="{marginTop:screenHeight*0.25+ 'px'}"
            />
          </el-col> -->
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import baseURL from '../../api/app';

import { getrRecommendationsType,getRecommendationarrays } from '../../api/CMSApi';
import { requestParams, parseHash } from '../../utils/urlParam';
export default {
  name: 'App',

  data: function() {
    return {
      pics: ['/web/static/images/servicecloud.png'],
      list: [],
      bannerHeight: '',
      screenWidth: '',
      screenHeight: '',
      baseURL: baseURL,
    };
  },
  created() {
    this.getType();
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
  methods: {
    async getType(){
      let params={recordID:null};
      const res=await requestParams(getrRecommendationsType);
      for (let i = 0; i < res.length; i++) {
        if(res[i].type=='云服务'){
          params.recordID=res[i].id;
        }
        
      }
      const list=await requestParams(getRecommendationarrays,params);
      this.list=list;
    },
  }
};
</script>

<style lang="scss" scoped>
body {
}
/deep/ .el-carousel__indicators--outside {
  position: absolute;
  bottom: 0px;
}
/deep/ .el-carousel__container {
  position: relative;
  height: 43rem;
}
/deep/ .el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 420px;
  margin: 0;
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
/deep/ .el-carousel__indicator--horizontal {
  position: relative;
  display: inline-block;
  margin-right: 15px;
  height: 32px;
  width: 32px;
  cursor: pointer;
}
/deep/ .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

/deep/ .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
