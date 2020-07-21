<template>
  <div id="part3">
    <el-row>
      <el-row>
        <el-col
          :span="20"
          :offset="2"
          id="searchBar"
          :class="searchBarFixed == true ? 'gunXinwen' :'xinwen'"
          style="text-align: center;margin-bottom: 60px;"
        >
          <div class="cnooc" style="padding-top:20px;">新闻资讯</div>
          <div
            class="network"
          >看企业 &nbsp;&nbsp;&nbsp;看行业&nbsp;&nbsp;&nbsp;看世界&nbsp;&nbsp;&nbsp;24小时企业动态</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-tabs stretch>
            <el-tab-pane>
              <div slot="label" class="title5">
                <div class="title3" @click="activeN='first'">最新</div>
              </div>
            </el-tab-pane>
            <el-tab-pane>
              <div slot="label">
                <div class="title3" @click="activeN='second'">全部</div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="third">
              <div slot="label">
                <div class="title3" @click="activeN='third'">活动</div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="four">
              <div slot="label">
                <div class="title3" @click="activeN='fourth'">通知</div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="fifth">
              <div slot="label">
                <div class="title3" @click="activeN='fifth'">公告</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-row>
    <!-- 新闻资讯2 -->
    <el-row>
      <el-col style="background-image:url(../../../../web/static/images/index/beijing.jpg);">
        <el-col :span="20" :offset="2" style="margin-top:2%;">
          <div v-if="activeN=='first'">
            <el-row>
              <el-col :span="12" class="el" style="padding:10px;">
                <el-col class="cs" v-for="(item,index) in new5" :key="index">
                  <div
                    v-show="index<2"
                    class="bg-purple-dark hoverspan"
                    @click="newc(item.id)"
                    style="height:180px;display:none;"
                  >
                    <el-col :span="10" style="padding:10px;height:180px;text-align:center;">
                      <div style="padding:14px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="13" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="newtitles" style="text-align:center;">
                          <span class="newtitle">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="divtitle">
                          <span class="spantitle" v-html="item.content"/>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>

              <el-col :span="12" class="els" style="margin-bottom:12px;">
                <el-col class="css" style="padding:10px;" v-for="(item,index) in new5" :key="index">
                  <div
                    v-show="index>=2"
                    @click="newc(item.id)"
                    class="grid-content bg-purple-dark hoverspan"
                    style="height:120px;"
                  >
                    <el-col :span="8" style="padding:10px;text-align:center;height:120px;">
                      <div style="padding:11px 10px 11px 10px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="14" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="new1titles" style="text-align:center;">
                          <span class="new1title" style="position:absolute;top:15px;">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="div1title">
                          <span
                            class="span1title"
                            style="position:absolute;top:56px;left:7px;"
                            v-html="item.content"
                          />
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div v-if="activeN=='second'">
            <el-row>
              <el-col :span="12" class="el" style="padding:10px;">
                <el-col style class="cs" v-for="(item,index) in newall" :key="index">
                  <div
                    v-show="index<2"
                    class="bg-purple-dark hoverspan"
                    @click="newc(item.id)"
                    style="height:180px;display:none;"
                  >
                    <el-col :span="10" style="padding:10px;height:180px;text-align:center;">
                      <div style="padding:14px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="13" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="newtitles" style="text-align:center;">
                          <span class="newtitle">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="divtitle">
                          <span class="spantitle">{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>

              <el-col :span="12" class="els activities" style="margin-bottom:12px;">
                <el-col
                  class="css"
                 
                  v-for="(item,index) in newall"
                  :key="index"
                 >
                  <div
                    v-show="index>=2 && index<5"
                    @click="newc(item.id)"
                    class="grid-content bg-purple-dark hoverspan"
                    style="height:120px;"
                  >
                    <el-col :span="8" style="padding:10px;text-align:center;height:120px;">
                      <div style="padding:11px 10px 11px 10px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="14" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="new1titles" style="text-align:center;">
                          <span class="new1title" style="position:absolute;top:15px;">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="div1title">
                          <span
                            class="span1title"
                            style="position:absolute;top:56px;left:7px;"
                          >{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <!--type=1 活动-->
          <div v-if="activeN=='third'">
            <el-row>
              <el-col :span="12" class="el" style="padding:10px;">
                <el-col style class="cs" v-for="(item,index) in new1" :key="index">
                  <div
                    v-show="index<2"
                    class="bg-purple-dark hoverspan"
                    @click="newc(item.id)"
                    style="height:180px;display:none;"
                  >
                    <el-col :span="10" style="padding:10px;height:180px;text-align:center;">
                      <div style="padding:14px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="13" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="newtitles" style="text-align:center;">
                          <span class="newtitle">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="divtitle">
                          <span class="spantitle">{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>

              <el-col :span="12" class="els" style="margin-bottom:12px;">
                <el-col class="css" style="padding:10px;" v-for="(item,index) in new1" :key="index">
                  <div
                    v-show="index>=2"
                    @click="newc(item.id)"
                    class="grid-content bg-purple-dark hoverspan"
                    style="height:120px;"
                  >
                    <el-col :span="8" style="padding:10px;text-align:center;height:120px;">
                      <div style="padding:11px 10px 11px 10px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="14" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="new1titles" style="text-align:center;">
                          <span class="new1title" style="position:absolute;top:15px;">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="div1title">
                          <span
                            class="span1title"
                            style="position:absolute;top:56px;left:7px;"
                          >{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>
            </el-row>
          </div>

          <div v-if="activeN=='fourth'">
            <el-row>
              <el-col :span="12" class="el" style="padding:10px;">
                <el-col style class="cs" v-for="(item,index) in new2" :key="index">
                  <div
                    v-show="index<2"
                    class="bg-purple-dark hoverspan"
                    @click="newc(item.id)"
                    style="height:180px;display:none;"
                  >
                    <el-col :span="10" style="padding:10px;height:180px;text-align:center;">
                      <div style="padding:14px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="13" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="newtitles" style="text-align:center;">
                          <span class="newtitle">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="divtitle">
                          <span class="spantitle">{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>

              <el-col :span="12" class="els" style="margin-bottom:12px;">
                <el-col class="css" style="padding:10px;" v-for="(item,index) in new2" :key="index">
                  <div
                    v-show="index>=2"
                    @click="newc(item.id)"
                    class="grid-content bg-purple-dark hoverspan"
                    style="height:120px;"
                  >
                    <el-col :span="8" style="padding:10px;text-align:center;height:120px;">
                      <div style="padding:11px 10px 11px 10px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="14" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="new1titles" style="text-align:center;">
                          <span class="new1title" style="position:absolute;top:15px;">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="div1title">
                          <span
                            class="span1title"
                            style="position:absolute;top:56px;left:7px;"
                          >{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <div v-if="activeN=='fifth'">
            <el-row>
              <el-col :span="12" class="el" style="padding:10px;">
                <el-col style class="cs" v-for="(item,index) in new3" :key="index">
                  <div
                    v-show="index<2"
                    class="bg-purple-dark hoverspan"
                    @click="newc(item.id)"
                    style="height:180px;display:none;"
                  >
                    <el-col :span="10" style="padding:10px;height:180px;text-align:center;">
                      <div style="padding:14px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="13" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="newtitles" style="text-align:center;">
                          <span class="newtitle">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="divtitle">
                          <span class="spantitle" v-html="item.content"></span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>

              <el-col :span="12" class="els" style="margin-bottom:12px;">
                <el-col class="css" style="padding:10px;" v-for="(item,index) in new3" :key="index">
                  <div
                    v-show="index>=2"
                    @click="newc(item.id)"
                    class="grid-content bg-purple-dark hoverspan"
                    style="height:120px;"
                  >
                    <el-col :span="8" style="padding:10px;text-align:center;height:120px;">
                      <div style="padding:11px 10px 11px 10px;height:81%;overflow:hidden;">
                        <img style="height:100%;" :src="baseURL.DATAURL+item.cover.url" alt />
                      </div>
                    </el-col>
                    <el-col :span="14" :offset="0">
                      <el-col :span="24" style="position:relative;">
                        <div class="new1titles" style="text-align:center;">
                          <span class="new1title" style="position:absolute;top:15px;">{{item.title}}</span>
                        </div>
                      </el-col>
                      <el-col :span="24" style="position:relative;">
                        <div class="div1title">
                          <span
                            class="span1title"
                            style="position:absolute;top:56px;left:7px;"
                          >{{item.content}}</span>
                        </div>
                      </el-col>
                    </el-col>
                  </div>
                </el-col>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getJournalism } from "../../api/CMSApi.js";
import baseURL from "../../api/app.js";
export default {
  data() {
    return {
      searchBarFixed: false,
      offsetTop:0,
      baseURL: baseURL,
      activeN: "first",
      list: [
        {
          title: "最新消息",
          str: "PaaS门户升级",
          str1: "详情",
          bg: "web/static/images/index/yuan2.png"
        },
        {
          title: "最新消息",
          str: "容器服务上线",
          str1: "详情",
          bg: "web/static/images/index/lingxing.png"
        },
        {
          title: "最新消息",
          str: "消息队列ActiveMQ上线",
          str1: "详情",
          bg: "web/static/images/index/zhengfati.png"
        },
        {
          title: "最新消息",
          str: "web容器Jboss上线",
          str1: "详情",
          bg: "web/static/images/index/sanjiaoxing.png"
        },
        {
          title: "最新消息",
          str: "PaaS控制台升级通知",
          str1: "详情",
          bg: "web/static/images/index/yuan1.png"
        }
      ],
      service: [
        {
          title: "上云全攻略",
          detail: "关注企业特性，助力企业实现快速上云",
          pic: "web/static/images/index/yunying.png"
        },
        {
          title: "致电 400-0808-888",
          detail: "专业团队1对1全方位服务，助力快速上云",
          pic: "web/static/images/index/guanfang.png"
        },
        {
          title: "容器云服务",
          detail: "快速、便捷享受容器服务带来的便利，限时免费试用",
          pic: "web/static/images/index/yingjian.png"
        }
      ],
      product: [
        {
          complementInfo: "",
          name: "",
          description: "",
          tags: "",
          tags: ""
        }
      ],
      news: [
        {
          biglist: [
            {
              title: "“蒸”战青岛",
              content:
                "七月末青岛的天气，就像小孩子的脸，说变就变。刚刚还火伞高张，眨眼就雨下如注，30多摄氏度的“高温暴击”不见“退烧”，原本就高湿的海边城市，也因为不断“加水”犹如蒸锅。人在户外，两三分钟便汗湿衣衫。正在青岛场地施工的建设者们更是饱受“洗礼”...",
              msg: "web/static/images/index/qingdao.jpg"
            },
            {
              title: "中国海油亮相2019中国海洋经济博览会",
              content:
                "2019中国海洋经济博览会（简称海博会）在深圳会展中心开幕，国内外450余家公司和组织参展。本届海博会以“蓝色机遇、共创未来”为主题，展示海洋资源开发和海工装备、船舶及港口航运、海洋新兴产业、深海科考等前沿板块最新技术和核心装备......",
              msg: "web/static/images/bolanhui.jpg"
            }
          ]
        },
        {
          smalllist: [
            {
              title: "中国海油亮相2019中国海洋经济博览会",
              content:
                "2019中国海洋经济博览会（简称海博会）在深圳会展中心开幕，国内外450余家公司和组织参展。本届海博会以“蓝色机遇、共创未来”为主题，展示海洋资源开发和海工装备、船舶及港口航运、海洋新兴产业、深海科考等前沿板块最新技术和核心装备...",
              msg: "web/static/images/back.png"
            },
            {
              title: "中央第二巡视组向中国海洋石油集团有限公司党组反馈巡视情况",
              content:
                "2019年3月至6月，中央第二巡视组对中国海油党组进行了常规巡视。巡视组坚持以习近平新时代中国特色社会主义思想为指导，深入贯彻党的十九大精神，坚持稳中求进工作总基调......",
              msg: "web/static/images/xunshi.jpg"
            },
            {
              title: "思路新了 机制活了 乡村美了",
              content:
                "“老罗”这个称呼最初是当地农民叫的。往农户家跑一趟是“罗市长”，跑十趟几十趟就成了老罗，后来，市政府许多工作人员也都跟着叫上了。老罗本名罗新增，是中国海油扶贫干部、海南省五指山市委常委......",
              msg: "web/static/images/longxu.jpeg"
            }
          ]
        }
      ],
      new1: [],
      new2: [],
      new3: [],
      newall: [],
      new5: []
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.fetchData();
    this.fetch();
  },
  methods: {
    newc(id) {
      //location.href = "/html/news.html";
      location.href = "html/news.html?id=" + id;
    },

    async fetch() {
      var Newest = {
        _sort: "createdAt:desc",
        _limit: 5
      };
      getJournalism(Newest).then(res => {
        this.new5 = res;
      });
    },

    async fetchData() {
      getJournalism().then(r => {
        for (var i = 0; i < r.length; i++) {
          if (r[i].type == 1) {
            this.new1.push(r[i]);
          }
          if (r[i].type == 2) {
            this.new2.push(r[i]);
          }
          if (r[i].type == 3) {
            this.new3.push(r[i]);
          }
        }
        this.newall = r;
      });
    },
    handleScroll() {
      let scrollTop1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let offsetTop = document.querySelector("#searchBar").offsetTop;
      if (this.offsetTop == 0) this.offsetTop = offsetTop;
      scrollTop1 > this.offsetTop + 45
        ? (this.searchBarFixed = true)
        : (this.searchBarFixed = false);
    }
  }
};
</script>
<style lang="scss" scoped>
.xinwen {
  margin-top: -24px;
}
.gunXinwen {
  margin-top: 60px;
}
.el .cs:first-child {
  margin-bottom: 40px;
}
// .els .css:first-child{
//   padding:0px !important;
// }
.els .css:nth-child(1),
.css:nth-child(2) {
  padding: 0px !important;
}

//新样式
.newtitles {
  text-align: center;
  font-size: 14px;
  color: #666666;
  font-family: "Microsoft YaHei";
  width: 100%;
  height: 37px;
}
.newtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  // position: absolute;
  //top: 19px;
  margin-top: 24px;
}
.divtitle {
  font-size: 10px;
  margin-top: 2%;
  color: #999999;
  font-family: "Microsoft YaHei";
  width: 100%;
}
.spantitle {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 18px;
}
//小
.new1titles {
  text-align: center;
  font-size: 8px;
  color: #666666;
  font-family: "Microsoft YaHei";
}
.new1title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.div1title {
  font-size: 10px;
  color: #999999;
  font-family: "Microsoft YaHei";
}
.span1title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.hoverspan:hover {
  box-shadow: 0px 2px 10px 0px rgba(#86898b, 35%);
  cursor: pointer;
  .newtitle {
    color: #0261a7;
  }
  .new1title {
    color: #0261a7;
  }
}
#part3 {
  background: #ffffff;
  height: auto;
}
//标签页下拉
/deep/.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 0px;
}
/deep/ .el-tabs__item {
  /*padding: 0px 55%;*/
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
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
.title3 {
  font-size: 18px;
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

.bg-purple-dark {
  background: #ffffff;
}
// .activities .css:first-child{
//     padding:5px !important;

// }
.activities .css:nth-child(3){
    padding:10px !important;
}
.activities .css:nth-child(4){
    padding:10px !important;
}
.activities .css:nth-child(5){
    padding:10px !important;
}
</style>
