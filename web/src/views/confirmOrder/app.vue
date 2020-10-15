<template>
  <div id="app">
    <el-row>
      <el-col class="title">
        <span>确认订单</span>
      </el-col>
      <el-col :span="20" :offset="2" style="margin-top:2%;margin-bottom:2%;">
        <el-table
          v-if="a == true"
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->

          <el-table-column
            label="产品名称"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <!--<el-link @click="infoShow(scope.row.id)"></el-link>-->
              {{ scope.row.items[0].name }}
            </template>
          </el-table-column>
          <el-table-column label="SKU（规格信息）" align="center" width="460">
            <template slot-scope="scope">
              <div
                v-for="(item, index) in scope.row.items[0].params"
                :key="index"
                style="text-align:left;"
              >
                {{ item.name }}: {{ item.tags || item.paramValue }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              ￥{{ scope.row.items[0].basicPrice }}
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.amount }}
            </template>
          </el-table-column>
          <el-table-column label="购买时长" align="center">
            <template slot-scope="scope">
              {{ scope.row.items[0].duration }}
            </template>
          </el-table-column>
          <el-table-column label="付费方式" align="center">
            <template slot-scope="scope">
              预付费
            </template>
            <!--{{scope.row.items[0].payMode}}-->
          </el-table-column>
          <el-table-column label="优惠" align="center">
            <template slot-scope="scope">
              {{ scope.row.items[0].discount }}
            </template>
          </el-table-column>
          <el-table-column label="费用" align="center">
            <template slot-scope="scope">
              ￥{{ price }}
            </template>
          </el-table-column>
          <!--<el-table-column label align="center">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button @click.native.prevent="deleteShop(scope.row)" type="text" size="small">删除</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
      </el-col>
      <el-col id="searchBar" class="footer">
        <el-col :span="3" :offset="3">
          <span class="number">共计{{ number }}件</span>
        </el-col>

        <el-col :span="5" :offset="8">
          <span class="price">总计费用:</span>
          <span class="priceNumber">￥{{ price }}</span>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button
            :plain="true"
            class="btn"
            @click="
              handleClose = true;
              order();
            "
          >
            确认购买
          </el-button>
        </el-col>
        <el-dialog title="提示" :visible.sync="handleClose">
          <h4 style="color:blue;margin-bottom: 10px;">
            购买成功，请跳转到订单中心
          </h4>
          <el-button @click="handleCloses">
            立刻跳转
          </el-button>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import baseURL from "../../api/app";
