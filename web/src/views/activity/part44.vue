<template>
  <div id="part44">
    <el-row class="content">
      <el-col :span="20" :offset="2" style="background:white;">
        <el-row style="position:relative">
          <el-col :span="20" :offset="2">
            <el-tabs v-model="activeName" id="tabs" @tab-click="handleClick" stretch>
              <el-tab-pane
                :label="item1.label"
                :name="item1.name"
                v-for="(item1, index1) in list"
                :key="index1"
              >
                <el-row
                  style=" border-bottom: solid 1px #e0e0e0;margin-top:10px;"
                  class="bord"
                  v-for="(item, index) in list1"
                  :key="index"
                >
                  <el-col :span="18" style>
                    <div style>
                      <div style="font-size:20px;margin-bottom:10px;">
                        {{ item.name }}
                      </div>
                      <div :class="[click == index ? 'detailA' : 'detail']">
                        {{ item.description }}
                      </div>
                    </div>
                    <el-row style="margin:10px 0 0px;">
                      <el-col :span="5">{{ item.author }}</el-col>
                      <el-col :span="5">{{
                        (item.createdAt || "").split("T")[0]
                      }}</el-col>
                      <el-col :span="5" :offset="6">
                        <input
                          type="button"
                          class="btn1"
                          @click="show(index)"
                          :value="[click == index ? '收起' : '查看全部']"
                        />
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <div>
                      <img
                        :src="baseURL.DATAURL + item.cover[0].url"
                        style="height:100px;display:inline-block;width:100%"
                        alt
                      />
                    </div>
                  </el-col>
                </el-row>

                <el-button
                  style="width:100%;margin:15px 0px;"
                  v-show="isshow"
                  @click="more"
                  >查看更多</el-button
                >
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getActivityList } from "../../api/activity";
import baseURL from "../../api/app";
import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from "../../utils/urlParam";
export default {
  data() {
    return {
      activeName: "first",
      isActive: true,
      isshow: true,
      baseURL: baseURL,
      list: [
        {
          label: "最新活动",
          name: "first"
        },
        {
          label: "全部活动",
          name: "second"
        },
        {
          label: "活动事件",
          name: "third"
        },
        {
          label: "重要通知",
          name: "fourth"
        },
        {
          label: "产品公告",
          name: "fifth"
        }
      ],
      list1: [],
      click: -1,
      search: { type: 1, _limit: 1, label: undefined }
    };
  },
  created() {
    this.getActivity(undefined, 1, 5);
    if (this.getId("tab") == null) this.activeName = "first";
    else this.activeName = this.getId("tab");
    this.iShash();
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
    handleClick(tab, event) {
      this.refresh();
      var index = undefined;
      var limit = 5;
      var label = 1;
      switch (tab.name) {
        case "first":
          index = undefined;
          break;
        case "second":
          index = undefined;
          label = undefined;
          break;
        case "third":
          index = "1";
          label = undefined;
          break;
        case "fourth":
          index = "2";
          label = undefined;
          break;
        case "fifth":
          index = "3";
          label = undefined;
          break;
      }
      this.getActivity(index, label, limit);
    },
    show(index) {
      if (this.click == index) {
        this.click = -1;
      } else {
        this.click = index;
      }
    },
    iShash() {
      console.log(/tabs/.test(location.href));
      if (/tabs/.test(location.href)) {
        setTimeout(() => {
          window.location.hash = "#tabs";
        }, 1500);
      }
    },
    async more() {
      if (this.search._limit > this.list1.length) {
        // this.$message("没有更多了");
        this.isshow = false;
      } else {
        this.search._limit += 5;

        this.morealign();
      }

      const res = await requestParams(getActivityList, this.search);
      this.list1 = res;
    },
    async refresh() {
      this.isshow = true;
      this.search._limit = 5;
      const res = await requestParams(getActivityList, this.search);
      this.list1 = res;
      if (this.search._limit > this.list1.length) {
        // this.$message("没有更多了");
        this.isshow = false;
      }
    },
    morealign() {
      if (this.search._limit > this.list1.length) {
        // this.$message("没有更多了");
        this.isshow = false;
      }
    },
    async getActivity(index, label, limit) {
      this.search.type = index;
      this.search.label = label;
      this.search._limit = limit;
      const res = await requestParams(getActivityList, this.search);
      this.list1 = res;
    }
  }
};
</script>
<style lang="scss" scoped>
#part44 {
  background: #f3f3f3;
}
/deep/ .el-tabs__item {
  font-size: 20px;
  // padding: 0 54px;
  // width: 3 0%;
  margin: 18px 0;
}
.detail {
  font-size: 15px;
  height: 20px;
  overflow: hidden;
}
.detailA {
  font-size: 15px;
}

.btn1 {
  text-align: center;
  border: solid 1px #0261a7;
  background: #fff;
  border-radius: 3px;
  padding: 2px 2px;
  width: 151.89px;
  height: 34px;
  color: #0261a7;
  font-family: "PingFangSC-Regular";
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
}

.content {
  top: -40px;
  z-index: 10;
  position: relative;
}
.bord:last-child() {
  position: relative;
}
</style>
