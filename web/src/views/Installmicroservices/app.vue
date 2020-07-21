<template>
  <div id="app" style="background-color: #E9E9E9">
    <el-row style="height:100px;background: white;">
      <el-col :span="24"></el-col>
    </el-row>
    <el-row style="height:70px;background:rgba(255,255,255,1);">
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
                <template slot-scope="scope"
                  >{{ scope.row.cpu }}Core</template
                >
              </el-table-column>
              <el-table-column label="内存" align="center">
                <template slot-scope="scope"
                  >{{ scope.row.gb }}GB</template
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
          <el-col :span="10" style="margin-top:30px;margin-bottom:30px;">
            <span class="skuDivFont">当前资源需求:</span>
            <span class="specFont"
              >{{ skuData.cpu }}Core/{{ skuData.gb }}GB</span
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--参数项-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <p class="skuFont">资源选项</p>
        <el-row>
          <el-col :offset="2">
            <el-form
              :model="pinpointFrom"
              ref="pinpointFrom"
              label-width="200px"
              style="width:100%"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="16">
                  <el-form-item
                    label="项目："
                    prop="projectNo"
                    :rules="[{ required: true, message: '项目信息不能为空' }]"
                  >
                    <el-select
                      v-model="pinpointFrom.projectNo"
                      placeholder="请选择项目"
                      style="width: 100%;"
                      @change="clickProject"
                    >
                      <el-option
                        v-for="item in optionProject"
                        :key="item.projectName"
                        :label="item.projectName"
                        :value="item.projectNo"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="集群："
                    prop="envId"
                    :rules="[{ required: true, message: '集群不能为空' }]"
                  >
                    <el-select
                      v-model="pinpointFrom.envId"
                      filterable
                      placeholder="请选择"
                      style="width:100%"
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
                    label="资源空间："
                    prop="nameSpace"
                    :rules="[{ required: true, message: '资源空间不能为空' }]"
                  >
                    <el-select
                      v-model="pinpointFrom.nameSpace"
                      placeholder="请选择资源空间"
                      style="width: 100%;"
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
                    label="gitlab地址："
                    prop="selfGitLab.gitUrl"
                    :rules="[{ required: true, message: 'gitlab地址不能为空' }]"
                  >
                    <el-input
                      v-model="pinpointFrom.selfGitLab.gitUrl"
                      placeholder="请输入gitlab地址"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="gitlab用户名："
                    prop="selfGitLab.gitUser"
                    :rules="[
                      { required: true, message: 'gitlab用户名不能为空' }
                    ]"
                  >
                    <el-input
                      v-model="pinpointFrom.selfGitLab.gitUser"
                      placeholder="请输入gitlab用户名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="gitlab密码："
                    prop="selfGitLab.gitPwd"
                    :rules="[{ required: true, message: 'gitlab密码不能为空' }]"
                  >
                    <el-input
                      v-model="pinpointFrom.selfGitLab.gitPwd"
                      placeholder="请输入gitlab密码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="gitlab的token："
                    prop="selfGitLab.accessToken"
                    :rules="[
                      { required: true, message: 'gitlab的token不能为空' }
                    ]"
                  >
                    <el-input
                      v-model="pinpointFrom.selfGitLab.accessToken"
                      placeholder="清输入gitlab的token"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--安装组件详情-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <p class="skuFont">安装组件详情</p>
        <el-row class="mar_t">
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="url"></el-image>
              </el-col>
              <el-col class="specFontimg">注册中心服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="url"></el-image>
              </el-col>
              <el-col class="specFontimg">配置中心服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="url"></el-image>
              </el-col>
              <el-col class="specFontimg">调用链服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="url"></el-image>
              </el-col>
              <el-col class="specFontimg">网关服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="hystrix_logo"></el-image>
              </el-col>
              <el-col class="specFontimg">熔断监控服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="hystrix_logo"></el-image>
              </el-col>
              <el-col class="specFontimg">熔断降级服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="url"></el-image>
              </el-col>
              <el-col class="specFontimg">分布式服务</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="mysql_logo"></el-image>
              </el-col>
              <el-col class="specFontimg">MySQL</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="rabbitmq_logo"></el-image>
              </el-col>
              <el-col class="specFontimg">RabbitMQ</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="mar_r">
            <el-row>
              <el-col>
                <el-image class="image_h" :src="redis_logo"></el-image>
              </el-col>
              <el-col class="specFontimg">redis</el-col>
              <el-col class="specFontimg">
                {{ skuData.cpu / 10 }}Core/{{ skuData.gb / 10 }}GB
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
              v-model="date"
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
        <el-col :span="3"> <p class="skuFont">服务协议</p></el-col>

        <el-col :span="21">
          <el-checkbox
            @change="confirm()"
            class="skuFont"
            style="margin-bottom:10px"
          >
            <el-link type="primary" @click="agreement()">《服务条款》</el-link>
          </el-checkbox>
        </el-col>
      </el-col>
    </el-row>

    <!--提交订单-->
    <el-row style="margin-top:30px;height:100px;">
      <el-col
        :span="24"
        style="background: #FFF;height:100px;"
        :class="isFixed ? 'fixed' : ''"
      >
        <el-col :offset="15" style="color: #666666;line-height: 100px;">
          服务费用：
          <span class="money">￥{{ sum }}</span>
          <el-button
            style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);padding-left: 14px;margin-left:5%;"
            @click="submitForm('pinpointFrom')"
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
  getProject, //项目信息
  getProjectResource,
  getResourceSpaceNameInfo,
  registration
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
export default {
  name: "App",
  data: function() {
    return {
      url: "/web/static/images/installation/Springcloud_logo_400.jpg",
      hystrix_logo: "/web/static/images/installation/hystrix-logo_1280.png",
      mysql_logo: "/web/static/images/installation/logo-mysql.png",
      rabbitmq_logo: "/web/static/images/installation/rabbitmq_logo.png",
      redis_logo: "/web/static/images/installation/redis_logo.png",
      namespaces: "",
      projectResource: { envId: "", projectNo: "" },
      isFixed: true,
      input1: "",
      input: "",
      cpu: 0,
      memory: 0,
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
      date: "月",
      count: 1,
      price: 0,
      number: 1,
      mode: "MONTH",
      edit: [],
      skuData: "",
      options: [
        {
          value: "MONTH",
          label: "月"
        },
        {
          value: "YEAR",
          label: "年"
        }
      ],
      disable: false,
      sum: 0,
      addorder: {
        //提交订单数据
        amount: 0,
        productId: 0, //云产品id
        productName: "", //云产品名称
        catalogId: 0, //服务目录Id
        catalog: "", //服务目录名称
        projectId: "", //所属项目id
        projectName: "", //所属项目名称
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
            tags: ""
          }
        ],
        name: "",
        payMode: "AFTERWARDS",
        tags: "",
        userId: "1",
        tenantId: "1"
      },
      skulist: [],
      skuInfoSpecs: [],
      skuInfo: null,
      id: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      search: {
        params: '[{"param":{"resourceId":1},"sign":"EQ"}]',
        page: 1,
        rows: 100
      },
      skuObject: {
        id: "1",
        spec: "2016-05-03",
        cpu: "王小虎",
        gb: "上海市普陀区金沙江路 1518 弄",
        version: "V 1.0",
        money: "28.00/月"
      },
      //表单数据
      pinpointFrom: {
        /** 注册中心 spec */
        discoveryCpu: 0,
        discoveryMemory: 0,

        /** 调用链 spec */
        tracingCpu: 0,
        tracingMemory: 0,

        /** 分布式事务 spec */
        dtmCpu: 0,
        dtmMemory: 0,
        taskCpu: 0,
        taskMemory: 0,

        /** 网关 spec */
        gatewayCpu: 0,
        gatewayMemory: 0,

        /** 熔断降级 spec */
        degradeCpu: 0,
        degradeMemory: 0,

        /** 熔断监控 spec */
        turbineCpu: 0,
        turbineMemory: 0,

        /** 分布式配置中心 spec */
        configCpu: 0,
        configMemory: 0,

        /** mysql spec */
        mysqlCpu: 0,
        mysqlMemory: 0,
        /** redis spec */
        redisCpu: 0,
        redisMemory: 0,

        /** rabbitmq spec */
        rabbitmqCpu: 0,
        rabbitmqMemory: 0,

        projectNo: "",
        mutiRepluicasNum: 3,
        componentResourceLevel: 1,
        isEurekaMutiRepluicas: false,
        storageClassName: "tenx-nfs0",
        mysqlResourcelevel: 1,
        redisResourcelevel: 1,
        mqResourcelevel: 1,
        userId: 1,
        nameSpace: "",
        envId: "",
        isCustomGitLab: true,
        selfGitLab: {
          accessToken: "",
          gitPwd: "",
          gitUrl: "",
          gitUser: ""
        }
      }
    };
  },
  methods: {
    //获取参数
    //获取资源空间
    clickPVCNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.pinpointFrom.envId;
        this.projectResource.projectNo = this.pinpointFrom.projectNo;
        if (this.projectResource.envId == "") {
          this.$notify({
            type: "warning",
            message: "请选择集群"
          });
        } else if (this.projectResource.projectNo == "") {
          this.$notify({
            type: "warning",
            message: "请选择项目"
          });
        } else {
          getProjectResource(this.projectResource).then(r => {
            this.namespaces = r.content;
          });
        }
      }
    },
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
      getServiceCatalogsInfo(id).then(r => {
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
    //点击事件
    async rowClick(row, column, event) {
      this.skuData = row;
      this.radio = row.id;
      const r = await requestParams(getResourcesSkuInfo, row.id);
      this.price = r.content.price.price;
      this.cpu = row.cpu;
      this.memory = row.gb;

      if (
        this.pinpointFrom.nameSpace != null &&
        this.pinpointFrom.nameSpace != ""
      ) {
        getResourceSpaceNameInfo(
          this.pinpointFrom.envId,
          this.pinpointFrom.nameSpace
        ).then(r => {
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
          if (r.content.cpu < parseInt(this.cpu)) {
            this.$notify({
              type: "warning",
              message: message
            });
            this.pinpointFrom.nameSpace = "";
          } else if (r.content.memory < parseInt(this.memory)) {
            this.$notify({
              type: "warning",
              message: message
            });
            this.pinpointFrom.nameSpace = "";
          } else if (r.content.cpu == parseInt(this.cpu)) {
            this.$notify({
              type: "warning",
              message: messageto
            });
            this.pinpointFrom.nameSpace = "";
          } else if (r.content.memory == parseInt(this.memory)) {
            this.$notify({
              type: "warning",
              message: messageto
            });
            this.pinpointFrom.nameSpace = "";
          }
        });
      }
      if (this.mode == "MONTH") {
        this.sum = r.content.price.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        this.sum = r.content.price.price * this.time * 12;
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
      this.$refs[formName].validate(valid => {
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
      const r = await requestParams(getResourcesSkuInfo, this.radio);
      if (r.content.name == "一键安装微服务（单机版）标准版") {
        this.pinpointFrom.componentResourceLevel = 1;
        this.pinpointFrom.mysqlResourcelevel = 1;
        this.pinpointFrom.redisResourcelevel = 1;
        this.pinpointFrom.mqResourcelevel = 1;
      }
      if (r.content.name == "一键安装微服务（单机版）高级版") {
        this.pinpointFrom.componentResourceLevel = 2;
        this.pinpointFrom.mysqlResourcelevel = 2;
        this.pinpointFrom.redisResourcelevel = 2;
        this.pinpointFrom.mqResourcelevel = 2;
      }
      if (r.content.name == "一键安装微服务（单机版）企业版") {
        this.pinpointFrom.componentResourceLevel = 3;
        this.pinpointFrom.mysqlResourcelevel = 3;
        this.pinpointFrom.redisResourcelevel = 3;
        this.pinpointFrom.mqResourcelevel = 3;
      }
      if (r.content.name == "一键安装微服务（高可用）标准版") {
        this.pinpointFrom.componentResourceLevel = 1;
        this.pinpointFrom.mysqlResourcelevel = 1;
        this.pinpointFrom.redisResourcelevel = 1;
        this.pinpointFrom.mqResourcelevel = 1;
      }
      if (r.content.name == "一键安装微服务（高可用）高级版") {
        this.pinpointFrom.componentResourceLevel = 2;
        this.pinpointFrom.mysqlResourcelevel = 2;
        this.pinpointFrom.redisResourcelevel = 2;
        this.pinpointFrom.mqResourcelevel = 2;
      }
      if (r.content.name == "一键安装微服务（高可用）企业版") {
        this.pinpointFrom.componentResourceLevel = 3;
        this.pinpointFrom.mysqlResourcelevel = 3;
        this.pinpointFrom.redisResourcelevel = 3;
        this.pinpointFrom.mqResourcelevel = 3;
      }
      this.skuInfo = r.content;
      // this.skuInfoSpecs = r.content.specs;
      this.skuInfo.category = this.name;
      //项目创建
      let arr = r.content.storage.split(";");
      for (let a = 0; a < arr.length; a++) {
        let arr1 = arr[a].split(":");
        let params = { name: "", paramValue: "" };
        if (arr1[0].trim() == "区域信息") {
          params.name = arr1[0];
          params.paramValue = this.getClustersLabel(this.pinpointFrom.envId);
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "项目信息") {
          params.name = arr1[0];
          params.paramValue = this.getObjectName(this.pinpointFrom.projectNo);
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "资源空间") {
          params.name = arr1[0];
          params.paramValue = this.pinpointFrom.nameSpace;
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "accessToken") {
          params.name = arr1[0];
          params.paramValue = this.pinpointFrom.selfGitLab.accessToken;
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "gitPwd") {
          params.name = arr1[0];
          params.paramValue = this.pinpointFrom.selfGitLab.gitPwd;
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "gitUrl") {
          params.name = arr1[0];
          params.paramValue = this.pinpointFrom.selfGitLab.gitUrl;
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "gitUser") {
          params.name = arr1[0];
          params.paramValue = this.pinpointFrom.selfGitLab.gitUser;
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "副本数") {
          params.name = arr1[0];
          params.paramValue = arr1[1].trim();
          this.pinpointFrom.mutiRepluicasNum = arr1[1].trim();
          this.skuInfoSpecs.push(params);
        }
        if (arr1[0].trim() == "是否高可用") {
          params.name = arr1[0];
          params.paramValue = arr1[1].trim();
          this.pinpointFrom.isEurekaMutiRepluicas = arr1[1].trim();
          this.skuInfoSpecs.push(params);
        }
      }
      if (this.disable == true) {
        for (var key in this.addorder.items[0]) {
          for (var key1 in this.skuInfo) {
            if (key == key1) {
              this.addorder.items[0][key] = this.skuInfo[key1];
            }
          }
        }
        this.assemblySku(this.cpu);

        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio;
        this.addorder.items[0].category = this.name;
        this.addorder.items[0].name = this.name;
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        var duration = "月";
        this.mode == "MONTH" ? (duration = "月") : (duration = "年");
        this.addorder.items[0].duration = this.time + duration;
        // 存储
        var data = JSON.stringify(this.addorder);
        sessionStorage.setItem("order", data);
        sessionStorage.setItem(
          "pinpointFrom",
          JSON.stringify(this.pinpointFrom)
        );
        console.log(sessionStorage);
        location.href = "/html/confirmOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    assemblySku(skuLevel) {
      const cpu = 1;
      const memory = 2;
      var level = 1;
      if (skuLevel == 10) {
        level = 1;
      }
      if (skuLevel == 20) {
        level = 2;
      }
      if (skuLevel == 40) {
        level = 4;
      }
      /** 注册中心 spec */
      this.pinpointFrom.discoveryCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.discoveryMemory = (memory * level * 1).toFixed(1);
      /** 调用链 spec */
      this.pinpointFrom.tracingCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.tracingMemory = (memory * level * 1).toFixed(1);

      /** 分布式事务 spec */
      this.pinpointFrom.dtmCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.dtmMemory = (memory * level * 1).toFixed(1);
      this.pinpointFrom.taskCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.taskMemory = (memory * level * 1).toFixed(1);

      /** 网关 spec */
      this.pinpointFrom.gatewayCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.gatewayMemory = (memory * level * 1).toFixed(1);

      /** 熔断降级 spec */
      this.pinpointFrom.degradeCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.degradeMemory = (memory * level * 1).toFixed(1);

      /** 熔断监控 spec */
      this.pinpointFrom.turbineCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.turbineMemory = (memory * level * 1).toFixed(1);

      /** 分布式配置中心 spec */
      this.pinpointFrom.configCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.configMemory = (memory * level * 1).toFixed(1);

      /** mysql spec */
      this.pinpointFrom.mysqlCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.mysqlMemory = (memory * level * 1).toFixed(1);
      /** redis spec */
      this.pinpointFrom.redisCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.redisMemory = (memory * level * 1).toFixed(1);

      /** rabbitmq spec */
      this.pinpointFrom.rabbitmqCpu = (cpu * level * 1).toFixed(1);
      this.pinpointFrom.rabbitmqMemory = (memory * level * 1).toFixed(1);
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

      this.search.params = `[{"param":{"catalogId":${this.id}},"sign":"EQ"}]`;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);

      // if(res.content.content == 0){
      //   alert("该服务暂未开通，敬请期待")
      //   window.location.href = document.referrer
      //   return;
      // }

      var list = res.content.content;
      this.radio = list[0].id;
      const r1 = await requestParams(getResourcesSkuInfo, list[0].id);
      this.sum = r1.content.price.price;
      this.price = r1.content.price.price;

      for (var i = 0; i < list.length; i++) {
        const r = await requestParams(getResourcesSkuInfo, list[i].id);

        var sku = r.content;

        var skuObject = {
          id: "",
          name: "",
          spec: "",
          cpu: "",
          gb: "",
          disks: "",
          tags: "",
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
          if (arr1[0].trim() == "容量上限") {
            skuObject.tags = arr1[1].trim();
          }
        }
        this.skulist.push(skuObject);
      }
      this.skuData = this.skulist[0];
      this.cpu = this.skulist[0].cpu;
      this.memory = this.skulist[0].gb;
    },
    //获取集群
    async getClusters() {
      this.edit = [];
      const res1 = await requestParams(getClusters);
      for (var i = 0; i < res1.content.content.length; i++) {
        var data = {
          value: res1.content.content[i].id,
          label: res1.content.content[i].name
        };
        this.edit.push(data);
      }
      this.pinpointFrom.envId = this.edit[0].value;
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content.content;
      this.projectinformation = this.optionProject[0].name;
      this.pinpointFrom.projectNo = this.optionProject[0].projectNo;

      this.addorder.projectId = this.optionProject[0].id;
      this.addorder.projectName = this.optionProject[0].projectName;
    },
    getClustersLabel(val) {
      let obj = {};
      obj = this.edit.find(item => {
        return item.value == val;
      });
      let getName = "";
      getName = obj.label;
      return getName;
    },
    getObjectName(val) {
      let obj = {};
      obj = this.optionProject.find(item => {
        return item.projectNo == val;
      });
      let getName = "";
      getName = obj.projectName;
      return getName;
    },
    clickProject(data) {
      this.pinpointFrom.nameSpace = "";
      let obj = {};
      obj = this.optionProject.find(item => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    resourceValidation(data) {
      this.verification(data);
      getResourceSpaceNameInfo(
        this.pinpointFrom.envId,
        this.pinpointFrom.nameSpace
      ).then(r => {
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
        if (r.content.cpu < parseInt(this.cpu)) {
          this.$notify({
            type: "warning",
            message: message
          });
          this.pinpointFrom.nameSpace = "";
        } else if (r.content.memory < parseInt(this.memory)) {
          this.$notify({
            type: "warning",
            message: message
          });
          this.pinpointFrom.nameSpace = "";
        } else if (r.content.cpu == parseInt(this.cpu)) {
          this.$notify({
            type: "warning",
            message: messageto
          });
          this.pinpointFrom.nameSpace = "";
        } else if (r.content.memory == parseInt(this.memory)) {
          this.$notify({
            type: "warning",
            message: messageto
          });
          this.pinpointFrom.nameSpace = "";
        }
      });
    },
    //验证组件是否被注册
    verification(data) {
      let component = "spring-cloud-discovery";
      registration(this.pinpointFrom.envId, component, data).then(r => {
        if (r.content == 1) {
          const h = this.$createElement;
          this.$notify({
            message: h(
              "i",
              { style: "color: red" },
              "该项目下组件已安装请勿重复安装"
            )
          });
          this.pinpointFrom.nameSpace = "";
        }
      });
    }
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
  },
  mounted() {
    this.isFixed =
      document.body.offsetHeight - document.documentElement.clientHeight > 300;
    // window.addEventListener('mousewheel',this.handleScroll,false);
    window.addEventListener("scroll", this.handleScroll);
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
.specFontimg {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  padding: 10px 0;
}
.smallBuyTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 76px;
}
.bg-purple-dark {
  background-color: rgba(233, 233, 233, 1);
  border-radius: 4px;
  min-height: 36px;
}
.mar_r {
  margin-right: 15px;
}
.mar_t {
  margin: 0px 20px;
  min-height: 136px;
}
.image_h {
  min-height: 77px;
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
