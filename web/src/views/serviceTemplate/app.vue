<template>
  <div id="app" style="background-color: #E9E9E9">
    <el-row style="height:100px;background: white;">
      <el-col :span="24"></el-col>
    </el-row>
    <el-row style="height:70px;background:rgba(255,255,255,1);">
      <el-col :span="24">
        <el-row>
          <el-col :offset="3" :span="2" class="buyTitle">服务购买</el-col>
          <el-col :span="12" class="smallBuyTitle">{{productObj.name }}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <!--sku-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <p class="skuFont">SKU资源</p>
        <el-row>
          <el-col :offset="2">
            <span class="skuDivFont">筛选</span>
          </el-col>
          <el-col :offset="2" :span="19">
            <el-table
              size="small"
              :data="skuData"
              fit
              height="300"
              highlight-current-row
              row-key="id"
              @row-click="rowClick"
            >
              <el-table-column>
                <template slot-scope="scope">
                  <el-radio v-model="radio" :label="scope.row.id" align="center">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column label="规格组" align="center">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="CPU" align="center">
                <template slot-scope="scope">{{ scope.row.cpuCores }}</template>
              </el-table-column>
              <el-table-column label="内存" align="center">
                <template slot-scope="scope">{{ scope.row.memory }}</template>
              </el-table-column>
              <el-table-column label="存储空间" align="center">
                <template slot-scope="scope">{{ scope.row.storage }}</template>
              </el-table-column>
              <el-table-column label="版本" align="center">
                <template slot-scope="scope">{{ scope.row.version }}</template>
              </el-table-column>
              <el-table-column label="参考价格" align="center">
                <template slot-scope="scope">{{ scope.row.price }}元/月</template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :offset="2" :span="12" style="margin-top:30px;margin-bottom:30px;">
            <span class="skuDivFont">当前规格</span>
            <span
              class="specFont"
            >{{ selectSku.name }}/{{ selectSku.cpuCores }}/{{ selectSku.memory }}/{{ selectSku.storage }}</span>
          </el-col>
          <!-- <el-col :span="10" style="margin-top:30px;margin-bottom:30px;">
            <span class="skuDivFont">当前资源需求:</span>
            <span class="specFont">{{ selectSku.cckj }}GB</span>
          </el-col>-->
        </el-row>
      </el-col>
    </el-row>
    <!--参数项-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <p class="skuFont">资源选项</p>
        <el-row>
          <el-col :offset="2">
            <el-row>
              <el-col :span="18">
                <form-create v-model="form" :rule="rule" ref="form" :option="option"></form-create>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--订购-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
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
              v-model="time"
              :min="1"
              :max="12"
              size="mini"
              style="width:130px"
              @change="countTime"
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
    <!--服务协议-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <el-col :span="3">
          <p class="skuFont">服务协议</p>
        </el-col>

        <el-col :span="21">
          <el-checkbox @change="confirm()" class="skuFont" style="margin-bottom:10px">
            <el-link type="primary" @click="agreement()">《服务条款》</el-link>
          </el-checkbox>
        </el-col>
      </el-col>
    </el-row>

    <!--提交订单-->
    <el-row style="margin-top:30px;height:100px;">
      <el-col :span="24" style="background: #FFF;height:100px;" :class="isFixed ? 'fixed' : ''">
        <el-col :offset="15" style="color: #666666;line-height: 100px;">
          服务费用：
          <span class="money">￥{{ sum }}</span>
          <el-button
            style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);padding-left: 14px;margin-left:5%;"
            @click="submitForm()"
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
              style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);margin-left:5%;padding-left: 14px;"
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
  getProjects, //项目信息
  getProjectResource, //获取项目下资源空间
  gerStrogeclass, //查询sc列表
  getResourceSpaceNameInfo, //获取资源空间剩余可用资源
  persistentVolumeClaimCheck, //资源对象pvc名称唯一性校验
  getResourcesParams, //云资源的下参数组
  getParamsInfo, // 获取参数组详情接口
  aliasWhetherRepeat, //验证资源空间是否重复
} from "../../api/serviceOperating";
import { getProductMessage } from "../../api/CMSApi";
import { getUserInfo } from "../../utils/auth";
import {
  requestParams,
  parseHash,
  appendParamsToUrl,
} from "../../utils/urlParam";
import Vue from "vue";
export default {
  name: "App",
  components: {
    formCreate: formCreate.$form(),
  },

  data: function () {
    return {
      search: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      productId: "",
      labelForm: "right",
      form: {},
      //sku集合
      skuData: [],
      //选中的sku
      selectSku: "",
      productObj: "",
      //选中sku
      radio: "",
      //单价
      price: 0,
      time: 1,
      //参数集合
      paramsPar: [],
      //参数组
      paramsData: "",
      rule: [],
      // 组件参数配置
      option: {
        // 显示重置表单按扭
        submitBtn: false,
        resetBtn: false,
        // 表单提交按扭事件

        onSubmit: (formData) => {
          // alert(JSON.stringify(formData));
          console.log("获取表单中的数据：", formData);
        },
      },
      $f: "",
      //项目集合
      project: [],
      //原项目集合
      projects: [],
      //集群集合
      clustersList: [],
      options: [
        {
          value: "MONTH",
          label: "月",
        },
      ],
      sum: 0,
      disable: false,
      mode: "MONTH",
      isFixed: true,
      addorder: {
        //提交订单数据
        amount: 0,
        projectId: "", //所属项目id
        projectName: "", //所属项目名称
        description: "订单",
        discount: 0,
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
      skuInfoSpecs: [],
      number: 1,
    };
  },
  methods: {
    //提价按钮
    submitForm() {
      this.form.validate((valid) => {
        if (valid) {
          this.form.submit((formData) => {
            this.commitOrder();
          });
        }
      });
    },

    async commitOrder() {
      this.form.form.cpu = parseInt(this.selectSku.cpuCores);
      this.form.form.memory = parseInt(this.selectSku.memory);
      this.form.form.storage = parseInt(this.selectSku.storage);
      this.form.form.purchase = this.time;
      //提交订单参数
      const r = await requestParams(getResourcesSkuInfo, this.radio);
      this.skuInfo = r.content;
      this.skuInfo.category = this.name;
      this.paramsPar.forEach((item) => {
        let params = { name: "", paramValue: "" };
        params.name = item.paramName;
        params.paramValue = eval(`this.form.form.${item.name}`);
        this.skuInfoSpecs.push(params);
      });
      console.log(this.skuInfoSpecs);
      if (this.disable == true) {
        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        for (var key in this.addorder.items[0]) {
          for (var key1 in this.skuInfo) {
            if (key == key1) {
              this.addorder.items[0][key] = this.skuInfo[key1];
            }
          }
        }
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio; //
        this.addorder.items[0].category = this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time + "月";
        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        sessionStorage.setItem("form", JSON.stringify(this.form.form));
        sessionStorage.setItem("order", data);
        sessionStorage.setItem("paramsPar", JSON.stringify(this.paramsData));
        console.log(sessionStorage);
        location.href = "/html/placeAnOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //初始化
    async init() {
      //云产品详情
      const res = await requestParams(getProductMessage, this.productId);
      this.productObj = res;
      // this.addorder.productId = this.productObj.id;
      this.addorder.productName = this.productObj.name;
      // this.addorder.catalogId = this.productObj.servicecatalog_id;
      //查询sku
      let params = {
        page: 1,
        rows: 100,
        serviceCode: res.serviceCode,
      };
      const skuRes = await requestParams(getResourcesSku, params);
      this.skuData = skuRes.content.content;
      this.selectSku = this.skuData[0];
      this.price = this.selectSku.price;
      this.radio = this.skuData[0].id;

      //查询参数列表
      const paramsRes = await requestParams(getResourcesParams, params);
      paramsRes.content.content.forEach((item) => {
        if (item.status == "PUBLISH") {
          this.paramsData = item;
        }
      });

      const paramsParRes = await requestParams(
        getParamsInfo,
        this.paramsData.id
      );
      this.paramsPar = paramsParRes.content.cloudParametersPar;
      this.generateFormFn(this.paramsPar);
      
      //初始化项目、集群、资源空间
      this.initSelect();
      this.countTime();
    },
    generateFormFn(paramsPar) {
      console.log(paramsPar);
      paramsPar.forEach((item) => {
        let params = {
          type: "", // 生成组件的名称(就是表单的名称：如input，radio，checkbox，select，slider等)
          field: "", // 表单组件的字段名称(就是表单的name属性，注：该必须唯一),自定义组件可以不配置
          title: "", // 组件的名称, 选填
          className: "user-name-dom", // 设置组件的class属性
          value: "", // 表单组件的字段值(就是表单的value值),自定义组件可以不用设置
          emit: [],
          props: {
            placeholder: "请输入用户名称！",
          },
          on: {},
          validate: [
            {
              trigger: "blur",
              required: true,
              message: "用户名称不能为空！",
            },
          ],
          col: {
            md: { span: 22 },
          },
        };
        //参数位置
        switch (item.paramPosition) {
          case "parameterpath":
            params = this.paramsType(params, item);
            break;
          case "head":
            break;
          case "query":
            break;
          default:
            console.log("无参数");
            break;
        }
        this.rule.push(params);
      });
    },
    paramsValidate(params, item, type) {
      //参数类型
      if (type == "Long") {
        params.type = "input";
        params.props.type = "textarea";
      } else if (item.ifBuildIn) {
        //是否内置
        params.type = "hidden";
      } else {
        params.type = type;
      }
      //有其他时长字段在加  -。-
      if (item.name == "purchase") {
        params.props.min = 1;
        params.props.max = 12;
      }
      if (item.name == "name" || item.paramName == "资源空间名称") {
        params.options = this.project;
        params.on = {
          change: () => {
            this.clickProject();
          },
        };
      }
      params.field = item.name;
      params.title = item.paramName;
      params.props.placeholder = item.description;
      params.value = item.defaultValue;
      if (type == "select") {
        if (item.name == "projectNo") {
          params.options = this.project;
          params.on = {
            change: () => {
              this.getProjectContent();
            },
          };
        }

        if (item.name == "envId") {
          params.options = this.clustersList;
        }
      }
      //是否必填
      if (item.isRequired) {
        params.validate = [
          {
            trigger: "blur",
            required: true,
            message: "该值不能为空！",
          },
        ];
        //其他验证
        if (item.checkRule != "" && item.checkRule != null) {
          let verification = {
            pattern: item.checkRule,
            message: "验证提示语缺失",
            trigger: "blur",
          };
          params.validate.push(verification);
        }
      } else {
        Vue.delete(params, "validate");
      }
      return params;
    },
    paramsType(params, item) {
      switch (item.type) {
        case "String":
          params = this.paramsValidate(params, item, "input");
          break;
        case "Number":
          params = this.paramsValidate(params, item, "InputNumber");
          break;
        case "Long":
          params = this.paramsValidate(params, item, "Long");
          break;
        case "Float":
          break;
        case "Double":
          break;
        case "Boolean":
          break;
        case "Array":
          break;
        case "Select":
          params = this.paramsValidate(params, item, "select");
          break;
        default:
          console.log("无参数");
          break;
      }
      return params;
    },
    async initSelect() {
      this.user = JSON.parse(getUserInfo());
      this.search.sort = this.user.uid;
      const projectres = await requestParams(getProjects, this.search);
      this.projects = projectres.content.content;
      projectres.content.content.forEach((item) => {
        let options = { label: item.projectName, value: item.projectNo };
        this.project.push(options);
      });
      const res = await requestParams(getClusters);
      res.content.content.forEach((item) => {
        let options = { label: item.name, value: item.id };
        this.clustersList.push(options);
      });
    },
    //点击sku事件（获取规格数据和对比剩余资源）
    async rowClick(row, column, event) {
      console.log(this.form.form);
      console.log(row);
      this.selectSku = row;
      this.radio = row.id;
      this.price = row.price;
      this.form.form.cpu = parseInt(row.cpuCores);
      this.form.form.memory = parseInt(row.memory);
      this.form.form.storage = parseInt(row.storage);
      this.form.form.memoryUnit = "Gi";
      this.form.form.storageUnit = "Gi";
      this.countTime();
    },
    //增加时间
    countTime() {
      if (this.mode == "MONTH") {
        this.sum = this.time * this.price;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        this.sum = this.time * this.price * 12;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    countMonth(data) {
      if (data == "YEAR") {
        this.mode = "YEAR";
        this.sum = this.time * this.price * 12;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (data == "MONTH") {
        this.mode = "MONTH";
        this.sum = this.time * this.price;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    confirm() {
      if (this.disable == true) {
        this.disable = false;
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //验证资源空间名称是否重复
    clickProject() {
      if (this.form.form.envId != "") {
        aliasWhetherRepeat(
          this.form.form.envId,
          this.form.getValue("name")
        ).then((r) => {
          if (r.content == 1) {
            const h = this.$createElement;
            this.$notify({
              message: h("i", { style: "color: red" }, "该资源空间重复"),
            });
            this.form.form.name = "";
          }
        });
      }
    },
    //项目change事件
    getProjectContent() {
      let obj = {};
      obj = this.projects.find((item) => {
        //model就是上面的数据源

        if (item.projectNo === this.form.getValue("projectNo")) {
          return item; //筛选出匹配数据
        }
        return "";
      });
      console.log(obj);
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //获取地址栏参数
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
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
  },

  created() {
    this.productId = this.getId("productId");
    this.init();
    this.handleScroll();
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
@import "../serviceT.scss";

.el-form {
  margin: 20px auto;
}
.user-name-dom {
  width: 100%;
}
/deep/ .el-select {
  width: 100%;
}
</style>
