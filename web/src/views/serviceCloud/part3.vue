<template>
  <div id="part3">
    <el-row class="content" id="searchBar" type="flex">
      <el-col
        :span="20"
        :offset="2"
        :class="searchBarFixed == true ? 'isFixed' : ''"
        style="background:#FFFFFF;height:60px;text-align:center;box-shadow:0px 2px 16px 0px rgba(134, 139, 137, 0.35);"
      >
        <el-col
          class="hovertitle"
          :span="20"
          :offset="2"
          style="text-align:center;"
        >
          <div v-if="24 % list.length != 0">
            <el-col
              :offset="index > 0 ? 1 : 0"
              :span="Math.floor(24 / list.length)"
              v-for="(item, index) in list"
              :key="index"
              @click.native="scrollTo(index)"
            >
              <span class="ttle1" style="cursor: pointer;">{{
                item.name
              }}</span>
            </el-col>
          </div>
          <div v-else @click="aa()">
            <el-col
              :span="Math.floor(24 / list.length)"
              v-for="(item, index) in list"
              :key="index"
            >
              <span class="ttle1">{{ item.name }}</span>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="con" v-for="(item, index) in list1" :key="index">
      <el-row style="background:white;height:auto;">
        <el-col
          :span="20"
          :offset="2"
          :class="firstTitle == true ? (index == 0 ? 'topFloat' : '') : ''"
        >
          <div
            class="ca"
            :class="index == 0 ? '' : 'mar40'"
            style="text-align:center;margin-bottom:40px ;"
          >
            <div class="title2">{{ item.name }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row
        style="width:100%;background:#F9F9F9;height:auto;padding-bottom:20px;"
      >
        <el-col :span="20" :offset="2" style="margin-top:2%;">
          <el-col
            :span="12"
            class="span11"
            style=" "
            v-for="(item, index) in item.list1"
            :key="index"
          >
            <div class="hoverspan11" style="background:#FFFFFF;">
              <div>
                <span class="vessel">{{ item.name }}</span>
                <el-tag
                  style="margin:20px 10px 6px 6px;"
                  v-for="item in items"
                  :key="item.label"
                  :type="item.type"
                  size="mini"
                  effect="dark"
                  >{{ item.label }}</el-tag
                >
                <img
                  style="width:15%;float:right;"
                  src="/web/static/images/safety.png"
                  alt
                />
                <div style="margin:1% 0% 1% 6%;">
                  <span class="versseltitle">{{ item.description }}</span>
                </div>
                <div style="margin:3% 2% 0% 6%;padding-bottom:4%;">
                  <el-button type="primary" size="small" @click="order(item)"
                    >立即申请</el-button
                  >
                  <el-button
                    size="small"
                    style="margin-left:25px;"
                    @click="check(item)"
                    >查看详情</el-button
                  >
                </div>
              </div>
            </div>
          </el-col>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-col
            :span="8"
            style="padding:20px;margin-top:21px;"
            class="routers"
            v-for="(ite, index) in item.list2"
            :key="index"
          >
            <div @click="ches(ite)">
              <div class="middletitle">{{ ite.name }}</div>
              <div class="middletitles">{{ ite.description }}</div>
            </div>
          </el-col>
        </el-col>
        <el-col
          :span="18"
          :offset="3"
          style="text-align:center;"
          v-if="item.list2.length > 6"
        >
          <div class="selects">
            <span class="select">查看更多</span>
            <img
              src="/web/static/images/two.png"
              style="width:17px; margin:1px -75px 0px 0px ; "
              alt
            />
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import {
  //getCloudServiceList,
  //getCloudServiceResources,
  getCloudServiceCatalogs,
  getCloudServiceCatalogsC
} from "../../api/serviceOperating";
import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from "../../utils/urlParam";
export default {
  data() {
    return {
      searchBarFixed: false,
      firstTitle: false,
      colotg: [
        { name: "热门服务" },
        { name: "最新活动" },
        { name: "新品服务" },
        { name: "运营公告" },
        { name: "运营公告" }
      ],
      items: [{ type: "", label: "热销" }, { type: "success", label: "安全" }],
      pics: [
        {
          title: "服务路由（Router）",
          title1: "服务路由（route），是授权入站连接到达集群服务的规则集合。"
        },
        {
          title: "项目创建",
          title1: "项目创建，提供高性能可伸缩的容器应用管理能力。"
        },
        {
          title: "云Web服务",
          title1:
            "Tomcat是一个开放源代码、运行servlet和JSPWeb应用软件的基于Java的Web应用软件容器。"
        },
        {
          title: "云网关",
          title1: "基于云计算的灵活、低成本、运维简单的桌面服务。"
        },
        {
          title: "云数据库",
          title1: "基于云计算的灵活、低成本、运维简单的桌面服务。"
        },
        {
          title: "项目管理服务",
          title1: "基于云计算的灵活、低成本、运维简单的桌面服务"
        }
      ],
      activeName: "first",
      a: [
        {
          pic: "/web/static/images/service1.png"
        },
        {
          pic: "/web/static/images/service2.png"
        },
        {
          pic: "/web/static/images/service3.png"
        },
        {
          pic: "/web/static/images/service4.png"
        }
      ],
      b: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      c: [1, 2, 3, 4, 5, 6, 7, 8],
      list: [],
      list1: []
    };
  },
  created() {
    this.search1 = parseHash(this.search1);
    this.fetchData();
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
      // this.active = navIndex;
    }, // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop =
        document.querySelectorAll(".con")[index].offsetTop - 30;
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

      let offsetTop = document.querySelector("#searchBar").offsetTop;
      scrollTop1 > offsetTop
        ? (this.searchBarFixed = true)
        : (this.searchBarFixed = false);
      scrollTop1 > offsetTop
        ? (this.firstTitle = true)
        : (this.firstTitle = false);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    link(item1) {
      console.log(item1);
      var objStr = JSON.stringify(item1);
      localStorage.setItem("objStr", objStr);
      location.href = "/html/serviceDirectoryDetails.html";
    },
    //获取数据
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceCatalogs);
      this.list = res.content.content;
      for (var i = 0; i < this.list.length; i++) {
        const res1 = await requestParams(
          getCloudServiceCatalogsC,
          this.list[i].id
        );
        var a = { id: 0, name: "", list1: [], list2: [] };
        a.list1 = res1.content.content;
        a.name = this.list[i].name;
        a.id = this.list[i].id;
        this.list1.push(a);
      }
      this.test(this.list1);
      console.log(this.list1);
      this.listLoading = false;
    },
    test(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].list1.length > 2) {
          arr[i].list2 = arr[i].list1.slice(2, arr[i].list1.length);
          arr[i].list1 = arr[i].list1.slice(0, 2);
        }
      }
    },
    check(item) {
      window.location.href = `/html/productDetail1.html?id=${
        item.id
      }&productName=${item.name}&catalogId=${item.parent.id}&catalog=${
        item.parent.name
      }#?`;
    },
    ches(item) {
      window.location.href = `/html/productDetail1.html?id=${
        item.id
      }&productName=${item.name}&catalogId=${item.parent.id}&catalog=${
        item.parent.name
      }#?`;
    },
    order(item) {
      window.location.href = `/html/productDetail1.html?id=${
        item.id
      }&productName=${item.name}&catalogId=${item.parent.id}&catalog=${
        item.parent.name
      }#?`;
    }
  }
};
</script>
<style lang="scss" scoped>
#part3 {
  background: #ffffff;
}

