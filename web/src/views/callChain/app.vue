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
                  <el-radio v-model="radio" :label="scope.row.id" align="center"
                    >&nbsp;</el-radio
                  >
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
                  >{{ scope.row.price }}元/月</template
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
        <el-row>
          <el-col :offset="2" :span="18">
            <el-form
              :model="monitoringFrom"
              ref="monitoringFrom"
              label-width="150px"
              style="width: 100%"
              class="demo-ruleForm"
            >
              <el-row>
                <el-form-item
                  label="项目："
                  prop="projectNo"
                  :rules="[{ required: true, message: '项目信息不能为空' }]"
                >
                  <el-select
                    v-model="monitoringFrom.projectNo"
                    filterable
                    placeholder="请选择"
                    style="width: 100%"
                    @change="clickProject"
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
                  prop="envId"
                  :rules="[{ required: true, message: '集群不能为空' }]"
                >
                  <el-select
                    v-model="monitoringFrom.envId"
                    filterable
                    placeholder="请选择"
                    style="width: 100%"
                    @change="changeEnv"
                  >
                    <el-option
                      v-for="item in edit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="资源空间:"
                  prop="nameSpace"
                  :rules="[{ required: true, message: '资源空间不能为空' }]"
                >
                  <el-select
                    v-model="monitoringFrom.nameSpace"
                    placeholder="请选择资源空间"
                    style="width: 100%"
                    @visible-change="clickPVCNamespace"
                    @change="resourceValidation"
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
                  label="mysql地址："
                  prop="selfMysql.mysqlHost"
                  :rules="[
                    { required: true, message: 'mysql地址不能为空' },
                    { max: 253, message: '长度最多253个字符', trigger: 'blur' },

                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.selfMysql.mysqlHost"
                    placeholder="请输入mysql地址"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="mysql端口号："
                  prop="selfMysql.mysqlPort"
                  :rules="[
                    { required: true, message: 'mysql端口号不能为空' },
                    { type: 'number', message: 'mysql端口号必须为数字值' },
                    {
                      pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/g,
                      message: '范围需为（80～65535）',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.number="monitoringFrom.selfMysql.mysqlPort"
                    placeholder="请输入mysql端口号"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="mysql用户名："
                  prop="selfMysql.mysqlUser"
                  :rules="[
                    { required: true, message: 'mysql用户名不能为空' },
                    { max: 253, message: '长度最多253个字符', trigger: 'blur' },
                    
                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.selfMysql.mysqlUser"
                    placeholder="请输入mysql用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="mysql密码："
                  prop="selfMysql.mysqlPwd"
                  :rules="[{ required: true, message: 'mysql密码不能为空' }]"
                >
                  <el-input
                    v-model="monitoringFrom.selfMysql.mysqlPwd"
                    placeholder="请输入mysql密码"
                    :type="inputType"
                    autocomplete="new-password"
                    @focus="changeInputType"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="mysql数据库名称："
                  prop="selfMysql.mysqlDataBase"
                  :rules="[
                    { required: true, message: 'mysql名称不能为空' },
                    {
                      pattern: /^[a-z0-9_\-]*$/g,
                      message: '包括小写字母、数字',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.selfMysql.mysqlDataBase"
                    placeholder="请输入mysql名称"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="Rabbitmq地址："
                  prop="selfRabbitMq.mqHost"
                  :rules="[
                    { required: true, message: 'Rabbitmq地址不能为空' },
                    { max: 253, message: '长度最多253个字符', trigger: 'blur' },
                  

                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.selfRabbitMq.mqHost"
                    placeholder="请输入Rabbitmq地址"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="Rabbitmq端口号："
                  prop="selfRabbitMq.mqlPort"
                  :rules="[
                    { required: true, message: 'Rabbitmq端口号不能为空' },
                    { type: 'number', message: 'Rabbitmq端口号必须为数字值' },
                    { type: 'number', message: 'mysql端口号必须为数字值' },
                    {
                      pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/g,
                      message: '范围需为（80～65535）',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model.number="monitoringFrom.selfRabbitMq.mqlPort"
                    placeholder="请输入Rabbitmq端口号"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="Rabbitmq用户名："
                  prop="selfRabbitMq.mqlUser"
                  :rules="[
                    { required: true, message: 'Rabbitmq用户名不能为空' },
                    { max: 253, message: '长度最多253个字符', trigger: 'blur' },
                   
                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.selfRabbitMq.mqlUser"
                    placeholder="请输入Rabbitmq用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="Rabbitmq密码："
                  prop="selfRabbitMq.mqlPwd"
                  :rules="[{ required: true, message: 'Rabbitmq密码不能为空' }]"
                >
                  <el-input
                    v-model="monitoringFrom.selfRabbitMq.mqlPwd"
                    placeholder="请输入Rabbitmq密码"
                    :type="inputType"
                    autocomplete="new-password"
                    @focus="changeInputType"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="注册中心地址："
                  prop="eurekaHost"
                  :rules="[
                    { required: true, message: '注册中心地址不能为空' },
                    { max: 253, message: '长度最多253个字符', trigger: 'blur' },
                    

                  ]"
                >
                  <el-input
                    v-model="monitoringFrom.eurekaHost"
                    placeholder="如：spring-cloud-discovery:8761"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
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
    <el-row style="margin-top: 30px">
      <el-col :offset="3" :span="18" style="background: #fff">
        <el-col :span="3"> <p class="skuFont">服务协议</p></el-col>
        <el-col :span="21">
          <el-checkbox
     
            class="skuFont"
            style="margin-bottom: 10px"
            v-model="disable"
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
            @click="submitForm('monitoringFrom')"
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
  getClusters, //获取集群
  getProject, //项目信息
  registration, //验证组件是否被注册
  getProjectResource,
  getResourceSpaceNameInfo,
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      inputType: "text",
      cpu: 0,
      memory: 0,
      namespaces: "",
      projectResource: { envId: "", projectNo: "" },
      isFixed: true,
      regionalInformation: "", //区域信息
      projectinformation: "", //项目信息
      optionProject: [], //项目信息下拉框
      radio: "",
      skuid: 0,
      time: 1,
      count: 1,
      price: 0,
      number: 1,
      mode: "MONTH",
      edit: [],
      skuData: "",
      options: [
        {
          value: "MONTH",
          label: "月",
        },
        {
          value: "YEAR",
          label: "年",
        },
      ],
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
      search: {
        params: '',
        page: 1,
        rows: 100,
      },
      //表单数据
      monitoringFrom: {
        tracingCpu: 0,
        tracingMemory: 0,
        envId: "",
        eurekaHost: "",
        projectNo: "",
        images: {},
        isCustomMysql: true,
        isCustomRabbitMq: true,
        isEureka: true,
        componentResourceLevel: 1,
        nameSpace: "",
        selfMysql: {
          mysqlDataBase: "",
          mysqlHost: "",
          mysqlPort: "",
          mysqlPwd: "",
          mysqlUser: "",
          mysqlResourcelevel: "",
        },
        selfRabbitMq: {
          mqHost: "",
          mqlPort: "",
          mqlPwd: "",
          mqlUser: "",
          mqResourcelevel: "",
        },
        storageClassName: "tenx-nfs0",
        userId: 1,
      },
    };
  },
  methods: {
    //获取资源空间
    clickPVCNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.monitoringFrom.envId;
        this.projectResource.projectNo = this.monitoringFrom.projectNo;
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
      }
    },
    clickProject(data) {
      this.monitoringFrom.nameSpace = "";

      let obj = {};
      obj = this.optionProject.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    changeEnv(data) {
      this.monitoringFrom.nameSpace = "";
    },
    //验证组件是否被注册
    verification(data) {
      let component = "spring-cloud-tracing";
      registration(this.monitoringFrom.envId, component, data).then((r) => {
        if (r.content == 1) {
          const h = this.$createElement;
          this.$notify({
            message: h(
              "i",
              { style: "color: red" },
              "该项目下组件已安装请勿重复安装"
            ),
          });
          this.monitoringFrom.nameSpace = "";
        }
      });
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
      this.price = row.price;
      this.monitoringFrom.tracingCpu = parseFloat(row.cpuCores)+"";
      this.monitoringFrom.tracingMemory = parseFloat(row.memory)+"";
      if (
        this.monitoringFrom.nameSpace != null &&
        this.monitoringFrom.nameSpace != ""
      ) {
        getResourceSpaceNameInfo(
          this.monitoringFrom.envId,
          this.monitoringFrom.nameSpace
        ).then((r) => {
          if (r.content.cpu < parseInt(this.monitoringFrom.tracingCpu)) {
            this.monitoringFrom.nameSpace = "";
          } else if (
            r.content.memory < parseInt(this.monitoringFrom.tracingMemory)
          ) {
            this.monitoringFrom.nameSpace = "";
          }
        });
      }
      if (this.mode == "MONTH") {
        this.sum = row.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        this.sum = row.price * this.time * 12;
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
    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.commitOrder();
        } else {
          return false;
        }
      });
    },
    //提交订单
    async commitOrder() {
      //提交订单参数

      if (this.skuData.name == "调用链服务（标准版）") {
        this.monitoringFrom.componentResourceLevel = 1;
        this.monitoringFrom.selfMysql.mysqlResourcelevel = 1;
        this.monitoringFrom.selfRabbitMq.mqResourcelevel = 1;
      }
      if (this.skuData.name == "调用链服务 （高级版）") {
        this.monitoringFrom.componentResourceLevel = 2;
        this.monitoringFrom.selfMysql.mysqlResourcelevel = 2;
        this.monitoringFrom.selfRabbitMq.mqResourcelevel = 2;
      }
      if (this.skuData.name == "调用链服务（企业版）") {
        this.monitoringFrom.componentResourceLevel = 3;
        this.monitoringFrom.selfMysql.mysqlResourcelevel = 3;
        this.monitoringFrom.selfRabbitMq.mqResourcelevel = 3;
      }
      //项目创建
      let params = { name: "", paramValue: "" };
      params.name = "集群";
      params.paramValue = this.getClustersLabel(this.monitoringFrom.envId);
      this.skuInfoSpecs.push(params);
      let params1 = { name: "", paramValue: "" };
      params1.name = "项目信息";
      params1.paramValue = this.getObjectName(this.monitoringFrom.projectNo);
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "资源空间";
      params2.paramValue = this.monitoringFrom.nameSpace;
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "mysql地址";
      params3.paramValue = this.monitoringFrom.selfMysql.mysqlHost;
      this.skuInfoSpecs.push(params3);
      let params4 = { name: "", paramValue: "" };
      params4.name = "mysql端口号";
      params4.paramValue = this.monitoringFrom.selfMysql.mysqlPort;
      this.skuInfoSpecs.push(params4);
      let params5 = { name: "", paramValue: "" };
      params5.name = "mysql用户名";
      params5.paramValue = this.monitoringFrom.selfMysql.mysqlUser;
      this.skuInfoSpecs.push(params5);
      let params6 = { name: "", paramValue: "" };
      params6.name = "mysql";
      params6.paramValue = this.monitoringFrom.selfMysql.mysqlDataBase;
      this.skuInfoSpecs.push(params6);
      let params7 = { name: "", paramValue: "" };
      params7.name = "mysql等级";
      params7.paramValue = this.monitoringFrom.selfMysql.mysqlResourcelevel;
      this.skuInfoSpecs.push(params7);
      let params8 = { name: "", paramValue: "" };
      params8.name = "Rabbitmq地址";
      params8.paramValue = this.monitoringFrom.selfRabbitMq.mqHost;
      this.skuInfoSpecs.push(params8);
      let params9 = { name: "", paramValue: "" };
      params9.name = "Rabbitmq端口号";
      params9.paramValue = this.monitoringFrom.selfRabbitMq.mqlPort;
      this.skuInfoSpecs.push(params9);
      let params10 = { name: "", paramValue: "" };
      params10.name = "Rabbitmq用户名";
      params10.paramValue = this.monitoringFrom.selfRabbitMq.mqlUser;
      this.skuInfoSpecs.push(params10);
      let params11 = { name: "", paramValue: "" };
      params11.name = "Rabbitmq密码";
      params11.paramValue = this.monitoringFrom.selfRabbitMq.mqlPwd;
      this.skuInfoSpecs.push(params11);
      let params12 = { name: "", paramValue: "" };
      params12.name = "Rabbitmq用户名";
      params12.paramValue = this.monitoringFrom.selfRabbitMq.mqlUser;
      this.skuInfoSpecs.push(params12);
      let params13 = { name: "", paramValue: "" };
      params13.name = "Rabbitmq等级";
      params13.paramValue = this.monitoringFrom.selfRabbitMq.mqResourcelevel;
      this.skuInfoSpecs.push(params13);
      let params14 = { name: "", paramValue: "" };
      params14.name = "资源等级";
      params14.paramValue = this.monitoringFrom.componentResourceLevel;
      this.skuInfoSpecs.push(params14);


      if (this.disable == true) {
     

        this.monitoringFrom.tracingCpu = (
          this.monitoringFrom.tracingCpu * 1
        ).toFixed(1);
        this.monitoringFrom.tracingMemory = (
          this.monitoringFrom.tracingMemory * 1
        ).toFixed(1);
        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio;
        this.addorder.items[0].category =this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        var duration = "月";
        this.mode == "MONTH" ? (duration = "月") : (duration = "年");
        this.addorder.items[0].duration = this.time + duration;

        // 存储
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
    countMonth(data) {
      if (data == "YEAR") {
        this.mode = "YEAR";
        this.sum = this.time * this.price * this.number * 12;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (data == "MONTH") {
        this.mode = "MONTH";
        this.sum = this.time * this.price * this.number;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    //获取云资源下的sku
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

      this.radio = list[0].id;
      this.sum = list[0].price;
      this.price = list[0].price;
      this.skulist = list;
      this.skuData = list[0];
    },
    //服务协议
    agreement() {
      location.href = "/html/agreement.html";
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
      this.monitoringFrom.envId = this.edit[0].value;
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content;
      this.monitoringFrom.projectNo = this.optionProject[0].projectNo;

      this.addorder.projectId = this.optionProject[0].id;
      this.addorder.projectName = this.optionProject[0].projectName;
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
        return item.projectNo == val;
      });
      let getName = "";
      getName = obj.projectName;
      return getName;
    },
    resourceValidation(data) {
      this.verification(data);
      getResourceSpaceNameInfo(
        this.monitoringFrom.envId,
        this.monitoringFrom.nameSpace
      ).then((r) => {
        let cpu = r.content.cpu == null ? 0 : r.content.cpu;
        let memory = r.content.memory == null ? 0 : r.content.memory;
        const message =
          "资源空间达到资源上限，请您调整要创建容器的规格，或联系项目经理。（剩余CPU:" +
          cpu +
          "Core，内存:" +
          memory +
          "G）";
        const messageto =
          "资源空间资源即将用完，请您调整要创建容器的规格，或联系项目经理。（剩余CPU:" +
          cpu +
          "Core，内存:" +
          memory +
          "G）";
        if (r.content.cpu < parseInt(this.monitoringFrom.tracingCpu)) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.monitoringFrom.nameSpace = "";
        } else if (
          r.content.memory < parseInt(this.monitoringFrom.tracingMemory)
        ) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.monitoringFrom.nameSpace = "";
        } else if (r.content.cpu == parseInt(this.monitoringFrom.tracingCpu)) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.monitoringFrom.nameSpace = "";
        } else if (
          r.content.memory == parseInt(this.monitoringFrom.tracingMemory)
        ) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.monitoringFrom.nameSpace = "";
        }
      });
    },
    changeInputType() {
      this.inputType = "password";
    },
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
