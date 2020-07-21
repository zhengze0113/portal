<template>
  <div id="part4">
    <!--还有云产品--->

    <el-row>
      <el-col :span="20" :offset="2" style="background:white;">
        <el-col :span="24" style="text-align:center;margin:60px 0;margin-bottom: 50px;">
          <div class="cnooc"  style="padding-top:20px;">海油云产品</div>
          <div class="network">
            云网融合 &nbsp;&nbsp;&nbsp;&nbsp;安全可信
            &nbsp;&nbsp;&nbsp;&nbsp; 专享定制
          </div>
        </el-col>

        <el-row>
          <el-col :span="24" :offset="0">
            <el-tabs stretch @tab-click="handleNodeClick">
              <el-tab-pane v-for="(item, index) in list" :key="index">
                <div
                  class="hovertitle cas"
                  style="margin-right:0%;"
                  slot="label"
                  @click="activeName='first'"
                >
                  <img class="cloudimg" :src="'../../../../web/static/images/img'+(index+1)+'.png'" />
                  <div class="title3">{{item.name}}</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="background-image: url(../../../../web/static/images/index/beijing.jpg)">
        <el-col :span="20" :offset="2" style="margin-top: 40px;margin-bottom: 40px;">
          <div>
            <el-col :span="12" class="span12" style v-for="(item, index) in list1" :key="index">
              <div v-if="index<2" style="background:white;padding:20px;" class="span11">
                <div style="height:30px;">
                  <span class="title1">{{item.name}}</span>

                  <el-tag style="margin-left:10px;" effect="dark" type="danger" size="small">特惠</el-tag>
                  <el-tag style="margin-left:10px;" effect="dark" type="danger" size="small">热销</el-tag>
                </div>
                <div class="title2">{{item.description}}</div>
                <div>
                  <el-button size="small" @click="checkbuy(item.id)" type="primary">立即开通</el-button>
                  <el-button size="small" @click="check(item.id)">查看详情</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="24" style="margin-top:20px;">
              <el-col :span="8" class="backgroundtitle" v-for="(item, index) in list3" :key="index">
                <div class="title" @click="ches(item.id)">
                  <div class="title1">{{item.name}}</div>
                  <div class="div1title">
                    <span class="title2">{{item.description}}</span>
                  </div>
                </div>
              </el-col>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getcloudServiceCatalogList, // 获取目录
  getServiceSubdirectoryMessage // 获取子目录
} from "../../api/serviceOperating";
import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from "../../utils/urlParam";
export default {
  data() {
    return {
      listLoading: true,
      innerVisible: false,
      list: [],
      list2: [],
      list3: [],
      list1: [],
      activeName: "first",
      class1: "teamlistimg",
      class2: "teamlistimg1",
      advantage: [
        {
          pic: "@/static/images/img1.png"
        },
        {
          pic: "@/static/images/img2.png"
        },
        {
          pic: "@/static/images/img3.png"
        },
        {
          pic: "@/static/images/img4.png"
        },
        {
          pic: "@/static/images/img5.png"
        }
      ],
      applicationArray: []
    };
  },
  created() {
    this.fetchData();
  },
  mouted() {
    this.activeName = "first";
  },
  methods: {
    // 获取选择父节点id，name
    confirmChoice(data) {
      this.innerVisible = false;
      // console.log(data.id);
      this.contents.levelName = data.name;
      this.contents.parentId = data.id;
    },
    // 显示新建内部模态框
    innerVisiblea() {
      this.innerVisible = true;
    },
    //获取云服务目录
    onSubmit() {
      // console.log("submit!");
    },
    fetchData() {
      this.listLoading = true;
      getcloudServiceCatalogList(this.listQuery).then(response => {
        console.log(response);
        this.list = response.content.content;
        this.huoqu(0); //默认显示
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    //获取子目录
    handleNodeClick(data, node) {
      // console.log(data.index);
      this.huoqu(data.index);
      // console.log(node);
    },
    async huoqu(a) {
      const res = await requestParams(getServiceSubdirectoryMessage,this.list[a].id);
        this.list1 = res.content.content;
        console.log(this.list1);
        // this.list3 = this.list1.splice(2);
        // console.log(this.list3)
    },
    //跳转
    check(id) {
      location.href = "html/productDetail1.html?id=" + id;
    },
    checkbuy(id) {
      location.href = "html/newBuyDetail.html?id=" + id;
    },
    ches(id) {
      location.href = "html/productDetail1.html?id=" + id;
    }
  }
};
</script>
<style lang="scss" scoped>
.title:nth-child(1) {
  padding: 0;
}
//@at-root
.el-tabs__active-bar is-top {
  width: 100px;
}
//移入上浮
.hovertitle:hover {
  z-index: 1;
  transform: translate(0, -15px);
  transition: 0.5s;
}
.span11:hover {
  box-shadow: 0px 2px 10px 0px rgba(0, 63, 123, 0.1);
  cursor: pointer;
  .title1 {
    color: #409eff;
  }
}
.cloudimg {
  width: 63%;
  margin-bottom: -12%;
  margin-top: 12%;
  margin-left: 1%;
}
/deep/.el-tabs__active-bar {
  width: 50px;
}
//标签页下拉
/deep/.el-tabs__header {
  padding: 0;

  margin: 0 0 0px;
}
.span12:first-child {
  padding-right: 10px;
}
/deep/.el-tabs__nav-wrap::after {
  width: 100%;
  height: 2px;
  background-color: 0;
  z-index: 1;
}

.backgroundtitle:hover {
  background: rgb(255, 255, 255);
  box-shadow: 0px 2px 10px 0px rgba(0, 63, 123, 0.1);
  cursor: pointer;
  transition: 0.5s;
  .title1 {
    color: #409eff;
  }
}
.backgroundtitle {
  padding: 15px;
}

.title {
  width: 100%;
  height: 100%;
}

.title1 {
  height: auto;
  font-size: 18px;
}
.title2 {
  height: auto;
  font-size: 14px;
  margin: 20px 1%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  height: 55px;
  text-overflow: ellipsis;
}
.title3 {
  font-size: 18px;
  // margin-left: 14%;
}

#part4 {
  background: #ffffff;
  height: auto;
}
.cnooc {
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-style: normal;
  font-stretch: normal;
  text-transform: none;
  text-decoration: none;
  letter-spacing: 0px;
}
.network {
  margin-top: 20px;
  color: #666666;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-style: normal;
  font-stretch: normal;

  text-transform: none;
  text-decoration: none;
  letter-spacing: 0px;
}
/deep/ .el-tabs__item {
  padding: 0px 5%;
  height: 0%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.cen {
  color: #666666;
  font-family: "Microsoft YaHei";
  font-size: 20px;
  font-style: normal;
  font-stretch: normal;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  text-transform: none;
  text-decoration: none;
  letter-spacing: 0px;
}

.el-button--primary {
  color: #fff;
  background-color: #0261a7;
  border-color: #0261a7;
}
.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 2px;
}

.div1title {
  margin: 20px 0;
  font-size: 14px;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
}
</style>
