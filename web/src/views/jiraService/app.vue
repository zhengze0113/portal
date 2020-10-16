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
    <!--参数项-->
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <p class="skuFont">资源选项</p>
        <el-col :offset="2">
          <el-form
            ref="monitoringFrom"
            :model="monitoringFrom"
            :rules="rules"
            :label-position="labelPosition"
            label-width="120px"
            style="width: 60%"
            class="demo-ruleForm"
          >
            <el-form-item label="选择集群：" prop="namespace">
              <el-select
                v-model="monitoringFrom.namespace"
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
            <el-form-item label="jira地址：" prop="jira_url">
              <el-input
                v-model="monitoringFrom.jira_url"
                :disabled="true"
                placeholder="请添加jira地址"
              />
            </el-form-item>

            <el-form-item label="jira项目类型：" prop="project_type">
              <el-select
                v-model="monitoringFrom.project_type"
                filterable
                placeholder="请选择项目类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in projectType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="管理员名称：">
              <el-select
                v-model="monitoringFrom.project_admin"
                filterable
                placeholder="请选择管理员"
                style="width: 100%"
              >
                <el-option
                  v-for="item in jiraUserList"
                  :key="item.key"
                  :label="item.displayName"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="jira项目名称：" prop="project_name">
              <el-input
                v-model="monitoringFrom.project_name"
                placeholder="请添加项目名称"
              />
            </el-form-item>
            <el-form-item label="key：" prop="key">
              <el-input
                v-model="monitoringFrom.key"
                placeholder="请添加项目key(只能输入大写英文和数字)"
              />
            </el-form-item>
            <el-form-item label="用户数量：" prop="userNumber">
              <el-input-number
                v-model="monitoringFrom.userNumber"
                @change="countTime"
                :min="1"
                :max="100"
                size="mini"
              ></el-input-number>
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
            <el-select v-model="mode" size="small" @change="countMonth">
              <el-option
                v-for="item in duration"
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
  getServiceCatalogsInfo,
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo, //查询详细sku信息
  getCloudServiceCatalogsC,
  getClusters, //获取集群
  getProject, //项目信息
  jiraGetUserApi,
  jiraParameterCalibrationApi, //参数验证
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    const isNum = (rule, value, callback) => {
      const key = /^[0-9A-Z]*$/g;
      if (!key.test(value)) {
        callback(new Error("必须为大写字母与数字的组合"));
      } else {
        callback();
      }
    };

    return {
      jiraUserList: [],
      rules: {
        jira_url: [
          { required: true, message: "jira地址不能为空" },
          { type: "url", message: "请填写正确的jira地址" },
        ],
        key: [
          { required: true, message: "项目key不能为空" },
          { validator: isNum, trigger: "blur" },
        ],
        project_type: [{ required: true, message: "项目类型不能为空" }],
        project_admin: [{ required: true, message: "管理员名称不能为空" }],
        project_name: [{ required: true, message: "项目名称不能为空" }],
        namespace: [{ required: true, message: "项目信息不能为空" }],
      },
      isFixed: true,
      input1: "",
      input: "",
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
      duration: [],
      time: 1,
      count: 1,
      price: 0,
      number: 1,
      mode: "",
      edit: [],
      skuData: "",
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
      options: [
        {
          value: "lihaorong",
          label: "lihaorong",
        },
      ],
      projectType: [
        {
          value: "Software",
          label: "Software",
        },
        {
          value: "Business",
          label: "Business",
        },
      ],
      //表单数据
      monitoringFrom: {
        userNumber: 1,
        uid: "",
        life_limit: 1,
        jira_url: "http://10.72.77.236:80", // 以 http[s]:// 开头，否则返回 400
        key: "", // 项目 key, 用户输入，只能输入 英文+数字，转换为大写
        project_type: "", // 项目类型，单选项， 一个 Software, Business
        project_admin: "", // 管理员名称
        project_name: "", // 项目名称，用户输入
        namespace: "",
      },
    };
  },

  created() {
    this.addorder.productId = this.getId("id");
    this.addorder.productName = this.getId("productName");
    this.addorder.catalogId = this.getId("catalogId");
    this.addorder.catalog = this.getId("catalog");
    this.getFatherId(this.getId("id"));
    this.handleScroll();
    this.fetchData();
    this.getClusters();
    this.getProject1();
    this.jiraGetUser();
  },
  mounted() {
    this.isFixed =
      document.body.offsetHeight - document.documentElement.clientHeight > 300;
    // window.addEventListener('mousewheel',this.handleScroll,false);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    countTime(data) {
      this.sum = this.monitoringFrom.userNumber * this.price;
      this.sum = Math.floor(this.sum * 100) / 100;
    },
    // 只能输入英文、数字
    btKeyDown(e) {
      e.target.value = e.target.value.replace(/[^\A-\Z0-9]/g, "");
    },
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[^\A-\Z0-9]/g, "");
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
    // 不知道
    getFatherId(id) {
      getServiceCatalogsInfo(id).then((r) => {
        this.objectCloud = r.content;
        this.id = id;
        this.name = r.content.name;
      });
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

    confirm() {
      if (this.disable == true) {
        this.disable = false;
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //表单验证
    submitForm(monitoringFrom) {
      this.$refs[monitoringFrom].validate((valid) => {
        if (valid) {
          var data = {
            jira_url: this.monitoringFrom.jira_url, // 以 http[s]:// 开头，否则返回 400
            key: this.monitoringFrom.key, // 项目 key, 用户输入，只能输入 英文+数字，转换为大写
            project_name: this.monitoringFrom.project_name, // 项目名称，用户输入
            jira_url: "http://10.72.77.236:80",
            jira_admin: "wangxueqing",
            jira_admin_password: "!d1wzjt85MDu",
          };
          jiraParameterCalibrationApi(this.monitoringFrom.namespace, data).then(
            (r) => {
              if (r.code == 200) {
                this.commitOrder();
                return true;
              } else {
                this.$notify({
                  type: "success",
                  message: r.message + "请重新添加",
                });
                return false;
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交订单
    async commitOrder() {
      //提交订单参数
      const r = await requestParams(getResourcesSkuInfo, this.radio);

      this.skuInfo = r.content;
      // this.skuInfoSpecs = r.content.storage;
      this.skuInfo.category = this.name;
      let params1 = { name: "", paramValue: "" };
      params1.name = "项目信息";
      params1.paramValue = this.monitoringFrom.namespace;
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "jira地址";
      params2.paramValue = this.monitoringFrom.jira_url;
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "项目Key";
      params3.paramValue = this.monitoringFrom.key;
      this.skuInfoSpecs.push(params3);
      let params4 = { name: "", paramValue: "" };
      params4.name = "项目类型";
      params4.paramValue = this.monitoringFrom.project_type;
      this.skuInfoSpecs.push(params4);
      let params5 = { name: "", paramValue: "" };
      params5.name = "管理员名称";
      params5.paramValue = this.monitoringFrom.project_admin;
      this.skuInfoSpecs.push(params5);
      let params6 = { name: "", paramValue: "" };
      params6.name = "项目名称";
      params6.paramValue = this.monitoringFrom.project_name;
      this.skuInfoSpecs.push(params6);
      let params7 = { name: "", paramValue: "" };
      params7.name = "使用年限";
      params7.paramValue = this.monitoringFrom.life_limit + "年";
      this.skuInfoSpecs.push(params7);
      let params8 = { name: "", paramValue: "" };
      params8.name = "用户数量";
      params8.paramValue = this.monitoringFrom.userNumber + "人";
      this.skuInfoSpecs.push(params8);

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
        this.addorder.items[0].finalPrice = this.price;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].skuId = this.radio;
        this.addorder.items[0].category = this.name;
        this.addorder.items[0].name = this.name;
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time + "年";
        // 存储
        delete this.monitoringFrom.userNumber;
        var data = JSON.stringify(this.addorder);
        sessionStorage.setItem("order", data);
        sessionStorage.setItem(
          "monitoring",
          JSON.stringify(this.monitoringFrom)
        );
        console.log(sessionStorage);
        location.href = "/html/confirmOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },

    //选择时长
    async countMonth(data) {
      console.log(data);
      this.price = data;
      this.sum = this.monitoringFrom.userNumber * this.data;
      let obj = {};
      obj = this.duration.find((item) => {
        return item.value == data;
      });
      let getName = "";
      getName = parseFloat(obj.label);
      console.log(getName);
      this.monitoringFrom.life_limit = getName;
      this.time = getName;
    },
    //初始化
    async fetchData() {
      this.listLoading = true;
      this.id = this.getId("id");

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
      list.forEach((item) => {
        var skuparam = {
          value: item.price,
          label: item.name,
        };
        this.duration.push(skuparam);
      });
      this.mode = list[0].price;
      console.log(list);
      this.sum = list[0].price;
      this.price = list[0].price;
      this.radio = list[0].id;

      this.monitoringFrom.life_limit = parseFloat(list[0].name);
      this.time = parseFloat(list[0].name);
    },
    //获取集群
    async getClusters() {
      this.edit = [];
      const res1 = await requestParams(getClusters);
      for (var i = 0; i < res1.content.content.length; i++) {
        var data = {
          value: res1.content.content[i].id,
          label: res1.content.content[i].name,
        };
        this.edit.push(data);
      }
      this.regionalInformation = this.edit[0].value;
    },
    //获取jira用户
    async jiraGetUser() {
      const res = await requestParams(jiraGetUserApi);
      this.jiraUserList = res.content;
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content.content;
      this.projectinformation = this.optionProject[0].name;

      this.addorder.projectId = this.optionProject[0].id;
      this.addorder.projectName = this.optionProject[0].projectName;
    },

    clickName(data) {
      let obj = {};
      obj = this.optionProject.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    getClustersLabel(val) {
      let obj = {};
      obj = this.edit.find((item) => {
        return item.value == val;
      });
      let getName = "";
      getName = obj.label;
      return getName;
    },
    getObjectName(val) {
      let obj = {};
      obj = this.optionProject.find((item) => {
        return item.name == val;
      });
      let getName = "";
      getName = obj.displayName;
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
/deep/ .el-form-item {
  margin-bottom: 20px;
}
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
