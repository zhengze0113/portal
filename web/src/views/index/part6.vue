<template>
  <div id="part6" style="padding-bottom:40px;">
    <el-row :gutter="20">
      <el-col :span="18" :offset="3" class="el_item">
        <div style="text-align:center;margin-top:60px;margin-bottom: 60px ;">
          <div class="title" style="padding-top:20px;">
            应用案例
          </div>
          <div class="content">
            针对不同用户、不同应用场景、不同业务需求、中海油为您提供全方位的一站式解决方案专属服务
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div>
          <el-row>
            <el-col v-for="(item, index) in applicaitonList" :key="index" :span="6" class="a">
              <div @click="linkApplication(item.id)">
                <el-card shadow="hover" style="padding-bottom: 25px;cursor: pointer;">
                  <el-row>
                    <el-col>
                      <div style="height:30px;" class="tags">
                        <div v-for="(item1, index1) in tag(item.tags) " style="float:left;margin-left:10px;">
                          <el-tag type="info" color="#fff">
                            {{ item1 }}
                          </el-tag>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <img :src="baseURL.DATAURL+item.cover.url" class="image">
                      <div class="centered">
                        <span style="margin-top:10px">{{ item.name }}</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col style="height:50px">
                      <time class="time">{{ item.description }}</time>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-button type="text" class="button">
                        查看详情
                        <i class="el-icon-right" />
                      </el-button>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { getApplication } from '../../api/application.js';
import baseURL from '../../api/app.js';

export default {
  data() {
    return {
      baseURL : baseURL,
      currentDate: new Date(),
      applicaitonList:[]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    about3() {
      location.href = '';
    },
    async fetchData() {
      getApplication().then(r => {
        this.applicaitonList = r;
      });
    },
    tag(str){
      if(str === undefined) return [];
      return str.split(',');
    },
    linkApplication(id){
      window.location.href='/html/caseDetails.html?id='+id;
    }
    // imgUrl(url) {
    //   if (url === undefined) {
    //     return "";
    //   } else {
    //     var port = "http://47.104.109.255:1337";
    //     return port + url.url;
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.tags{
  .el-tag{
    height: 30px;
  }
}
#part6 {
  background: #ffffff;
}
.el_item {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.time {
  font-size: 13px;
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: left;
}

.image {
  width: 40px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.headline {
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
}
.two_content {
  font-family: "Microsoft YaHei";
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  display: block;
}
.centered {
  line-height: 100px; /*让黄色div中的文字内容垂直居中*/
  text-align: center; /*让文字水平居中*/
  position: absolute;
  top: 50%;
  margin-top: -50px;
  margin-left: 30%;
}
.title {
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
}
.content {
  color: #666666;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  line-height: 26px;
  margin-top: 20px;
  font-size: 18px;
}
.a .el-card{
  border:0;
  border-right: 1px solid #f0f0f0;
  border-bottom:1px solid #f0f0f0;
  border-radius: 0
}
.a:nth-child(4n) .el-card{
  border-right: 0;
}
// .a:nth-child(3n) .el-card{
//   border-right: 0;
// }
// .a:nth-child(7) .el-card{
//   border-bottom: 0;
// }
// .a:nth-child(8) .el-card{
//   border-bottom: 0;
// }
// .a:nth-child(9) .el-card{
//   border-bottom: 0;
// }
</style>
