<template>
  <div id="part44">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="联系我们" name="联系我们">
        <el-row>
          <el-col v-for="(item,index) in list" :key="index" class="first">
            <el-col class="title1" :span="2" :offset="2">
              <div class="font">{{item.name}}</div>
            </el-col>
            <el-col
              style="float:left"
              class="detail"
              :span="6"
              :offset="3"
              v-for="(ite,inde) in item.contactcontents"
              :key="inde"
            >
              <div class="font" style="margin-top:60px">{{ite.title}}</div>
              <br />
              <div>
                <!-- <img  v-if="ite.icon.url == null"   :src="baseURL.DATAURL+ite.icon.url" /> -->
                <span class="font2">{{ite.content}}</span>
              </div>
            </el-col>
            <el-col :offset="7" :span="14" style="border-bottom: 1px solid #e0e0e0;margin-top:1%;"></el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="方案资询" name="方案资询">
        <el-row>
          <el-col v-for="(item,index) in list" :key="index" class="first">
            <el-col
              class="title1"
              :span="2"
              :offset="2"
            >
              <div class="font">{{item.name}}</div>
            </el-col>
            <el-col
              style="float:left"
              class="detail"
              :span="6"
              :offset="3"
              v-for="(ite,inde) in item.contactcontents"
              :key="inde"
            >
              <div class="font" style="margin-top:60px">{{ite.title}}</div>
              <br />
              <div>
                <!-- <img  v-if="ite.icon.url == null"   :src="baseURL.DATAURL+ite.icon.url" /> -->
                <span class="font2">{{ite.content}}</span>
              </div>
            </el-col>
            <el-col :offset="7" :span="14" style="border-bottom: 1px solid #e0e0e0;margin-top:1%;"></el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="运营活动" name="运营活动">
        <el-row>
          <el-col v-for="(item,index) in list" :key="index" class="first">
            <el-col
              class="title1"
              :span="2"
              :offset="2"
            >
              <div class="font">{{item.name}}</div>
            </el-col>
            <el-col
              style="float:left"
              class="detail"
              :span="6"
              :offset="3"
              v-for="(ite,inde) in item.contactcontents"
              :key="inde"
            >
              <div class="font" style="margin-top:60px">{{ite.title}}</div>
              <br />
              <div>
                <!-- <img  v-if="ite.icon.url == null"   :src="baseURL.DATAURL+ite.icon.url" /> -->
                <span class="font2">{{ite.content}}</span>
              </div>
            </el-col>
            <el-col :offset="7" :span="14" style="border-bottom: 1px solid #e0e0e0;margin-top:1%;"></el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="服务支持" name="服务支持">
        <el-row>
          <el-col v-for="(item,index) in list" :key="index" class="first">
            <el-col
              class="title1"
              :span="2"
              :offset="2"
            >
              <div class="font">{{item.name}}</div>
            </el-col>
            <el-col
              style="float:left"
              class="detail"
              :span="6"
              :offset="3"
              v-for="(ite,inde) in item.contactcontents"
              :key="inde"
            >
              <div class="font" style="margin-top:60px">{{ite.title}}</div>
              <br />
              <div>
                <!-- <img  v-if="ite.icon.url == null"   :src="baseURL.DATAURL+ite.icon.url" /> -->
                <span class="font2">{{ite.content}}</span>
              </div>
            </el-col>
            <el-col :offset="7" :span="14" style="border-bottom: 1px solid #e0e0e0;margin-top:1%;"></el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="故障运维" name="故障运维">
        <el-row>
          <el-col v-for="(item,index) in list" :key="index" class="first">
            <el-col
              class="title1"
              :span="2"
              :offset="2"
            >
              <div class="font">{{item.name}}</div>
            </el-col>
            <el-col
              style="float:left"
              class="detail"
              :span="6"
              :offset="3"
              v-for="(ite,inde) in item.contactcontents"
              :key="inde"
            >
              <div class="font" style="margin-top:60px">{{ite.title}}</div>
              <br />
              <div>
                <!-- <img  v-if="ite.icon.url == null"   :src="baseURL.DATAURL+ite.icon.url" /> -->
                <span class="font2">{{ite.content}}</span>
              </div>
            </el-col>
            <el-col :offset="7" :span="14" style="border-bottom: 1px solid #e0e0e0;margin-top:1%;"></el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getApplication } from "../../api/application.js";
import { getcontacts } from "../../api/CMSApi.js"; //cms
import baseURL from "../../api/app.js";
export default {
  data() {
    return {
      baseURL: baseURL,
      activeName: "联系我们",
      list: [
        {
          contactcontents: []
        }
      ],
      // contactcontents: [],
      list2: [],
      list3: [],
      list1: []
    };
  },
  methods: {
    //获取cms数据
    getcontacts(name) {
      const data = { type: name };
      getcontacts(data).then(r => {
        console.log(r);
        console.log(data);
        this.list = r;
      });
    },
    imageUrl(url) {
      return URL + url;
    },
    handleClick(tab, event) {
      this.activeName = "联系我们"; //暂时写死，需要添加数据时注释
      this.getcontacts(this.activeName);
    }
  },
  created() {
    this.getcontacts(this.activeName);
  }
};
</script>
<style lang="scss" scoped>
#part44 {
  background-color: #fff;
}
.size1 {
  height: 300px;
}
.title:first-child {
  margin-top: 10%;
}
.detail {
  font-size: 14px;
}
/deep/.el-tabs__item.is-top:nth-child(2) {
  padding-left: 7% !important;
}
/deep/.el-tabs__header {
  overflow: hidden;
  width: 942px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  box-shadow: #86898b 2px 2px 5px;
  // border: 1px solid #333;
  margin-top: -40px;
  background: #fff;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  cursor: pointer;
  z-index: 9999;
  top: -3px;
}
/deep/.el-tabs__nav-wrap::after {
  width: 0;
}
/deep/.el-tabs__active-bar {
  background-color: #fff;
}
/deep/.el-tabs__item {
  padding: 0 66px;
}
.font {
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.font2 {
  font-family: Arial;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.title1 {
  margin-top: 6%;
  margin-bottom: 17%;
  float: left;
}
@media screen and (max-width: 1024px) {
  .title1{
    margin-bottom: 19%;
  }
}
</style>