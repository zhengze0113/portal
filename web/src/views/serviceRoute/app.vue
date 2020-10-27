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
                <template >————</template>
              </el-table-column>
              <el-table-column label="内存" align="center">
                <template >————</template>
              </el-table-column>
              <el-table-column label="存储空间" align="center">
                <template >————</template>
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
              >{{ skuData.name }}/{{ skuData.cpuCores }}/{{
                skuData.memory
              }}</span
            >
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
          <el-col :offset="2">
            <el-form
              :rules="rules"
              ref="form"
              :model="form"
              label-width="100px"
            >
              <div class="item-content" style="width: 70%">
                <el-form-item
                  label="项目"
                  prop="projectName"
                  :rules="[{ required: true, message: '项目信息不能为空' }]"
                >
                  <el-select
                    v-model="form.projectName"
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
                  label="集群"
                  prop="kubernetesUrn"
                  :rules="[{ required: true, message: '集群信息不能为空' }]"
                >
                  <el-select
                    v-model="form.kubernetesUrn"
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
                  label="资源空间"
                  prop="namespace"
                  :rules="[{ required: true, message: '资源空间不能为空' }]"
                >
                  <el-select
                    v-model="form.namespace"
                    placeholder="请选择资源空间"
                    style="width: 100%"
                    @visible-change="clickNamespace"
                    @change="namespaceChange"
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
                  label="名称"
                  prop="name"
                  :rules="[
                    { required: true, validator: checkName, trigger: 'blur' },
                  ]"
                >
                  <el-input
                    :disabled="nameDisabled"
                    placeholder="名称由小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾,最长支持253个字符"
                    v-model="form.name"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="外网域名"
                  prop="hostName"
                  :rules="[
                    {
                      required: true,
                      validator: checkHostName,
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    placeholder="由字母,数字,中划线组成,中划线不能在开头或末尾,至少包含两个字符串,单个字符串不超过63个字符,字符串间以点分割,且总长度不超过100个字符。"
                    v-model="form.hostName"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="路径URL"
                  prop="path"
                  :rules="[{ validator: checkPath, trigger: 'blur' }]"
                >
                  <el-input
                    maxlength="253"
                    placeholder="ur格式错误,须以斜杠(/)开头,组成元素只能是大小写字母、数字、点(.)、中划线(-)、下划线(_)和斜杠(/),不能出现连续斜杠(//),且不能以点(.)结尾"
                    v-model="form.path"
                  ></el-input>
                </el-form-item>
                <div class="service-box">
                  <el-form-item label="服务" prop="to.name" :rules="[{ required: true, message: '服务不能为空' }]">
                    <el-select
                      @change="servicesChange"
                      @visible-change="clickToName"
                      style="width: 50%"
                      v-model="form.to.name"
                      placeholder="请选择服务"
                    >
                      <el-option
                        v-for="(item, index) in servicesList"
                        :label="item"
                        :key="index"
                        :value="item"
                      ></el-option>
                    </el-select>
                    <el-form-item
                      v-if="
                        form.alternateBackends.length != 0 &&
                        alternateBackendsStatus == true
                      "
                      prop="to.weight"
                      :rules="[
                        {
                          required: true,
                          validator: checkWeight,
                          trigger: 'blur',
                        },
                      ]"
                      style="
                        display: inline-block;
                        margin-bottom: 0 !important;
                        margin-left: 0 !important;
                      "
                    >
                      <el-input-number
                        @blur="blurWeight('to')"
                        v-model="form.to.weight"
                        controls-position="right"
                        :min="0"
                        :max="256"
                      ></el-input-number>
                      {{
                        form.alternateBackends.length > 1
                          ? "0-256"
                          : form.alternateBackends.length == 1
                          ? "%"
                          : ""
                      }}
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="权重值（当两个服务时权重总值100%,大于两个时单个权重小于256）"
                        placement="top"
                      >
                        <i style="font-size: 14px" class="el-icon-question"></i>
                      </el-tooltip>
                    </el-form-item>
                  </el-form-item>
                </div>
                <el-form-item
                  label="目标端口"
                  prop="port"
           
                >
                  <el-select
                    style="width: 50%"
                    v-model="form.port"
                    placeholder="请选择目标端口"
                  >
                    <el-option
                      v-for="item in portsList"
                      :label="item.portAll"
                      :key="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标签" prop="labels">
                  <div class="table-box">
                    <el-table
                      :data="form.labels"
                      style="width: 100%; border: 1px solid #dcdfe6"
                    >
                      <el-table-column label="KEY" align="center">
                        <template slot-scope="scope">
                          <el-form-item
                            :prop="'labels.' + scope.$index + '.key'"
                            :rules="[
                              {
                                required: true,
                                message: '请输入KEY',
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
                            :prop="'labels.' + scope.$index + '.value'"
                            :rules="[
                              {
                                required: true,
                                message: '请输入VALUE',
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
                      <el-table-column width="100" align="center" label="操作">
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
                <el-form-item label="备用服务">
                  <el-switch
                    class="switch-text"
                    inactive-color="#989898"
                    active-text="开"
                    inactive-text="关"
                    v-model="alternateBackendsStatus"
                  ></el-switch>
                </el-form-item>
                <template v-if="alternateBackendsStatus">
                  <el-form-item label="服务" prop="alternateBackends">
                    <div class="table-box">
                      <el-table
                        :data="form.alternateBackends"
                        style="width: 100%; border: 1px solid #dcdfe6"
                      >
                        <el-table-column label="服务" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="
                                'alternateBackends.' + scope.$index + '.name'
                              "
                              :rules="[
                                {
                                  required: true,
                                  validator: checkServicesName,
                                  trigger: 'blur',
                                },
                              ]"
                            >
                              <el-select
                                clearable
                                @change="checkServices"
                                style="width: 100%"
                                v-model="
                                  form.alternateBackends[scope.$index].name
                                "
                                placeholder="请选择服务"
                              >
                                <el-option
                                  v-for="(item, index) in servicesList"
                                  :label="item"
                                  :key="index"
                                  :value="item"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column align="center">
                          <template slot="header" slot-scope="scope">
                            权重
                            <el-tooltip
                              class="item"
                              effect="dark"
                              content="权重值（当两个服务时权重总值100%,大于两个时单个权重小于256）"
                              placement="top"
                            >
                              <i
                                style="font-size: 14px"
                                class="el-icon-question"
                              ></i>
                            </el-tooltip>
                          </template>
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="
                                'alternateBackends.' + scope.$index + '.weight'
                              "
                              :rules="[
                                {
                                  required: true,
                                  validator: checkWeight,
                                  trigger: 'blur',
                                },
                              ]"
                            >
                              <el-input-number
                                @blur="blurWeight('alternateBackends')"
                                v-model="scope.row.weight"
                                style="width: 80%"
                                controls-position="right"
                                :min="0"
                                :max="form.alternateBackends[scope.$index].max"
                              ></el-input-number>
                              {{
                                form.alternateBackends.length > 1
                                  ? "0-256"
                                  : form.alternateBackends.length == 1
                                  ? "%"
                                  : ""
                              }}
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column
                          width="100"
                          align="center"
                          label="操作"
                        >
                          <template slot-scope="scope">
                            <div class="del" @click="delServer(scope)">
                              移除
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="add">
                      <span @click="addServer">
                        <i class="add-icon">+</i>添加服务
                      </span>
                    </div>
                  </el-form-item>
                </template>
                <el-form-item label="安全加密">
                  <el-switch
                    class="switch-text"
                    inactive-color="#989898"
                    active-text="开"
                    inactive-text="关"
                    v-model="tlsStatus"
                  ></el-switch>
                </el-form-item>
                <template v-if="tlsStatus">
                  <el-form-item
                    label="TLS终止"
                    prop="tls.termination"
                    :rules="[
                      {
                        required: true,
                        message: '请选择TLS',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      @change="tlsChange"
                      style="width: 50%"
                      v-model="form.tls.termination"
                      placeholder="请选择"
                    >
                      <el-option label="Edge" value="edge"></el-option>
                      <el-option
                        label="Passthrough"
                        value="passthrought"
                      ></el-option>
                      <el-option
                        label="Re-encryption"
                        value="reencrypt"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="不安全流量"
                    prop="tls.insecureEdgeTerminationPolicy"
                    :rules="[
                      {
                        required: true,
                        message: '请选择不安全流量',
                        trigger: 'blur',
                      },
                    ]"
                  >
                    <el-select
                      style="width: 50%"
                      v-model="form.tls.insecureEdgeTerminationPolicy"
                      placeholder="请选择"
                    >
                      <el-option
                        :disabled="
                          item == 'Allow' &&
                          form.tls.termination == 'passthrought'
                        "
                        v-for="item in insecureEdgeTerminationPolicy"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <template
                    v-show="
                      form.tls.termination == 'passthrought' ? false : true
                    "
                  >
                    <el-form-item label="证书" prop="tls.certificate">
                      <div class="upload-box">
                        <el-input placeholder="请输入内容" v-model="zs">
                          <template slot="append">
                            <el-upload
                              :show-file-list="false"
                              name="multipartFile"
                              class="upload-demo"
                              :action="action"
                              :before-upload="beforeUpload1"
                              :on-success="successUpload1"
                            >
                              <el-button class="upload-button">
                                <i class="el-icon-upload el-icon--right"></i>
                                选择文件
                              </el-button>
                            </el-upload>
                          </template>
                        </el-input>
                      </div>
                      <div class="upload-info">
                        <el-input
                          type="textarea"
                          :rows="5"
                          placeholder="请输入内容"
                          v-model="form.tls.certificate"
                        >
                        </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="密钥" prop="tls.key">
                      <div class="upload-box">
                        <el-input placeholder="请输入内容" v-model="my">
                          <template slot="append">
                            <el-upload
                              :show-file-list="false"
                              name="multipartFile"
                              class="upload-demo"
                              :action="action"
                              :before-upload="beforeUpload2"
                              :on-success="successUpload2"
                            >
                              <el-button class="upload-button">
                                <i class="el-icon-upload el-icon--right"></i>
                                选择文件
                              </el-button>
                            </el-upload>
                          </template>
                        </el-input>
                      </div>
                      <div class="upload-info">
                        <el-input
                          type="textarea"
                          :rows="5"
                          placeholder="请输入内容"
                          v-model="form.tls.key"
                        >
                        </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="CA证书" prop="tls.caCertificate">
                      <div class="upload-box">
                        <el-input placeholder="请输入内容" v-model="cazs">
                          <template slot="append">
                            <el-upload
                              :show-file-list="false"
                              name="multipartFile"
                              class="upload-demo"
                              :action="action"
                              :before-upload="beforeUpload3"
                              :on-success="successUpload3"
                            >
                              <el-button class="upload-button">
                                <i class="el-icon-upload el-icon--right"></i>
                                选择文件
                              </el-button>
                            </el-upload>
                          </template>
                        </el-input>
                      </div>
                      <div class="upload-info">
                        <el-input
                          type="textarea"
                          :rows="5"
                          placeholder="请输入内容"
                          v-model="form.tls.caCertificate"
                        >
                        </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item
                      v-if="form.tls.termination != 'edge'"
                      label="终点CA证书"
                      prop="tls.destinationCACertificate"
                    >
                      <div class="upload-box">
                        <el-input placeholder="请输入内容" v-model="zdcazs">
                          <template slot="append">
                            <el-upload
                              :show-file-list="false"
                              name="multipartFile"
                              class="upload-demo"
                              :action="action"
                              :before-upload="beforeUpload4"
                              :on-success="successUpload4"
                            >
                              <el-button class="upload-button">
                                <i class="el-icon-upload el-icon--right"></i>
                                选择文件
                              </el-button>
                            </el-upload>
                          </template>
                        </el-input>
                      </div>
                      <div class="upload-info">
                        <el-input
                          type="textarea"
                          :rows="5"
                          placeholder="请输入内容"
                          v-model="form.tls.destinationCACertificate"
                        >
                        </el-input>
                      </div>
                    </el-form-item>
                  </template>
                </template>
              </div>
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
              :max="999"
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
            @click="commitOrder('form')"
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
  getClusters, //获取集群
  getProjects, //项目信息
  getService, //获取service
  getProjectResource,
  getRouterServices,
  getServicesDetails,
  getRouteUpload,
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getUserInfo } from "../../utils/auth";
import baseURL from "../../api/app";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    return {
      clustersList: [],
      clustersLoading: true,
      kubernetesUrn: "",

      projectList: [],
      projectLoading: true,

      namespaceLoading: true,
      namespaceList: [],
      namespace: "",
      namespaceCheck: false,

      servicesList: [],
      portsList: [{}],

      action: "",
      insecureEdgeTerminationPolicy: ["None", "Allow", "Redirect"],
      nameDisabled: false,
      alternateBackendsStatus: false,
      tlsStatus: false,
      zs: "",
      my: "",
      cazs: "",
      zdcazs: "",
      submitLoading: false,
      rules: {},

      projectResource: { envId: "", projectNo: "" },
      user: "",
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      labelPVC: "right",
      project: [],
      envs: [],
      PVCnamespaces: "",
      namespaces: "",
      form: {
        projectName: "",
        alternateBackends: [
          //备用服务
          {
            name: "",
            portType: "", //无用
            weight: 0,
          },
        ],
        gmtCreate: "", //无用
        hostName: "", //外网域名
        isBalance: "", //无用
        kubernetesUrn: "", //无用
        labels: [],
        name: "", //名称
        namespace: "", //资源空间
        path: "", //路径URL
        port: "", //目标端口
        projectId: "", //无用
        tls: {
          caCertificate: "", //CA证书
          certificate: "", //证书
          destinationCACertificate: "", //终点CA证书
          insecureEdgeTerminationPolicy: "", //不安全流量
          key: "", //密钥
          termination: "", //TLS终止
        },
        to: {
          //服务
          name: "",
          portType: "", //不用传
          weight: 0,
        },
      },

      namespace: "",
      isFixed: true,
      regionalInformation: "", //区域信息
      projectinformation: "", //项目信息
      optionProject: [], //项目信息下拉框
      serviceList: [], // service 下拉框
      serviceName: "", // serviceName
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
    };
  },
  methods: {
    clickProject(data) {
      this.projectResource.envId = this.form.kubernetesUrn;
      this.projectResource.projectNo = this.form.projectName;
      getProjectResource(this.projectResource).then((r) => {
        this.namespaces = r.content;
        this.form.namespace = this.namespaces[0].name;
      });

      let obj = {};
      obj = this.project.find((item) => {
        //model就是上面的数据源
        return item.projectNo === data; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    clickToName(judge) {
      if (judge) {
        if (
          this.form.kubernetesUrn != "" &&
          this.form.projectName != "" &&
          this.form.namespace != ""
        ) {
          getRouterServices(
            this.form.projectName,
            this.form.kubernetesUrn,
            this.form.namespace
          )
            .then((res) => {
              console.log(res);
              this.servicesList = res.content;
              this.form.to.weight = 100;
              console.log(this.servicesList);
            })
            .catch((e) => {});
        } else {
          this.$notify({
            type: "warning",
            message: "请将项目、集群、资源空间数据填写完整",
          });
        }
      }
    },
    clickNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.form.kubernetesUrn;
        this.projectResource.projectNo = this.form.projectName;
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
            console.log(this.namespaces);
          });
        }
      }
    },
    goRoute() {
      this.$router.push(`/network_management/routes`);
    },
    beforeUpload1(file) {
      console.log(file);
      this.zs = file.name;
    },
    beforeUpload2(file) {
      this.my = file.name;
    },
    beforeUpload3(file) {
      this.cazs = file.name;
    },
    beforeUpload4(file) {
      this.zdcazs = file.name;
    },
    successUpload1(res, file, fileList) {
      console.log(res);
      console.log(res.content);
      this.form.tls.certificate = res.content;
    },
    successUpload2(res, file, fileList) {
      this.form.tls.key = res.content;
    },
    successUpload3(res, file, fileList) {
      this.form.tls.caCertificate = res.content;
    },
    successUpload4(res, file, fileList) {
      this.form.tls.destinationCACertificate = res.content;
    },

    servicesChange() {
      getServicesDetails(
        this.form.kubernetesUrn,
        this.form.namespace,
        this.form.to.name
      )
        .then((res) => {
          if (res.code == 200) {
            let ports = [];
            res.content.ports.forEach((item) => {
              ports.push({
                portAll: `${item.port}-${item.targetPort}(${item.protocol})`,
                name: item.name,
              });
            });
            this.form.port = ports[0].name;
            this.portsList = ports;
          }
        })
        .catch((e) => {});
    },
    checkHostName(rule, value, callback) {
      if (value) {
        var reg = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/;
        if (!reg.test(value)) {
          return callback(
            new Error(
              "名称由小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾,最长支持253个字符"
            )
          );
        } else {
          return callback();
        }
      } else {
        return callback(new Error("hostName不能为空"));
      }
    },
    blurWeight(name) {
      this.$refs.form.validateField("alternateBackends.0.weight");
      this.$refs.form.validateField("to.weight");
    },
    checkServices() {
      this.form.alternateBackends.forEach((item, index) => {
        this.$refs.form.validateField(`alternateBackends.${index}.name`);
      });
    },
    checkServicesName(rule, value, callback) {
      if (!value) {
        callback(new Error("服务不能为空"));
      }
      let index = rule.field.split(".")[1];
      let payload = [];
      this.form.alternateBackends.forEach((item) => {
        payload.push(item.name);
      });
      payload.push(this.form.to.name);
      payload.splice(index, 1);
      if (payload.indexOf(value) == -1) {
        callback();
      } else {
        callback(new Error("服务不能重复"));
      }
    },
    checkWeight(rule, value, callback) {
      if (this.form.alternateBackends.length == 0) {
        if (value != 100) {
          return callback(new Error("一个服务时权重值只能是100"));
        } else {
          callback();
        }
      } else if (this.form.alternateBackends.length == 1) {
        if (
          this.form.to.weight + this.form.alternateBackends[0].weight !=
          100
        ) {
          return callback(new Error("当两个服务时权重总值100%"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    checkPath(rule, value, callback) {
      if (!value) {
        callback();
      } else {
        //为true就通过
        let reg = /^[\/]{1}([a-zA-Z0-9]|[-_*]|[\/]){1,49}$/;
        if (!reg.test(value)) {
          return callback(
            new Error("以/开头，由数字、字母、中划线、*、下划线组成")
          );
        } else {
          callback();
        }
      }
    },
    checkName(rule, value, callback) {
      if (value) {
        var reg = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/;
        if (!reg.test(value)) {
          return callback(
            new Error(
              "名称由小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字开头结尾,最长支持253个字符"
            )
          );
        } else {
          return callback();
        }
      } else {
        return callback(new Error("route名称不能为空"));
      }
    },
    async nextStep() {
      let formParams= JSON.parse(JSON.stringify(this.form));
      let labels = {};
      formParams.labels.forEach((item) => {
        labels[item.key] = item.value;
      });
      if (!this.alternateBackendsStatus) {
        formParams.alternateBackends = [];
      }
      if (!this.tlsStatus) {
        formParams.tls = {};
      }
      formParams.labels = labels;
      console.log("参数", formParams);
      delete formParams.project;
      this.submitLoading = true;

      let params = { name: "", paramValue: "" };
      params.name = "资源空间";
      params.paramValue = this.form.namespace;
      this.skuInfoSpecs.push(params);
      let params1 = { name: "", paramValue: "" };
      params1.name = "区域信息";
      params1.paramValue = this.getClustersLabel(this.form.kubernetesUrn);
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "项目信息";
      params2.paramValue = this.getProjectLabel(this.form.projectName);
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "service";
      params3.paramValue = this.form.to.name;
      this.skuInfoSpecs.push(params3);

      this.addorder.amount = this.sum;
      this.addorder.items[0].amount = this.time;
      this.addorder.items[0].basicPrice = this.price;
      this.addorder.items[0].finalPrice = this.sum;
      this.addorder.items[0].skuId = this.radio; //
      this.addorder.items[0].category = this.getId("productName");
      this.addorder.items[0].name = this.getId("productName");
      this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
      this.addorder.items[0].duration = this.time;
      console.log(this.addorder);
      // 存储
      var data = JSON.stringify(this.addorder);
      console.log(data);
      sessionStorage.setItem("order", data);
      sessionStorage.setItem("form", JSON.stringify(formParams));
      console.log(sessionStorage);
      location.href = "/html/confirmOrder.html";
    },

    tlsChange() {
      if (this.form.tls.termination == "passthrought") {
        if ((this.form.tls.insecureEdgeTerminationPolicy = "Allow")) {
          this.form.tls.insecureEdgeTerminationPolicy = "None";
        }
        this.form.tls.certificate = ""; //证书
        this.zs = "";
        this.form.tls.key = ""; //密钥
        this.my = "";
        this.form.tls.caCertificate = ""; //CA证书
        this.cazs = "";
        this.form.tls.destinationCACertificate = ""; //终点CA证书
        this.zdcazs = "";
      } else if (this.form.tls.termination == "edge") {
        this.form.tls.destinationCACertificate = ""; //终点CA证书
        this.zdcazs = "";
      }
    },
    projectChange() {
      this.tableData = [];
      this.getClusters();
    },
    clustersChange() {
      this.tableData = [];
    },
    namespaceChange() {
      this.action = `/api/cloud/cmss/v1/kubernetes/${this.form.kubernetesUrn}/namespace/${this.form.namespace}/route/upload`;
    },

    getClusters() {
      this.clustersLoading = true;
      this.get(`/clusters`)
        .then((res) => {
          if (res.status == 200) {
            this.clustersLoading = false;
            this.clustersList = res.data.content.content;
            if (res.data.content.content) {
              if (!this.$route.query.name) {
                this.form.kubernetesUrn = res.data.content.content[0].id;
              }
            }
          }
        })
        .catch((e) => {
          this.projectLoading = false;
        });
    },

    goBlock() {
      this.$router.push(`/network_management/routes`);
    },
    delEnv(row) {
      this.form.labels.splice(row.$index, 1);
    },
    addEnv() {
      this.form.labels.push({ name: "", value: "" });
    },
    addServer() {
      this.form.alternateBackends.push({ name: "", weight: "" });
      this.$refs.form.validateField("alternateBackends.0.weight");
      this.$refs.form.validateField("to.weight");
    },
    delServer(row) {
      this.form.alternateBackends.splice(row.$index, 1);
      if (this.form.alternateBackends.length != 0) {
        this.$refs.form.validateField("alternateBackends.0.weight");
      }
      this.$refs.form.validateField("to.weight");
    },

    //  获取sc list
    clicksclist(kubernetes_urn) {
      console.log(kubernetes_urn);
      gerStrogeclass(kubernetes_urn).then((r) => {
        console.log(r);
        this.sclist = r.content;
      });
    },
    //pvc获取资源空间
    clickPVCNamespace(judge) {
      console.log(judge);
      if (judge) {
        this.projectResource.envId = this.routeLink.kubernetesUrn;
        this.projectResource.projectNo = this.routeLink.projectNo;
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
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      this.form.kubernetesUrn = this.envs[0].id;
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

      if (this.mode == "MONTH") {
        console.log(this.mode);
        this.sum = row.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        console.log(this.mode);
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
    //提交订单
    async commitOrder(formName) {
      console.log(this.form);
      if (this.disable == true) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.nextStep();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //增加时间
    countTime() {
      if (this.mode == "MONTH") {
        console.log(this.mode);
        this.sum = this.time * this.price * this.number;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        console.log(this.mode);
        this.sum = this.time * this.price * this.number * 12;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    countMonth(data) {
      console.log(data);
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
      this.form.projectName = this.project[0].projectNo;

      this.addorder.projectId = this.project[0].id;
      this.addorder.projectName = this.project[0].projectName;
      this.form.projectId;
      console.log(this.project);
      this.listLoading = true;
      this.id = this.getId("id");
      //获取服务目录id
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
    },

    //获取服务
    // async getService() {
    //   var params = {
    //     envId: this.regionalInformation,
    //     namespace: this.projectinformation
    //   };
    //   const res1 = await requestParams(getService, params);
    //   this.serviceList = res1.content.content;
    //   this.serviceName = this.serviceList[0].name;
    // },
    test() {
      this.serviceName = "";
      // this.getService();
    },
    getClustersLabel(val) {
      let obj = {};
      console.log(val);
      console.log(this.envs);
      obj = this.envs.find((item) => {
        return item.id == val;
      });
      let getName = "";
      console.log(obj);
      getName = obj.name;

      return getName;
    },
    getProjectLabel(val) {
      let obj = {};
      obj = this.project.find((item) => {
        return item.projectNo == val;
      });
      let getName = "";
      console.log(obj);
      getName = obj.projectName;
      return getName;
    },
  },

  created() {
    this.addorder.productId = this.getId("id");
    this.addorder.productName = this.getId("productName");
    this.addorder.catalogId = this.getId("catalogId");
    this.addorder.catalog = this.getId("catalog");
    
    this.handleScroll();
    this.fetchData();
    // 获取集群
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

.del {
  margin-bottom: 18px;
  color: #ff2d25;
  cursor: pointer;
}
.upload-info {
  margin-top: 10px;
}
.upload-button {
  background: #00609c;
  color: #fff;
  border-color: #00609c;
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
.step {
  display: flex;
  padding: 20px 0;
  justify-content: center;
  width: 100%;
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
