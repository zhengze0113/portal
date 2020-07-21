<template>
  <div id="app">
    <!-- <el-carousel indicator-position="outside">
      <el-carousel-item v-for="pic in pics" :key="pic">
        <img :src="pic" alt="" style="width:100%">
      </el-carousel-item>
    </el-carousel>-->
    <el-row class="head">
      <div class="headtitle">帮助中心</div>
      <div class="headtitle1">
        是中国海油依托分布于全国的网络节点搭建的一层虚拟网络，提供低延迟、
        <br />高并发、高清流畅的观看体验。
      </div>
      <el-tabs v-model="activeName" style="width:100%;position:relative;top:330px;">
        <el-tab-pane label="热门文档" name="first">
          <el-row>
            <el-col :span="20" :offset="2">
              <el-row :span="24">
                <el-col>
                  <el-col
                    class="hotList"
                    v-for="(item,index) in list"
                    :key="index"
                    @click.native="link(item.id)"
                  >
                    <el-row class="hotItem">
                      <div>
                        <el-col :span="12">
                          <img :src="baseURL.DATAURL+item.cover.url" class="head-img" />
                        </el-col>
                        <el-col :span="11" :offset="1">
                          <p class="firstTitle">{{item.parentTitle}}</p>
                          <span class="secondTitle">{{item.description}}</span>
                        </el-col>
                      </div>
                    </el-row>
                  </el-col>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import baseURL from "../../api/app";
import { requestParams, parseHash } from "../../utils/urlParam";
import { getHelpArticle } from "../../api/helpCMS";
export default {
  name: "App",
  components: {},
  data: function() {
    return {
      activeName: "first",
      list: [],
      baseURL: baseURL
    };
  },
  created() {
    this.getArtic();
  },
  mounted() {},
  methods: {
    async getArtic() {
      var search = { isHotDocument: true };
      const res = await requestParams(getHelpArticle, search);
      console.log(res);
      this.list = res;
    },
    link(id) {
      console.log(id);
      location.href = "/html/documentDetails.html?_id=" + id;
    }
  }
};
</script>

<style lang="scss" scoped>
body {
}
.hotList {
  width: 32%;
  margin-right: 2%;
  &:nth-child(3n) {
    margin-right: 0px;
  }
  .hotItem {
    margin-top: 10px;
    background: #fff;
  }
}
/deep/ .el-tabs__header {
  margin: 0 8.4% 0;
  width: 83.3%;
}
.head-img {
  margin: 10px 10px;
  width: 100%;
  height: 90px;
}
.firstTitle {
  width: 90%;
  height: 20px;
  color: #666666;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  font-weight: 290;
  line-height: 20px;
  margin-top: 10px;
  margin-left: 5%;

  // text-align: center;
}
.secondTitle {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; //规定几行显示省略号
  -webkit-box-orient: vertical;
  color: #999999;
  font-family: "Microsoft YaHei";
  font-size: 12px;
  font-weight: 290;
  line-height: 19px;
  margin-top: 10px;
  // display: block;
  margin-left: 5%;
}
.head {
  background-image: url("/web/static/images/help.png");
  background-position: 100% 100%;
  background-repeat: no-repeat;
  width: auto;
  height: 55rem;
}
.headtitle {
  /* width: 240px;
  height: 80px; */
  /* filter: blur(10px); */
  color: #fbfbfb;
  font-family: "Microsoft YaHei";
  font-size: 40px;
  font-weight: 290;
  line-height: 80px;
  text-align: center;
  position: relative;
  top: 200px;
}
.headtitle1 {
  color: #fbfbfb;
  font-family: "Microsoft YaHei";
  font-size: 20px;
  font-weight: 290;
  line-height: 32px;
  text-align: center;
  position: relative;
  top: 200px;
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
  /*
    line-height: 420px;
*/
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
