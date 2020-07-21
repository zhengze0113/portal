<template>
  <div id="app">
    <div style="position:relative;width:100%;height:100%;background:#f3f3f3;">
      <img :src="baseURL.DATAURL+list[0].cover.url" alt style="width:100%;height:100%;">
      <div>
        <div style="font-size:38px;position:absolute;top:36%;left:44%;color:#ffffff;">
          {{ list[0].title }}
        </div>
        <div
          style="font-size: 14px;
                 position: absolute;
                 top: 50%;
                 left: 23%;
                 color: rgb(255, 255, 255);
                 width: 56%;"
        >
          {{ list[0].message }}
        </div>
      </div>
    </div>
    <el-row style="background:#fff;">
      <el-col>
        <el-row>
          <el-col>
            <el-tabs id="tabs" v-model="activeName" stretch>
              <el-tab-pane name="first">
                <div slot="label">
                  <div class="titleNumber">
                    01
                  </div>
                  <el-divider />
                  <div class="titleText">
                    公司概览
                  </div>
                </div>
                <Intro style="margin:0 7.5% 10%;" />
              </el-tab-pane>
              <el-tab-pane name="second">
                <div slot="label">
                  <div class="titleNumber">
                    02
                  </div>
                  <el-divider />
                  <div class="titleText">
                    特色服务
                  </div>
                </div>
                <Service style="margin:0 12.5% 10%;" />
              </el-tab-pane>
              <el-tab-pane name="third">
                <div slot="label">
                  <div class="titleNumber">
                    03
                  </div>
                  <el-divider />
                  <div class="titleText">
                    应用案例
                  </div>
                </div>
                <Case style="margin:0 7.5% 10%;" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getrRecommendationsType,getRecommendationarrays } from '../../api/CMSApi';
import { requestParams, parseHash } from '../../utils/urlParam';
import baseURL from '../../api/app.js';
import Intro from './intro';
import Service from './service';
import Case from './case';
export default {
  name: 'App',
  components: {
    Intro,
    Service,
    Case
  },
  data: function() {
    return {
      baseURL: baseURL,
      list: {
        cover: { url: '' }
      },
      list1: [],
      visible: true,
      activeName: 'first',
      hash:null
    };
  },
  mounted() {
    // this.toggleSelection([this.tableData[0], this.tableData[1]]);
    this.iShash();
  },
  created() {
    this.fetchData();
    if (this.getId('tab') == null) {
      this.activeName = 'first';
    }else{ 
      this.activeName  = this.getId('tab').replace(/[^a-z]+/ig,'');
    }
    
  },
  methods: {
    async fetchData() {
      let params={recordID:null};
      const res=await requestParams(getrRecommendationsType);
      for (let i = 0; i < res.length; i++) {
        if(res[i].type=='关于我们'){
          params.recordID=res[i].id;
        }
        
      }
      const list=await requestParams(getRecommendationarrays,params);
      this.list=list;
      
    },
    iShash(){
      if (/tabs/.test(location.href)) {
        setTimeout(()=>{window.location.hash = '#tabs';}, 1500);
        
      }
    },
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
            location.href
          ) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
      );
    }
  }
};
</script>

<style>
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

</style>
<style lang="scss" scoped>
/deep/ .el-tabs__item {
  height: 0%;
  // padding-right: 183%;
}
// /deep/ .el-tabs__active-bar {
//   width: 100px !important;
// }
/deep/ .el-divider--horizontal {
  margin: 0;
}
/deep/ .el-tabs__header {
  padding-left: 12.5%;
  padding-right: 3.5%;
  background: #fff;
}
.el-divider--horizontal {
  width: 33%;
}
/deep/.el-tabs__nav-wrap::after {
  background-color: #fff;
}
/deep/.el-tabs__active-bar {
  width: 80px !important;
}
.titleNumber {
  position: relative;
  width: 90px;
  text-align: right;
  // left: 80%;
}
.titleText {
  float: left;
}
</style>
