<template>
  <div id="part5">
    <el-row>
      <el-row style="background:white;height:auto;">
        <el-col :span="20" :offset="2"  style="padding-top:20px;">
          <div style="text-align:center;margin-top:60px;margin-bottom: 60px ;" v-for="(item, index) in applicationArray" :key="index">
            <div class="title">{{item.title1}}</div>
            <div class="content">{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:rgb(245, 245, 245); ">
        <el-col :span="20" :offset="2">
          <div class="out_container">
            <div class="in_container">
              <swiper :options="swiperOption" >
                <swiper-slide class="background" v-for="(item, index) in applicationArray" :key="index">
                  <img class="img1" v-bind:src="baseURL.DATAURL+item.media.url"/>
                  <h3
                    style="text-align:center;margin-top:40px;margin-bottom:15px;"
                  >{{item.title}}</h3>
                  <div
                    style="font-size:14px;color:#999;width:80%;margin-left:10%;text-align:left;"
                  >{{item.text}}</div>
                </swiper-slide>
              </swiper>
              <!-- <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { getApplication } from "../../api/application.js";
import { getproductadvantages } from "../../api/CMSApi.js"; //cms
import  baseURL  from "../../api/app.js"; 

export default {
  data() {
    return {
      baseURL:baseURL,
      swiperOption: {
        slidesPerView: 4, // 水平面上显示几张
        spaceBetween: 13, //间距
        slidesOffsetBefore: 1, //与左边框的偏移量
        //放大缩小，始终显示4个
        observer: true,
        observeParents: true,
        //左右箭头按钮是否启用
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      class1: "teamlistimg",
      class2: "teamlistimg1",
      advantage: [
        {
          pic: "../../../../web/static/images/index/bianzu1.png",
          title: "企业应用",
          detail: "支持微服务构架，安全兼容Kuberne"
        },
        {
          pic: "../../../../web/static/images/index/bianzu2.png",
          title: "基础软件",
          detail: "支持微服务构架，安全兼容Kuberne"
        },
        {
          pic: "../../../../web/static/images/index/bianzu3.png",
          title: "专业服务",
          detail: "支持微服务构架，安全兼容Kuberne"
        },
        {
          pic: "../../../../web/static/images/index/bianzu4.png",
          title: "解决方案",
          detail: "支持微服务构架，安全兼容Kuberne"
        },
        {
          pic: "../../../../web/static/images/index/bianzu1.png",
          title: "企业应用",
          detail: "支持微服务构架，安全兼容Kuberne"
        }
      ],
      applicationArray: []
    };
  },
  methods: {
    //获取cms数据
    getproductadvantages() {
      getproductadvantages().then(r => {
        // console.log(r);
        this.applicationArray=r;
      });
    },
    imageUrl(url) {
      return URL + url;
    }
  },
  created() {
    this.getproductadvantages();
  }
};
</script>
<style scoped>
.background {
  /* border: solid 1px #dedede; */
  background-color: #ffffff;
  /* margin-right: 1%; */
  /* width: 24%; */
  width: 274.75px;
  height: 337px;
  padding-bottom:10px;
  /* border: solid 1px #dedede; */
  background: #ffffff;
  margin-top: 5%;
  margin-bottom: 2%;
  text-align: center;
  /* cursor: pointer; */
}
.background:hover {
  transform: translate(0, -30px);
  transition: 0.5s;
  box-shadow: darkgrey 2px 2px 16px;
}
.part4 {
  height: auto;
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
  margin-top: 20px;
  font-size: 18px;
}
.img1 {
  height: 25%;
  margin-top: 22%;
  line-height: 80px;
  display: inline-block;
}
.out_container {
  position: relative;
}
.in_container {
  width: 100%;
  overflow-x: hidden;
}
.swiper-button-prev {
  left: -30px;
  background-image: url("../../../../web/static/images/index/left1.png");
  background-size: 27px 27px;
}
.swiper-button-next {
  right: -30px;
  background-image: url("../../../../web/static/images/index/right1.png");
  background-size: 27px 27px;
}
</style>
