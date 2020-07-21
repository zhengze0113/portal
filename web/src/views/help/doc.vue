<template>
  <div>
    <el-row>
      <div v-if="test">
        <el-col :span="5" style="background: white;height:500px">
          <!-- <div class="inLeft">
            <p v-for="(item,index) in list" :key="index">{{item.title}}</p>
          </div>-->
          <el-tabs
            tab-position="left"
            style="float: left"
            @tab-click="scrollTo"
            id="searchBar"
            :class="searchBarFixed == true ? 'isFixed' :''"
          >
            <el-tab-pane v-for="(item,index) in list" :key="index" :label="item.title"></el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="19">
          <el-row class="con" v-for="(item,index) in list" :key="index" style="margin:20px 10px;">
            <el-col style="margin-bottom:10px;margin-top:20px;">
              <el-row>
                <img class="icons" :src="baseURL.DATAURL+item.icon.url" />
                <span class="iconsFont">{{item.title}}</span>
              </el-row>
              <el-row type="flex"> 
                <el-col
                  :span="6"
                  v-for="(item1,index1) in item.helptypes"
                  :key="index1"
                  style="margin-bottom:10px;display:inline-block;padding-right:20px;"
                >
                  <el-row style="margin-bottom:10px;">{{item1.type}}</el-row>
                  <el-row v-for="(item2,index2) in item1.helpArtic " :key="index2">
                    <a :href="'/html/documentDetails.html?_id='+item2._id" class="a">{{item2.title}}</a>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </el-row>
    <!-- <el-row style="margin-top:30px;">
      <el-col :span="24" style="background: white;">
        <el-col :span="1">
          <img style="width:75%;" src="@/static/images/help05.png" />
        </el-col>
        <el-col :span="23">问题反馈</el-col>
      </el-col>
    </el-row>
    <div style="margin-top:25px;margin-bottom:20px;">
      <el-input type="textarea" :rows="7" placeholder="请输入您遇到的问题" v-model="textarea"></el-input>
    </div>
    <el-row :gutter="20" style="margin-bottom:40px;">
      <el-col :span="8">
        <el-input v-model="input" placeholder="如何称呼您"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input v-model="input" placeholder="您的联系方式"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button style="width:100%;" type="primary">提交反馈</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>
import baseURL from "../../api/app";
import { requestParams, parseHash } from "../../utils/urlParam";
import { getHelpTitle, getHelpArticle, getHelpType } from "../../api/helpCMS";
export default {
  data() {
    return {
      activeName: "first",
      textarea: "",
      searchBarFixed: false,
      input: "",
      test: false,
      list: [
        {
          createdAt: "",
          helptypes: [
            {
              createdAt: "",
              helptitle: "",
              helpArtic: [
                {
                  title: ""
                }
              ],
              id: "",
              type: "",
              updatedAt: ""
            }
          ],
          icon: {
            createdAt: "",
            ext: "",
            hash: "",
            id: "",
            mime: "",
            name: "",
            provider: "",
            sha256: "",
            size: "",
            updatedAt: "",
            url: ""
          },
          id: " ",
          title: "",
          updatedAt: ""
        }
      ],

      baseURL: baseURL
    };
  },
  created() {
    this.getTitle();
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.onScroll);

    window.addEventListener("scroll", this.handleScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.onScroll);

    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    detailed(id) {
      location.href = "/html/documentDetails.html?" + id;
    },
    async getTitle() {
      const r = await requestParams(getHelpTitle);
      // this.list = r;
      for (var j = 0; j < r.length; j++) {
        for (var i = 0; i < r[j].helptypes.length; i++) {
          var search = { _id: r[j].helptypes[i]._id };
          const res = await requestParams(getHelpType, search);
          r[j].helptypes[i].helpArtic = res[0].helparticles;
        }
      }
      this.list = r;
      console.log(r);
      this.test = true;
      this.$emit("func", "12233");
    },
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".con");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop);
      });
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义当前点亮的导航下标
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n;
        }
      }
      // 把下标赋值给 vue 的 data
      this.active = navIndex;
    }, // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop =
        document.querySelectorAll(".con")[index.index].offsetTop + 940;
      console.log(targetOffsetTop);
      // 获取当前 offsetTop
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50;
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
      } else {
        // 往下滑
        smoothDown();
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
    handleScroll() {
      let scrollTop1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      // let offsetTop = document.querySelector("#searchBar").offsetTop;
      scrollTop1 > 940
        ? (this.searchBarFixed = true)
        : (this.searchBarFixed = false);
    }
  }
};
</script>
<style scoped lang='scss'>
/deep/ .el-row--flex{
  flex-wrap: wrap;
}
.isFixed {
  position: fixed;
  background-color: #fff;
  top: 10px;
  z-index: 999;
}
.a {
  width: 237px;
  height: 20px;
  /* filter: blur(10px); */
  text-decoration: none;
  color: #0261a7;
  padding: 5px 0;
  display: inline-block;
  font-family: "PingFangSC-Regular";
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
}
.icons {
  width: 31px;
  height: 31px;
}
.iconsFont {
  width: 96px;
  height: 32px;
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 24px;
  font-weight: 290;
  line-height: 32px;
  position: relative;
  top: -7px;
}
.inLeft {
  width: 180px;
  height: auto;
  background: #f7f7f7;
}
.inLeft p {
  padding: 5px 20px;
  /* width: 80px; */
  height: 21px;
  /* filter: blur(10px); */
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 16px;
  font-weight: 290;
  line-height: 21px;
}
.inLeft p:hover {
  color: #0261a7;
}
.outer {
  background: #0e0e0e;
  height: 120px;
  text-align: center;
}
.top {
  color: #fff;
  width: 130px;
  height: 120px;
  display: inline-block;
  border-left: 1px solid #999;
}
.title {
  font-size: 15px;
  margin-top: 25px;
  margin-bottom: 10px;
}
.str {
  font-size: 10px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 15px;
  margin-right: 10px;
}
/*服务内容*/
.midd {
  background: #31363a;
  height: 240px;
  text-align: center;
  padding-bottom: 20px;
}
.mi {
  padding-top: 30px;
  padding-bottom: 30px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.mid {
  display: inline-block;
  color: #fff;
  height: 150px;
}
.mid:nth-child(2) {
  color: #00c0dd;
}
.bottom {
  background: #373d42;
  height: 300px;
}
.bott {
  padding: 0 100px;
  margin-left: 150px;
}
.bot {
  color: #00c0dd;
  width: 260px;
  height: 50px;
  margin-left: 20px;
  display: inline-block;
  border-right: 2px solid #00c0dd;
  margin-top: 20px;
}

.tit {
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}
.st {
  font-size: 10px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}
.bot:nth-child(3),
.bot:nth-child(6),
.bot:nth-child(9) {
  border-right: 0px;
}
</style>
