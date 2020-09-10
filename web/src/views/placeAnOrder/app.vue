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
        >
          <!-- <el-table-column type="selection" width="55"></el-table-column> -->

          <el-table-column label="产品名称" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ scope.row.items[0].name }}
            </template>
          </el-table-column>
          <el-table-column label="SKU（规格信息）" align="center" width="460">
            <template slot-scope="scope">
              <div
                v-for="(item, index) in scope.row.items[0].params"
                :key="index"
                style="text-align:left;"
              >{{ item.name }}: {{ item.tags || item.paramValue }}</div>
            </template>
          </el-table-column>
          <el-table-column label="单价" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">￥{{ scope.row.items[0].basicPrice }}</template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">{{ scope.row.amount }}</template>
          </el-table-column>
          <el-table-column label="购买时长" align="center">
            <template slot-scope="scope">{{ scope.row.items[0].duration }}</template>
          </el-table-column>
          <el-table-column label="付费方式" align="center">
            <template slot-scope="scope">预付费</template>
          </el-table-column>
          <el-table-column label="优惠" align="center">
            <template slot-scope="scope">{{ scope.row.items[0].discount }}</template>
          </el-table-column>
          <el-table-column label="费用" align="center">
            <template slot-scope="scope">￥{{ price }}</template>
          </el-table-column>
         
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
          >确认购买</el-button>
        </el-col>
        <el-dialog title="提示" :visible.sync="handleClose">
          <h4 style="color:blue;margin-bottom: 10px;">购买成功，请跳转到订单中心</h4>
          <el-button @click="handleCloses">立刻跳转</el-button>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import baseURL from "../../api/app";
import {
  getResourcesSkuInfo,
} from "../../api/shoplist";
import Pagination from "../../components/pagination";
import { requestParams, parseHash } from "../../utils/urlParam";
import {
  createService
} from "../../utils/test";
import { platform } from "os";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      a: false,
      handleClose: false,
      list: [],
      data: null,
      number: 0,
      price: 0,
      form: null,
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
        tenantId: "1",
      },
      paramsPar:""
    };
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    handleCloses() {
      location.href =
        baseURL.DataInterfaceConsole + "/#/userCentre/centerOrder";
    },
    href() {
      location.href = "/html/pay.html";
    },
    async order() {
      createService(this.form, this.addorder, this.paramsPar);
    },
    //获取数据
    async fetchData() {
      this.addorder = JSON.parse(sessionStorage.getItem("order"));
      this.form = JSON.parse(sessionStorage.getItem("form"));
      this.paramsPar = JSON.parse(sessionStorage.getItem("paramsPar"));
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
  },
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
