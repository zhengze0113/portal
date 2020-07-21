<template>
  <!-- 应用案例 -->
  <div>
    <el-row style="margin-top:50px">
      <el-row>
        <el-col v-for="(item,index) in applicationList" :key="index" :span="11" :offset="1" style="margin-top:20px;">
          <el-row class="content">
            <div @click="linkCaseDetail(item.id)">
              <el-col :span="4">
                <div class="iconStyle">
                  <img
                    style="margin-top:-17px;height:60px"
                    :src="baseURL.DATAURL+item.cover.url"
                    alt
                  >
                  <div class="title">
                    {{ item.name }}
                  </div>
                </div>
              </el-col>
              <el-col :span="1" style="height:100%">
                <el-divider direction="vertical" />
              </el-col>
              <el-col :span="18">
                <!-- <div class="type">行业属性：视频直播</div> -->
                <!-- <div
                  class="detail"
                >&emsp;&emsp;赛事直播，虎牙采用阿里云云上护航服务，为总决赛当日7000万在线人气提供了流畅的观看体验赛事直播，虎牙采用阿里云云上护航服务，为总决赛当日7000万在线人气提供了流畅的观看体验。赛事直播，虎牙采用阿里云云上护航服务，为总决赛当日7000万在线人气提供了流畅的观看体验。赛事直播，虎牙采用阿里云云上护航服务，为总决赛当日7000万在线人气提供了流畅的观看体验。。 “不管是赛前的方案设计还是赛事期的保障(问题及时响应、故障快速处理)都表现出很高的业务水平和责任心。本次S8直播的顺利进行是大家共同努力的成果</div>    -->
                <div
                  class="detail"
                >
                  &emsp;&emsp;<p v-html="item.description" />
                </div>         
                <!--<div style="margin-top:31px;margin-left:10px">-->
                <!--<span class="service">服务：</span>-->
                <!--<img-->
                <!--style="margin-left:10%;vertical-align:text-top;"-->
                <!--src="/web/static/images/caseDetails/tubiao.png"-->
                <!--alt-->
                <!--/>-->
                <!--<span class="cloud">云产品</span>-->
                <!--</div>-->
              </el-col>
            </div>
          </el-row>
        </el-col>
        <!-- <el-col :span="11" :offset="1">1</el-col> -->
      </el-row>
    </el-row>
  </div>
</template>
<script>


import { getApplication } from '../../api/application.js';
import baseURL from '../../api/app.js';

export default {
  data() {
    return {
      baseURL:baseURL,
      applicationList: []
    };
  },
  created(){
    this.getApplications();
  },
  methods:{
    getApplications(){
      getApplication().then(r => {
        this.applicationList = r;
      });
    },
    linkCaseDetail(id){
      window.location.href='/html/caseDetails.html?id='+id;
    }
  }
};
</script>
<style lang="scss" scoped>
.detail {
  margin:20px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;


}
.cloud {
  width: 36px;
  height: 12px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(2, 97, 167, 1);
  line-height: 21px;
}
.service {
  width: 31px;
  height: 12px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}
.type {
  margin: 20px 10px 10px;
  height: 12px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}
.title {
  text-align: center;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: #333333;
  line-height: 21px;
  margin-top:20px;
}
.content {
  background: #fff;
  height: 200px;
  cursor: pointer;
  border: 1px solid rgba(224, 224, 224, 1);
  box-shadow: 0px 2px 16px 0px rgba(134, 139, 137, 0.35);
}

/deep/ .el-divider--vertical {
  height: 10rem;
  margin: 15px 4px;
}

  .iconStyle{
    width:1000px;
    height:200px;
    display:table-cell;
    vertical-align:middle;
    text-align: center;
  }
</style>
