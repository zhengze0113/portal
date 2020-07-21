<template>
  <!-- 特色服务 -->
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in service"
        :key="index"
        :span="6"
        :class="isShow ? 'second' : 'first'"
        style="margin-bottom:10px;"
        @mouseenter.native="enter()"
      >
        <el-row class="top">
          <img class="image" :src="baseURL.DATAURL + item.image.url" />
        </el-row>
        <el-row class="box" style="padding-left:15px;padding-right:15px;">
          <span class="detail">{{ item.title }}</span>
          <span class="details">{{ item.detail }}</span>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getservices } from "../../api/CMSApi.js"; //cms
import baseURL from "../../api/app.js";
export default {
  data() {
    return {
      baseURL: baseURL,
      isShow: true,
      service: []
    };
  },
  created() {
    this.getservices();
  },
  methods: {
    //获取cms数据
    getservices() {
      getservices().then(r => {
        this.service = r;
      });
    },
    enter() {
      this.isShow = false;
    },
    imageUrl(url) {
      return URL + url;
    }
  }
};
</script>
<style lang="scss" scoped>
.second:first-child {
  img {
    transform: translate(0%, 2%);
    filter: none;
    -webkit-filter: grayscale(0);
  }
  .detail {
    top: 107%;
  }
  .box {
    visibility: visible;
    transform: translate(0%, -16%);
  }
  .box span {
    visibility: visible;
  }
}
.detail {
  width: 100%;
  // position: absolute;
  // top: 73%;
  display: block;

  font-size: 18px;
  // left: 50%;
  // transform: translate(-50%, -50%);
  z-index: 9999;
  color: #fff;
}
.box {
  background: gray;
  width: 100%;
  transform: translate(0%, -70%);
  padding-top: 52px;
  visibility: hidden;
  padding-bottom: 15px;
}
.details {
  color: #fff;
  font-size: 12px;
  visibility: hidden;
}
.image {
  width: 100%;
  position: relative;
  transform: translate(0%, 27%);
  z-index: 9999;
  // filter: gray; /* IE6-9 */
  // -webkit-filter: grayscale(1); /* Webkit */
}

.second {
  text-align: center;
  position: relative;
  height: 320px;
}

.first {
  text-align: center;
  position: relative;
  height: 320px;
}
.first:hover img {
  transform: translate(0%, 2%);
  transition: 0.5s;
  // filter: none;
  // -webkit-filter: grayscale(0);
}
.first:hover .detail {
  transition: 0.5s;
  top: 107%;
}
.first:hover .box {
  visibility: visible;
  transform: translate(0%, -16%);
  transition: 0.5s;
}
.first:hover .box span {
  visibility: visible;
  transition: 0.5s;
}
</style>