import {
  batchDeleteCarts,
  getCart,
  getResourcesSkuInfo,
  postOrders
} from "../../api/shoplist";
import Pagination from "../../components/pagination";
import { requestParams, parseHash } from "../../utils/urlParam";
import {
  createProject,
  createContainer,
  createServiceRoutT,
  createzhucezhongxin,
  fusingMonitoring,
  callChain,
  createDataPVT,
  configurationCenterMethod,
  gateway,
  pinpoint,
  createDistributed,
  dredgeGitlab,
  installMicroservices,
  createhitchhiker,
  createsonarQube,
  createNexus,
  createjenkins,
  createJira,
  createRedis,
  createElasticsearch,
  createMysql
} from "../../utils/test";
import { platform } from "os";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      deployment: null,
      pvcvolume: [], //pvc
      count: "", //倒计时
      money: 0,
      a: false,
      handleClose: false,
      searchBarFixed: false,
      multipleSelection: [],
      ltotal: null,
      disabled: true,
      list: [],
      list1: [],
      data: null,
      number: 0,
      price: 0,
      form: null,
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      listLoading: false,
      dialogVisible: false,
      cartInfo: [],
      redisFrom: "",
      addorder: {
        amount: 0,
        catalog: "",
        description: "订单",
        discount: 0,
        items: [],
        name: "",
        payMode: "预付费",
        tags: "",
        userId: "1",
        tenantId: "1"
      },
      zhuce: [],
      uid: "",
      //熔断监控数据
      monitoring: [],

      formdata: [],
      monitoring: [],
      gateway1: [],
      pinpointFrom: []
    };
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    //增加时间
    countTime() {
      if (this.mode == "MONTH") {
        this.sum = this.time * this.price * this.number;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        this.sum = this.time * this.price * this.number * 12;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    handleCloses() {
      location.href = baseURL.DataInterfaceConsole+"/#/userCentre/centerOrder";
    },
    href() {
      location.href = "/html/pay.html";
    },
    async order() {
      this.addorder = JSON.parse(sessionStorage.getItem("order"));
      console.log(this.addorder);
      this.list1 = this.addorder.items[0].params;

      if (this.addorder.items[0].category == "资源空间") {
        console.log(
          createProject(this.monitoring, this.addorder, this.addorder)
        );
      }
      if (this.addorder.items[0].category == "容器部署") {
        createContainer(this.deployment, this.list1, this.addorder);
      }
      if (this.addorder.items[0].category == "服务路由（Route）") {
        createServiceRoutT(this.form, this.list1, this.addorder);
      }
      if (this.addorder.items[0].category.indexOf("注册中心服务") != -1) {
        createzhucezhongxin(this.zhuce, this.addorder);
      }
      if (this.addorder.items[0].category == "分布式服务") {
        createDistributed(this.formdata, this.addorder);
      }

      console.log(this.addorder.items[0].category);
      if (this.addorder.items[0].category == "数据存储（PVC）") {
        createDataPVT(this.pvcvolume, this.list1, this.addorder);
      }
      if (this.addorder.items[0].category == "调用链服务") {
        callChain(this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "配置中心服务") {
        configurationCenterMethod(this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "熔断监控服务") {
        fusingMonitoring(this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "网关服务") {
        gateway(this.gateway1, this.addorder);
      }
      if (this.addorder.items[0].category == "Apm性能管理") {
        pinpoint(this.pinpointFrom, this.addorder);
      }
      if (this.addorder.items[0].category == "一键安装微服务") {
        installMicroservices(this.pinpointFrom, this.addorder);
      }
      if (this.addorder.items[0].category == "代码仓库（Gitlab）") {
        dredgeGitlab(this.uid, this.monitoring, this.addorder);
      }
      console.log(this.addorder.items[0].category);
      if (this.addorder.items[0].category == "代码扫描（SonarQube）") {
        createsonarQube(this.uid, this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "测试工具（Hitchhiker）") {
        createhitchhiker(this.uid, this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "持续集成发布 (Jenkins)") {
        createjenkins(this.uid, this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "依赖包管理（Nexus）") {
        createNexus(this.uid, this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "项目管理服务（Jira）") {
        createJira(this.uid, this.monitoring, this.addorder);
      }
      if (this.addorder.items[0].category == "缓存中间件（redis）") {
        createRedis(this.redisFrom, this.addorder);
      }
      if (this.addorder.items[0].category == "索引中间件（elasticsearch）") {
        createElasticsearch(this.redisFrom, this.addorder);
      }
      if (this.addorder.items[0].category == "mysql中间件") {
        createMysql(this.deployment, this.addorder);
      }
       if (this.addorder.items[0].category == "nginx中间件") {
        createNginx(this.deployment, this.addorder);
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //获取数据
    async fetchData() {
      // this.listLoading = true;
      // const res = await requestParams(getCarts, this.search);
      // this.metadata = res.metadata;
      // this.list = res.content.content;
      // console.log(res);

      this.redisFrom = JSON.parse(sessionStorage.getItem("redisFrom"));
      this.deployment = JSON.parse(sessionStorage.getItem("deployment"));
      this.zhuce = JSON.parse(sessionStorage.getItem("zhuce"));
      this.pvcvolume = JSON.parse(sessionStorage.getItem("pvcvolume"));
      this.monitoring = JSON.parse(sessionStorage.getItem("monitoring"));
      this.formdata = JSON.parse(sessionStorage.getItem("formdata"));
      this.form = JSON.parse(sessionStorage.getItem("form"));
      this.gateway1 = JSON.parse(sessionStorage.getItem("gatewayfrom"));
      this.pinpointFrom = JSON.parse(sessionStorage.getItem("pinpointFrom"));
      if (sessionStorage.getItem("order")) {
        this.data = JSON.parse(sessionStorage.getItem("order"));
        console.log(this.data);
        this.list.push(this.data);
        this.number = this.list.length;
        for (var i = 0; i < this.list.length; i++) {
          const res1 = await requestParams(
            getResourcesSkuInfo,
            this.list[i].items[0].skuId
          );

          // for (var j = 0; j < res1.content.specs.length; j++) {
          //   if (res1.content.specs[j].name == "项目描述") {
          //     this.list[i].description = res1.content.specs[j].paramValue;
          //   }
          // }
          this.list[i].items[0].basicPrice = this.list[
            i
          ].items[0].basicPrice.toFixed(2);
          this.list[i].items[0].params = JSON.parse(
            this.list[0].items[0].params
          );
          this.price = this.list[0].items[0].finalPrice.toFixed(2);
          if (res1.content.price.chargePeriod == "DAY") {
            this.list[i].items[0].chargePeriod = "天";
          } else if (res1.content.price.chargePeriod == "MONTH") {
            this.list[i].items[0].chargePeriod = "月";
          } else if (res1.content.price.chargePeriod == "YEAR") {
            this.list[i].items[0].chargePeriod = "年";
          }
        }
      }
      this.a = true;
    },
    //删除单条数据
    deleteShop(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.list.pop();
        window.sessionStorage.removeItem("order");
      });
    },
    get(rows) {
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   for (var j = 0; j < rows.lengt; j++) {
      //     if ((this.multipleSelection[i].id = rows[j].id)) {
      //       this.multipleSelection[i] = rows[j];
      //     }
      //   }
      // }
      // this.handleSelectionChange(this.multipleSelection);
      this.price = (
        this.list[0].items[0].finalPrice *
        this.list[0].items[0].amount *
        this.list[0].items[0].duration
      ).toFixed(2);
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    //获取单条数据信息
    getCartInfo(id) {
      getCart(id).then(r => {
        this.cartInfo = r.content;
      });
    },
    infoShow(id) {
      this.dialogVisible = true;
      this.getCartInfo(id);
    },
    //批量删除
    deleteshops() {
      const data1 = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        data1.push(this.multipleSelection[i].id);
      }
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          batchDeleteCarts(data1).then(r => {
            if (r.code == 201) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message
              });
            } else {
              this.$notify({
                type: "info",
                message: "删除失败，请重试"
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
      this.multipleSelection = rows;
      this.money = 0;
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.money += parseInt(
          this.multipleSelection[i].price *
            this.multipleSelection[i].amount *
            this.multipleSelection[i].duration
        );
      }
      if (this.multipleSelection.length == 0) {
        this.money = 0;
      }
      this.money = this.money.toFixed(2);
    }
  }
};
</script>
<style>
.m-topBar {
  background-color: #11151c !important;
}
</style>
<style scoped lang="scss">
/deep/ .el-dialog__body {
  padding: 10px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-input-number--mini {
  width: 95px;
}
.footer {
  /*position: fixed;*/
  /*top: 50%;*/
  z-index: 2;
  // opacity: 0.7;
  height: auto;
  background: #fff;
  .number {
    width: 97px;
    height: 56px;
    font-size: 14px;
    margin-left: 15%;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    line-height: 56px;
  }
  .price {
    width: 64px;
    height: 56px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 56px;
  }
  .priceNumber {
    width: 109px;
    height: 56px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 56px;
    color: rgba(2, 97, 167, 1);
  }
  .btn {
    width: 107px;
    height: 40px;
    background: rgba(3, 97, 167, 1);
    color: #fff;
    margin-top: 10px;
  }
}
.title {
  margin-top: 100px;
  background: #fff;

  span {
    width: 97px;
    height: 56px;
    font-size: 24px;
    margin-left: 15%;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 56px;
  }
}
</style>
