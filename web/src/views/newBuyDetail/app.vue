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
              <el-table-column label="存储空间" v-if="id == 15" align="center">
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
            <el-row v-if="id == 15">
              <el-form
                ref="monitoringFrom"
                :model="monitoringFrom"
                :label-position="labelPosition"
                label-width="150px"
                style="width: 60%"
                class="demo-ruleForm"
              >
                <el-form-item
                  class="skuDivFont"
                  label="项目："
                  prop="configure"
                  :rules="[{ required: true, message: '项目信息不能为空' }]"
                >
                  <el-select
                    v-if="personnelState"
                    v-model="monitoringFrom.configure"
                    filterable
                    placeholder="请选择项目"
                    style="width: 100%"
                    @change="getProjectContent($event)"
                  >
                    <el-option
                      v-for="item in project"
                      :key="item.projectNo"
                      :label="item.projectName"
                      :value="item.projectNo"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="skuDivFont" label="集群：" prop="envId">
                  <!-- :rules="[{ required: true, message: '集群信息不能为空' }]" -->
                  <el-select
                    v-model="monitoringFrom.envId"
                    filterable
                    placeholder="请选择集群"
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
                <el-form-item
                  class="skuDivFont"
                  label="资源空间名称："
                  prop="name"
                  :rules="[
                    { required: true, message: '资源空间名称不能为空' },
                    {
                      pattern: /^[[a-z0-9]([-a-z0-9]*[a-z0-9])?]*$/,
                      message:
                        '资源空间名称中只能包含小写英文字母和数字及连接号',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    @change="clickProject"
                    v-model="monitoringFrom.name"
                    placeholder="请输入资源空间名称"
                  />
                </el-form-item>
                <el-form-item
                  class="skuDivFont"
                  label="资源空间别名："
                  prop="projectName"
                  :rules="[{ required: true, message: '资源空间别名不能为空' }]"
                >
                  <el-input
                    v-model="monitoringFrom.projectName"
                    placeholder="请输入资源空间别名"
                  />
                </el-form-item>

                <el-form-item class="skuDivFont" label="资源空间描述：">
                  <el-input
                    v-model="monitoringFrom.projectDescription"
                    placeholder="请输入资源空间描述"
                  />
                </el-form-item>
              </el-form>
            </el-row>
            <el-row v-if="id == 16">
              <!--  -->
              <el-col :offset="2" style="padding: 10px 0px">
                <el-radio v-model="establish" label="1"
                  >镜像仓库:通过镜像仓库创建应用</el-radio
                >
                <!-- <el-radio v-model="establish" disabled label="2"
                  >应用模板:通过应用模板创建应用</el-radio
                > -->
              </el-col>
              <el-col v-if="establish == 1" class="mt30">
                <el-form
                  ref="deployment"
                  :model="deployment"
                  :rules="rules"
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
                      class="skuDivFont"
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
                      class="skuDivFont"
                      label="集群："
                      prop="envId"
                      :rules="[{ required: true, message: '集群信息不能为空' }]"
                    >
                      <el-select
                        v-model="deployment.envId"
                        filterable
                        placeholder="请选择集群"
                        style="width: 100%"
                        @change="changeEnv"
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
                      class="skuDivFont"
                      prop="applicationName"
                      :rules="[
                        { required: true, message: '应用名称不能为空' },
                        { validator: checkName, trigger: 'blur' },
                        {
                          pattern: /^[\u0391-\uFFE5_a-z0-9\.]+[\u0391-\uFFE5a-z0-9]$/,
                          message:
                            '名称由中文、小写字母、数字、横线(-)和点(.)组成,且必须以中文、字母或数字结尾',
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
                    <el-form-item label="服务名称:" class="skuDivFont">
                      <el-input
                        :disabled="true"
                        v-model="deployment.appName"
                        placeholder="请输出服务名称名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="服务类型:" class="skuDivFont">
                      <el-radio-group v-model="deployment.deployStatus">
                        <el-radio label="Deployment">无状态应用</el-radio>
                        <el-radio label="StatefulSet">有状态应用</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item class="skuDivFont">
                      <el-radio-group
                        v-model="imageState"
                        @change="changeImage"
                      >
                        <el-radio label="gongyou">公有镜像</el-radio>
                        <el-radio label="siyou">私有镜像</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-row class="skuDivFont">
                      <el-col :span="18">
                        <el-form-item
                          label="镜像:"
                          class="skuDivFont"
                          prop="imageUrlLocation"
                          :rules="[
                            { required: true, message: '镜像名称不能为空' },
                          ]"
                        >
                          <el-select
                            v-model="deployment.imageUrlLocation"
                            placeholder="请选择镜像"
                            style="width: 100%"
                            @change="imagec"
                            filterable
                            @visible-change="imageInit"
                          >
                            <!--  -->
                            <el-option
                              v-for="(item, index) in imagesName"
                              :key="index"
                              :label="item.dockerImageRepository"
                              :value="item.dockerImageRepository"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6" class="skuDivFont">
                        <el-select
                          v-model="Imaedition"
                          style="width: 100%; line-height: 40px"
                          @change="imageEd"
                        >
                          <el-option
                            v-for="(item, index) in imagesEdition"
                            :key="index"
                            :label="item"
                            :value="item"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <el-form-item label="描述:" class="skuDivFont">
                      <el-input
                        maxlength="200"
                        placeholder="请输入描述信息"
                        type="textarea"
                        v-model="deployment.description"
                      ></el-input>
                    </el-form-item>

                    <el-form-item
                      v-if="deployment.deployStatus == 'Deployment'"
                      label="部署触发器:"
                      class="skuDivFont"
                    >
                      <el-checkbox
                        v-if="imageState == 'siyou'"
                        v-model="ImageChange"
                        >镜像更改时自动启动</el-checkbox
                      >
                      <el-checkbox v-model="ConfigChange"
                        >部署配置更改时自动启动</el-checkbox
                      >
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <div class="item-content">
                      <div class="item-label">部署信息</div>
                    </div>
                    <el-row style="padding: 35px 0px">
                      <el-col :offset="3" :span="4">
                        <span class="skuDivFont"> 部署策略： </span>
                      </el-col>
                      <el-col :span="15">
                        <div class="form-box">
                          <el-radio-group
                            style="width: 100%"
                            v-model="deployment.strategy.type"
                          >
                            <el-col :span="8">
                              <el-radio label="Rolling"
                                >滚动（rolling）</el-radio
                              >
                            </el-col>
                            <el-col
                              :span="8"
                              v-if="deployment.deployStatus == 'Deployment'"
                            >
                              <el-radio label="Recreate"
                                >重新创建（recreate）</el-radio
                              >
                            </el-col>
                            <el-col
                              :span="8"
                              v-if="deployment.deployStatus == 'StatefulSet'"
                            >
                              <el-radio label="Ondelete"
                                >手动删除（ondelete）</el-radio
                              >
                            </el-col>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col>
                    <div class="item-content">
                      <div class="item-label">性能管理</div>
                    </div>
                    <el-row style="padding: 35px 0px">
                      <el-col :offset="3" :span="4">
                        <span
                          style="
                            font-size: 12px;
                            font-family: Microsoft YaHei;
                            color: #333333;
                          "
                        >
                          APM
                          <el-tooltip
                            class="item"
                            effect="dark"
                            placement="top-start"
                          >
                            <div slot="content">
                              APM （ApplicationPerformance Management) 即应<br />
                              用性能管理。开启后，您可以针对企业关键业务的应<br />
                              用性能进行监控。<br />
                              <br />您需要先为本项目创建APM服务。如果还未创建，请<br />点击此
                              <el-link
                                :underline="false"
                                @click="APMurl"
                                type="primary"
                                >链接</el-link
                              >，跳转到APM组件申请页面查看详情。
                            </div>
                            <el-button
                              type="button"
                              style="padding: 0px"
                              class="el-button el-tooltip el-button--text el-button--small"
                              aria-describedby="el-tooltip-1548"
                              tabindex="0"
                            >
                              <i
                                class="el-icon-question"
                                style="
                                  font-size: 16px;
                                  color: rgb(230, 162, 60);
                                "
                              ></i></el-button></el-tooltip
                          >：
                        </span>
                      </el-col>
                      <el-col :span="15">
                        <div class="form-box">
                          <el-radio-group
                            style="width: 100%"
                            v-model="deployment.openApm"
                          >
                            <el-col :span="8">
                              <el-radio label="false">不开启</el-radio>
                            </el-col>
                            <el-col :span="8">
                              <el-radio @change="onenApmYanz" label="true"
                                >开启</el-radio
                              >
                            </el-col>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col style="padding-bottom: 25px">
                    <div class="item-content">
                      <div class="item-label">
                        高级设置
                        <el-switch
                          style="padding-left: 12px"
                          active-color="#0261a7"
                          v-model="deployment.envStatus"
                          @change="advanceds"
                          :disabled="senior"
                        ></el-switch>
                      </div>
                    </div>
                  </el-col>
                  <el-col v-if="deployment.envStatus" :gutter="20">
                    <el-col :offset="3" :span="3" style="padding: 10px 0">
                      <p class="textContent">环境变量：</p>
                    </el-col>
                    <el-col
                      :span="16"
                      style="padding: 10px 0px; line-height: 38px"
                    >
                      <div class="form-box">
                        <el-switch
                          style="padding-left: 12px"
                          active-color="#0261a7"
                          v-model="isEnvStatus"
                        ></el-switch>
                      </div>
                    </el-col>
                    <el-col v-if="isEnvStatus" id="form_env">
                      <el-col :offset="5">
                        <el-table :data="deployment.envarr" style="width: 100%">
                          <!-- environment -->
                          <el-table-column label="KEY" align="center">
                            <template slot-scope="scope">
                              <el-form-item
                                :prop="'envarr.' + scope.$index + '.key'"
                                :rules="[
                                  { required: true, message: 'KEY不能为空' },
                                  {
                                    pattern: /[a-zA-Z0-9_]([A-Za-z0-9_])?$/,
                                    message: '由大小写字母、数字、下划线组成',
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
                          <el-table-column
                            label="VALUE"
                            align="center"
                            style="padding: 0"
                          >
                            <template slot-scope="scope">
                              <el-form-item
                                :prop="'envarr.' + scope.$index + '.key'"
                                :rules="[
                                  { required: true, message: 'VALUE不能为空' },
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
                            label="操作"
                            width="100"
                            align="center"
                          >
                            <template slot-scope="scope">
                              <el-link
                                style="margin-bottom: 16px"
                                class="link"
                                type="danger"
                                @click="deleteList(scope.row)"
                                >移除</el-link
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                      <el-col :offset="5" style="padding: 0">
                        <el-col style="margin-top: 19px">
                          <el-link
                            @click="add()"
                            type="primary"
                            :underline="false"
                          >
                            <img
                              src="@/static/images/jiahao.png"
                              alt
                              style="width: 16px; margin: 0px 5px -3px 0px"
                            />添加环境变量</el-link
                          >
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :offset="3" style="padding: 10px 0">
                      <p class="textContent">配置文件：</p>
                    </el-col>
                    <el-col :offset="5" class="mt30">
                      <el-checkbox v-model="configmapJudge"
                        >configmap</el-checkbox
                      >
                    </el-col>

                    <el-col
                      v-if="configmapJudge"
                      id="form_con"
                      :offset="5"
                      class="mt30"
                    >
                      <el-table :data="deployment.cmVolume" style="width: 100%">
                        <el-table-column label="选择configmap" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'cmVolume.' + scope.$index + '.name'"
                              :rules="[
                                { required: true, message: '请选择configmap' },
                              ]"
                            >
                              <el-select
                                v-model="scope.row.name"
                                placeholder="请选择configmap"
                                style="width: 100%"
                              >
                                <el-option
                                  v-for="item in configmaps"
                                  :key="item.name"
                                  :label="item.name"
                                  :value="item.name"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column label="挂载路径" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'cmVolume.' + scope.$index + '.path'"
                              :rules="[
                                { required: true, message: '挂载路径不能为空' },
                                {
                                  pattern: /[a-zA-Z0-9_]([A-Za-z0-9_])?$/,
                                  message: '由大小写字母、数字、下划线组成',
                                  trigger: 'blur',
                                },
                                { validator: configmapUrl, trigger: 'blur' },
                              ]"
                            >
                              <el-input
                                v-model="scope.row.path"
                                placeholder="请输入挂载路径"
                              />
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="100"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-link
                              style="margin-bottom: 16px"
                              class="link"
                              type="danger"
                              @click="deleteConfigMap(scope.row)"
                              >移除</el-link
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-col style="margin-top: 19px">
                        <el-link
                          @click="addConfigMap()"
                          type="primary"
                          :underline="false"
                        >
                          <img
                            src="@/static/images/jiahao.png"
                            alt
                            style="width: 16px; margin: 0px 5px -3px 0px"
                          />添加configmap</el-link
                        >
                      </el-col>
                    </el-col>
                    <el-col
                      :offset="5"
                      class="mt30"
                      style="margin-bottom: 30px"
                    >
                      <el-checkbox fill="#000" v-model="secretJudge"
                        >secret</el-checkbox
                      >
                    </el-col>

                    <el-col
                      v-if="secretJudge"
                      id="form_ser"
                      :offset="5"
                      class="mt30"
                    >
                      <el-table :data="deployment.secrets" style="width: 100%">
                        <el-table-column label="选择secrets" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'secrets.' + scope.$index + '.name'"
                              :rules="[
                                { required: true, message: '请选择secrets' },
                              ]"
                            >
                              <el-select
                                v-model="scope.row.name"
                                placeholder="请选择secrets"
                                style="width: 100%"
                              >
                                <el-option
                                  v-for="item in secrets"
                                  :key="item.index"
                                  :label="item.name"
                                  :value="item.name"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column label="挂载路径" align="center">
                          <template slot-scope="scope">
                            <el-form-item
                              :prop="'secrets.' + scope.$index + '.path'"
                              :rules="[
                                { required: true, message: '挂载路径不能为空' },
                                {
                                  pattern: /[a-zA-Z0-9_]([A-Za-z0-9_])?$/,
                                  message: '由大小写字母、数字、下划线组成',
                                  trigger: 'blur',
                                },
                                { validator: secretUrl, trigger: 'blur' },
                              ]"
                            >
                              <el-input
                                v-model="scope.row.path"
                                placeholder="请输入挂载路径"
                              />
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="100"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <el-link
                              style="margin-bottom: 16px"
                              class="link"
                              type="danger"
                              @click="deleteSecrets(scope.row)"
                              >移除</el-link
                            >
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-col style="margin-top: 19px">
                        <el-link
                          @click="addSecrets()"
                          type="primary"
                          :underline="false"
                        >
                          <img
                            src="@/static/images/jiahao.png"
                            alt
                            style="width: 16px; margin: 0px 5px -3px 0px"
                          />添加secret</el-link
                        >
                      </el-col>
                    </el-col>

                    <el-col :offset="3" :span="3" style="padding: 10px 0">
                      <p class="textContent">添加存储：</p>
                    </el-col>
                    <el-col
                      :span="16"
                      style="padding: 10px 0px; line-height: 38px"
                    >
                      <div class="form-box">
                        <el-switch
                          style="padding-left: 12px"
                          active-color="#0261a7"
                          v-model="isStorage"
                        ></el-switch>
                      </div>
                    </el-col>
                    <el-col v-if="isStorage" id="form_pvc">
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
                      <el-col :offset="5" class="mt30 pvcheight">
                        <el-table
                          :data="deployment.volumes"
                          style="width: 100%"
                        >
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
                                    message: '挂载路径不能为空',
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
                          <el-table-column
                            label="容器内挂载路径"
                            align="center"
                          >
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
                          <el-table-column
                            label="操作"
                            width="80"
                            align="center"
                          >
                            <template slot-scope="scope">
                              <el-link
                                style="margin-bottom: 38px"
                                class="link"
                                type="danger"
                                @click="deletePvcList(scope.row)"
                                >移除</el-link
                              >
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-col>
                      <el-col :offset="5" style="padding: 0">
                        <el-col style="margin-top: 19px">
                          <el-link
                            @click="addPvclist()"
                            type="primary"
                            :underline="false"
                          >
                            <img
                              src="@/static/images/jiahao.png"
                              alt
                              style="width: 16px; margin: 0px 5px -3px 0px"
                            />添加PVC</el-link
                          >
                        </el-col>
                      </el-col>
                    </el-col>
                    <el-col :offset="3" :span="4" style="padding: 35px 0px">
                      <span class="skuDivFont"> 扩缩容策略： </span>
                    </el-col>
                    <el-col :span="16" style="padding: 35px 0px">
                      <div class="form-box">
                        <el-radio-group
                          v-model="strategy"
                          @change="verifyAutomatic"
                        >
                          <el-radio label="manual">手动扩缩容</el-radio>
                          <el-radio label="automatic">自动扩缩容</el-radio>
                        </el-radio-group>
                      </div>
                    </el-col>
                    <el-col :offset="5" v-if="strategy == 'manual'">
                      <el-form-item
                        label="启动时副本数"
                        prop="replicas"
                        :rules="[{ required: true, message: '请输入内容' }]"
                      >
                        <el-input-number
                          @change="verifyReplicas"
                          v-model="deployment.replicas"
                          controls-position="right"
                          :min="1"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :offset="5" v-if="strategy == 'automatic'">
                      <el-row>
                        <el-col :span="4">
                          <p class="textContent">最小实例数：</p>
                        </el-col>
                        <el-col :span="17">
                          <el-slider
                            @input="minChange"
                            v-model="deployment.scale.minReplicas"
                            :step="1"
                            :min="0"
                            :max="deployment.scale.maxReplicas"
                          ></el-slider>
                        </el-col>
                        <el-col :span="2" style="text-align: center">
                          <p class="textContent">
                            {{ deployment.scale.maxReplicas }}
                          </p>
                        </el-col>
                      </el-row>
                      <el-row class="mt30">
                        <el-col :span="4">
                          <p class="textContent">最大实例数：</p>
                        </el-col>
                        <el-col :span="17">
                          <el-slider
                            @input="maxChange"
                            v-model="deployment.scale.maxReplicas"
                            :step="1"
                            :min="deployment.scale.minReplicas"
                            :max="10"
                          ></el-slider>
                        </el-col>
                        <el-col :span="2" style="text-align: center">
                          <p class="textContent">10</p>
                        </el-col>
                      </el-row>
                      <el-row class="mt30">
                        <el-col :span="4">
                          <p class="textContent">CPU请求阀值：</p>
                        </el-col>
                        <el-col :span="17">
                          <el-slider
                            v-model="deployment.scale.cpuPercent"
                            :max="100"
                            :step="1"
                          ></el-slider>
                        </el-col>
                        <el-col :span="2" style="text-align: center">
                          <p class="textContent">100%</p>
                        </el-col>
                      </el-row>
                    </el-col>
                    <!-- <el-col :offset="3" :span="3" style="padding: 35px 0px;">
                      <span class="skuDivFont">
                        资源限制：
                      </span>
                    </el-col>
                    <el-col :span="16" style="padding: 35px 0px;">
                      <div class="form-box">
                        <el-switch
                          style="padding-left: 12px;"
                          active-color="#0261a7"
                          v-model="limit"
                        ></el-switch>
                      </div>
                    </el-col> -->
                    <!-- <el-col :offset="5" v-if="limit">
                      <el-row>
                        <el-col :span="6" style="line-height: 37px;">
                          <span class="skuDivFont">
                            容器实例CPU请求值：
                          </span>
                        </el-col>
                        <el-col :span="15">
                          <el-slider
                            v-model="deployment.resources.limits.cpu"
                            :max="5"
                            :step="0.5"
                            :min="limitsCpu"
                            show-stops
                          >
                          </el-slider>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6" style="line-height: 37px;">
                          <span class="skuDivFont">
                            容器实例内存请求值：
                          </span>
                        </el-col>
                        <el-col :span="15">
                          <el-slider
                            v-model="deployment.resources.limits.memory"
                            :step="1"
                            :max="10"
                            :min="limitsMemory"
                            show-stops
                          >
                          </el-slider>
                        </el-col>
                      </el-row>
                    </el-col> -->
                    <el-col :offset="3" style="padding: 10px 0">
                      <p class="textContent">健康检查：</p>
                    </el-col>
                    <el-col :offset="5">
                      <el-checkbox v-model="ReadniessJudge"
                        >Readniess</el-checkbox
                      >
                    </el-col>
                    <el-col
                      v-if="ReadniessJudge"
                      id="jian"
                      :offset="5"
                      class="jianc mt30"
                    >
                      <el-row>
                        <el-col :offset="1">
                          <el-form-item
                            label="类型："
                            prop="healthCheck.readinessProbe.type"
                            :rules="[{ required: true, message: '请选择类型' }]"
                          >
                            <el-select
                              v-model="
                                deployment.healthCheck.readinessProbe.type
                              "
                              placeholder="请选择类型"
                              style="width: 100%"
                            >
                              <el-option
                                v-for="item in RSrequestType"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item
                            label="请求路径："
                            v-if="
                              deployment.healthCheck.readinessProbe.type ==
                              'HTTP'
                            "
                            prop="healthCheck.readinessProbe.path"
                            :rules="[
                              { required: true, message: '请输入请求路径' },
                              {
                                pattern: /^[\/]{1}([a-zA-Z0-9]|[-_*]|[\/]){1,49}$/,
                                message:
                                  '以/开头,由数字、字母、中划线、*、下划线组成',
                                trigger: 'blur',
                              },
                            ]"
                          >
                            <el-input
                              v-model="
                                deployment.healthCheck.readinessProbe.path
                              "
                              placeholder="请输入请求路径"
                            ></el-input>
                          </el-form-item>

                          <el-form-item
                            v-if="
                              deployment.healthCheck.readinessProbe.type ==
                              'EXEC'
                            "
                            label="命令："
                          >
                            <el-row
                              v-for="(RSrobecommand, index) in RSrobecommands"
                              :key="index"
                            >
                              <el-col :span="17"
                                ><el-input v-model="RSrobecommand.command"
                              /></el-col>
                              <el-col :span="6" :offset="1">
                                <el-button
                                  size="mini"
                                  style="
                                    border-radius: 0;
                                    background: rgba(3, 97, 167, 1);
                                  "
                                  v-if="index != RSrobecommands.length - 1"
                                  icon="el-icon-minus"
                                  type="primary"
                                  plain
                                  @click.prevent="removeDomain(RSrobecommand)"
                                />
                                <el-button
                                  size="mini"
                                  style="
                                    border-radius: 0;
                                    background: rgba(3, 97, 167, 1);
                                  "
                                  v-if="index == RSrobecommands.length - 1"
                                  icon="el-icon-plus"
                                  type="primary"
                                  plain
                                  @click.prevent="addDomain()"
                                />
                              </el-col>
                            </el-row>
                          </el-form-item>
                          <el-form-item
                            label="端口："
                            v-if="
                              deployment.healthCheck.readinessProbe.type !=
                              'EXEC'
                            "
                            prop="healthCheck.readinessProbe.port"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-select
                              v-model="
                                deployment.healthCheck.readinessProbe.port
                              "
                              placeholder="请选择端口"
                              style="width: 100%"
                            >
                              <el-option
                                v-for="item in exposedPort"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item
                            label="初始检查等待时间："
                            prop="healthCheck.readinessProbe.initialDelaySeconds"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-input-number
                              v-model="
                                deployment.healthCheck.readinessProbe
                                  .initialDelaySeconds
                              "
                              controls-position="right"
                              placeholder="等待时间"
                              style="width: 250px"
                              :min="1"
                              :max="10"
                            ></el-input-number>
                            <span class="skuDivFont">秒</span>
                          </el-form-item>
                          <el-form-item
                            label="检查超时时间："
                            prop="healthCheck.readinessProbe.timeoutSeconds"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-input-number
                              v-model="
                                deployment.healthCheck.readinessProbe
                                  .timeoutSeconds
                              "
                              controls-position="right"
                              placeholder="超时时间"
                              style="width: 250px"
                              :min="1"
                              :max="10"
                            ></el-input-number>
                            <span class="skuDivFont">秒</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col
                      :offset="5"
                      class="mt30"
                      style="padding-bottom: 30px"
                    >
                      <el-checkbox v-model="LivenessJudge"
                        >Liveness</el-checkbox
                      >
                    </el-col>
                    <el-col
                      v-if="LivenessJudge"
                      :offset="5"
                      id="jianc"
                      class="mt30"
                      style="padding-bottom: 30px"
                    >
                      <el-row>
                        <el-col :offset="1">
                          <el-form-item
                            label="类型："
                            prop="healthCheck.livenessProbe.type"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-select
                              v-model="
                                deployment.healthCheck.livenessProbe.type
                              "
                              placeholder="请选择类型"
                              style="width: 100%"
                            >
                              <el-option
                                v-for="item in LSrequestType"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-form-item>

                          <el-form-item
                            v-if="
                              deployment.healthCheck.livenessProbe.type ==
                              'EXEC'
                            "
                            label="命令："
                          >
                            <el-row
                              v-for="(LSrobecommand, index) in LSrobecommands"
                              :key="index"
                            >
                              <el-col :span="17"
                                ><el-input v-model="LSrobecommand.command"
                              /></el-col>
                              <el-col :span="6" :offset="1">
                                <el-button
                                  size="mini"
                                  style="
                                    border-radius: 0;
                                    background: rgba(3, 97, 167, 1);
                                  "
                                  v-if="index != LSrobecommands.length - 1"
                                  icon="el-icon-minus"
                                  type="primary"
                                  plain
                                  @click.prevent="removeLS(LSrobecommand)"
                                />
                                <el-button
                                  size="mini"
                                  style="
                                    border-radius: 0;
                                    background: rgba(3, 97, 167, 1);
                                  "
                                  v-if="index == LSrobecommands.length - 1"
                                  icon="el-icon-plus"
                                  type="primary"
                                  plain
                                  @click.prevent="addLS()"
                                />
                              </el-col>
                            </el-row>
                          </el-form-item>
                          <el-form-item
                            label="请求路径："
                            v-if="
                              deployment.healthCheck.livenessProbe.type ==
                              'HTTP'
                            "
                            prop="healthCheck.livenessProbe.path"
                            :rules="[
                              { required: true, message: '请输入内容' },
                              {
                                pattern: /^[\/]{1}([a-zA-Z0-9]|[-_*]|[\/]){1,49}$/,
                                message:
                                  '以/开头,由数字、字母、中划线、*、下划线组成',
                                trigger: 'blur',
                              },
                            ]"
                          >
                            <el-input
                              v-model="
                                deployment.healthCheck.livenessProbe.path
                              "
                              placeholder="请输出入请求路径"
                            />
                          </el-form-item>

                          <el-form-item
                            label="端口："
                            v-if="
                              deployment.healthCheck.livenessProbe.type !=
                              'EXEC'
                            "
                            prop="healthCheck.livenessProbe.port"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-select
                              v-model="
                                deployment.healthCheck.livenessProbe.port
                              "
                              placeholder="请选择端口"
                              style="width: 100%"
                            >
                              <el-option
                                v-for="item in exposedPort"
                                :key="item"
                                :label="item"
                                :value="item"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item
                            label="初始检查等待时间："
                            prop="healthCheck.livenessProbe.initialDelaySeconds"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-input-number
                              v-model="
                                deployment.healthCheck.livenessProbe
                                  .initialDelaySeconds
                              "
                              controls-position="right"
                              placeholder="等待时间"
                              style="width: 250px"
                              :min="1"
                              :max="10"
                            ></el-input-number>
                            <span class="skuDivFont">秒</span>
                          </el-form-item>
                          <el-form-item
                            label="检查超时时间："
                            prop="healthCheck.livenessProbe.timeoutSeconds"
                            :rules="[{ required: true, message: '请输入内容' }]"
                          >
                            <el-input-number
                              v-model="
                                deployment.healthCheck.livenessProbe
                                  .timeoutSeconds
                              "
                              controls-position="right"
                              placeholder="超时时间"
                              style="width: 250px"
                              :min="1"
                              :max="10"
                            ></el-input-number>
                            <span class="skuDivFont">秒</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-col>
                </el-form>
              </el-col>
              <el-col v-if="establish == 2" class="mt30"> </el-col>
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
          <!--<el-col :offset="2" style="margin-top:20px;margin-bottom:30px;">-->
          <!--<span class="skuDivFont">购买数量</span>-->
          <!--<el-input-number-->
          <!--v-model="count"-->
          <!--:min="1"-->
          <!--:max="999"-->
          <!--size="mini"-->
          <!--style="width:130px"-->
          <!--@change="count()"-->
          <!--&gt;</el-input-number>-->
          <!---->
          <!--</el-col>-->
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
        <!-- 资源空间 -->
        <el-col
          v-if="id == 15"
          :offset="15"
          style="color: #666666; line-height: 100px"
        >
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
        <!-- 容器部署 -->
        <el-col
          v-if="id == 16"
          :offset="15"
          style="color: #666666; line-height: 100px"
        >
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
  getOcpExternalImages, //查询ocp外部仓库下的镜像列表
  getOcpExternalImagesitems, //查询 外部  ImageStream下某一版本的image详情
  verificationPinpointService,
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
      searchImage: { page: 1, pageSize: 500 }, // 搜索参数
      imageState: "gongyou",
      envlist: {},
      isStorage: false,
      isEnvStatus: false,
      domains: [
        {
          key: "",
          value: "",
        },
      ],
      randomNum: ("000000" + Math.floor(Math.random() * 999999)).slice(-6),
      senior: true,
      ConfigChange: true, //镜像更改时自动启动
      ImageChange: true, //部署配置更改时自动启动
      Imaedition: "", //镜像版本
      RSrobecommands: [{ command: "" }],
      LSrobecommands: [{ command: "" }],
      RSrequestType: ["TCP", "HTTP", "EXEC"],
      LSrequestType: ["TCP", "HTTP", "EXEC"],
      accessModelist: ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"], //访问模式下拉选项
      sclist: "", //sc集合
      strategy: "manual",
      imagesName: [], //镜像集合
      imagesName1: [], //镜像集合
      imagesEdition: [], //镜像版本
      configmaps: [],
      secrets: [],
      projectResource: { envId: "", projectNo: "" },
      value: false,
      envs: "", //集群
      radio: "1",
      value1: 0,
      pvcRules: {},
      labelReadniess: "right",
      environment: [], // 环境变量
      pvArr: [], //pv列表
      pvcName: "",
      pvcStatus: false, //创建pvc
      configmapJudge: false,
      secretJudge: false,
      ReadniessJudge: false,
      LivenessJudge: false,
      pvclist: [{ name: "" }],
      secret: [{ name: "" }],
      establish: "1",
      monitoringFrom: {
        storage: "", //存储
        envId: "",
        projectName: "",
        configure: "", //调度配置
        projectDescription: "", //项目描述
        name: "",
      },
      isFixed: true,
      input1: "",
      configure: "", //调度配置
      projectDescription: "", //项目描述
      //容器部署
      regionalInformation: "", //区域信息
      projectinformation: "", //项目信息
      image: "", //镜像
      instance: 1, //实例
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
      ],
      disable: false,
      sum: 0,
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
      skulist: [],
      skuInfoSpecs: [],
      skuInfoSpecs1: [],
      skuInfoSpecs2: [],
      skuInfo: null,
      id: "",
      labelPosition: "left",
      labelPVC: "right",
      labeltemplate: "top",
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
      search1: {
        page: 1,
        pageSize: 100,
        sort: "",
      },
      imSearch: {
        kubernetes_urn: "",
        namespace: "",
        name: "",
        page: 1,
        pageSize: 100,
      },

      personnelState: false,
      personnelState1: false,
      user: null,
      project: "",
      applicationStatus: false,
      submitLoading: false,
      imageData: "", //镜像信息
      queryId: "",
      pvcsList: [], //pvc列表
      taggroup: [], // 镜像列表
      pvArr: [], //pv列表
      scArr: [], //sc列表
      livenessProbe: false,
      readinessProbe: false,
      numberArr: [], //容量列表
      pvcRules: {},
      pvcStatus: false, //创建pvc
      exposedPort: [], //端口列表
      pvcName: "",
      secretStatus: false,
      configmapStatus: false,
      selSpec: 0,
      spanL: 2,
      spanR: 15,
      applicationId: "",
      projectName: "", //项目
      namespace: "", //资源空间
      rules: {
        applicationName: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
        ],
        replicas: [
          { required: true, message: "请输入实例数量", trigger: "blur" },
        ],
        purchase: [
          { required: true, message: "请输入申请时长", trigger: "blur" },
        ],
      },
      configmapList: [],
      secretsList: [],
      targetExecuteDir: "",
      imageName: "",
      deployment: {
        targetExecuteDir: "",
        imageNamespace: "",
        openApm: "false",
        activeName: "gongyou", //公有镜像还是私有镜像
        imageName: "", //镜像名称
        imageUrlLocation: "",
        envId: "", // 集群
        image: "", //镜像完整地址
        appName: "", //服务名称
        replicas: 1, // 实例数量
        volumes: [], //pvc
        purchase: 0, //申请时长
        triggers: [],
        resources: {
          requests: {
            //容器规格
            memory: 0,
            cpu: 0,
          },
          type: "cpu",
        },
        scale: {
          //扩缩容策略
          maxReplicas: 0, //最小实例数
          minReplicas: 0, //最大实例数
          cpuPercent: 0, // CPU请求阀值
        },
        description: "", //描述
        envarr: [],
        env: {},
        envStatus: false, //高级设置
        secrets: [], //secret名称和路径
        cmVolume: [], //ConfigMap名称和路径
        healthCheck: {
          //健康检查
          livenessProbe: {
            type: "TCP", //类型
            path: "",
            port: "", //端口
            initialDelaySeconds: 1, //初始检查等待时间
            timeoutSeconds: 1, //检查超时时间：
            command: [],
          },
          readinessProbe: {
            type: "TCP", //类型
            path: "",
            port: "", //端口
            initialDelaySeconds: 1, //初始检查等待时间
            timeoutSeconds: 1, //检查超时时间：
            command: [],
          },
        },
        namespace: "", //资源空间
        referenceimage: "",
        containerPorts: {
          "": "",
        },
        strategy: {
          //部署策略
          type: "Rolling",
        },
        order: {
          amount: 0,
          skuId: 0,
          basePrice: 0,
        },
        projectName: "", //项目
        projectNo: "",
        applicationName: "", //应用名称：
        deployStatus: "Deployment", // 服务类型
      },
      namespaces: "",
      checked1: true,
      checked2: true,
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
      imagecIndex: 0,
    };
  },
  methods: {
    APMurl() {
      location.href =
        "/html/productDetail1.html?id=220&productName=Apm性能管理&catalogId=28&catalog=服务治理#?";
    },
    onenApmYanz() {
      if (this.Imaedition == "" || this.Imaedition == null) {
        this.$notify({
          type: "warning",
          message: "请先选择镜像",
        });
        this.deployment.openApm = "false";
      } else {
        if (this.targetExecuteDir == "" || this.targetExecuteDir == null) {
          this.$notify({
            type: "warning",
            message: "当前镜像不可以开启APM监控",
          });
          this.deployment.openApm = "false";
        } else if (
          this.deployment.volumes.length == 0 ||
          this.deployment.volumes[0].pvName == ""
        ) {
          this.$notify({
            type: "warning",
            message: "请选择一个PVC",
          });
          this.deployment.openApm = "false";
        } else {
          verificationPinpointService(
            this.deployment.envId,
            this.deployment.namespace
          ).then((r) => {
            if (!r.content) {
              this.$notify({
                type: "warning",
                message: "请先安装pinpoint-service组件",
              });
              this.deployment.openApm = "false";
            }
          });
        }
      }
    },
    changeImage(data) {
      this.imagesName = "";
      this.deployment.imageUrlLocation = "";
      this.Imaedition = "";
      if (this.imageState == "gongyou") {
        this.imagesName = this.imagesName1;
      }
    },
    //最小实例数
    minChange(row) {
      getResourceSpaceNameInfo(
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        let cpu = r.content.cpu == null ? 0 : r.content.cpu;
        let memory = r.content.memory == null ? 0 : r.content.memory;
        this.deployment.scale.maxReplicas;
        const messagemin =
          "资源空间达到资源上限，请您调整最小实例数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";
        const messageminto =
          "资源空间资源即将用完，请您调整最小实例数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";

        if (r.content.cpu < this.deployment.resources.requests.cpu * row) {
          this.$notify({
            type: "warning",
            message: messagemin,
          });
          this.deployment.scale.minReplicas = 0;
        } else if (
          r.content.cpu ==
          this.deployment.resources.requests.cpu * row
        ) {
          this.$notify({
            type: "warning",
            message: messageminto,
          });
        } else if (
          r.content.memory <
          this.deployment.resources.requests.memory * row
        ) {
          this.$notify({
            type: "warning",
            message: messagemin,
          });
          this.deployment.scale.minReplicas = 0;
        } else if (
          r.content.memory ==
          this.deployment.resources.requests.cpu * row
        ) {
          this.$notify({
            type: "warning",
            message: messageminto,
          });
        }
      });
    },
    //最大实例数
    maxChange(row) {
      getResourceSpaceNameInfo(
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        let cpu = r.content.cpu == null ? 0 : r.content.cpu;
        let memory = r.content.memory == null ? 0 : r.content.memory;

        const messagemin =
          "资源空间达到资源上限，请您调整最小实例数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";
        const messageminto =
          "资源空间资源即将用完，请您调整最小实例数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";

        if (r.content.cpu < this.deployment.resources.requests.cpu * row) {
          this.$notify({
            type: "warning",
            message: messagemin,
          });
          this.deployment.scale.maxReplicas = 0;
        } else if (
          r.content.cpu ==
          this.deployment.resources.requests.cpu * row
        ) {
          this.$notify({
            type: "warning",
            message: messageminto,
          });
        } else if (
          r.content.memory <
          this.deployment.resources.requests.memory * row
        ) {
          this.$notify({
            type: "warning",
            message: messagemin,
          });
          this.deployment.scale.maxReplicas = 0;
        } else if (
          r.content.memory ==
          this.deployment.resources.requests.cpu * row
        ) {
          this.$notify({
            type: "warning",
            message: messageminto,
          });
        }
      });
    },
    //自动扩缩容
    verifyAutomatic(row) {
      if (row == "automatic") {
        this.deployment.replicas = 1;
      }
    },
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
              // this.pvcvolume.purchase = this.time;
              // this.pvcvolume.amount = this.sum;
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
    //副本数改变时
    verifyReplicas(row) {
      getResourceSpaceNameInfo(
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        let cpu = r.content.cpu == null ? 0 : r.content.cpu;
        let memory = r.content.memory == null ? 0 : r.content.memory;
        const message =
          "资源空间达到资源上限，请您调整启动副本数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";
        const messageto =
          "资源空间资源即将用完，请您调整启动副本数。（剩余CPU :" +
          cpu +
          "Core，内存：" +
          memory +
          "G";
        if (
          r.content.cpu <
          this.deployment.resources.requests.cpu * parseInt(row)
        ) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.replicas = 1;
        } else if (
          r.content.memory <
          this.deployment.resources.requests.memory * parseInt(row)
        ) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.replicas = 1;
        } else if (
          r.content.cpu ==
          this.deployment.resources.requests.cpu * parseInt(row)
        ) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
        } else if (
          r.content.memory ==
          this.deployment.resources.requests.memory * parseInt(row)
        ) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
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
    changeEnv(data) {
       this.deployment.namespace = "";
    },
    // RS值动态添加/删除
    removeDomain(item) {
      var index = this.RSrobecommands.indexOf(item);
      if (index !== -1) {
        this.RSrobecommands.splice(index, 1);
      }
    },
    addDomain() {
      this.RSrobecommands.push({
        command: "",
      });
    },
    // LS动态添加/删除
    removeLS(item) {
      var index = this.LSrobecommands.indexOf(item);
      if (index !== -1) {
        this.LSrobecommands.splice(index, 1);
      }
    },
    addLS() {
      this.LSrobecommands.push({
        command: "",
      });
    },
    //验证别名是否重复
    clickProject(data) {
      if (this.envId != "") {
        aliasWhetherRepeat(this.monitoringFrom.envId, data).then((r) => {
          if (r.content == 1) {
            const h = this.$createElement;
            this.$notify({
              message: h("i", { style: "color: red" }, "该资源空间重复"),
            });
            this.monitoringFrom.name = "";
          }
        });
      }
    },
    delEnv(row) {
      this.deployment.envarr.splice(row.$index, 1);
    },
    addEnv() {
      this.deployment.envarr.push({ name: "", value: "" });
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
    },
    //初始化镜像
    imageInit(judge) {
      if (judge) {
        if (this.imageState == "siyou") {
          if (this.deployment.namespace == "") {
            this.$notify({
              type: "warning",
              message: "请先完善集群、资源空间等信息",
            });
          } else {
            this.imSearch.kubernetes_urn = this.projectResource.envId;
            this.imSearch.kubernetes_urn = this.deployment.namespace;
            getimagestreams(
              this.projectResource.envId,
              this.deployment.namespace,
              this.imSearch
            ).then((imageRes) => {
              this.imagesName = imageRes.content.content;
            });
          }
        }
      }
    },
    //镜像版本
    imagec(name) {
      this.Imaedition = null;
      for (var i = 0; i < this.imagesName.length; i++) {
        if (this.imagesName[i].dockerImageRepository == name) {
          this.imagecIndex = i;
        }
      }
      this.imagesEdition = [];
      this.imagesEdition = this.imagesName[this.imagecIndex].tags;

      this.imageName = this.imagesName[this.imagecIndex].name;

    },
    imageEd(name) {
      if (name != "") {
        this.senior = false;
        if (this.imageState == "gongyou") {
          this.waibuOcpImages(name);
        }
      }
    },
    //高级设置
    advanceds(name) {
      let index = this.deployment.imageUrlLocation.lastIndexOf("/");
      let imageUrl =
        this.deployment.imageUrlLocation.substring(
          index + 1,
          this.deployment.imageUrlLocation.length
        ) +
        ":" +
        this.Imaedition;
      let index1 = this.deployment.imageUrlLocation.indexOf("/");
      let imageUrl1 = this.deployment.imageUrlLocation.substring(
        index1 + 1,
        this.deployment.imageUrlLocation.length
      );
      if (this.imageState == "siyou") {
        getImageStreamTagName(
          this.deployment.envId,
          this.deployment.namespace,
          imageUrl
        ).then((res) => {
          for (let i = 0; i < res.content.env.length; i++) {
            var val = res.content.env[i].split("=");
            this.deployment.envarr.push({ key: val[0], value: val[1] });
          }
          var port = {};
          var portArr = [];
          for (let i = 0; i < res.content.exposedPorts.length; i++) {
            var p = res.content.exposedPorts[i].split("/");
            portArr.push(p[0]);
            port[p[0]] = p[1];
          }

          this.exposedPort = portArr;
          this.deployment.containerPorts = port;
        });
      }

      getConfigMaps(
        this.deployment.projectNo,
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        if (r.content != null) {
          for (let i = 0; i < r.content.length; i++) {
            let config = { name: "" };
            config.name = r.content[i];
            this.configmaps.push(config);
          }
        }
      });
      getSecrets(
        this.deployment.projectNo,
        this.deployment.envId,
        this.deployment.namespace
      ).then((r) => {
        if (r.content.length) {
          for (let i = 0; i < r.content.length; i++) {
            let secret = { name: "" };
            secret.name = r.content[i];
            this.secrets.push(secret);
          }
        }
      });
      this.initPvc();
      this.clicksclist(this.deployment.envId);
    },
    waibuOcpImages(name) {
      getOcpExternalImagesitems(
        this.deployment.envId,
        this.imageName,
        name
      ).then((res) => {
        this.targetExecuteDir = res.content.targetExecuteDir;
        for (let i = 0; i < res.content.env.length; i++) {
          var val = res.content.env[i].split("=");
          this.deployment.envarr.push({ key: val[0], value: val[1] });
        }
        var port = {};
        var portArr = [];
        for (let i = 0; i < res.content.exposedPorts.length; i++) {
          var p = res.content.exposedPorts[i].split("/");
          portArr.push(p[0]);
          port[p[0]] = p[1];
        }

        this.exposedPort = portArr;
        this.deployment.containerPorts = port;
      });
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
      this.deployment.resources.requests.cpu = parseFloat(row.cpuCores)+"";
      this.deployment.resources.requests.memory = parseFloat(row.memory)+"";
      if (
        this.deployment.namespace != null &&
        this.deployment.nameSpace != ""
      ) {
        getResourceSpaceNameInfo(
          this.deployment.envId,
          this.deployment.namespace
        ).then((r) => {
          if (r.content.cpu < this.deployment.resources.requests.cpu) {
            this.deployment.namespace = "";
          } else if (
            r.content.memory < this.deployment.resources.requests.memory
          ) {
            this.deployment.namespace = "";
          }
        });
      }
      this.price = row.price;
      if (this.mode == "MONTH") {
        this.sum = row.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
    },
    confirm() { 
      console.log(this.disable);
      // if (this.disable) {
      //   this.disable = !this.disable;
      // } else if (this.disable == false) {
      //   this.disable = true;
      // }
    },
    //服务协议
    agreement() {
      location.href = "/html/agreement.html";
    },
    getProjectContent(name) {
      let obj = {};
      obj = this.project.find((item) => {
        //model就是上面的数据源
        return item.projectNo === name; //筛选出匹配数据
      });
      this.addorder.projectId = obj.id;
      this.addorder.projectName = obj.projectName;
    },
    //提交订单
    async commitOrder() {
      //提交订单参数
      const r = await requestParams(getResourcesSkuInfo, this.radio);
      this.skuInfo = r.content;
      this.skuInfo.category = this.name;

      let params1 = { name: "", paramValue: "" };
      params1.name = "资源空间名称";
      params1.paramValue = this.monitoringFrom.name;
      this.skuInfoSpecs.push(params1);
      let params2 = { name: "", paramValue: "" };
      params2.name = "资源空间别名";
      params2.paramValue = this.monitoringFrom.projectName;
      this.skuInfoSpecs.push(params2);
      let params3 = { name: "", paramValue: "" };
      params3.name = "项目名称";
      params3.paramValue = this.getProjectLabel1(this.monitoringFrom.configure);
      this.skuInfoSpecs.push(params3);
      let params4 = { name: "", paramValue: "" };
      params4.name = "资源空间描述";
      params4.paramValue = this.monitoringFrom.projectDescription;
      this.skuInfoSpecs.push(params4);
      let params5 = { name: "", paramValue: "" };
      params5.name = "资源空间名称";
      params5.paramValue = this.monitoringFrom.name;
      this.skuInfoSpecs.push(params5);
      let params6 = { name: "", paramValue: "" };
      params6.name = "时长";
      params6.paramValue = this.time + "月";
      this.skuInfoSpecs.push(params6);
      let params7 = { name: "", paramValue: "" };
      params7.name = "CPU";
      params7.paramValue = parseFloat(this.skuData.cpuCores)+"";
      this.skuInfoSpecs.push(params7);
      let params8 = { name: "", paramValue: "" };
      params8.name = "内存";
      params8.paramValue = parseFloat(this.skuData.memory)+"";
      this.skuInfoSpecs.push(params8);
      let params9 = { name: "", paramValue: "" };
      params9.name = "存储空间";
      params9.paramValue = parseFloat(this.skuData.storage)+"";
      this.skuInfoSpecs.push(params9);

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
        // 存储
        var data = JSON.stringify(this.addorder);
        var moint = sessionStorage.setItem(
          "monitoring",
          JSON.stringify(this.monitoringFrom)
        );
        sessionStorage.setItem("order", data);
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
    //初始化
    async fetchData() {
      this.user = JSON.parse(getUserInfo());
      //获取用户下的项目列表
      this.search1.sort = this.user.uid;
      const projectres = await requestParams(getProjects, this.search1);
      this.project = projectres.content;
      this.monitoringFrom.configure = this.project[0].projectNo;
      this.deployment.projectNo = this.project[0].projectNo;
      this.deployment.projectName = this.project[0].projectName;

      this.addorder.projectId = this.project[0].id;
      this.addorder.projectName = this.project[0].projectName;
      const res1 = await requestParams(whetherExistPersonnel, this.search);
      if (res1.content.length >= 0) {
        this.personnelState = true;
        this.personnelState1 = false;
      } else {
        this.personnelState = false;
        this.personnelState1 = true;
      }
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
      this.deployment.resources.requests.cpu = parseFloat(list[0].cpuCores);
      this.deployment.resources.requests.memory = parseFloat(list[0].memory);
      this.skulist = list;
      this.skuData = list[0];
      this.getPVCSku();
      //共有镜像
      if (this.imageState == "gongyou") {
        getOcpExternalImages(this.deployment.envId, this.searchImage).then(
          (r) => {
            this.imagesName = r.content.content;
            this.imagesName1 = r.content.content;
          }
        );
      }
    },
    //获取集群
    async getClusters() {
      const res1 = await requestParams(getClusters);
      this.envs = res1.content.content;
      this.monitoringFrom.envId = this.envs[0].id;
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
        if (r.content.cpu < this.deployment.resources.requests.cpu) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.namespace = "";
        } else if (
          r.content.memory < this.deployment.resources.requests.memory
        ) {
          this.$notify({
            type: "warning",
            message: message,
          });
          this.deployment.namespace = "";
        } else if (r.content.cpu == this.deployment.resources.requests.cpu) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.deployment.namespace = "";
        } else if (
          r.content.memory == this.deployment.resources.requests.memory
        ) {
          this.$notify({
            type: "warning",
            message: messageto,
          });
          this.deployment.namespace = "";
        } else {
          this.initPvc();
        }
      });
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
    changeProject(event) {},

    getClustersLabel(val) {
      let obj = {};
      obj = this.envs.find((item) => {
        return item.id == val;
      });
      let getName = "";
      getName = obj.name;
      return getName;
    },
    getProjectLabel(val) {
      let obj = {};
      obj = this.optionProject.find((item) => {
        return item.name == val;
      });
      let getName = "";
      getName = obj.displayName;
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.commitOrder();
        } else {
          return false;
        }
      });
    },
    // 容器部署应用提价订单
    async submitDeployment(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.disable == true) {
            if (this.deployment.envarr.length > 0) {
              for (let i = 0; i < this.deployment.envarr.length; i++) {
                this.deployment.env[
                  this.deployment.envarr[i].key
                ] = this.deployment.envarr[i].value;
              }
            }

            if (this.RSrobecommands.length > 0) {
              for (let i = 0; i < this.RSrobecommands.length; i++) {
                this.deployment.healthCheck.readinessProbe.command.push(
                  this.RSrobecommands[i].command
                );
              }
            }
            if (this.LSrobecommands.length > 0) {
              for (let i = 0; i < this.LSrobecommands.length; i++) {
                this.deployment.healthCheck.livenessProbe.command.push(
                  this.LSrobecommands[i].command
                );
              }
            }

            this.deployment.image = this.Imaedition;
            this.deployment.referenceimage =
              this.deployment.imageUrlLocation + ":" + this.Imaedition;

            if (this.deployment.deployStatus == "Deployment") {
              if (this.imageState == "gongyou") {
                this.deployment.triggers.push("ConfigChange");
              } else {
                if (this.ConfigChange) {
                  this.deployment.triggers.push("ConfigChange");
                }
                if (this.ImageChange) {
                  this.deployment.triggers.push("ImageChange");
                }
              }
            }

            //提交订单参数

            let params1 = { name: "", paramValue: "" };
            params1.name = "项目信息";
            params1.paramValue = this.getProjectLabel1(
              this.deployment.projectNo
            );
            this.skuInfoSpecs1.push(params1);
            let params2 = { name: "", paramValue: "" };
            params2.name = "区域信息";
            params2.paramValue = this.getObject(this.deployment.envId);
            this.skuInfoSpecs1.push(params2);
            let params3 = { name: "", paramValue: "" };
            params3.name = "资源空间";
            params3.paramValue = this.deployment.namespace;
            this.skuInfoSpecs1.push(params3);
            let params4 = { name: "", paramValue: "" };
            params4.name = "实例数";
            params4.paramValue = this.deployment.replicas;
            this.skuInfoSpecs1.push(params4);

            for (var key in this.addorder.items[0]) {
              for (var key1 in this.skuInfo) {
                if (key == key1) {
                  this.addorder.items[0][key] = this.skuInfo[key1];
                }
              }
            }
            //环境变量
            if (!this.isEnvStatus) {
              this.deployment.env = {};
            }
            this.deployment.resources.requests.memory += "Gi";
            // this.deployment.resources.requests.cpu += "C";
            // if (!this.limit) {
            //   delete this.deployment.resources.limits; //js方法
            //   // Vue.delete(this.deployment.resources,'limits')
            // }else{
            //    this.deployment.resources.limits.memory +="Gi";
            // }
            if (!this.ReadniessJudge) {
              delete this.deployment.healthCheck.livenessProbe;
            }
            if (!this.LivenessJudge) {
              delete this.deployment.healthCheck.readinessProbe;
            }
            if (this.ReadniessJudge) {
              if (this.deployment.healthCheck.livenessProbe.type == "TCP") {
                delete this.deployment.healthCheck.livenessProbe.command;
                delete this.deployment.healthCheck.livenessProbe.path;
              }
              if (this.deployment.healthCheck.livenessProbe.type == "HTTP") {
                delete this.deployment.healthCheck.livenessProbe.command;
              }
              if (this.deployment.healthCheck.livenessProbe.type == "EXEC") {
                delete this.deployment.healthCheck.livenessProbe.path;
                delete this.deployment.healthCheck.livenessProbe.port;
              }
            }
            if (this.LivenessJudge) {
              if (this.deployment.healthCheck.readinessProbe.type == "TCP") {
                delete this.deployment.healthCheck.readinessProbe.command;
                delete this.deployment.healthCheck.readinessProbe.path;
              }
              if (this.deployment.healthCheck.readinessProbe.type == "HTTP") {
                delete this.deployment.healthCheck.readinessProbe.command;
              }
              if (this.deployment.healthCheck.readinessProbe.type == "EXEC") {
                delete this.deployment.healthCheck.readinessProbe.path;
                delete this.deployment.healthCheck.readinessProbe.port;
              }
            }

            if (this.strategy != "automatic") {
              delete this.deployment.scale.maxReplicas;
              delete this.deployment.scale.minReplicas;
              delete this.deployment.scale.cpuPercent;
            }
            if (this.strategy == "automatic") {
              this.deployment.replicas = 1;
            }
            delete this.deployment.envarr;

            this.deployment.purchase = this.time; //购买时长
            this.deployment.order.amount = this.sum; //总金额，
            this.deployment.order.skuId = this.radio; //skuId，
            this.deployment.order.basePrice = this.price; //基础价格
            this.deployment.targetExecuteDir = this.targetExecuteDir;
            if (this.deployment.openApm == "false") {
              delete this.deployment.targetExecuteDir;
            }
            this.deployment.activeName = this.imageState;
            let index1 = this.deployment.imageUrlLocation.indexOf("/");
            let imageUrl1 = this.deployment.imageUrlLocation.substring(
              index1 + 1,
              this.deployment.imageUrlLocation.length
            );
            this.deployment.imageNamespace = this.deployment.namespace;
            this.deployment.imageName = imageUrl1; //镜像名称
            this.addorder.amount = this.sum;
            this.addorder.items[0].amount = this.time;
            this.addorder.items[0].basicPrice = this.price;
            this.addorder.items[0].finalPrice = this.sum;
            this.addorder.items[0].skuId = this.radio; //
            this.addorder.items[0].category = this.getId("productName");
            this.addorder.items[0].name = this.getId("productName");
            this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs1);
            this.addorder.items[0].duration = this.time + "月";
            // 存储
            var data = JSON.stringify(this.addorder);
            var moint = sessionStorage.setItem(
              "deployment",
              JSON.stringify(this.deployment)
            );
            sessionStorage.setItem("order", data);
            location.href = "/html/confirmOrder.html";
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
    //高级设置添加一行
    add() {
      this.deployment.envarr.push({ name: "", value: "" });
    },
    addConfigMap() {
      this.deployment.cmVolume.push({ name: "", path: "" });
    },
    addSecrets() {
      this.deployment.secrets.push({ name: "", path: "" });
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
    // 移除 变量
    deleteList(item) {
      var index = this.deployment.envarr.indexOf(item);
      if (index !== -1) {
        this.deployment.envarr.splice(index, 1);
      }
    },
    deleteConfigMap(item) {
      var index = this.deployment.cmVolume.indexOf(item);
      if (index !== -1) {
        this.deployment.cmVolume.splice(index, 1);
      }
    },
    deleteSecrets(item) {
      var index = this.deployment.secrets.indexOf(item);
      if (index !== -1) {
        this.deployment.secrets.splice(index, 1);
      }
    },
    // 移除 标签
    deleteLabels(row) {
      this.labels.splice(row.$index, 1);
    },
    // 移除pvc
    deletePvcList(item) {
      var index = this.deployment.volumes.indexOf(item);
      if (index !== -1) {
        this.deployment.volumes.splice(index, 1);
      }
    },
    addPvc() {
      this.pvcStatus = !this.pvcStatus;
    },
    //  获取sc list
    clicksclist(kubernetes_urn) {
      gerStrogeclass(kubernetes_urn).then((r) => {
        this.sclist = r.content;
      });
    },
    formatTooltip(val) {
      return val + "%";
    },
    async submitPvc(pvcvolume) {
      this.$refs[pvcvolume].validate((valid) => {
        if (valid) {
          let params = { name: "", paramValue: "" };
          params.name = arr1[0];
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

          this.addorder.items[0].params = JSON.stringify(skuInfoSpecs2);
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
    //验证configmap 挂载路径
    configmapUrl(rule, value, callback) {
      if (value) {
        var index = 0;
        for (var i = 0; i < this.deployment.cmVolume.length; i++) {
          if (value == this.deployment.cmVolume[i].path) {
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
    //验证 secret 挂载路径
    secretUrl(rule, value, callback) {
      if (value) {
        var index = 0;
        for (var i = 0; i < this.deployment.secrets.length; i++) {
          if (value == this.deployment.secrets[i].path) {
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
    checkImage(rule, value, callback) {
      if (value) {
        if (
          this.deployment.projectName == "" &&
          this.deployment.namespace == "" &&
          this.deployment.envId == ""
        ) {
          return callback(new Error("请将集群、项目、资源空间填写完整"));
        } else {
          callback();
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
    this.fetchData();
    this.getClusters();
     console.log(this.disable);
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
/deep/ #form_env .el-form-item__content {
  margin-left: 0 !important;
}
/deep/ #form_con .el-form-item__content {
  margin-left: 0 !important;
}
/deep/ #form_ser .el-form-item__content {
  margin-left: 0 !important;
}
/deep/ #form_pvc .el-form-item__content {
  margin-left: 0 !important;
}

/deep/ #jianc .el-form-item__content {
  margin-left: 140px !important;
}
/deep/ #jian .el-form-item__content {
  margin-left: 140px !important;
}
/deep/ #jian .el-form-item__label {
  width: 140px !important;
}
/deep/ #jianc .el-form-item__label {
  width: 140px !important;
}
/deep/.pvcheight .el-form-item {
  margin-bottom: 40px !important;
}
.smallBuyTitle {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 76px;
}
</style>