.isFixed {
  position: fixed;
  background-color: #fff;
  width: 100%;
  top: 0px;
  z-index: 999;
  margin-left: 0px;
}

//向上移动
.content {
  top: -30px;
  z-index: 10;
  position: relative;
}
.topFloat:first-child {
  margin-top: 75px;
}
//顶部样式
.hovertitle {
  font-family: "Microsoft YaHei";
  font-weight: 400;
  font-size: 20px;
  color: #333333;
  line-height: 60px;
}
//文字移入样式
.ttle1:hover {
  color: #3a8ee6;
}
.title2 {
  font-size: 22px;
  font-family: "Microsoft YaHei";
  /*font-weight: bold;*/
  color: rgba(51, 51, 51, 1);
}
//容器
//字体样式
.vessel {
  margin: 4% 3% 1% 6%;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: #333333;
  display: inline-block;
  width: 181px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.versseltitle {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

//中间字体
.middletitle {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 5% 0% 3% 6%;
  display: inline-block;
  width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.middletitles {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin: 1% 0% 3% 6%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.span11:first-child {
  padding-right: 10px;
}
.hoverspan11:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(134, 139, 137, 0.35);
  cursor: pointer;
  .vessel {
    color: rgba(2, 97, 167, 1);
  }
}
//按钮样式
.el-button--primary {
  color: #fff;
  background-color: rgba(2, 97, 167, 1);
  border-color: rgba(2, 97, 167, 1);
}
.el-button--mini,
.el-button--small {
  font-size: 12px;
  border-radius: 2px;
}
.el-button {
  border: 1px solid rgba(102, 102, 102, 1);
}
//tags样式
.el-tag--dark {
  background-color: #ff2d25;
  border-color: #ff2d25;
  color: #fff;
}
.el-tag--dark.el-tag--success {
  background-color: #2ac777;
  border-color: #2ac777;
  color: #fff;
}
.routers:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 16px 0px rgba(134, 139, 137, 0.35);
  .middletitle {
    color: rgba(2, 97, 167, 1);
  }
  .el-button {
    border: 1px solid #0261a7;
  }
}
//查看更多样式
.select {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  position: absolute;
  top: -3px;
  right: 48%;
}
.selects {
  margin: 2% 2%;
  position: relative;
}

.mar40 {
  margin-top: 40px;
}
</style>
