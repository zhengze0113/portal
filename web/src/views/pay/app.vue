<template>
  <div id="app">
    <el-row style="background:#fff;">
      <el-col :span="18" :offset="3" class="pay">
        <span class="payTitle">支付</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18" :offset="3" class="content">
        <el-row class="Title">
          <span>您要支付的订单</span>
        </el-row>
        <el-row>
          <el-table border :data="payList" style="width: 100%">
            <el-table-column label="订单编号" class="tableBg">
              <template slot-scope="scope">{{ scope.row.order }}</template>
            </el-table-column>
            <el-table-column label="订单详情" class="tableBg">
              <template slot-scope="scope">{{ scope.row.detail }}</template>
            </el-table-column>
            <el-table-column label="订单金额" class="tableBg">
              <template slot-scope="scope">
                <span style="color:#d0021b;">{{ scope.row.amount }}</span>元
              </template>
            </el-table-column>
            <el-table-column label="应付金额" class="tableBg">
              <template slot-scope="scope">
                <span style="color:#d0021b;">{{ scope.row.payable }}</span>元
              </template>
            </el-table-column>
            <el-table-column label="订购时间" class="tableBg">
              <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="Title">
          <span>请选择支付方式</span>
        </el-row>
        <el-row>
          <el-tabs type="border-card">
            <el-tab-pane label="在线支付">
              <el-row style="height: 100px;background: #f7f7f7;padding-left:20px;">
                <el-col class="tabs-content">应付金额：544.00元</el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="线下付款">
              <el-row style="height: 100px;background: #f7f7f7;padding-left:20px;">
                <el-col class="tabs-content">应付金额：544.00元</el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row class="Title">
          <span>请选择支付方式</span>
        </el-row>
        <el-row>
          <el-tabs type="border-card">
            <el-tab-pane label="个人网银">
              <el-row style="height: 100px;padding-left:20px;">
                <el-col class="tabs-content" :span="7">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/icbc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
                <el-col class="tabs-content" :span="7" :offset="1">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/abc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
                <el-col class="tabs-content" :span="7" :offset="1">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/cbc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="企业网银">
              <el-row style="height: 100px;padding-left:20px;">
                <el-col class="tabs-content" :span="7">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/icbc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
                <el-col class="tabs-content" :span="7" :offset="1">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/abc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
                <el-col class="tabs-content" :span="7" :offset="1">
                  <el-row v-for="(item,index) in number" :key="index">
                    <img src="@/static/images/cbc.png" alt style="width:100%;" />
                  </el-row>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row style="text-align:center;">
          <el-button class="payBtn">立即支付</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      payList: [
        {
          order: "ASDZXC1236547890",
          detail: "云服务器 CVM",
          amount: "544.00",
          payable: "544.00",
          time: "2019-11-01"
        }
      ],
      number: [1, 2, 3, 4, 5, 6]
    };
  },
  methods: {}
};
</script>

<style>
body {
}
.m-topBar {
  background-color: #11151c !important;
}
.pay {
  /* width: 44px; */
  height: 50px;
  color: #0261a7;
  font-family: "Microsoft YaHei";
  font-size: 20px;
  font-weight: 290;
  line-height: 50px;
  margin-top: 100px;
  background: #ffffff;
}
.payTitle {
  border-bottom: 1px solid #0261a7;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
.content {
  background: #fff;
  margin-top: 60px;
  padding: 30px 20px;
  height: 100%;
  margin-bottom: 60px;
  
}
.Title {
  border-left: 3px solid #0261a7;
  padding-left: 10px;
  margin: 20px 0;
}
.payBtn {
  margin-top: 30px;
  background: #0261a7;
  color: #ffffff;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-weight: 290;
  line-height: 24px;
}
.tabs-content {
  /* width: 162.98px; */
  /* height: 100px; */
  color: #333333;
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-weight: 290;
  line-height: 100px;
  text-align: left;
}
.el-table th {
  background: #e7f0f7 !important;
}
/* .el-table--border td{
  border:1px solid #0261a7;
} */
</style>
