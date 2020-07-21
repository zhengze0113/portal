<template>
  <div id="part44">
    <el-row style="background: white;">
      <el-row>
        <el-col
          :offset="2"
          :span="20"
          style="border-bottom:1px solid rgba(224, 224, 224, 1);    margin-top: 8%;"
        >
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item style="cursor:pointer;" @click.native="jump()">
              应用案例
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{
              applicationObject.name
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <el-col style="margin-top: 20px;" :offset="2" :span="20">
        <el-col :span="4">
          <div class="aa">
            <img
              class="image"
              style="height:60px"
              :src="baseURL.DATAURL + applicationObject.cover.url"
              alt
            />
          </div>
          <h2 style="margin: 20% 0;">
            {{ applicationObject.name }}
          </h2>
        </el-col>
        <el-col :offset="1" :span="11">
          <p v-html="applicationObject.content" />
        </el-col>
        <el-col :span="1" style="height:100%">
          <el-divider direction="vertical" />
        </el-col>
        <el-col :offset="1" :span="6">
          <h2 style="font-size:16px;">
            其他案例
          </h2>
          <br />
          <el-row
            v-for="(item, index) in elseApplication"
            :key="index"
            style="margin-top:20px;"
          >
            <div @click="linkApplication(item.id)">
              <el-col class="cc">
                <el-col :span="4">
                  <img
                    class="image1"
                    :src="baseURL.DATAURL + item.cover.url"
                    alt
                  />
                </el-col>
                <el-col :offset="3" :span="17" style="font-size:12px;">
                  <div style="" class="detail">
                    &emsp;{{ item.description }}
                  </div>

                  <div style="margin-top:17px;margin-bottom: 17px;">
                    <span class="service">案例名称：</span>

                    <span class="cloud">{{ item.name }}</span>
                  </div>
                </el-col>
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getApplicationInfo, getApplication } from "../../api/application.js";
import baseURL from "../../api/app.js";
export default {
  data() {
    return {
      list: [],
      applicationObject: { name: "", cover: { url: "" } },
      baseURL: baseURL,
      id: "",
      elseApplication: []
    };
  },
  created() {
    this.getApplictionInfo(this.getId("id"));
    this.getApplicationAll();
  },
  methods: {
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    getApplictionInfo(id) {
      this.id = id;
      getApplicationInfo(id).then(r => {
        this.applicationObject = r;
      });
    },
    getApplicationAll() {
      getApplication().then(r => {
        for (let i = 0; i < r.length; i++) {
          if (this.id != r[i].id) this.elseApplication.push(r[i]);
        }
      });
    },
    linkApplication(id) {
      window.location.href = "/html/caseDetails.html?id=" + id;
    },
    jump() {
      window.location.href = "/html/about.html?tab=third";
    }
  }
};
</script>
<style lang="scss" scoped>
.a1 {
  width: 110px;
  height: 170px;
  // border: 1px solid rgba(224, 224, 224, 1);
  text-align: center;
  font-size: 12px;
}

.aa {
  height: 145px;
  border: 1px solid #e0e0e0;
  text-align: center;
  display: table-cell;
  width: 10000px;
  vertical-align: middle;
}

.image1 {
  width: 100%;
  margin-top: 42%;
  margin-left: 25%;
}

.el-breadcrumb {
  font-size: 14px;
  line-height: 4;
}

.cloud {
  color: #0261a7;
  font-size: 12px;
}

.size {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}

.cc {
  box-shadow: 0 0 6px -5px;
}
.cc:hover {
  /*box-shadow: darkgrey 0px 0px 2px;*/
  box-shadow: 0 0 10px -5px;
  cursor: pointer;
}
.detail {
  margin-top: 19px;
  padding-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

/deep/ .el-breadcrumb__inner {
  color: #409eff;
}

/deep/ .el-divider--vertical {
  height: 70rem;
  margin: -20px 45px;
}
@media screen and (max-width: 1024px) {
  .el-breadcrumb {
    margin-top: 2%;
  }
  /deep/ .el-divider--vertical {
    height: 82rem;
  }
}
</style>
