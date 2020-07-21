<template>
  <div id="app">
    <div style="position:relative;width:100%;height:100%;background:#f3f3f3;">
      <img :src="baseURL.DATAURL+list[0].cover.url" alt="" style="width:100%;height:100%;">
      <div style="position:absolute;top:50%;left:45%;color:#ffffff;">
        <div style="font-size:38px;">
&nbsp;{{ list[0].title }}
        </div>
        <div style="font-size:14px;">
          {{ list[0].message }}
        </div>
      </div>
    </div>     
  </div>
</template>
<script>
import { getrRecommendationsType,getRecommendationarrays } from '../../api/CMSApi';
import { requestParams, parseHash } from '../../utils/urlParam';
import baseURL from '../../api/app.js';
export default {
  name: 'App',
  components: {
   
  },
  data: function () {
    return {
      baseURL:baseURL,
      list:{
        cover:{url:''}
      }     
    };
  },
  mounted() {
    // this.toggleSelection([this.tableData[0], this.tableData[1]]);
  },
  created() {
    this.fetchData();
  },
  methods:{
    async fetchData(){
      let params={recordID:null};
      const res=await requestParams(getrRecommendationsType);
      for (let i = 0; i < res.length; i++) {
        if(res[i].type=='新闻中心'){
          params.recordID=res[i].id;
        }
        
      }
      const list=await requestParams(getRecommendationarrays,params);
      this.list=list;
    },
  }
};
</script>



<style>
body{
  
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
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
