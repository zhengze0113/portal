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
              <el-table-column label="规格名称" align="center">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="cpu" align="center">
                <template slot-scope="scope">
                  {{ scope.row.cpuCores }}
                </template>
              </el-table-column>
              <el-table-column label="内存" align="center">
                <template slot-scope="scope">
                  {{ scope.row.memory }}
                </template>
              </el-table-column>
              <el-table-column label="硬盘" align="center">
                <template slot-scope="scope">
                  {{ scope.row.storage }}
                </template>
              </el-table-column>

              <el-table-column label="版本" align="center">
                <template slot-scope="scope">
                  {{ scope.row.version }}
                </template>
              </el-table-column>
              <el-table-column label="参考价格" align="center">
                <template slot-scope="scope">
                  {{ scope.row.price }}元/年
                </template>
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
              >{{ skuData.cpuCores }}/{{ skuData.memory }}</span
            >
          </el-col>
          <el-col :span="10" style="margin-top: 30px; margin-bottom: 30px">
            <span class="skuDivFont">当前资源需求:</span>
            <span class="specFont"
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
          <el-col :offset="2">
            <el-form
              :model="pinpointFrom"
              ref="pinpointFrom"
              label-width="140px"
              style="width: 100%"
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
                      style="width: 100%"
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
                      style="width: 100%"
                      @change="clicksclist"
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
                      v-model="pinpointFrom.nameSpace"
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
                  <el-form-item>
                    <el-col>
                      <span class="textContent">选择PVC或</span>
                      <el-link
                        type="primary"
                        class="textContent"
                        :underline="false"
                        @click="addPvc"
                        >创建PVC</el-link
                      >
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-table :data="pinpointFrom.volumes" style="width: 100%">
                      <el-table-column
                        label="选择PVC"
                        align="center"
                        style="width: 80px"
                      >
                        <template slot-scope="scope">
                          <el-form-item
                            :prop="'volumes.' + scope.$index + '.pvName'"
                            :rules="[
                              {
                                required: true,
                                message: 'pvc名称不能为空',
                              },
                              {
                                pattern: /[a-zA-Z0-9_]([A-Za-z0-9_])?$/,
                                message: '由大小写字母、数字、下划线组成',
                                trigger: 'blur',
                              },
                            ]"
                          >
                            <el-select
                              v-model="scope.row.pvName"
                              placeholder="请选择PVC"
                              style="width: 100%"
                              @blur="pvcrow(scope.row)"
                            >
                              <el-option
                                v-for="item in pvcsList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.pvName"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="容量(GI)"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                          <el-form-item>
                            <el-input
                              :disabled="true"
                              v-model="scope.row.capacity"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column label="容器内挂载路径" align="center">
                        <template slot-scope="scope">
                          <el-form-item
                            :prop="'volumes.' + scope.$index + '.path'"
                          >
                            <el-input
                              :disabled="true"
                              v-model="scope.row.path"
                              placeholder="请输入挂载路径"
                            />
                          </el-form-item>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-form-item>
                  <el-form-item label="APM-hbase镜像:">
                    <el-select
                      disabled
                      v-model="APM_hbases"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in APM_hbase"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="APM-collector镜像:">
                    <el-select
                      disabled
                      v-model="APM_collectors"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in APM_collector"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="APM-webUI镜像:">
                    <el-select
                      disabled
                      v-model="APM_webUIs"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in APM_webUI"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
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
            v-model="disable"
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
    <!--创建PVC-->
    <el-dialog
      title="创建PVC"
      :visible.sync="pvcStatus"
      width="700px"
      size="small"
      :before-close="addPvc"
    >
      <el-form
        :label-position="labelPVC"
        :model="pvcvolume"
        :rules="pvcvolume"
        ref="pvcvolume"
        label-width="120px"
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
            disabled
            style="width: 100%"
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
            disabled
            placeholder="请选择集群"
            style="width: 100%"
            @change="clicksclist"
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
          class="skuDivFont"
          prop="namespace"
          :rules="[{ required: true, message: '资源空间不能为空' }]"
        >
          <el-select
            v-model="pvcvolume.namespace"
            placeholder="请选择资源空间"
            disabled
            style="width: 100%"
            @visible-change="clickPVCNamespace1"
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
            { required: true, message: '请输入pvc名称', trigger: 'blur' },
            { max: 253, message: '长度最多253个字符', trigger: 'blur' },
            {
              pattern: /^[a-z0-9]([-a-z0-9.]*[a-z0-9])?$/,
              message:
                '名称由小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾',
              trigger: 'blur',
            },
            { validator: checkPVCName, trigger: 'blur' },
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
          :rules="[
            {
              required: true,
              message: '请选择Storage Class',
              trigger: 'blur',
            },
          ]"
        >
          <el-select
            v-model="pvcvolume.strogeclassName"
            placeholder="请选择Storage Class"
            style="width: 100%"
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
          :rules="[
            { required: true, message: '请选择访问模式', trigger: 'blur' },
          ]"
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
          label="申请容量："
          prop="capacity"
          class="skuDivFont"
          :rules="[{ required: true, message: '请选择容量', trigger: 'blur' }]"
        >
          <el-select
            v-model="pvcvolume.capacity"
            placeholder="请选择容量"
            style="width: 100%"
            @change="pvcpic"
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
        <el-form-item label="申请时长：" class="skuDivFont">
          <el-input-number
            v-model="pvcvolume.purchase"
            controls-position="right"
            :min="1"
            :max="12"
          ></el-input-number>
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
            <el-table-column label="VALUE" align="center" style="padding: 0">
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
            <el-link @click="addLabels()" type="primary" :underline="false">
              <img
                src="@/static/images/jiahao.png"
                alt
                style="width: 16px; margin: 0px 5px -3px 0px"
              />新增标签</el-link
            >
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          class="el-buttoncss"
          type="primary"
          @click="submitPvc('pvcvolume')"
        >
          确 定
        </el-button>
        <el-button
          style="
            border-radius: 0;
            width: 87px;
            height: 30px;
            margin-left: 5%;
            padding-left: 14px;
          "
          @click="addPvc()"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getServiceCatalogsInfo,
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo, //查询详细sku信息
  getClusters, //获取集群
  getProject, //项目信息
  registration, //验证组件是否被注册
  getProjectResource,
  getResourceSpaceNameInfo,
  gerPersistentVolumeClaims,
  getProjects,
  persistentVolumeClaimCheck,
  gerStrogeclass,
} from "../../api/serviceOperating";
import Vue from "vue";
import { postOrders } from "../../api/shoplist";
import { requestParams } from "../../utils/urlParam";
const baseURL = require(".././../../../web/src/api/app");
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      numberArr: [], //容量列表
      sclist: [],
      labelPVC: "right",
      pvcStatus: false, //创建pvc
      namespaces: "",
      PVCnamespaces: "",
      projectResource: { envId: "", projectNo: "" },
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
      APM_hbase: [
        {
          value: "pinpoint-hbase:1.7.3",
          label: "pinpoint-hbase:1.7.3",
        },
      ],
      APM_collector: [
        {
          value: "pinpoint-collector:1.7.3",
          label: "pinpoint-collector:1.7.3",
        },
      ],
      APM_webUI: [
        {
          value: "pinpoint-web:1.7.3",
          label: "pinpoint-web:1.7.3",
        },
      ],
      APM_hbases: "pinpoint-hbase:1.7.3",
      APM_collectors: "pinpoint-collector:1.7.3",
      APM_webUIs: "pinpoint-web:1.7.3",

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
      skuInfoSpecs2: [],
      skuInfo: null,
      id: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      accessModelist: ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"], //访问模式下拉选项
      search: {
        params: "",
        page: 1,
        rows: 100,
      },
      search2: {
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
      //表单数据
      pinpointFrom: {
        pvcName: "",
        montPath: "",
        volumes: [], //pvc
        projectNo: "",
        componentResourceLevel: 1,
        storageClassName: "tenx-nfs0",
        userId: 1,
        nameSpace: "",
        envId: "",

        hbaseCpu: 0,
        collectorCpu: 0,
        webCpu: 0,
        hbaseMemory: 0,
        collectorMemory: 0,
        webMemory: 0,
      },
      pvcsList: [],
      project: "",
      // PVC
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      labels: [],
      pname: "",
      capacityshow: "",
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
      capacityNo: false,
    };
  },
  methods: {
   async submitPvc(pvcvolume) {
      this.$refs[pvcvolume].validate((valid) => {
        if (valid) {
          let params = { name: "", paramValue: "" };
          params.name = "集群";
          params.paramValue = this.getClustersLabel(
            this.pvcvolume.kubernetes_urn
          );
          this.skuInfoSpecs2.push(params);
          let params1 = { name: "", paramValue: "" };
          params1.name = "项目";
          params1.paramValue = this.pvcvolume.projectNo;
          this.skuInfoSpecs2.push(params1);
          let params2 = { name: "", paramValue: "" };
          params2.name = "资源空间";
          params2.paramValue = this.pvcvolume.namespace;
          this.skuInfoSpecs2.push(params2);
          let params3 = { name: "", paramValue: "" };
          params3.name = "PVC名称";
          params3.paramValue = this.pvcvolume.name;
          this.skuInfoSpecs2.push(params3);
          let params4 = { name: "", paramValue: "" };
          params4.name = "Storage Class";
          params4.paramValue = this.pvcvolume.strogeclassName;
          this.skuInfoSpecs2.push(params4);
          let params5 = { name: "", paramValue: "" };
          params5.name = "请求容量";
          params5.paramValue = this.pvcvolume.capacity;
          this.skuInfoSpecs2.push(params5);

          if (this.labels.length > 0) {
            for (let i = 0; i < this.labels.length; i++) {
              this.labels[i].key;
              this.labels[i].value;
              this.pvcvolume.labels[this.labels[i].key] = this.labels[i].value;
            }
          }

          for (var key in this.addorder.items[0]) {
            for (var key1 in this.skuInfo) {
              if (key == key1) {
                this.addorder.items[0][key] = this.skuInfo[key1];
              }
            }
          }
          this.addorder.amount =
            this.pvcvolume.basePrice * this.pvcvolume.purchase;
          this.addorder.items[0].amount = this.time;
          this.addorder.items[0].basicPrice = this.pvcvolume.basePrice;
          this.addorder.items[0].finalPrice =
            this.pvcvolume.basePrice * this.pvcvolume.purchase;
          this.addorder.items[0].skuId = this.pvcvolume.skuId;
          this.addorder.items[0].category = "数据存储（PVC）";
          this.addorder.items[0].name = "数据存储（PVC）";

          this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs2);
          this.addorder.items[0].duration = this.pvcvolume.purchase + "月";
          this.pvcvolume.amount =
            this.pvcvolume.basePrice * this.pvcvolume.purchase;
          let platformParams = [
            {
              requestModeParams: {
                protocol: "http",
                requestPath: "",
                httpMethod: "",
                ParamFormat: "json",
              },
              params: "",
              headers: "",
            },
          ];
          platformParams[0].requestModeParams.requestPath =
            baseURL.DataInterfaceCmss +
            "/api/cloud/cmss/v1/project/" +
            this.pvcvolume.projectNo +
            "/kubernetes/" +
            this.pvcvolume.kubernetes_urn +
            "/namespace/" +
            this.pvcvolume.namespace +
            "/persistentVolumeClaim";
          platformParams[0].requestModeParams.httpMethod = "post";

          delete this.pvcvolume.kubernetes_urn;
          delete this.pvcvolume.namespace;
          delete this.pvcvolume.projectNo;
          let paramspvcvolume = JSON.stringify(this.pvcvolume);
          platformParams[0].params = paramspvcvolume;
          platformParams[0].headers = "";
          this.addorder.items[0].platformParams = JSON.stringify(
            platformParams
          );
          Vue.set(this.addorder, "orderResourceType", "APPLICATION");
          //创建订单
          postOrders(this.addorder).then((r) => {
            if (r.code == 201) {
              this.pvcStatus = !this.pvcStatus;
              this.initPvc();
              this.$notify({
                type: "success",
                message: r.message,
              });
            } else {
              this.$notify({
                type: "error",
                message: r.message,
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    addLabels() {
      this.labels.push({ key: "", value: "" });
    },
    //初始化PVC规格
    async getPVCSku() {
      this.numberArr = [];
      this.search.serviceCode = "syjcs333.pvc.zgHwAZYc";
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      this.pvclist = res.content.content;
      for (var i = 0; i < this.pvclist.length; i++) {
        this.numberArr.push(this.pvclist[i].storage);
      }
    },
    //  获取sc list
    clicksclist(kubernetes_urn) {
      this.pinpointFrom.nameSpace = "";
      // this.fetchData();
      gerStrogeclass(kubernetes_urn).then((r) => {
        this.sclist = r.content;
      });
    },
    // 移除 标签
    deleteLabels(row) {
      this.labels.splice(row.$index, 1);
    },
    checkPVCName(rule, value, callback) {
      if (value) {
        persistentVolumeClaimCheck(
          this.pvcvolume.kubernetes_urn,
          this.pvcvolume.namespace,
          this.pvcvolume.name
        )
          .then((res) => {
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
    async pvcpic(row) {
      let obj = {};
      obj = this.pvclist.find((item) => {
        //model就是上面的数据源
        return item.storage === row; //筛选出匹配数据
      });

      this.pvcvolume.amount = this.pvcvolume.purchase * obj.price;
      this.pvcvolume.basePrice = obj.price;
      this.pvcvolume.skuId = obj.id;
      getResourceSpaceNameInfo(
        this.pvcvolume.kubernetes_urn,
        this.pvcvolume.namespace
      ).then((r) => {
        if (r.content.storage <= parseInt(row)) {
          let storage = r.content.storage == null ? 0 : r.content.storage;
          let message =
            "资源空间达到资源上限，请您调整要创建容器的规格，或联系项目经理。（剩余容量:" +
            storage +
            "G）";
          this.$notify({
            type: "warning",
            message: "该资源空间资源剩余容量资源不足",
          });
          this.pvcvolume.capacity = "";
        }
      });
    },
    //获取资源空间
    clickPVCNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.pinpointFrom.envId;
        this.projectResource.projectNo = this.pinpointFrom.projectNo;
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
    //获取资源空间
    clickPVCNamespace1(judge) {
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
    clickProject(data) {
      this.pinpointFrom.nameSpace = "";

      let obj = {};
      obj = this.optionProject.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //验证组件是否被注册
    verification(data) {
      console.log(data);
      let component = "spring-cloud-pinpoint-server";
      registration(this.pinpointFrom.envId, component, data).then((r) => {
        if (r.content == 1) {
          const h = this.$createElement;
          this.$notify({
            message: h(
              "i",
              { style: "color: red" },
              "该项目下组件已安装请勿重复安装"
            ),
          });
          this.pinpointFrom.nameSpace = "";
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

      this.price = row.price;
      this.pinpointFrom.hbaseCpu = parseFloat(row.cpuCores) + "";
      this.pinpointFrom.hbaseMemory = parseFloat(row.memory) + "";

      this.pinpointFrom.collectorCpu = parseFloat(row.cpuCores) + "";
      this.pinpointFrom.webMemory = parseFloat(row.memory) + "";

      this.pinpointFrom.webCpu = parseFloat(row.cpuCores) + "";
      this.pinpointFrom.collectorMemory = parseFloat(row.memory) + "";
      if (
        this.pinpointFrom.nameSpace != null &&
        this.pinpointFrom.nameSpace != ""
      ) {
        getResourceSpaceNameInfo(
          this.pinpointFrom.envId,
          this.pinpointFrom.nameSpace
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
          if (r.content.cpu < parseInt(this.pinpointFrom.hbaseCpu * 3)) {
            this.$notify({
              type: "warning",
              message: message,
            });
            this.pinpointFrom.nameSpace = "";
          } else if (
            r.content.memory < parseInt(this.pinpointFrom.hbaseMemory * 3)
          ) {
            this.$notify({
              type: "warning",
              message: message,
            });
            this.pinpointFrom.nameSpace = "";
          } else if (
            r.content.cpu == parseInt(this.pinpointFrom.hbaseCpu * 3)
          ) {
            this.$notify({
              type: "warning",
              message: messageto,
            });
            this.pinpointFrom.nameSpace = "";
          } else if (
            r.content.memory == parseInt(this.pinpointFrom.hbaseMemory)
          ) {
            this.$notify({
              type: "warning",
              message: messageto,
            });
            this.pinpointFrom.nameSpace = "";
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    //初始化pvc容量
    pvcrow(e) {
      var index = this.pinpointFrom.volumes.indexOf(e);
      let index1 = 0;
      if (this.pvcsList != "" && this.pvcsList != null) {
        for (var i = 0; i < this.pvcsList.length; i++) {
          if (this.pvcsList[i].pvName == e.pvName) {
            index1 = i;
          }
        }
        this.pinpointFrom.volumes[index].name = this.pvcsList[index1].name;
        this.pinpointFrom.volumes[index].capacity = this.pvcsList[
          index1
        ].partitionCapacity;
        this.capacityNo = true;
        this.capacityshow = this.pvcsList[index1].partitionCapacity;
      }
    },
    //提交订单
    async commitOrder() {
      //提交订单参数
      if (this.skuData.name == "标准版") {
        this.pinpointFrom.componentResourceLevel = 1;
      }
      if (this.skuData.name == "高级版") {
        this.pinpointFrom.componentResourceLevel = 2;
      }
      if (this.skuData.name == "企业版") {
        this.pinpointFrom.componentResourceLevel = 3;
      }
      let params = { name: "", paramValue: "" };
      params.name = "集群";
      params.paramValue = this.getClustersLabel(this.pinpointFrom.envId);
      this.skuInfoSpecs.push(params);
      let params1 = { name: "", paramValue: "" };
      params1.name = "项目";
      params1.paramValue = this.getObjectName(this.pinpointFrom.projectNo);
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "资源空间";
      params2.paramValue = this.pinpointFrom.nameSpace;
      this.skuInfoSpecs.push(params2);

      if (this.disable == true) {
        this.pinpointFrom.hbaseCpu = (this.pinpointFrom.hbaseCpu * 1).toFixed(
          1
        );
        this.pinpointFrom.collectorCpu = (
          this.pinpointFrom.collectorCpu * 1
        ).toFixed(1);

        this.pinpointFrom.webCpu = (this.pinpointFrom.webCpu * 1).toFixed(1);
        this.pinpointFrom.hbaseMemory = (
          this.pinpointFrom.hbaseMemory * 1
        ).toFixed(1);

        this.pinpointFrom.collectorMemory = (
          this.pinpointFrom.collectorMemory * 1
        ).toFixed(1);
        this.pinpointFrom.webMemory = (this.pinpointFrom.webMemory * 1).toFixed(
          1
        );

        this.pinpointFrom.pvcName = this.pinpointFrom.volumes[0].name;
        this.pinpointFrom.montPath = this.pinpointFrom.volumes[0].path;
        console.log(this.pinpointFrom.volumes);
        // delete this.pinpointFrom.volumes;
        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].finalPrice = this.sum;
        this.addorder.items[0].skuId = this.radio;
        this.addorder.items[0].category = this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        var duration = "月";
        this.mode == "MONTH" ? (duration = "月") : (duration = "年");
        this.addorder.items[0].duration = this.time + duration;
        // 存储
        delete this.addorder.orderResourceType;
        var data = JSON.stringify(this.addorder);
        sessionStorage.setItem("order", data);
        // delete this.pinpointFrom.volumes;
        console.log(this.pinpointFrom);

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

      this.skuData = this.skulist[0];
      this.pinpointFrom.hbaseCpu = parseFloat(list[0].cpuCores) + "";
      this.pinpointFrom.hbaseMemory = parseFloat(list[0].memory) + "";

      this.pinpointFrom.collectorCpu = parseFloat(list[0].cpuCores) + "";
      this.pinpointFrom.webMemory = parseFloat(list[0].memory) + "";
      this.pinpointFrom.webCpu = parseFloat(list[0].cpuCores) + "";
      this.pinpointFrom.collectorMemory = parseFloat(list[0].memory) + "";
      const projectres = await requestParams(getProjects, this.search1);
      this.project = projectres.content;
      this.clicksclist(this.pinpointFrom.envId);
    },
    addPvc() {
      if (
        this.pinpointFrom.nameSpace != "" &&
        this.pinpointFrom.nameSpace != null
      ) {
        this.pvcStatus = !this.pvcStatus;
        this.pvcvolume.projectNo = this.pinpointFrom.projectNo;
        this.pvcvolume.kubernetes_urn = this.pinpointFrom.envId;
        this.pvcvolume.namespace = this.pinpointFrom.nameSpace;
      } else {
        this.$notify({
          type: "warning",
          message: "请选择资源空间",
        });
      }
    },
    initPvc() {
      console.log(this.pinpointFrom.volumes.length);

      if (this.pinpointFrom.volumes.length == 0) {
        this.pinpointFrom.volumes.push({
          name: "",
          capacity: "",
          path: "/home/pinpoint",
          pvName: "",
        });
      } else {
        this.pinpointFrom.volumes[0].name = "";
        this.pinpointFrom.volumes[0].capacity = "";
        this.pinpointFrom.volumes[0].path = "/home/pinpoint";
        this.pinpointFrom.volumes[0].pvName = "";
      }
      gerPersistentVolumeClaims(
        this.pinpointFrom.projectNo,
        this.pinpointFrom.envId,
        this.pinpointFrom.nameSpace
      ).then((r) => {
        this.pvcsList = r.content.content;
        console.log(this.pvcsList);
      });
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
      this.pinpointFrom.envId = this.edit[0].value;
      await gerStrogeclass(this.pinpointFrom.envId).then((r) => {
        this.sclist = r.content;
      });
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content;
      this.pinpointFrom.projectNo = this.optionProject[0].projectNo;
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
      this.verification(this.pinpointFrom.nameSpace);
      getResourceSpaceNameInfo(
        this.pinpointFrom.envId,
        this.pinpointFrom.nameSpace
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
        if (r.content.cpu < parseInt(this.pinpointFrom.hbaseCpu * 3)) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.pinpointFrom.nameSpace = "";
        } else if (
          r.content.memory < parseInt(this.pinpointFrom.hbaseMemory * 3)
        ) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.pinpointFrom.nameSpace = "";
        } else if (r.content.cpu == parseInt(this.pinpointFrom.hbaseCpu * 3)) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.pinpointFrom.nameSpace = "";
        } else if (
          r.content.memory == parseInt(this.pinpointFrom.hbaseMemory * 3)
        ) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.pinpointFrom.nameSpace = "";
        }
      });
      if (this.pinpointFrom.nameSpace != "") {
        this.initPvc();
      }
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
    this.getPVCSku();
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
.specFont {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

@media screen and (max-width: 1024px) {
  .headList {
    height: 85px;
    line-height: 20px;
  }
}
.item-label {
  font-size: 14px;
  border-left: 4px solid #0261a7;
  text-indent: 10px;
  position: relative;
  .switch-text {
    position: absolute;
    left: 90px;
    top: -2px;
  }
}
.switch-text {
  position: absolute;
  left: 90px;
  top: -2px;
}
.mt30 {
  margin-top: 30px;
}
/deep/ .el-table {
  font-size: 12px;
}
/deep/ .el-input__inner {
  font-size: 12px;
}
/deep/ .el-input {
  font-size: 12px;
}
.textContent {
  color: #333;
  font-size: 12px;
  line-height: 38px;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  color: #0261a7;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  color: #0261a7;
}
/deep/.el-link.el-link--primary {
  color: #0261a7;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #0261a7;
  border-color: #0261a7;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
  border-color: #0261a7;
  background: #0261a7;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
  border-color: #0261a7;
  background: #0261a7;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #0261a7;
}
/deep/.el-checkbox__inner:hover {
  border-color: #0261a7;
}
.mt30 {
  margin-top: 30px;
}
/deep/.el-dialog__header {
  padding: 12px 20px !important;
  background: #f7f7f7 !important;
}

/deep/.el-dialog__footer {
  border-top: 1px solid #e9ecef;
  padding: 9px 20px !important;
}
.el-buttoncss {
  border-radius: 0;
  width: 87px;
  height: 30px;
  background: rgba(3, 97, 167, 1);
  margin-left: 5%;
  padding-left: 14px;
}

.smallBuyTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 76px;
}
</style>
