<template>
  <div id="part3" style="background:white;">
    <el-row>
      <el-col
        :span="16"
        :offset="4"
        style="padding-top:20px;padding-bottom:15px;border-bottom:1px solid #e0e0e0;"
      >
        <span style="font-size:20px;color:#0261a7">全部商品</span>
        <el-button :disabled="disabled" icon="el-icon-delete" size="small" @click="deleteshops">批量删除</el-button>
        <div style="display:inline;float:right;">
          <span style="margin-right:20px;font-size:14px;">总金额：￥{{money}}</span>
          <el-button type="primary" size="mini" @click="order">提交订单</el-button>
        </div>
      </el-col>
      <el-col :span="16" :offset="4" style="margin-bottom:10%;">
        <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="云商品" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-link @click="infoShow(scope.row.id)">{{ scope.row.name }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="计费方式" align="center">
            <template slot-scope="scope">
              <div style="text-align:center">{{scope.row.chargePeriod}}</div>
            </template>
          </el-table-column>
          <el-table-column label="配置信息" align="center" width="200" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column label="购买数量" align="center" width="105">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.amount"
                :min="1"
                :max="999"
                size="mini"
                @change="get(scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="时长" align="center">
            <template slot-scope="scope">{{scope.row.duration}}</template>
          </el-table-column>
          <el-table-column label="金额(单价)" align="center">
            <template slot-scope="scope">￥{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteShop(scope.row.id)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :metadata="metadata" :table-change="tableChange" />
      </el-col>
    </el-row>
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
      <el-row :gutter="20">
        <el-col :span="22" :offset="0">
          <div class="grid-content bg-purple">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form label-width="100px" :model="cartInfo">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="params:">{{cartInfo.params}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="category:">{{cartInfo.category}}</el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="amount:">{{cartInfo.amount}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="deleted:">{{cartInfo.deleted}}</el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="gmtCreate:">{{cartInfo.gmtCreate}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="gmtModify: ">{{cartInfo.gmtModify}}</el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="id:">{{cartInfo.id}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="skuId:">{{cartInfo.skuId}}</el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="specs: ">{{cartInfo.specs}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="status:">{{cartInfo.status}}</el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-form-item label="userId:">{{cartInfo.userId}}</el-form-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCarts,
  deleteCarts,
  batchDeleteCarts,
  getCart,
  getResourcesSkuInfo,
  postOrders
} from "../../api/shoplist";
import Pagination from "../../components/pagination";
import { requestParams, parseHash } from "../../utils/urlParam";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      money: 0,
      multipleSelection: [],
      ltotal: null,
      disabled: true,
      list: [],
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      listLoading: false,
      dialogVisible: false,
      cartInfo: [],
      addorder: {
        amount: 0,
        catalog: "",
        description: "订单",
        discount: 0,
        items: [],
        name: "",
        payMode: "AFTERWARDS",
        tags: "",
        userId: "1",
        tenantId: "1"
      }
    };
  },
  mounted() {
    // this.toggleSelection([this.tableData[0], this.tableData[1]]);
  },
  created() {
    this.fetchData();
  },
  methods: {
    href(){
      location.href='/html/pay.html';
    },
    async order() {
      this.addorder.amount = this.sum;
      var o = {
        amount: 1,
        basicPrice: 0,
        category: "",
        description: "",
        discount: 0,
        duration: 0,
        finalPrice: 0,
        name: "",
        params: "",
        payMode: "AFTERWARDS",
        skuId: 0,
        tags: ""
      };
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.addorder.items.push(o);
        for (var key in this.addorder.items[i]) {
          for (var key1 in this.multipleSelection[i]) {
            if (key == key1) {
              this.addorder.items[i][key] = this.multipleSelection[i][key1];
            }
          }
        }
        this.addorder.items[i].basicPrice = this.multipleSelection[i].price;
        this.addorder.items[i].finalPrice =
          this.multipleSelection[i].price *
          this.multipleSelection[i].amount *
          this.multipleSelection[i].duration;
        this.addorder.items[i].name = this.multipleSelection[i].category;
       
      }
      this.addorder.amount = this.money;
      const res = await requestParams(postOrders, this.addorder);
      if (res.code == 201) {
        this.$notify({
          type: "success",
          message: res.message
        });
      } else {
        this.$notify({
          type: "error",
          message: res.message
        });
      }
      const data1 = [];
      for (var i = 0; i < this.multipleSelection.length; i++) {
        data1.push(this.multipleSelection[i].id);
      } 
      batchDeleteCarts(data1).then(r => {
        if (r.code == 201) {
          this.fetchData();
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
      this.listLoading = true;
      const res = await requestParams(getCarts, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(res)
      for (var i = 0; i < this.list.length; i++) {
        const res1 = await requestParams(
          getResourcesSkuInfo,
          this.list[i].skuId
        );
        for(var j=0;j<res1.content.specs.length;j++){
          if(res1.content.specs[j].name=="项目描述"){
            this.list[i].description=res1.content.specs[j].paramValue
          }
        }
        this.list[i].price = res1.content.price.price.toFixed(2);
        if (res1.content.price.chargePeriod == "DAY") {
          this.list[i].chargePeriod = "天";
        } else if (res1.content.price.chargePeriod == "MONTH") {
          this.list[i].chargePeriod = "月";
        } else if (res1.content.price.chargePeriod == "YEAR") {
          this.list[i].chargePeriod = "年";
        }
      }
      this.listLoading = false;
    },
    //删除单条数据
    deleteShop(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteCarts(id).then(r => {
            if (r.code == 204) {
              this.fetchData();
              this.$notify({
                type: "success",
                message: r.message
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
    get(rows) {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        for (var j = 0; j < rows.lengt; j++) {
          if ((this.multipleSelection[i].id = rows[j].id)) {
            this.multipleSelection[i] = rows[j];
          }
        }
      }
      this.handleSelectionChange(this.multipleSelection);
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
<style scoped>
.el-input-number--mini {
  width: 95px;
}
</style>

