<template>
  <div id="app" style="background-color: #e9e9e9">
    <el-row style="height: 100px; background: white">
      <el-col :span="24" />
    </el-row>
    <el-row style="height: 70px; background: rgba(255, 255, 255, 1)">
      <el-col :span="24">
        <el-row>
          <el-col :offset="3" :span="2" class="buyTitle"> 服务购买 </el-col>
          <el-col :span="12" class="smallBuyTitle">{{
            addorder.productName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- sku -->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <p class="skuFont">SKU资源</p>
        <el-row>
          <el-col :offset="2">
            <span class="skuDivFont">筛选</span>
          </el-col>
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
                    v-model="radio"
                    :label="scope.row.id"
                    align="center"
                  >
                    &nbsp;
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column label="规格组" align="center">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="cpu" align="center">
                <template slot-scope="scope">{{ scope.row.cpuCores }}</template>
              </el-table-column>
              <el-table-column label="内存" align="center">
                <template slot-scope="scope">{{ scope.row.memory }}</template>
              </el-table-column>
              <el-table-column label="存储空间" align="center">
                <template slot-scope="scope">{{ scope.row.storage }}</template>
              </el-table-column>

              <!-- <el-table-column label="版本" align="center">
                <template slot-scope="scope">{{ scope.row.version }}</template>
              </el-table-column> -->
              <el-table-column label="参考价格" align="center">
                <template slot-scope="scope"
                  >{{ scope.row.price }}元/年</template
                >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col
            :offset="2"
            :span="12"
            style="margin-top: 30px; margin-bottom: 30px"
          >
            <span class="skuDivFont">当前规格</span>
            <span class="specFont"
              >{{ skuData.name }}/{{ skuData.cpuCores }}/{{ skuData.memory }}
            </span>
          </el-col>
          <el-col :span="10" style="margin-top: 30px; margin-bottom: 30px">
            <span class="skuDivFont">当前资源需求:</span>
            <span class="skuDivFont"
              >{{ skuData.cpuCores }}/{{ skuData.memory }}</span
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--参数项-->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <p class="skuFont">资源选项</p>
        <el-col :offset="2">
          <el-form
            ref="monitoringFrom"
            :model="monitoringFrom"
            :label-position="labelPosition"
            label-width="150px"
            style="width: 60%"
            class="demo-ruleForm"
          >
            <el-form-item
              label="项目："
              prop="project_id"
              :rules="[{ required: true, message: '项目不能为空' }]"
            >
              <el-select
                v-model="monitoringFrom.project_id"
                filterable
                placeholder="请选择"
                style="width: 100%"
                @change="clickName"
              >
                <el-option
                  v-for="item in optionProject"
                  :key="item.projectNo"
                  :label="item.projectName"
                  :value="item.projectNo"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              label="集群："
              prop="cluster_id"
              :rules="[{ required: true, message: '集群不能为空' }]"
            >
              <el-select
                v-model="monitoringFrom.cluster_id"
                filterable
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in envs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="资源空间:">
              <el-select
                v-model="monitoringFrom.namespace"
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
              label="实例名称"
              prop="name"
              :rules="[{ required: true, message: '实例名称不能为空' }]"
            >
              <el-input
                v-model="monitoringFrom.name"
                placeholder="请输入实例名称"
              />
            </el-form-item>
          </el-form>
        </el-col>
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
              <span class="rightFont">包年</span>
            </el-button>
          </el-col>
          <el-col :offset="2" style="margin-bottom: 30px">
            <span class="skuDivFont">购买时长</span>
            <el-select v-model="date" size="small" @change="countMonth">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
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
            v-if="disable == true"
            style="
              border-radius: 0;
              width: 87px;
              height: 30px;
              background: rgba(3, 97, 167, 1);
              padding-left: 14px;
              margin-left: 5%;
            "
            @click="submitForm('monitoringFrom')"
          >
            <span class="rightFont">提交订单</span>
          </el-button>
          <el-popover
            v-if="disable == false"
            placement="bottom-start"
            width="150"
            trigger="click"
            content="请仔细阅读服务协议，确认后再提交订单"
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
  getClusters, //获取集群
  getProject,
  getProjects, //项目信息
  getProjectResource, //资源空间
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      projectResource: { envId: "", projectNo: "" },
      numberValidateForm: {
        age: "",
      },
      envs: "",
      isFixed: true,
      input1: "",
      projectName: "", //项目名称
      configure: "", //调度配置
      projectDescription: "", //项目描述
      //容器部署
      regionalInformation: "", //区域信息
      projectinformation: "", //项目信息
      image: "", //镜像
      instance: "", //实例
      optionProject: [], //项目信息下拉框
      radio: "",
      skuid: 0,
      time: 1,
      count: 1,
      price: 0,
      number: 1,
      edit: [],
      skuData: "",
      duration: "",
      options: [
        {
          value: 1,
          label: "1年",
        },
        {
          value: 3,
          label: "3年",
        },
      ],
      date: 1,
      disable: false,
      sum: 0,
      addorder: {
        //提交订单数据
        amount: 0,
        projectId: "", //所属项目id
        projectName: "", //所属项目名称
        productId: 0, //云产品id
        productName: "", //云产品名称
        catalogId: 0, //服务目录Id
        catalog: "", //服务目录名称
        description: "订单",
        discount: 0,
        items: [
          {
            amount: 1,
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
          },
        ],
        name: "",
        payMode: "AFTERWARDS",
        tags: "",
        userId: "1",
        tenantId: "1",
      },
      skulist: [],
      skuInfoSpecs: [],
      skuInfo: null,
      id: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      search: {
        params: "",
        page: 1,
        rows: 100,
      },
      skuObject: {
        id: "1",
        spec: "2016-05-03",
        cpu: "王小虎",
        gb: "上海市普陀区金沙江路 1518 弄",
        version: "V 1.0",
        money: "28.00/月",
      },
      projectCreationform: {
        //项目创建表单数据
        str: "",
      },
      containerDeployment: {
        //容器部署表单数据
        str: "",
      },
      monitoringFrom: {
        cluster_id: "", // 集群id
        uid: "", // 唯一 id - 订单id
        project_id: "",
        namespace: "",
        cpu: "",
        mem: "",
        storage: "",
        life_limit: 1, // 用户选择的使用年限来传给后端
        name: "",
      },
      namespaces: "",
    };
  },

  created() {
    this.addorder.productId = this.getId("id");
    this.addorder.productName = this.getId("productName");
    this.addorder.catalogId = this.getId("catalogId");
    this.addorder.catalog = this.getId("catalog");
    
    this.handleScroll();
    this.fetchData();
    this.getClusters();
    this.getProject1();
  },
  mounted() {
    this.isFixed =
      document.body.offsetHeight - document.documentElement.clientHeight > 300;
    // window.addEventListener('mousewheel',this.handleScroll,false);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    clickName(data) {
      let obj = {};
      obj = this.optionProject.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //获取资源空间
    clickNamespace(id) {
      this.projectResource.envId = this.monitoringFrom.cluster_id;
      this.projectResource.projectNo = this.monitoringFrom.project_id;
      if (this.projectResource.envId == "") {
        this.$notify({
          type: "warning",
          message: "请选择集群",
        });
      } else if (this.projectResource.projectNo == "") {
        this.$notify({
          type: "warning",
          message: "请选择项目",
        });
      } else {
        getProjectResource(this.projectResource).then((r) => {
          this.namespaces = r.content;
        });
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
    //点击事件
    async rowClick(row, column, event) {
      this.skuData = row;
      this.radio = row.id;

      this.monitoringFrom.cpu = parseFloat(row.cpuCores) + "";
      this.monitoringFrom.mem = parseFloat(row.memory) + "";
      this.monitoringFrom.storage = parseFloat(row.storage) + "";

      this.price = row.price;
      this.sum = row.price * this.time;
      this.sum = Math.floor(this.sum * 100) / 100;
    },
    confirm() {
      if (this.disable == true) {
        this.disable = false;
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    submitForm(formName) {
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

      let params1 = { name: "", paramValue: "" };
      params1.name = "项目信息";
      params1.paramValue = this.getObjectName(this.monitoringFrom.project_id);
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "集群";
      params2.paramValue = this.getObject(this.monitoringFrom.cluster_id);
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "CPU";
      params3.paramValue = this.monitoringFrom.cpu;
      this.skuInfoSpecs.push(params3);
      let params4 = { name: "", paramValue: "" };
      params4.name = "使用年限";
      params4.paramValue = this.monitoringFrom.life_limit + "年";
      this.skuInfoSpecs.push(params4);
      let params5 = { name: "", paramValue: "" };
      params5.name = "内存";
      params5.paramValue = this.monitoringFrom.mem;
      this.skuInfoSpecs.push(params5);
      let params6 = { name: "", paramValue: "" };
      params6.name = "硬盘大小";
      params6.paramValue = this.monitoringFrom.storage;
      this.skuInfoSpecs.push(params6);
      let params7 = { name: "", paramValue: "" };
      params7.name = "实例名称";
      params7.paramValue = this.monitoringFrom.name;
      this.skuInfoSpecs.push(params7);
      if (this.disable == true) {
        for (var key in this.addorder.items[0]) {
          for (var key1 in this.skuInfo) {
            if (key == key1) {
              this.addorder.items[0][key] = this.skuInfo[key1];
            }
          }
        }
        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio; //
        this.addorder.items[0].category = this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time + "年";
        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        console.log(data);
        sessionStorage.setItem("order", data);
        sessionStorage.setItem(
          "monitoring",
          JSON.stringify(this.monitoringFrom)
        );
        console.log(sessionStorage);
        console.log(this.monitoringFrom);
        location.href = "/html/confirmOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },

    //选择时长
    async countMonth(data) {
      console.log(data);
      console.log(this.price);
      this.time = data;
      this.sum = this.price * data;
    },
    //获取云资源下的sku
    async fetchData() {
      this.listLoading = true;
      this.id = this.getId("id");

      const resProduct = await requestParams(
        getProductMessage,
        this.getId("productId")
      );
      this.search.serviceCode = resProduct.serviceCode;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      var list = res.content.content;

      this.duration = list;
      this.radio = list[0].id;
      this.sum = list[0].price;
      this.price = list[0].price;
      this.skulist = list;
      this.skuData = list[0];

      this.monitoringFrom.cpu = parseFloat(list[0].cpuCores) + "";
      this.monitoringFrom.mem = parseFloat(list[0].memory) + "";
      this.monitoringFrom.storage = parseFloat(list[0].storage) + "";
    },
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      console.log(this.envs);
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProjects);
      this.optionProject = res1.content.content;
    },
    getObject(val) {
      let obj = {};
      obj = this.envs.find((item) => {
        return item.id == val;
      });
      let getName = "";
      getName = obj.name;
      console.log(obj);
      return getName;
    },
    getObjectName(val) {
      let obj = {};
      obj = this.optionProject.find((item) => {
        return item.projectNo == val;
      });
      let getName = "";
      console.log(obj);
      getName = obj.projectName;
      return getName;
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
@import "../rewrite.scss";
.subtitle {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
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
.skutags {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
.headList {
  display: table;
  vertical-align: middle;
  padding: 0px 20px;
  height: 60px;

  line-height: 24px;
  border-radius: 2px;
  background: rgba(233, 233, 233, 1);
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}
.configfont {
  display: block;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  padding-top: 15px;
}
.active {
  background: rgba(3, 97, 167, 1);
  .skuname {
    color: rgba(255, 255, 255, 1);
  }
  .skutags {
    color: rgba(255, 255, 255, 1);
  }
}

/deep/ .el-input__icon {
  line-height: 25px;
}
.top {
  width: 60%;
  margin-left: 10%;
  margin-right: 20%;
  background: #fff;
  padding: 1% 0 1% 0;
}

.value {
  width: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 50px;
  height: 50px;
  color: rgba(51, 51, 51, 1);
  float: left;
}
.price {
  width: 100px;
  line-height: 50px;
  height: 50px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(2, 97, 167, 1);
  margin-left: 20px;
}

.top_text {
  margin-right: 3%;
  font-size: 16px;
}
.widthv {
  width: 86% !important;
}
.top-col {
  width: 84%;
  margin: 2% 10%;
}
.el-button {
  line-height: 0;
}
.line {
  margin-top: 10px !important;
}
.left-title {
  width: 84%;
  margin-left: 10%;
  padding-top: 2%;
}
.protocol {
  width: 440px;
  height: 27px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.headline {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.left-title-font {
  width: 48px;
  height: 13px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.buy {
  width: 232px;
  height: 13px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  margin: 10px 10px 0 0;
}
.edit {
  font-size: 14px;
  margin-top: 1%;
}
.buy:nth-child(1),
.buy:nth-child(2) {
  margin-top: 0;
}
.edit:nth-child(1),
.edit:nth-child(2) {
  margin-top: 0;
}

.bclass {
  // background: #fafafa;
  // width: 114%;
  height: auto;
  // position: absolute;
  // right: 5%;
  // top: 3%;
  font-size: 12px;
  padding: 1.3%;
}
.el-divider--horizontal {
  margin: 14px 0;
}
.aclass {
  background: #fafafa;
  width: 17%;
  height: auto;
  position: fixed;
  right: 10.3%;
  top: 2%;
  padding: 1%;
  font-size: 14px;
}

.right-font {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}
.rightServiceSpan {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.rightDiv {
  padding: 10px;
  margin-top: 18px;
}
.rightDiv:hover {
  transition: 0.25s;
  cursor: pointer;
  box-shadow: darkgrey 1px 1px 4px;
}
.rightFont {
  width: 55px;
  height: 14px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.selectD {
  width: 830px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid rgba(2, 97, 167, 1);
}

.buyTitle {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
.money {
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgb(2, 97, 167);
}
.fixed {
  position: fixed;
  top: 87%;
  z-index: 2000;
}
.skuFont {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  padding: 25px 0 10px 25px;
}
.skuDivFont {
  padding-right: 25px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.specFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.el-form-item[data-v-5af47386] {
  margin-bottom: 15px;
}
.smallBuyTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 76px;
}
/deep/ .el-form-item__label {
  text-align: left;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
@media screen and (max-width: 1024px) {
  .headList {
    height: 85px;
    line-height: 20px;
  }
}
</style>
