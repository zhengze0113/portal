<template>
  <div id="app">
    <el-row>
      <el-col class="title">
        <el-col :offset="3" :span="2" class="buyTitle">确认订单</el-col>
        <el-col :span="12" class="smallBuyTitle">{{ oederContent }}</el-col>
      </el-col>
      <el-row style="margin-top:20px;">
        <el-col
          :offset="3"
          :span="18"
          style="margin-bottom:2%;background: #fff;padding-bottom: 2%;margin-top: 2%;"
        >
          <p class="skuFont">SKU资源</p>
          <el-row>
            <el-col :offset="2" :span="19">
              <el-table
                size="small"
                :data="skulist"
                fit
                height="300"
                highlight-current-row
                row-key="id"
                @row-click="rowClick"
              >
                <el-table-column>
                  <template slot-scope="scope">
                    <el-radio
                      :disabled="state"
                      v-model="radio"
                      :label="scope.row.id"
                      align="center"
                      >&nbsp;</el-radio
                    >
                  </template>
                </el-table-column>
                <el-table-column label="规格组" align="center">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column label="cpu" align="center">
                  <template slot-scope="scope"
                    >{{ scope.row.cpu }}Core</template
                  >
                </el-table-column>
                <el-table-column label="内存" align="center">
                  <template slot-scope="scope"
                    >{{ scope.row.gb }}GB</template
                  >
                </el-table-column>
                <el-table-column label="存储空间" align="center">
                  <template slot-scope="scope"
                    >{{ scope.row.cckj }}GB</template
                  >
                </el-table-column>
                <el-table-column label="参考价格" align="center">
                  <template slot-scope="scope"
                    >{{ scope.row.money }}元/月</template
                  >
                </el-table-column>
              </el-table>
            </el-col>
            <el-col
              :offset="2"
              :span="12"
              style="margin-top:30px;margin-bottom:30px;"
            >
              <span class="skuDivFont">当前规格</span>
              <span class="specFont"
                >{{ skuData.cpu }}Core/{{ skuData.gb }}GB</span
              >
            </el-col>
          </el-row>
        </el-col>

        <el-col
          :offset="3"
          :span="18"
          style="background: #FFF;margin-bottom:2%;"
        >
          <p class="skuFont">订购</p>
          <el-row>
            <el-col :offset="2" style="margin-bottom:30px;">
              <span class="skuDivFont">计费方式</span>
              <el-button
                style="border-radius:0;height:30px;background:rgba(3,97,167,1);padding-left: 14px;"
              >
                <span class="rightFont">包年包月</span>
              </el-button>
            </el-col>
            <el-col :offset="2" style="margin-bottom:30px;">
              <span class="skuDivFont">购买时长</span>
              <el-input-number
                :disabled="!state"
                v-model="time"
                :min="1"
                :max="12"
                size="mini"
                style="width:130px"
                @change="countMonth"
              ></el-input-number>
              <el-select
                v-model="mode"
                size="mini"
                style="width: 80px; margin-left: 30px;margin-bottom: 0px;"
                @change="countMonth"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-col id="searchBar" class="footer">
        <el-col :span="3" :offset="3">
          <span class="number">共计{{ number }}件</span>
        </el-col>

        <el-col :span="5" :offset="8">
          <span class="price">总计费用:</span>
          <span class="priceNumber">￥{{ sum }}</span>
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
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo //查询详细sku信息
} from "../../api/serviceOperating";
import {
  batchDeleteCarts,
  getCart,
  postOrders,
  getOrdersInfo
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
  createRedis
} from "../../utils/test";
import { platform } from "os";
import Vue from "vue";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      oederContent: "",
      state: false,
      addorder: "",
      productName: "",
      productId: "",
      radio: "",
      orderType: "",
      orderId: "1503",
      skuData: "",
      mode: "MONTH",
      options: [
        {
          value: "MONTH",
          label: "月"
        }
      ],
      time: 1,
      sum: 0,
      skulist: [],
      deployment: null,
      pvcvolume: [], //pvc
      count: "", //倒计时
      money: 0,
      handleClose: false,
      searchBarFixed: false,
      multipleSelection: [],
      ltotal: null,
      disabled: true,
      list: [],
      list1: [],
      data: null,
      number: 1,
      price: 0,
      form: null,
      metadata: undefined,
      search: {
        params: '[{"param":{"resourceId":1},"sign":"EQ"}]',
        page: 1,
        rows: 100
      },
      patchDeleted: null,
      listLoading: false,
      dialogVisible: false,
      cartInfo: [],
      redisFrom: "",
      orderData: ""
    };
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    //获取参数
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    countMonth(data) {
      console.log();
      this.sum = this.time * this.price * this.number;
      this.sum = Math.floor(this.sum * 100) / 100;
    },
    //点击事件
    async rowClick(row, column, event) {
      if (!this.state) {
        this.radio = row.id;
        this.skuId = row.id;
        this.skuData = row;
        this.price = row.money;
        this.sum = this.time * this.price * this.number;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    handleCloses() {
      location.href =  baseURL.DataInterfaceConsole+"/#/userCentre/centerOrder";
    },
    href() {
      location.href = "/html/pay.html";
    },
    async order() {
      console.log(this.orderData);
      this.orderData.amount = this.sum;
      this.orderData.items[0].skuId = this.skuId;
      if (this.orderType != "RENEWAL") {
        let params = JSON.parse(this.orderData.items[0].params);
        params.forEach(item => {
          if (item.name.trim() == "CPU") {
            item.paramValue = this.skuData.cpu;
          }
          if (item.name.trim() == "内存") {
            item.paramValue = this.skuData.gb;
          }
          if (item.name.trim() == "存储空间") {
            item.paramValue = this.skuData.cckj;
          }
        });
        this.orderData.items[0].params = JSON.stringify(params);
        let newParams = JSON.parse(this.orderData.items[0].platformParams);
        console.log(newParams);
        let newPlatformParams = JSON.parse(newParams[0].params);
        console.log(newPlatformParams);
        newPlatformParams.cpu = this.skuData.cpu;
        newPlatformParams.memory = this.skuData.gb;
        newPlatformParams.storage = this.skuData.cckj;
        Vue.set(newPlatformParams, "confignManagementType", this.orderType);
        newParams[0].params = JSON.stringify(newPlatformParams);
        this.orderData.items[0].platformParams = JSON.stringify(newParams);

        console.log(this.orderData.items[0].platformParams);
      }
      // if(){
      //容器时长变化
      // }
      this.orderData.items[0].amount = this.time;
      this.orderData.items[0].duration = this.time + "月";
      this.orderData.items[0].basicPrice = this.sum;
      this.orderData.items[0].finalPrice = this.sum;
      Vue.set(this.orderData, "orderType", this.orderType);
      //更新订单中 sku相关数据、时长、金额
      //删除多余属性
      delete this.orderData.sn;
      delete this.orderData.chargeStatus;
      delete this.orderData.settlementStatus;
      delete this.orderData.orderStatus;
      delete this.orderData.orgId;
      delete this.orderData.deleted;
      delete this.orderData.gmtCreate;
      delete this.orderData.gmtModify;
      delete this.orderData.isApproval;
      delete this.orderData.orderResourceType;
      delete this.orderData.links;

      delete this.orderData.items[0].id;
      delete this.orderData.items[0].orderId;
      delete this.orderData.items[0].specs;
      delete this.orderData.items[0].chargeStatus;
      delete this.orderData.items[0].resourceUuid;
      delete this.orderData.items[0].resourceName;
      delete this.orderData.items[0].resourceStatus;
      delete this.orderData.items[0].effectTime;
      delete this.orderData.items[0].expireTime;
      delete this.orderData.items[0].user_id;
      delete this.orderData.items[0].orgId;
      delete this.orderData.items[0].tenantId;
      delete this.orderData.items[0].deleted;
      delete this.orderData.items[0].gmtCreate;
      delete this.orderData.items[0].gmtModify;
      delete this.orderData.items[0].cloudServiceSku;

      console.log(this.orderData);
      postOrders(this.orderData).then(r => {
        console.log(r);
        if (r.code == 201) {
          this.$notify({
            type: "success",
            message: r.message
          });
        } else {
          this.$notify({
            type: "error",
            message: r.message
          });
        }
      });
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
      //通过订单id获得订单数据  res.item[0]
      this.orderId = this.getId("id");
      this.orderType = this.getId("orderType");

      if (this.orderType == "RENEWAL") {
        this.state = true;
        this.oederContent = "续费";
      }
      if (this.orderType == "UPGRADE_CONFIGURATION") {
        this.state = false;
        this.oederContent = "升级配置";
      }
      if (this.orderType == "REDUCE_CONFIGURATION") {
        this.state = false;
        this.oederContent = "降低配置";
      }
      const resOrder = await requestParams(getOrdersInfo, this.orderId);

      this.orderData = resOrder.content;
      this.price = this.orderData.amount / this.orderData.items[0].amount;
      console.log(this.price);
      this.time = resOrder.content.items[0].amount;
      //原订单金额
      this.sum = resOrder.content.amount;
      //云产品id
      this.productId = resOrder.content.productId;
      //当前订单skuid
      this.skuId = resOrder.content.items[0].skuId;
      //查询sku列表
      this.search.params = `[{"param":{"catalogId":${
        this.productId
      }},"sign":"EQ"}]`;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      var list = res.content.content;
      for (var i = 0; i < list.length; i++) {
        const r = await requestParams(getResourcesSkuInfo, list[i].id);
        var sku = r.content;
        var skuObject = {
          id: "",
          name: "",
          spec: "",
          cpu: "",
          gb: "",
          cckj: "",
          version: "V 1.0",
          money: ""
        };
        skuObject.id = sku.id;
        skuObject.name = sku.name;
        skuObject.money = sku.price.price;
        let arr = sku.storage.split(";");
        for (let a = 0; a < arr.length; a++) {
          let arr1 = arr[a].split(":");
          if (arr1[0].trim() == "CPU") {
            skuObject.cpu = arr1[1].trim();
          }
          if (arr1[0].trim() == "内存") {
            skuObject.gb = arr1[1].trim();
          }
          if (arr1[0].trim() == "存储空间") {
            skuObject.cckj = arr1[1].trim();
          }
        }
        if (this.skuId == skuObject.id) {
          this.skuData = skuObject;
        }
        this.skulist.push(skuObject);
      }

      this.radio = this.skuId;
      this.a = true;
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
@import "../rewrite.scss";
@import "../purchase.scss";
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
.skuname {
  display: table-cell;
  vertical-align: middle;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
/deep/ .el-table {
  font-size: 12px;
}
.skuname {
  display: table-cell;
  vertical-align: middle;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
.smallBuyTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 76px;
}
.buyTitle {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
</style>
