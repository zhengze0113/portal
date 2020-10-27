<template>
  <div id="app" style="background-color: #e9e9e9">
    <el-row style="height: 100px; background: white">
      <el-col :span="24"></el-col>
    </el-row>
    <el-row style="height: 70px; background: rgba(255, 255, 255, 1)">
      <el-col :span="24">
        <el-row>
          <el-col :offset="3" :span="2" class="buyTitle">服务购买</el-col>
          <el-col :span="12" class="smallBuyTitle">{{
            addorder.productName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--sku-->
    <!--参数项-->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <p class="skuFont">资源选项</p>
        <el-row>
          <el-col :offset="2">
            <el-row>
              <el-col :span="18">
                <el-form
                  :label-position="labelPVC"
                  :model="redisFrom"
                  :rules="redisFrom"
                  ref="redisFrom"
                  label-width="150px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    class="skuDivFont"
                    label="项目："
                    prop="projectNo"
                    :rules="[{ required: true, message: '项目信息不能为空' }]"
                  >
                    <el-select
                      v-model="redisFrom.projectNo"
                      placeholder="请选择项目"
                      style="width: 100%"
                      @change="selectModel($event)"
                    >
                      <el-option
                        v-for="item in project"
                        :key="item.projectName"
                        :label="item.projectName"
                        :value="item.projectNo"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    class="skuDivFont"
                    label="集群："
                    prop="envId"
                    :rules="[{ required: true, message: '集群信息不能为空' }]"
                  >
                    <el-select
                      v-model="redisFrom.envId"
                      filterable
                      placeholder="请选择集群"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in envs"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="资源空间:"
                    class="skuDivFont"
                    prop="namespace"
                    :rules="[{ required: true, message: '资源空间不能为空' }]"
                  >
                    <el-select
                      v-model="redisFrom.namespace"
                      placeholder="请选择资源空间"
                      style="width: 100%"
                      @visible-change="clickNamespace"
                    >
                      <el-option
                        v-for="item in namespaces"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="名称："
                    prop="displayname"
                    class="skuDivFont"
                    :rules="[
                      { required: true, message: '名称不能为空' },
                      {
                        pattern: /^[a-z0-9A-Z]([-a-z0-9A-Z.]*[z-z0-9A-Z])?$/,
                        message:
                          '名称由字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-input v-model="redisFrom.displayname"></el-input>
                  </el-form-item>
                  <el-form-item label="标签">
                    <div class="table-box" style="margin-right: 24px">
                      <el-table
                        :data="redisFrom.label"
                        style="width: 100%; border: 1px solid #dcdfe6"
                      >
                        <el-table-column label="KEY" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'label.' + scope.$index + '.key'"
                              :rules="[
                                {
                                  required: true,
                                  message: '请输入KEY',
                                  trigger: 'blur',
                                },
                                {
                                  pattern: /(?!\d+$)[a-zA-Z0-9]([A-Za-z0-9/_])?$/,
                                  message:
                                    '不能为纯数字,名称由字母、数字、(_)和(/)组成',
                                  trigger: 'blur',
                                },
                              ]"
                            >
                              <el-input
                                placeholder="请输入KEY"
                                class="width90"
                                v-model="scope.row.key"
                              ></el-input>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column align="center" label="VALUE">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'label.' + scope.$index + '.value'"
                              :rules="[
                                {
                                  required: true,
                                  message: '请输入VALUE',
                                  trigger: 'blur',
                                },
                                {
                                  pattern: /(?!\d+$)[a-zA-Z0-9]([A-Za-z0-9/_])?$/,
                                  message:
                                    '不能为纯数字,名称由字母、数字、(_)和(/)组成',
                                  trigger: 'blur',
                                },
                              ]"
                            >
                              <el-input
                                placeholder="请输入VALUE"
                                class="width90"
                                v-model="scope.row.value"
                              ></el-input>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column
                          width="100"
                          align="center"
                          label="操作"
                        >
                          <template slot-scope="scope">
                            <div class="del" @click="delEnv(scope)">移除</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="add">
                      <span @click="addEnv">
                        <i class="add-icon">+</i>新增标签</span
                      >
                    </div>
                  </el-form-item>

                  <el-form-item label="服务端口：" class="skuDivFont">
                    <el-input
                      v-model="redisFrom.port"
                      :disabled="true"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="集群配置：" class="skuDivFont">
                    <el-switch
                      v-model="redisFrom.cluster"
                      @change="clusterChange"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item
                    label="集群规模："
                    prop="slaveCount"
                    class="skuDivFont"
                  >
                    <el-radio-group
                      v-model="redisFrom.slaveCount"
                      :disabled="!redisFrom.cluster"
                    >
                      <el-radio label="3">3</el-radio>
                      <el-radio label="5">5</el-radio>
                      <el-radio label="7">7</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="CPU：" prop="cpu" class="skuDivFont">
                    <el-radio-group v-model="redisFrom.cpu" @change="cpuChange">
                      <el-radio label="100m">100m</el-radio>
                      <el-radio label="500m">500m</el-radio>
                      <el-radio label="1024m">1024m</el-radio>
                      <el-radio label="2048m">2048m</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="内存：" prop="memory" class="skuDivFont">
                    <el-radio-group
                      v-model="redisFrom.memory"
                      @change="memoryChange"
                    >
                      <el-radio label="256Mi">256Mi</el-radio>
                      <el-radio label="512Mi">512Mi</el-radio>
                      <el-radio label="1024Mi">1024Mi</el-radio>
                      <el-radio label="2048Mi">2048Mi</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    label="持久化存储大小："
                    prop="storage"
                    class="skuDivFont"
                  >
                    <el-radio-group
                      v-model="redisFrom.storage"
                      @change="storageChange"
                    >
                      <el-radio label="1Gi">1Gi</el-radio>
                      <el-radio label="2Gi">2Gi</el-radio>
                      <el-radio label="4Gi">4Gi</el-radio>
                      <el-radio label="8Gi">8Gi</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--订购-->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <p class="skuFont">订购</p>
        <el-row>
          <el-col :offset="2" style="margin-bottom: 30px">
            <span class="skuDivFont">计费方式</span>
            <el-button
              style="
                border-radius: 0;
                height: 30px;
                background: rgba(3, 97, 167, 1);
                padding-left: 14px;
              "
            >
              <span class="rightFont">包年包月</span>
            </el-button>
          </el-col>
          <el-col :offset="2" style="margin-bottom: 30px">
            <span class="skuDivFont">购买时长</span>
            <el-input-number
              v-model="time"
              :min="1"
              :max="12"
              size="mini"
              style="width: 130px"
              @change="countTime"
            ></el-input-number>
            <el-select
              v-model="mode"
              size="mini"
              style="width: 80px; margin-left: 30px; margin-bottom: 0px"
              @change="countTime"
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
    <!--服务协议-->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <el-col :span="3"> <p class="skuFont">服务协议</p></el-col>

        <el-col :span="21">
          <el-checkbox
            @change="confirm()"
            class="skuFont"
            style="margin-bottom: 10px"
          >
            <el-link type="primary" @click="agreement()">《服务条款》</el-link>
          </el-checkbox>
        </el-col>
      </el-col>
    </el-row>

    <!--提交订单-->
    <el-row style="margin-top: 30px; height: 100px">
      <el-col
        :span="24"
        style="background: #fff; height: 100px"
        :class="isFixed ? 'fixed' : ''"
      >
        <el-col :offset="15" style="color: #666666; line-height: 100px">
          服务费用：
          <span class="money">￥{{ sum }}</span>
          <el-button
            style="
              border-radius: 0;
              width: 87px;
              height: 30px;
              background: rgba(3, 97, 167, 1);
              padding-left: 14px;
              margin-left: 5%;
            "
            @click="submitForm('redisFrom')"
            v-if="disable == true"
          >
            <span class="rightFont">提交订单</span>
          </el-button>
          <el-popover
            placement="bottom-start"
            width="150"
            trigger="click"
            content="请仔细阅读服务协议，确认后再提交订单"
            v-if="disable == false"
          >
            <el-button
              slot="reference"
              style="
                border-radius: 0;
                width: 87px;
                height: 30px;
                background: rgba(3, 97, 167, 1);
                margin-left: 5%;
                padding-left: 14px;
              "
            >
              <span class="rightFont">提交订单</span>
            </el-button>
          </el-popover>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo, //查询详细sku信息
  getProjects,
  getClusters,
  getProjectResource, //获取项目下资源空间
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getUserInfo } from "../../utils/auth";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      cpuPrice: 100,
      memoryPrice: 256,
      storagePrice: 10,
      namespaces: "",
      cpuPrices: [
        { key: "100m", value: 100 },
        { key: "500m", value: 500 },
        { key: "1024m", value: 1024 },
        { key: "2048m", value: 2048 },
      ],
      memoryPrices: [
        { key: "256Mi", value: 256 },
        { key: "512Mi", value: 512 },
        { key: "1024Mi", value: 1024 },
        { key: "2048Mi", value: 2048 },
      ],
      storagePrices: [
        { key: "1Gi", value: 10 },
        { key: "2Gi", value: 20 },
        { key: "4Gi", value: 40 },
        { key: "8Gi", value: 80 },
      ],
      skuInfo: null,
      skuInfoSpecs: [],
      search: {
        params: "",
        page: 1,
        rows: 100,
      },
      labelPVC: "left",
      isFixed: true,
      edit: [],
      skuid: 0,
      skuData: "",
      disable: false,
      sum: 0,
      radio: "",
      name: "",
      envs: "",
      redisFrom: {
        envId: "",
        namespace: "",
        projectNo: "",
        displayname: "",
        name: "",
        port: "",
        cluster: false,
        slaveCount: "1",
        cpu: "100m",
        memory: "256Mi",
        storage: "1Gi",
        label: [{ key: "", value: "" }],
      },
      price: 0,
      time: 0,
      addorder: {
        //提交订单数据
        amount: 0,
        description: "订单",
        discount: 0,
        projectId: "", //所属项目id
        projectName: "", //所属项目名称
        productId: 0, //云产品id
        productName: "", //云产品名称
        catalogId: 0, //服务目录Id
        catalog: "", //服务目录名称
        items: [
          {
            amount: 0,
            basicPrice: 0,
            category: "",
            name: "",
            description: "",
            discount: 0,
            duration: 0,
            finalPrice: 0,
            name: "",
            params: "",
            payMode: "AFTERWARDS",
            skuId: 0,
            tags: "",
            platformParams: "",
          },
        ],
        name: "",
        payMode: "AFTERWARDS",
        tags: "",
        userId: "1",
        tenantId: "1",
      },
      sum: 0,
      mode: "MONTH",
      disable: false,
      options: [
        {
          value: "MONTH",
          label: "月",
        },
      ],
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      project: "",
      projectResource: { envId: "", projectNo: "" },
    };
  },
  methods: {
    //验证资源空间剩余空间
    delEnv(row) {
      this.redisFrom.label.splice(row.$index, 1);
    },
    addEnv() {
      this.redisFrom.label.push({ key: "", value: "" });
    },
    //获取资源空间
    clickNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.redisFrom.envId;
        this.projectResource.projectNo = this.redisFrom.projectNo;
        getProjectResource(this.projectResource).then((r) => {
          this.namespaces = r.content;
        });
      }
    },
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      this.redisFrom.envId = this.envs[0].id;
      this.projectResource.envId = this.redisFrom.envId;
      this.projectResource.projectNo = this.redisFrom.projectNo;

      getProjectResource(this.projectResource).then((r) => {
        this.namespaces = r.content;
      });
    },
    selectModel(name) {
      let obj = {};
      obj = this.project.find((item) => {
        //model就是上面的数据源
        return item.projectNo === name; //筛选出匹配数据
      });

      this.redisFrom.namespace = "";
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //增加时间
    countTime() {
      this.price = this.cpuPrice + this.memoryPrice + this.storagePrice;
      console.log(this.cpuPrice + "+" + this.price);
      this.sum = this.time * this.price;
      this.sum = Math.floor(this.sum * 100) / 100;
    },

    cpuChange(data) {
      this.cpuPrices.forEach((item) => {
        if (data == item.key) {
          this.cpuPrice = item.value;
        }
      });
      this.countTime();
    },
    memoryChange(data) {
      this.memoryPrices.forEach((item) => {
        if (data == item.key) {
          this.memoryPrice = item.value;
        }
      });
      this.countTime();
    },
    storageChange(data) {
      this.storagePrices.forEach((item) => {
        if (data == item.key) {
          this.storagePrice = item.value;
        }
      });
      this.countTime();
    },

    clusterChange(data) {
      if (!data) {
        this.redisFrom.slaveCount = "1";
      } else {
        this.redisFrom.slaveCount = "3";
      }
    },
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
    confirm() {
      if (this.disable == true) {
        this.disable = false;
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //服务协议
    agreement() {
      location.href = "/html/agreement.html";
    },
    //固定定位
    handleScroll() {
      let scrollTop1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let screenHeight = scrollTop1 + document.documentElement.clientHeight;

      if (300 <= document.body.offsetHeight - screenHeight) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    submitForm(formName) {
      console.log(this.redisFrom);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.commitOrder();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交订单
    async commitOrder() {
      //提交订单参数
      if (this.disable == true) {
        let params1 = { name: "", paramValue: "" };
        params1.name = "CPU";
        params1.paramValue = this.redisFrom.cpu;
        this.skuInfoSpecs.push(params1);
        let params2 = { name: "", paramValue: "" };
        params2.name = "内存";
        params2.paramValue = this.redisFrom.memory;
        this.skuInfoSpecs.push(params2);
        let params3 = { name: "", paramValue: "" };
        params3.name = "持久化存储";
        params3.paramValue = this.redisFrom.storage;
        this.skuInfoSpecs.push(params3);
        let params4 = { name: "", paramValue: "" };
        params4.name = "名称";
        params4.paramValue = this.redisFrom.displayname;
        this.skuInfoSpecs.push(params4);
        let params5 = { name: "", paramValue: "" };
        params5.name = "端口";
        params5.paramValue = this.redisFrom.port;
        this.skuInfoSpecs.push(params5);
        let params6 = { name: "", paramValue: "" };
        params6.name = "集群规模";
        params6.paramValue = this.redisFrom.slaveCount;
        this.skuInfoSpecs.push(params6);
        let params8 = { name: "", paramValue: "" };
        params8.name = "标签";
        params8.paramValue = this.redisFrom.label;
        this.skuInfoSpecs.push(params8);

        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio; //
        this.addorder.items[0].category = this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        var duration = "月";
        this.addorder.items[0].duration = this.time + duration;
        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        console.log(data);
        sessionStorage.setItem("order", data);
        sessionStorage.setItem("redisFrom", JSON.stringify(this.redisFrom));
        console.log(sessionStorage);
        location.href = "/html/confirmOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    async fetchData() {
      this.redisFrom.port =
        Math.floor(Math.random() * (32767 - 30000 + 1)) + 30000;
      this.listLoading = true;
      this.id = this.getId("id");
      this.user = JSON.parse(getUserInfo());
      const resProduct = await requestParams(
        getProductMessage,
        this.getId("productId")
      );
      this.id = this.getId("id");
      this.search.serviceCode = resProduct.serviceCode;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      var list = res.content.content;

      this.radio = list[0].id;
      //获取用户下的项目列表
      this.search1.sort = this.user.uid;
      const projectres = await requestParams(getProjects, this.search1);
      this.project = projectres.content.content;

      this.countTime();
    },
  },

  created() {
    this.addorder.productId = this.getId("id");
    this.addorder.productName = this.getId("productName");
    this.addorder.catalogId = this.getId("catalogId");
    this.addorder.catalog = this.getId("catalog");
    this.fetchData();
    this.getClusters();
  },
  mounted() {
    this.isFixed =
      document.body.offsetHeight - document.documentElement.clientHeight > 300;
    // window.addEventListener('mousewheel',this.handleScroll,false);
    window.addEventListener("scroll", this.handleScroll);
  },
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
/deep/ .el-form-item__content {
  line-height: 0px;
  position: relative;
  font-size: 14px;
}
.add {
  color: #0261a7;
  font-size: 12px;
  margin-top: 10px;
  i {
    display: inline-block;
    margin-right: 9px;
    width: 14px;
    box-sizing: border-box;
    text-align: center;
    height: 13px;
    border-radius: 4px;
    border: 1px solid #0261a7;
    line-height: 13px;
  }
  span {
    cursor: pointer;
  }
}
.del {
  margin-bottom: 18px;
  color: #ff2d25;
  cursor: pointer;
}
</style>
