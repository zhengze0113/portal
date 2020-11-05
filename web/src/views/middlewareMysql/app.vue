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
            <el-row>
              <el-col class="mt30">
                <el-form
                  ref="deployment"
                  :model="deployment"
                  :rules="deployment"
                  :label-position="labelPosition"
                  label-width="100px"
                  style="width: 60%"
                  class="demo-ruleForm"
                >
                  <el-col>
                    <div class="item-content">
                      <div class="item-label">基本信息</div>
                    </div>
                  </el-col>
                  <el-col :offset="3">
                    <el-form-item
                      label="项目："
                      prop="projectNo"
                      :rules="[{ required: true, message: '项目信息不能为空' }]"
                    >
                      <el-select
                        v-model="deployment.projectNo"
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
                      label="集群："
                      prop="envId"
                      :rules="[{ required: true, message: '集群信息不能为空' }]"
                    >
                      <el-select
                        v-model="deployment.envId"
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
                      prop="namespace"
                      :rules="[
                        { required: true, message: '资源空间不能为空' },
                        { validator: checkName, trigger: 'blur' },
                      ]"
                    >
                      <el-select
                        v-model="deployment.namespace"
                        placeholder="请选择资源空间"
                        style="width: 100%"
                        @visible-change="clickNamespace"
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
                      label="应用名称:"
                      prop="applicationName"
                      :rules="[
                        {
                          required: true,
                          message: '应用名称不能为空',
                          trigger: 'blur',
                        },
                        { validator: checkName, trigger: 'blur' },
                        {
                          pattern: /^[_a-z0-9\.]+[a-z0-9]$/,
                          message:
                            '小写字母、数字、横线(-)和点(.)组成,且必须以字母或数字结尾',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        @input="ANChange"
                        v-model="deployment.applicationName"
                        placeholder="请输出应用名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="服务名称:">
                      <el-input
                        :disabled="true"
                        v-model="deployment.appName"
                        placeholder="请输出服务名称名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="描述:" prop="description">
                      <el-input
                        placeholder="请输入描述信息"
                        type="textarea"
                        v-model="deployment.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <div class="item-content">
                      <div class="item-label">部署信息</div>
                    </div>
                  </el-col>
                  <el-col id="form_pvc">
                    <el-col :offset="5">
                      <span class="textContent">选择PVC或</span>
                      <el-link
                        type="primary"
                        class="textContent"
                        :underline="false"
                        @click="addPvc"
                        >创建PVC</el-link
                      >
                    </el-col>
                    <el-col :offset="5" class="pvcheight">
                      <el-table :data="deployment.volumes" style="width: 100%">
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
                                  message: 'PVC不能为空',
                                },
                              ]"
                            >
                              <el-select
                                v-model="scope.row.pvName"
                                placeholder="请选择PVC"
                                style="width: 100%"
                                @click="clickPvc"
                                @change="pvcrow(scope.row)"
                              >
                                <el-option
                                  v-for="item in pvcsList"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.name"
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
                              :rules="[
                                {
                                  pattern: /^[\/]{1}([a-zA-Z0-9]|[-_*]|[\/]){1,49}$/,
                                  message:
                                    '以/开头,由数字、字母、中划线、*、下划线组成',
                                  trigger: 'blur',
                                },
                                {
                                  required: true,
                                  message: '挂载路径不能为空',
                                },
                                { validator: volumesUrl, trigger: 'blur' },
                              ]"
                            >
                              <el-input
                                v-model="scope.row.path"
                                placeholder="请输入挂载路径"
                              />
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column label="挂载子路径" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'volumes.' + scope.$index + '.subPath'"
                              :rules="[
                                {
                                  pattern: /^[a-zA-Z0-9-_*]{1}([a-zA-Z0-9]|[-_*]|[\/]){1,49}$/,
                                  message:
                                    '不能以/开头,由数字、字母、中划线、*、下划线组成',
                                  trigger: 'blur',
                                },
                              ]"
                            >
                              <el-input
                                v-model="scope.row.subPath"
                                placeholder="请输入挂载子路径"
                              />
                            </el-form-item>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                    <el-col :offset="5">
                      <div style="padding-top: 20px">
                        <el-form-item
                          v-for="(item, index) in deployment.parameters"
                          :key="index"
                          :label="item.name"
                          :prop="'parameters.' + index + '.value'"
                          :rules="[
                            {
                              required: item.required,
                              message: ' ',
                              trigger: 'blur',
                            },
                            { validator: checkMysqlName, trigger: 'blur' },
                          ]"
                        >
                          <!--  -->
                          <el-input
                            v-model="item.value"
                            :disabled="
                              item.name == 'MEMORY_LIMIT' ||
                              item.name == 'VOLUME_CAPACITY'
                            "
                          ></el-input>
                          <div class="desc">{{ item.description }}</div>
                        </el-form-item>
                        <div>
                          <div class="labels">Labels</div>
                          <div class="desc">
                            Each label is applied to each created resource.
                          </div>
                          <div class="table-box">
                            <el-table
                              :data="deployment.labels"
                              style="width: 100%"
                            >
                              <el-table-column label="KEY" align="center">
                                <template slot-scope="scope">
                                  <el-form-item
                                    :prop="'labels.' + scope.$index + '.key'"
                                    :rules="[
                                      {
                                        required: true,
                                        trigger: 'blur',
                                      },
                                    ]"
                                  >
                                    <el-input
                                      placeholder="请输入KEY"
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
                                        trigger: 'blur',
                                      },
                                    ]"
                                  >
                                    <el-input
                                      placeholder="请输入VALUE"
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
                                  <div class="del" @click="delEnv(scope)">
                                    移除
                                  </div>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                          <div
                            class="add"
                            style="margin-top: 19px; margin-bottom: 50px"
                          >
                            <span @click="addEnv">
                              <i class="add-icon">+</i>Add Label
                            </span>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-col>
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
            @click="submitDeployment('deployment')"
            deployment
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
          <el-select
            v-model="pvcvolume.namespace"
            placeholder="请选择资源空间"
            disabled
            style="width: 100%"
            @visible-change="clickPVCNamespace"
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
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo, //查询详细sku信息
  getClusters, //获取集群
  getProject, //项目信息
  whetherExistPersonnel, //验证项目管理下是否有该人员
  aliasWhetherRepeat,
  getProjects,
  getProjectResource, //获取项目下资源空间
  getimagestreams, // 查询镜像仓库镜像列表
  getConfigMaps, //获取config  集合
  getSecrets, //获取 secret  集合
  createPersistentVolumeClaim, // 创建PVC
  gerStrogeclass, //查询sc列表
  gerPersistentVolumeClaims, //查询pvc列表
  checkApplication, //应用创建名称唯一性校验
  getImageStreamTagName, // 查询ImageStream下某一版本的image详情
  getResourceSpaceNameInfo, //获取资源空间剩余可用资源
  persistentVolumeClaimCheck,
  getOpenshiftTemplate, //获取 opensshift  模板
  validityMysqlName,
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
import { getUserInfo } from "../../utils/auth";
import baseURL from "../../api/app";
import { postOrders } from "../../api/shoplist";
import Vue from "vue";
import { getProductMessage } from "../../api/CMSApi";
export default {
  name: "App",
  data: function () {
    const isNum = (rule, value, callback) => {
      const key = /^(?!-)[\u4e00-\u9fa5-a-z0-9](?!.*-$)/;
      if (!key.test(value)) {
        callback(new Error("不能为大写字母"));
      } else {
        callback();
      }
    };
    return {
      cpu: "",
      memory: "",
      randomNum: ("000000" + Math.floor(Math.random() * 999999)).slice(-6),
      accessModelist: ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"], //访问模式下拉选项
      sclist: "", //sc集合
      projectResource: { envId: "", projectNo: "" },
      value: false,
      envs: "", //集群
      radio: "1",
      pvcRules: {},
      pvArr: [], //pv列表
      pvcName: "",
      pvcStatus: false, //创建pvc
      pvclist: [{ name: "" }],
      secret: [{ name: "" }],
      isFixed: true,
      //容器部署
      radio: "",
      time: 1,
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
      skulist: [],
      skuInfoSpecs: [],
      skuInfo: null,
      id: "",
      labelPosition: "left",
      labelPVC: "right",
      search: {
        params: "",
        page: 1,
        rows: 100,
      },
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      skuObject: {
        id: "",
        spec: "",
        cpu: "",
        gb: "",
        version: "",
        money: "",
      },

      user: null,
      project: "",
      pvcsList: [], //pvc列表
      pvArr: [], //pv列表
      numberArr: [], //容量列表
      pvcRules: {},
      pvcStatus: false, //创建pvc
      pvcName: "",

      projectName: "", //项目
      namespace: "", //资源空间
      deployment: {
        volumes: [
          { name: "", capacity: "", path: "", pvName: "", subPath: "" },
        ],
        projectNo: "", //*
        envId: "", //*
        purchase: 1,
        description: "", //*
        applicationName: "", //*
        appName: "", //*
        labels: [], //*
        namespace: "", //*
        sourcetemplatename: "mysql-persistent", //*
        sourcetemplatenamespace: "openshift", //*
        pvcName: "", //*
        mountPath: "", //*
        subPath: "", //*
        parameters: [], //*
      },
      namespaces: "",
      PVCnamespaces: "",
      labels: [],
      pvclist: null,
      // PVC
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
    async pvcpic(row) {
      for (var i = 0; i < this.pvclist.length; i++) {
        const r = await requestParams(getResourcesSkuInfo, this.pvclist[i].id);
        var sku = r.content;
        let arr = sku.storage.split(";");
        for (let a = 0; a < arr.length; a++) {
          let arr2 = arr[a].split(":");
          if (arr2[0].trim() == "容量") {
            let str = arr2[1].trim() + "Gi";
            if (str == row) {
              this.pvcvolume.basePrice = r.content.price.price;
              this.pvcvolume.skuId = this.pvclist[i].id;
            }
          }
        }
      }
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
    selectModel(name) {
      let obj = {};
      obj = this.project.find((item) => {
        //model就是上面的数据源
        return item.projectNo === name; //筛选出匹配数据
      });
      this.deployment.projectName = obj.projectName;
      this.deployment.namespace = "";
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //初始化pvc容量
    pvcrow(e) {
      var index = this.deployment.volumes.indexOf(e);
      let index1 = 0;
      for (var i = 0; i < this.pvcsList.length; i++) {
        if (this.pvcsList[i].pvName == e.pvName) {
          index1 = i;
        }
      }
      this.deployment.volumes[index].name = this.pvcsList[index1].name;
      this.deployment.volumes[index].capacity = this.pvcsList[
        index1
      ].partitionCapacity;
      this.initTemplate(this.deployment.volumes[index].capacity);
    },
    clickPvc() {
      this.initPvc();
    },
    initPvc() {
      gerPersistentVolumeClaims(
        this.deployment.projectNo,
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        this.pvcsList = r.content.content;
      });
      (this.pvcvolume.projectNo = this.deployment.projectNo),
        (this.pvcvolume.kubernetes_urn = this.deployment.envId),
        (this.pvcvolume.namespace = this.deployment.namespace);
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
      const r = await requestParams(getResourcesSkuInfo, row.id);
      let arr = r.content.storage.split(";");
      this.cpu = parseFloat(row.cpu) + "";
      this.memory = parseFloat(row.gb) + "";
      if (
        this.deployment.namespace != null &&
        this.deployment.namespace != ""
      ) {
        getResourceSpaceNameInfo(
          this.deployment.envId,
          this.deployment.namespace
        ).then((r) => {
          if (r.content.cpu < this.cpu) {
            this.deployment.namespace = "";
          } else if (r.content.memory < this.memory) {
            this.deployment.namespace = "";
          }
        });
      }
      this.price = r.content.price.price;
      if (this.mode == "MONTH") {
        this.sum = r.content.price.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      this.initTemplate();
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
    //初始化
    async fetchData() {
      this.user = JSON.parse(getUserInfo());
      //获取用户下的项目列表
      this.search1.sort = this.user.uid;
      const projectres = await requestParams(getProjects, this.search1);
      this.project = projectres.content;
      this.deployment.projectNo = this.project[0].projectNo;
      this.deployment.projectName = this.project[0].projectName;

      this.addorder.projectId = this.project[0].id;
      this.addorder.projectName = this.project[0].projectName;
      const res1 = await requestParams(whetherExistPersonnel, this.search);

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

      this.skuData = this.skulist[0];
      this.cpu = parseFloat(list[0].cpuCores) + "";
      this.memory = parseFloat(list[0].memory) + "";
      this.getPVCSku();
      this.initTemplate();
    },
    async initTemplate(data) {
      const res = await requestParams(
        getOpenshiftTemplate,
        this.deployment.envId
      );
      this.deployment.parameters = res.content.parameters;
      this.deployment.parameters.forEach((item) => {
        if (item.name == "MEMORY_LIMIT") {
          item.value = this.memory + "Gi";
        }
        if (item.name == "VOLUME_CAPACITY") {
          item.value = data;
        }
      });
      let labels = res.content.labels;
      let arr = [];
      for (let key in labels) {
        arr.push({ key: key, value: labels[key] });
      }
      this.deployment.labels = arr;
    },
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      this.deployment.envId = this.envs[0].id;
      this.projectResource.envId = this.deployment.envId;
      this.projectResource.projectNo = this.deployment.projectNo;

      getProjectResource(this.projectResource).then((r) => {
        this.namespaces = r.content;
      });
    },
    //初始化PVC规格
    async getPVCSku() {
      this.search.params = `[{"param":{"catalogId":${17}},"sign":"EQ"}]`;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      this.pvclist = res.content.content;
      for (var i = 0; i < this.pvclist.length; i++) {
        const r = await requestParams(getResourcesSkuInfo, this.pvclist[i].id);
        var sku = r.content;
        let arr = sku.storage.split(";");
        for (let a = 0; a < arr.length; a++) {
          let arr2 = arr[a].split(":");
          if (arr2[0].trim() == "容量") {
            this.numberArr.push(arr2[1].trim() + "Gi");
          }
        }
      }
    },
    //获取资源空间
    clickNamespace(judge) {
      if (judge) {
        this.projectResource.envId = this.deployment.envId;
        this.projectResource.projectNo = this.deployment.projectNo;
        getProjectResource(this.projectResource).then((r) => {
          this.namespaces = r.content;
        });
      }
    },
    //验证资源空间剩余空间
    resourceValidation() {
      getResourceSpaceNameInfo(
        this.deployment.envId,
        this.deployment.namespace
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
        if (r.content.cpu < this.cpu) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.namespace = "";
        } else if (r.content.memory < this.memory) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.namespace = "";
        } else if (r.content.cpu == this.cpu) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.deployment.namespace = "";
        } else if (r.content.memory == this.memory) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.deployment.namespace = "";
        }
      });
      if (this.deployment.namespace != "") {
        this.initPvc();
      }
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

    getClustersLabel(val) {
      let obj = {};
      obj = this.envs.find((item) => {
        return item.id == val;
      });
      let getName = "";
      getName = obj.name;
      return getName;
    },

    getProjectLabel1(val) {
      let obj = {};
      obj = this.project.find((item) => {
        return item.projectNo == val;
      });
      let getName = "";
      getName = obj.projectName;
      return getName;
    },

    // 容器部署应用提价订单
    async submitDeployment(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.disable == true) {
            // 提交订单参数;
            getResourcesSkuInfo(this.radio).then((r) => {
              this.skuInfo = r.content;
              this.skuInfo.category = this.name;
              let skuInfoSpecs = [];
              let arr = r.content.storage.split(";");
              for (let a = 0; a < arr.length; a++) {
                let arr1 = arr[a].split(":");
                let params = { name: "", paramValue: "" };
                //CPU : 0.5 ; 内存 : 1 ;PVC容量:; 项目信息 : ;集群 : ;资源空间:;应用名称:;服务名称:;
                if (arr1[0].trim() == "CPU") {
                  params.name = arr1[0];
                  params.paramValue = this.cpu;
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "内存") {
                  params.name = arr1[0];
                  params.paramValue = this.memory;
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "项目信息") {
                  params.name = arr1[0];
                  params.paramValue = this.getProjectLabel1(
                    this.deployment.projectNo
                  );
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "集群") {
                  params.name = arr1[0];
                  params.paramValue = this.getObject(this.deployment.envId);
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "资源空间") {
                  params.name = arr1[0];
                  params.paramValue = this.deployment.namespace;
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "应用名称") {
                  params.name = arr1[0];
                  params.paramValue = this.deployment.appName;
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "服务名称") {
                  params.name = arr1[0];
                  params.paramValue = this.deployment.applicationName;
                  skuInfoSpecs.push(params);
                }
                if (arr1[0].trim() == "时长") {
                  params.name = arr1[0];
                  params.paramValue = this.deployment.purchase + "月";
                  skuInfoSpecs.push(params);
                }
              }
              this.deployment.purchase = this.time; //购买时长
              this.deployment.pvcName = this.deployment.volumes[0].name;
              this.deployment.mountPath = this.deployment.volumes[0].path;
              this.deployment.subPath = this.deployment.volumes[0].subPath;
              var params = JSON.parse(JSON.stringify(this.deployment));
              let labels = {};
              params.labels.forEach((item) => {
                labels[item.key] = item.value;
              });
              this.deployment.labels = labels;
              delete this.deployment.volumes;
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
              this.addorder.items[0].params = JSON.stringify(skuInfoSpecs);
              this.addorder.items[0].duration = this.time + "月";
              // 存储
              var data = JSON.stringify(this.addorder);
              var moint = sessionStorage.setItem(
                "deployment",
                JSON.stringify(this.deployment)
              );
              sessionStorage.setItem("order", data);
              console.log(sessionStorage);
              location.href = "/html/confirmOrder.html";
            });
          }
        } else {
          return false;
        }
      });
    },
    getObject(val) {
      let obj = {};
      obj = this.envs.find((item) => {
        return item.id == val;
      });
      let getName = "";
      getName = obj.name;
      return getName;
    },
    addEnv() {
      this.deployment.labels.push({ name: "", value: "" });
    },
    delEnv(row) {
      this.deployment.labels.splice(row.$index, 1);
    },
    addPvclist() {
      this.deployment.volumes.push({
        name: "",
        capacity: "",
        path: "",
        pvName: "",
        subPath: "",
      });
    },
    addLabels() {
      this.labels.push({ key: "", value: "" });
    },

    // 移除 标签
    deleteLabels(row) {
      this.labels.splice(row.$index, 1);
    },

    addPvc() {
      if (
        this.deployment.namespace != "" &&
        this.deployment.namespace != null
      ) {
        this.pvcStatus = !this.pvcStatus;
        this.pvcvolume.projectNo = this.deployment.projectNo;
        this.pvcvolume.kubernetes_urn = this.deployment.envId;
        this.pvcvolume.namespace = this.deployment.namespace;
      } else {
        this.$notify({
          type: "warning",
          message: "请选择资源空间",
        });
      }
    },
    //  获取sc list
    clicksclist(kubernetes_urn) {
      gerStrogeclass(kubernetes_urn).then((r) => {
        this.sclist = r.content;
      });
    },
    async submitPvc(pvcvolume) {
      this.$refs[pvcvolume].validate((valid) => {
        if (valid) {
          let skuInfoSpecs = [];
          getResourcesSkuInfo(this.pvcvolume.skuId).then((r) => {
            this.skuInfo = r.content;
            let arr = r.content.storage.split(";");
            for (let a = 0; a < arr.length; a++) {
              let arr1 = arr[a].split(":");
              let params = { name: "", paramValue: "" };
              if (arr1[0].trim() == "区域信息") {
                params.name = arr1[0];
                params.paramValue = this.getClustersLabel(
                  this.pvcvolume.kubernetes_urn
                );
                skuInfoSpecs.push(params);
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
              }

              if (arr1[0].trim() == "回收策略") {
                params.name = arr1[0];
                params.paramValue = this.reclaimPolicy;
                skuInfoSpecs.push(params);
              }
              if (arr1[0].trim() == "访问模式") {
                params.name = arr1[0];
                params.paramValue = arr1[0];
                skuInfoSpecs.push(params);
              }
            }

            if (this.labels.length > 0) {
              for (let i = 0; i < this.labels.length; i++) {
                this.labels[i].key;
                this.labels[i].value;
                this.pvcvolume.labels[this.labels[i].key] = this.labels[
                  i
                ].value;
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
            this.addorder.items[0].category =  "数据存储（PVC）";
            this.addorder.items[0].name =  "数据存储（PVC）";

            this.addorder.items[0].params = JSON.stringify(skuInfoSpecs);
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
            let params1 = JSON.stringify(this.pvcvolume);
            platformParams[0].params = params1;
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
          });
        } else {
          return false;
        }
      });
    },
    checkName(rule, value, callback) {
      if (value) {
        checkApplication(this.deployment.applicationName)
          .then((res) => {
            if (res.code == 200) {
              if (res.content) {
                callback();
              } else {
                return callback(new Error("该应用名已存在"));
              }
            } else {
            }
          })
          .catch((e) => {
            this.$message.error(e.message);
          });
      }
    },
    checkMysqlName(rule, value, callback) {
      if (
        this.deployment.namespace != "" &&
        this.deployment.namespace != null
      ) {
        if (rule.field == "parameters.2.value") {
          if (value) {
            validityMysqlName(
              this.deployment.projectNo,
              this.deployment.envId,
              this.deployment.namespace,
              value
            )
              .then((res) => {
                if (res.code == 200) {
                  if (res.content) {
                    return callback(new Error("该mysql名称已存在"));
                  } else {
                    callback();
                  }
                } else {
                }
              })
              .catch((e) => {
                this.$message.error(e.message);
              });
          }
        } else {
          callback();
        }
      } else {
        callback();
      }
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

    //验证 pvc 挂载路径
    volumesUrl(rule, value, callback) {
      if (value) {
        var index = 0;
        for (var i = 0; i < this.deployment.volumes.length; i++) {
          if (value == this.deployment.volumes[i].path) {
            index += 1;
          }
        }
        if (index > 1) {
          return callback(new Error("挂载路径不能重复"));
        } else {
          return callback();
        }
      }
    },
    ANChange() {
      this.deployment.appName =
        this.deployment.applicationName + this.randomNum;
    },
  },
  created() {
    
    this.addorder.productId = this.getId("id");
    this.addorder.productName = this.getId("productName");
    this.addorder.catalogId = this.getId("catalogId");
    this.addorder.catalog = this.getId("catalog");
    this.handleScroll();
    this.getClusters();
    this.fetchData();
  },
  mounted() {
    this.isFixed =
      document.body.offsetHeight - document.documentElement.clientHeight > 300;
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
.app-container {
  box-sizing: border-box;
}
.nav {
  padding: 20px 40px 0;
  box-sizing: border-box;
}
.navBj {
  width: 100%;
  height: 42px;
  line-height: 42px;
  background: rgba(233, 241, 248, 1);
  text-align: center;
  color: #333333;
  font-size: 14px;
}
.navBj-sel {
  color: #0261a7;
  background: rgba(213, 237, 255, 1);
}
.grid-content {
  min-height: calc(100vh - 82px);
  background: #fff;
  border: 1px solid rgba(224, 224, 224, 1);
}
.spec {
  background: #e9e9e9;
  text-align: center;
  padding: 15px 0;
}
.item-label {
  border-left: 4px solid #0261a7;
  text-indent: 10px;
  position: relative;
}
.desc {
  color: #999;
  font-size: 13px;
}
.del {
  margin-bottom: 18px;
  color: #ff2d25;
  cursor: pointer;
}
.table-box {
  margin-top: 10px;
  border: 1px solid #dcdfe6;
}
.labels {
  color: #606266;
  margin: 20px 0;
  font-size: 18px;
  font-weight: 700;
}
.add {
  color: #0261a7;
  color: #0261a7;
  font-size: 12px;
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
.content {
  width: 100%;
  margin-top: 50px;
  padding: 0 40px 50px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
}
.step {
  display: flex;
  padding: 20px 0;
  justify-content: center;
  width: 100%;
}
</style>
