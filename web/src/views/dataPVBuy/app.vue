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
              >{{ skuData.name }}/{{ skuData.storage }}</span
            >
          </el-col>
          <el-col :span="10" style="margin-top: 30px; margin-bottom: 30px">
            <span class="skuDivFont">当前资源需求:</span>
            <span class="skuDivFont">{{ skuData.storage }}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
                  :model="pvcvolume"
                  :rules="pvcvolume"
                  ref="pvcvolume"
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
                      v-model="pvcvolume.projectNo"
                      placeholder="请选择项目"
                      style="width: 100%"
                      @change="clickProject"
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
                    prop="kubernetes_urn"
                    :rules="[{ required: true, message: '集群信息不能为空' }]"
                  >
                    <el-select
                      v-model="pvcvolume.kubernetes_urn"
                      filterable
                      placeholder="请选择集群"
                      style="width: 100%"
                      @change="clicksclist"
                    >
                      <el-option
                        v-for="item in envs"
                        :key="item.id"
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
                    <!-- -->
                    <el-select
                      v-model="pvcvolume.namespace"
                      placeholder="请选择资源空间"
                      style="width: 100%"
                      @visible-change="clickPVCNamespace"
                      @change="resourceValidation"
                    >
                      <el-option
                        v-for="item in PVCnamespaces"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="PVC名称："
                    prop="name"
                    class="skuDivFont"
                    :rules="[
                      {
                        required: true,
                        message: '请输入pvc名称',
                        trigger: 'blur',
                      },
                      {
                        max: 253,
                        message: '长度最多253个字符',
                        trigger: 'blur',
                      },
                      {
                        pattern: /^[a-z0-9]([-a-z0-9.]*[a-z0-9])?$/,
                        message:
                          '名称由小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾',
                        trigger: 'blur',
                      },
                      { validator: checkName, trigger: 'blur' },
                    ]"
                  >
                    <el-input
                      v-model="pvcvolume.name"
                      placeholder="名称由小写字母、数字、横线(-)和点(.)组成且必须以字母或数字开头结尾，最长支持253个字符"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="Storage Class："
                    prop="strogeclassName"
                    class="skuDivFont"
                  >
                    <el-select
                      v-model="pvcvolume.strogeclassName"
                      placeholder="请选择Storage Class"
                      style="width: 100%"
                      @visible-change="scChange"
                    >
                      <el-option
                        v-for="item in sclist"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="访问模式："
                    prop="accessMode"
                    class="skuDivFont"
                  >
                    <el-select
                      v-model="pvcvolume.accessMode"
                      placeholder="请选择访问模式"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in accessModelist"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="请求容量："
                    prop="capacity"
                    class="skuDivFont"
                    :rules="[
                      {
                        required: true,
                        message: '请选择容量',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      v-model="pvcvolume.capacity"
                      disabled
                      placeholder="请选择容量"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in numberArr"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-table :data="labels" style="width: 100%；">
                      <el-table-column
                        label="KEY"
                        align="center"
                        style="line-height: 25px"
                      >
                        <template slot-scope="scope">
                          <el-form-item style="margin: 0">
                            <el-input
                              placeholder="请输入KEY"
                              v-model="scope.row.key"
                            ></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="VALUE"
                        align="center"
                        style="padding: 0"
                      >
                        <template slot-scope="scope">
                          <el-form-item style="margin: 0">
                            <el-input
                              placeholder="请输入VALUE"
                              v-model="scope.row.value"
                            ></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                          <el-link
                            class="link"
                            type="danger"
                            @click="deleteLabels(scope.row)"
                            >移除</el-link
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-col style="margin-top: 10px">
                      <el-link
                        @click="addLabels()"
                        type="primary"
                        :underline="false"
                      >
                        <img
                          src="@/static/images/jiahao.png"
                          alt
                          style="width: 16px; margin: 0px 5px -3px 0px"
                        />新增标签</el-link
                      >
                    </el-col>
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
              v-model="date"
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
            @click="submitForm('pvcvolume')"
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
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getUserInfo } from "../../utils/auth";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      projectResource: { envId: "", projectNo: "" },
      sclist: "", //sc集合
      project: "", //项目集合
      envs: "", //集群
      PVCnamespaces: "", //PVC下的资源空间
      numberArr: [], //容量列表
      accessModelist: ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"], //访问模式下拉选项
      edit: [],
      labelPVC: "left",
      isFixed: true,
      regionalInformation: "", //区域信息
      edit: [],
      pvType: "HOST_PATH",
      reclaimPolicy: "Retain",
      accessMode: "ReadWriteOnce",
      path: "",
      serviceURL: "",
      radio: "",
      skuid: 0,
      time: 1,
      date: "月",
      count: 1,
      price: 0,
      number: 1,
      mode: "MONTH",
      skuData: "",
      options: [
        {
          value: "MONTH",
          label: "月",
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
        params: "",
        page: 1,
        rows: 100,
      },
      labels: [],
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      pvcvolume: {
        kubernetes_urn: "", //集群
        namespace: "", //资源空间
        projectNo: "", //项目ID

        accessMode: "", //访问模式
        amount: 0, // 总价
        basePrice: 0, //单价
        capacity: "", //容量
        //标签
        labels: {},
        name: "", //pvc 名称
        purchase: 1,
        skuId: "",
        strogeclassName: "", //strogeclass
      },
    };
  },
  methods: {
    checkName(rule, value, callback) {
      if (value) {
        persistentVolumeClaimCheck(
          this.pvcvolume.kubernetes_urn,
          this.pvcvolume.namespace,
          this.pvcvolume.name
        )
          .then((res) => {
            console.log(res);
            console.log(res.code);
            if (res.code == 200) {
              if (res.content) {
                callback();
              } else {
                return callback(new Error("pvc名称已存在"));
              }
            } else {
            }
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      }
    },
    clickProject(data) {
      this.pvcvolume.namespace = "";
      let obj = {};
      obj = this.project.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
      console.log(this.addorder);
    },
    resourceValidation() {
      getResourceSpaceNameInfo(
        this.pvcvolume.kubernetes_urn,
        this.pvcvolume.namespace
      ).then((r) => {
        console.log(r);
        console.log(parseInt(this.pvcvolume.capacity));
        if (r.content.storage <= parseInt(this.pvcvolume.capacity)) {
          let storage = r.content.storage == null ? 0 : r.content.storage;
          let message =
            "资源空间达到资源上限，请您调整要创建容器的规格，或联系项目经理。（剩余容量:" +
            storage +
            "G）";
          this.$notify({
            type: "warning",
            message: message,
          });
          this.pvcvolume.namespace = "";
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
    //点击事件
    async rowClick(row, column, event) {
      if (this.pvcvolume.namespace != "" && this.pvcvolume.namespace != null) {
        getResourceSpaceNameInfo(
          this.pvcvolume.kubernetes_urn,
          this.pvcvolume.namespace
        ).then((r) => {
          if (r.content.storage <= parseFloat(row.storage)) {
            let storage = r.content.storage == null ? 0 : r.content.storage;
            let message =
              "资源空间达到资源上限，请您调整要创建容器的规格，或联系项目经理。（剩余容量:" +
              storage +
              "G）";
            this.$notify({
              type: "warning",
              message: message,
            });
            this.pvcvolume.namespace = "";
          }
        });
      }
      this.skuData = row;
      this.pvcvolume.capacity = parseFloat(row.storage) + "Gi";
      this.radio = row.id;
      this.price = row.price;
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

      let params = { name: "", paramValue: "" };
      params.name = "集群";
      params.paramValue = this.getClustersLabel(this.pvcvolume.kubernetes_urn);
      this.skuInfoSpecs.push(params);
      let params1 = { name: "", paramValue: "" };
      params1.name = "项目";
      params1.paramValue = this.pvcvolume.projectNo;
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "资源空间";
      params2.paramValue = this.pvcvolume.namespace;
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "PVC名称";
      params3.paramValue = this.pvcvolume.name;
      this.skuInfoSpecs.push(params3);
      let params4 = { name: "", paramValue: "" };
      params4.name = "Storage Class";
      params4.paramValue = this.pvcvolume.strogeclassName;
      this.skuInfoSpecs.push(params4);
      let params5 = { name: "", paramValue: "" };
      params5.name = "请求容量";
      params5.paramValue = this.pvcvolume.capacity;
      this.skuInfoSpecs.push(params5);

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
        this.addorder.items[0].tags = this.skuData.name;
        console.log(this.skuInfoSpecs);
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time + "月";
        console.log(this.time);

        this.pvcvolume.purchase = this.time;
        this.pvcvolume.amount = this.sum;
        this.pvcvolume.basePrice = this.price;
        this.pvcvolume.skuId = this.radio;
        if (this.labels.length > 0) {
          for (let i = 0; i < this.labels.length; i++) {
            this.pvcvolume.labels[this.labels[i].key] = this.labels[i].value;
          }
        }

        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        console.log(data);
        sessionStorage.setItem("order", data);
        sessionStorage.setItem("pvcvolume", JSON.stringify(this.pvcvolume));
        console.log(this.pvcvolume);
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
      this.user = JSON.parse(getUserInfo());
      //获取用户下的项目列表
      this.search1.sort = this.user.uid;
      const projectres = await requestParams(getProjects, this.search1);
      this.project = projectres.content.content;
      this.pvcvolume.projectNo = this.project[0].projectNo;

      this.addorder.projectId = this.project[0].id;
      this.addorder.projectName = this.project[0].projectName;
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

      this.duration = list;
      this.radio = list[0].id;
      this.sum = list[0].price;
      this.price = list[0].price;
      this.skulist = list;
      this.skuData = list[0];
      this.pvcvolume.capacity = parseFloat(list[0].storage) + "Gi";
    },
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      this.pvcvolume.kubernetes_urn = this.envs[0].id;
    },
    getClustersLabel(val) {
      let obj = {};
      console.log(val);
      obj = this.envs.find((item) => {
        console.log(item);
        return item.id == val;
      });
      console.log(obj);
      let getName = "";
      getName = obj.name;
      return getName;
    },
    //  获取sc list
    clicksclist(kubernetes_urn) {
      gerStrogeclass(kubernetes_urn).then((r) => {
        this.sclist = r.content;
      });
    },
    scChange() {
      gerStrogeclass(this.pvcvolume.kubernetes_urn).then((r) => {
        this.sclist = r.content;
      });
    },
    // 移除 标签
    deleteLabels(row) {
      this.labels.splice(row.$index, 1);
    },
    addLabels() {
      this.labels.push({ key: "", value: "" });
    },
    //pvc获取资源空间
    clickPVCNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.pvcvolume.kubernetes_urn;
        this.projectResource.projectNo = this.pvcvolume.projectNo;
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
            this.PVCnamespaces = r.content;
          });
        }
      }
    },
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
