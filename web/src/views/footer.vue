<template>
  <div>
    <el-row :gutter="20" style="height:300px;background:#202127; box-sizing: border-box;">
      <el-col
        :span="5"
        :offset="1"
        style="height:200px;border-right:1px solid #4d4f5a;margin-top:2%;"
      >
        <!--style="height:200px;border-right:1px solid #4d4f5a;margin-top:2%;"-->
        <div class="grid-content bg-purple">
          <div style="height:215px;display: table-cell;vertical-align: middle;text-align:center;">
            <img src="/web/static/images/footer_logo.png" alt style="width:80%;">
          </div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <el-row :gutter="20">
            <el-col :span="4" :offset="2" style="margin-top:5%;">
              <div class="grid-content bg-purple bigfont">
                支持与服务
              </div>
              <div class="samllfont" @click="about()">
                关于我们
              </div>
              <div class="samllfont" @click="contact()">
                联系我们
              </div>
              <div class="samllfont" @click="law()">
                法律声明
              </div>
              <div class="samllfont" @click="help()">
                帮助中心
              </div>
            </el-col>
            <el-col :span="4" style="margin-top:5%;">
              <div class="grid-content bg-purple bigfont">
                快速入口
              </div>
              <div class="samllfont" @click="activity()">
                活动事件
              </div>
              <div class="samllfont" @click="important()">
                重要通知
              </div>
              <div class="samllfont" @click="product()">
                产品公告
              </div>
              <div class="samllfont" @click="caseDetails()">
                客户案例
              </div>
            </el-col>
            <el-col :span="4" style="margin-top:5%;">
              <div class="grid-content bg-purple bigfont">
                资源和社区
              </div>
              <!-- <div class="samllfont">云社区</div> -->
              <div class="samllfont" @click="help()">
                帮助文档
              </div>
            </el-col>
            <el-col :span="4" style="margin-top:5%;">
              <div class="grid-content bg-purple bigfont">
                友情链接
              </div>
              <div class="samllfont" @click="about1">
                中国海洋石油集团有限公司
              </div>
              <div class="samllfont" @click="contact1">
                中海油田服务股份有限公司
              </div>
            </el-col>
            <el-col :span="4" style="margin-top:5%;">
              <div class="grid-content bg-purple bigfont" style="margin-left:4px;">
                关注我们
              </div>
              <img>
              <img style="width: 100px;" src="/web/static/images/logoCode.png" alt>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenWidth: '',
      screenHeight: '',
      list: ['关于我们', '联系我们', '法律声明', '帮助中心'],
      number: [1, 2, 3, 4],
      header: ['支持与服务', '快速入口', '资源和社区', '友情链接', '关注我们']
    };
  },
  mounted() {
    // this.screenWidth = document.documentElement.clientWidth;
    // this.screenHeight = (document.documentElement.clientHeight * 0.5) + 'px';
    // window.onresize = () => {
    //   return (() => {
    //     this.screenWidth = document.documentElement.clientWidth;
    //     this.screenHeight = document.documentElement.clientHeight;
    //   })();
    // };
  },
  methods: {
    activity() {
      location.href = '/html/activity.html?tab=third#tabs';
    },
    important() {
      location.href = '/html/activity.html?tab=fourth#tabs';
    },
    product() {
      location.href = '/html/activity.html?tab=fifth#tabs';
    },

    law() {
      location.href = '/html/law.html';
    },
    about() {
      location.href = '/html/about.html';
    },
    contact() {
      location.href = '/html/contact.html';
    },
    about1() {
      location.href = 'https://www.cnooc.com.cn/';
    },
    contact1() {
      location.href = 'https://www.cosl.com.cn/';
    },
    caseDetails() {
      location.href = '/html/about.html?tab=third#tabs';
    },
    help() {
      location.href = '/html/help.html';
    }
  }
};
</script>
<style>
#footer {
  background: #202127;
  height: 250px;
}
.header {
  display: inline;
  position: relative;
  color: #fff;
  margin-right: 50px;
  list-style: none;
  left: 1%;
  top: 1%;
}
.headerul {
  position: relative;
  top: -33%;
  left: 25%;
  display: inline-block;
  font-size: 16px;
}
.footul {
  position: relative;
  top: 7%;
  left: -19%;
  display: inline-block;
  margin-right: 18px;
  font-size: 14px;
}
.foot {
  position: relative;
  color: #fff;
  margin-right: 50px;
  list-style: none;
  left: 1%;
  top: 1%;
  margin-top: 5px;
}
.img {
  display: inline-block;
  position: relative;
  top: 3%;
  left: 20%;
}
.footspan {
  display: inline-block;
  height: 120px;
  border-right: 1px solid #d8d8d8;
  position: relative;
  left: 22%;
  top: 17%;
}
.erweima {
  position: relative;
  left: 77%;
  top: -26%;
}
.banquan {
  display: inline-block;
  position: relative;
  left: 36%;
  bottom: 10%;
  color: rgb(95, 96, 100);
  font-size: 14px;
}
.bigfont {
  color: #fff;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 800;
}
.samllfont {
  color: #fff;
  font-size: 12px;
  margin-bottom: 4px;
  margin-left: 4px;
  cursor: pointer;
}
</style>
