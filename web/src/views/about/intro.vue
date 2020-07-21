<template>
<!-- 公司概览 -->
  <div>
    <el-row>
      <el-col v-for="(item,index) in service" :key="index">
        <el-row
          style="margin:60px 0 0 24px;font-size:12px;"
        >{{item.title}}</el-row>
        <el-row style="text-align:center;margin-top:60px;color: #666666">
          <span class="title">{{item.title1}}</span>{{item.title2}}
          <span class="title">{{item.title3}}</span>
        </el-row>
        <el-row
          style="margin:60px 0 0 24px;font-size:12px;"
        >{{item.title4}}</el-row>
        <el-row style="margin-top:60px">
          <el-col :span="12">
            <div style="font-weight:bold;font-size:14px;line-height:21px;margin-bottom:15px">{{item.title5}}</div>
            <div style="font-weight:Regular;font-size:12px;line-height:21px;color: #666666">
              &emsp;&emsp;{{item.detail}}<br />
              &emsp;&emsp; {{item.detail1}}<br />
              &emsp;&emsp;{{item.detail2}}<br />
              &emsp;&emsp;{{item.detail3}}
            </div>
          </el-col>
          <el-col :span="9" :offset="3">
              <img v-bind:src="baseURL.DATAURL+item.media.url" alt="" style=" height:290px;margin-top:40px;">
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getintros } from "../../api/CMSApi.js"; //cms
import baseURL from "../../api/app.js";
export default {
  data: function() {
    return {
      baseURL: baseURL,
      service:[]
    };
  },
  methods: {
    //获取cms数据
    getintros() {
      getintros().then(r => {
        this.service = r;
      });
    },
    imageUrl(url) {
      return URL + url;
    }
  },
  created() {
    this.getintros();
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 30px;
  color: #0261a7;
}
@media screen and (max-width: 1024px) {
  img{
    width:100%;
  }
}
</style>
