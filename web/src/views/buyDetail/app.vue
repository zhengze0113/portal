<template>
  <div id="app" style="background-color: white">
    <div>
      <el-row style="padding-top:150px">
        <!-- Left -->
        <el-col
          :span="12"
          :offset="3"
          style="border-right:1px solid rgba(224,224,224,1);"
        >
          <div style="background:#fff">
            <el-row>
              <el-col>
                <span class="headline">服务购买</span>
              </el-col>

              <el-col v-if="id != 16" style="margin-top:20px;">
                <el-row>
                  <el-col
                    style="margin-right:2px;"
                    :span="5"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <el-col
                      :span="24"
                      @click.native="skuid(item.id, index)"
                      class="headList"
                      :class="clickacitve == index ? 'active' : ''"
                    >
                      <el-row class="skuname">{{ item.name }}</el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-col>
              <el-col v-if="id == 16" style="margin-top:20px;">
                <el-row>
                  <el-col
                    style="margin-right:2px;"
                    :span="5"
                    v-for="(item, index) in containerList"
                    :key="index"
                  >
                    <el-col
                      :span="24"
                      class="headList"
                      @click.native="contest(index)"
                      :class="clickacitve1 == index ? 'active' : ''"
                    >
                      <el-row class="skuname">{{ item.name }}</el-row>
                    </el-col>
                  </el-col>
                </el-row>

                <el-row v-if="id == 16" style="margin-top:20px;">
                  <el-col
                    style="margin-right:2px;"
                    :span="5"
                    v-for="(item, index) in storageArea"
                    :key="index"
                  >
                    <el-col
                      :span="24"
                      class="headList"
                      @click.native="conActive(index)"
                      :class="clickacitveTest == index ? 'active' : ''"
                    >
                      <el-row class="skuname">{{ item.name }}</el-row>
                    </el-col>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
              <el-col :span="4">
                <span class="left-title-font">资源选项</span>
              </el-col>
              <el-col :span="18" :offset="0">
                <el-row v-if="a">
                  <!-- 郑泽 -->
                  <el-col v-if="this.id == 16">
                    <el-col :span="4" class="subtitle">区域信息：</el-col>
                    <el-col :span="12">
                      <el-select
                        v-model="value1"
                        filterable
                        placeholder="请选择"
                        @change="changeSKU"
                      >
                        <el-option
                          v-for="item in edit"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.id == 16">
                    <el-col :span="4" class="subtitle">项目信息：</el-col>
                    <el-col :span="12">
                      <el-select
                        v-model="valueProject"
                        filterable
                        placeholder="请选择"
                        @change="changeP"
                      >
                        <el-option
                          v-for="item in optionProject"
                          :key="item.name"
                          :label="item.displayName"
                          :value="item.name"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.id == 16">
                    <el-col :span="4" class="subtitle">镜像配置：</el-col>
                    <el-col :span="12">
                      <el-select
                        v-model="img"
                        placeholder="请选择"
                        @change="changeI"
                      >
                        <el-option
                          :key="1"
                          label="devregistry.cnooc:5000/cmss-lx-02:latest"
                          value="devregistry.cnooc:5000/cmss-lx-02:latest"
                        ></el-option>
                      </el-select>
                    </el-col>
                  </el-col>
                  <el-col v-if="this.id == 16">
                    <el-col :span="4" class="subtitle">实例数：</el-col>
                    <el-col :span="12">
                      <el-input
                        v-model="instances"
                        style="width:221px;"
                        type="Number"
                        @input="changeNumber"
                        min="0"
                        onkeyup="this.value=this.value.replace(/\D/g,'')"
                        onpaste="return false;"
                      ></el-input>
                    </el-col>
                  </el-col>

                  <!-- 郑泽 -->

                  <el-col v-for="(item, index) in skuInfoSpecs" :key="index">
                    <el-col v-if="item.name != '区域信息'">
                      <el-col v-if="item.name != '项目信息'">
                        <el-col v-if="item.name != '镜像配置'">
                          <el-col v-if="item.name != '实例数'">
                            <el-col :span="4" class="subtitle"
                              >{{ item.name }}：</el-col
                            >
                            <!-- <el-col :span="8">{{item.paramKey}}</el-col> -->
                            <el-col :span="12">
                              <el-input
                                v-if="
                                  item.clazz == 'String' ||
                                    item.clazz == 'Number'
                                "
                                v-model="item.paramValue"
                                :disabled="!item.editable"
                                style="width:200px;"
                                :type="item.clazz"
                                @keyup.native="btKeyUp"
                              >
                                <span
                                  slot="append"
                                  v-if="item.unit !== undefined"
                                  >{{ item.unit }}</span
                                >
                              </el-input>

                              <div v-if="item.clazz == 'Select'">
                                <el-select
                                  v-if="id == 15"
                                  v-model="projectName"
                                  placeholder="请选择"
                                  class="c"
                                  style="width:200px;"
                                >
                                  <el-option
                                    key="1"
                                    label="芍药居"
                                    value="芍药居"
                                  ></el-option>
                                </el-select>

                                <!--<el-select-->
                                <!--v-else-if="id != 15"-->
                                <!--v-model="item.paramValue"-->
                                <!--placeholder="请选择"-->
                                <!--class="c"-->
                                <!--style="width:200px;"-->
                                <!--&gt;-->
                                <!--<el-option-->
                                <!--v-for="(item1,index1) in edit"-->
                                <!--:key="index1"-->
                                <!--:label="item1"-->
                                <!--:value="item1"-->
                                <!--&gt;</el-option>-->
                                <!--</el-select>-->
                              </div>
                            </el-col>
                          </el-col>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row style="margin-bottom:10px;">
                  <el-col :span="4">
                    <span class="subtitle">购买时长：</span>
                  </el-col>
                  <el-col :span="20">
                    <el-input-number
                      v-model="time"
                      :min="1"
                      :max="999"
                      size="mini"
                      style="width:130px"
                      @change="count()"
                    ></el-input-number>
                    <el-select
                      v-model="date"
                      size="mini"
                      style="width: 80px; margin-left: 30px;margin-bottom: 0px;"
                      class="input2"
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
                <el-row style="margin-bottom:10px;">
                  <el-col :span="4">
                    <span class="subtitle">购买数量：</span>
                  </el-col>
                  <el-col :span="20">
                    <el-input-number
                      style="width:130px"
                      v-model="number"
                      :min="1"
                      :max="999"
                      size="mini"
                      @change="count()"
                    ></el-input-number>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row style="margin-top:20px;">
              <el-col :span="4">
                <span class="left-title-font">费用</span>
              </el-col>
              <el-col
                :span="4"
                style="font-size:18px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(2,97,167,1);"
                >￥{{ sum }}</el-col
              >
              <el-col :span="10">
                <!--<el-button-->
                <!--@click="order"-->
                <!--:disabled="disable"-->
                <!--style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);    padding-left: 14px;"-->
                <!--&gt;-->
                <!--<span class="rightFont">提交订单</span>-->
                <!--</el-button>-->
                <el-button
                  @click="reset()"
                  style="border-radius:0;width:87px;height:30px;background:#FFF;padding-left: 14px;"
                >
                  <span class="rightFont" style="color:#666666">重置</span>
                </el-button>
              </el-col>
            </el-row>

            <el-row style="margin-top:20px;">
              <el-col :span="4">
                <span class="left-title-font">服务协议</span>
              </el-col>
              <el-col :span="20">
                <el-checkbox
                  @change="dis()"
                  class="skuFont"
                  style="margin-bottom:10px"
                >
                  <el-link type="primary" @click="agreement()"
                    >《服务条款》</el-link
                  >
                </el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <span class="left-title-font">最近购买</span>
              </el-col>
              <el-col :span="18">
                <el-row
                  style="margin-bottom:40px;font-size: 12px; font-family: Microsoft YaHei;font-weight:400;color: #666666;"
                >
                  暂无
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                  <!--<el-col :span="12" class="buy">{{buy}}</el-col>-->
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!--  Right  -->
        <el-col
          :span="6"
          style="margin-bottom:30px;margin-left:30px;padding-left:20px;border:1px solid rgba(224,224,224,1);"
        >
          <div id="fix" class="bclass">
            <el-row>
              <span class="configfont">当前配置</span>
              <el-divider class="line"></el-divider>
            </el-row>
            <el-row>
              <el-col
                :span="24"
                style="font-size:18px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(2,97,167,1);"
                >￥{{ sum }}</el-col
              >
            </el-row>
            <el-row style="padding:15px 5px;">
              <el-col
                v-for="(item, index) in skuInfoSpecs"
                :key="index"
                style="margin-bottom:7px"
              >
                <div v-if="id != 16">
                  <div v-if="item.name != '项目信息'">
                    <el-col :span="8" class="subtitle">{{ item.name }}:</el-col>
                    <el-col :span="16" class="subtitle"
                      >{{ item.paramValue }}{{ item.unit }}</el-col
                    >
                  </div>
                </div>

                <div v-else>
                  <el-col :span="8" class="subtitle">{{ item.name }}:</el-col>
                  <el-col :span="16" class="subtitle"
                    >{{ item.paramValue }}{{ item.unit }}</el-col
                  >
                </div>
              </el-col>
            </el-row>

            <el-row style="margin-bottom:10px;">
              <el-col :span="12">
                <el-popover
                  placement="bottom-start"
                  width="150"
                  trigger="click"
                  content="请仔细阅读服务协议，确认后再提交订单"
                  v-if="disable == false"
                >
                  <el-button
                    slot="reference"
                    style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);    padding-left: 14px;"
                  >
                    <span class="rightFont">提交订单</span>
                  </el-button>
                </el-popover>
                <el-button
                  v-if="disable == true"
                  @click="order"
                  style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);    padding-left: 14px;"
                >
                  <span class="rightFont">提交订单</span>
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getResourcesSku,
  getResourcesSkuInfo,
  postCart,
  postOrders,
  getSpec,
  getServiceCatalogsInfo,
  getCloudServiceCatalogsC,
  test,
  getClusters, //获取集群
  getProject
} from "../../api/serviceOperating";
import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from "../../utils/urlParam";
export default {
  name: "App",
  data: function() {
    return {
      specsValue: "",
      value: "",
      projectName: "芍药居",
      value1: "",
      clickacitve: 0,
      clickacitve1: 0,
      ids: null,
      clickacitveTest: 0,
      disable: false,
      list: null,
      item: null,
      compatriotsObject: [],
      objectCloud: {},
      search: {
        params: '[{"param":{"resourceId":1},"sign":"EQ"}]',
        page: 1,
        rows: 100
      },
      skuInfo: null,
      skuInfoSpecs: null,
      date: null,
      buy: "北京科技有限公司购买了云服务器CVM产品",
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
      title: "请选择购买时长",
      time: 1,
      price: 0,
      number: 1,
      sum: 0,
      id: 0,
      a: false,
      containerList: [],
      storageArea: [
        { name: "存储空间25G" },
        { name: "存储空间50G" },
        { name: "存储空间100G" },
        { name: "存储空间200G" }
      ],
      addCart: {
        amount: 0,
        category: "string",
        content: "string",
        skuId: 0,
        duration: 0,
        specs: [
          {
            editable: true,
            name: "string",
            paramKey: "string",
            paramValue: "string",
            skuId: 0,
            specId: 0,
            status: "string",
            tags: "string"
          }
        ],
        status: "string",
        userId: 1
      },
      addorder: {
        amount: 0,
        catalog: "",
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
      name: "",
      edit: [],
      optionProject: [],
      valueProject: "",
      img: "",
      instances: 1
    };
  },
  methods: {
    //限制输入特殊字符
    btKeyUp(e) {
      e.target.value = e.target.value.replace(
        /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
        ""
      );
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
    dis() {
      if (this.disable == true) {
        this.disable = false;
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //创建订单
    async order() {
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
        this.addorder.items[0].skuId = this.skuInfo.id;
        this.addorder.items[0].category = this.name;
        this.addorder.items[0].name = this.name;
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time;
        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        console.log(data);
        // sessionStorage.setItem("order", data);
        location.href = "/html/confirmOrder.html";
      } else if (this.disable == false) {
        this.disable = true;
      }
    },
    //加入购物车
    async carts() {
      var specs = this.skuInfoSpecs;
      delete specs[0].id;
      this.addCart.amount = this.number;
      this.addCart.duration = this.time;
      this.addCart.specs = specs;
      this.addCart.skuId = this.skuInfo.id;
      this.addCart.category = this.name;
      this.addCart.name = this.name;
      const res = await requestParams(postCart, this.addCart);
      if (res.code == 201) {
        this.$notify({
          type: "success",
          message: res.message
        });
      } else {
        this.$notify({
          type: "error",
          message: res.message
        });
      }
    },
    //服务协议
    agreement() {
      location.href = "/html/agreement.html";
    },
    //获取sku信息
    async skuid(id, index) {
      if (index === undefined) index = 0;
      this.clickacitve = index;
      this.a = false;
      const res = await requestParams(getResourcesSkuInfo, id);
      this.skuInfo = res.content;
      this.skuInfoSpecs = res.content.specs;
      this.price = res.content.price.price;
      this.value = res.content.name;
      this.skuInfo.category = this.name;
      this.count();
      if (this.skuInfo.price.chargePeriod == "DAY") {
        this.date = "DAY";
      } else if (this.skuInfo.price.chargePeriod == "YEAR") {
        this.date = "YEAR";
      } else if (this.skuInfo.price.chargePeriod == "MONTH") {
        this.date = "MONTH";
      }
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].clazz == "Select") {
          if (this.id != 16) {
            this.edit = this.skuInfoSpecs[i].paramValue.split(",");
            this.skuInfoSpecs[i].paramValue = this.edit[0];
            this.skuInfoSpecs[i].paramValue = "芍药居";
          }
        }

        for (var j = 0; j < this.skuInfo.price.priceItems.length; j++) {
          if (
            this.skuInfoSpecs[i].specId ==
            this.skuInfo.price.priceItems[j].specId
          ) {
            const res1 = await requestParams(
              getSpec,
              this.skuInfo.price.priceItems[j].priceId
            );
            await res1;
            var unit = res1.content.unit;
            this.skuInfoSpecs[i].unit = unit;
          }
        }
      }
      if (this.id == 16) {
        this.getClusters();
      }
      this.a = true;
    },
    //获取云资源下的sku
    async fetchData() {
      this.listLoading = true;
      this.id = this.getId("id");
      this.search.params = `[{"param":{"catalogId":${this.id}},"sign":"EQ"}]`;
      this.search.page = 1;
      this.search.rows = 100;
      const res = await requestParams(getResourcesSku, this.search);
      if (res.content.content.length == 0) {
        this.skuzero();
      }
      this.list = res.content.content;
      this.listLoading = false;
      if (this.id == 16) {
        //处理名称， 显示两行 确定一个sku
        this.processor();
        return;
      }

      this.skuid(this.list[0].id);
    },
    async getClusters() {
      //获取
      this.edit = [];
      const res1 = await requestParams(getClusters);
      for (var i = 0; i < res1.content.content.length; i++) {
        var data = {
          value: res1.content.content[i].id,
          label: res1.content.content[i].name
        };
        this.edit.push(data);
      }
      this.value1 = this.edit[0].value;
      this.changeSKU();
      this.getProject1();
      this.changeNumber();
    },
    //获取项目信息
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content.content;
      this.valueProject = this.optionProject[0].name;
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "项目信息") {
          this.skuInfoSpecs[i].paramValue = this.valueProject;
        }
      }
    },
    changeP() {
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "项目信息") {
          this.skuInfoSpecs[i].paramValue = this.valueProject;
        }
      }
    },
    changeI() {
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "镜像配置") {
          this.skuInfoSpecs[i].paramValue = this.img;
        }
      }
    },
    changeNumber() {
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "实例数") {
          this.skuInfoSpecs[i].paramValue = this.instances;
        }
      }
    },
    changeSKU() {
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "区域信息") {
          this.skuInfoSpecs[i].paramValue = this.value1;
        }
      }
    },
    count() {
      this.sum = this.time * this.price * this.number;
      this.sum = Math.floor(this.sum * 100) / 100;
    },
    getFatherId(id) {
      getServiceCatalogsInfo(id).then(r => {
        this.objectCloud = r.content;
        this.id = id;
        this.name = r.content.name;
        getCloudServiceCatalogsC(r.content.parentId).then(r => {
          for (var i = 0; i < r.content.content.length; i++) {
            if (r.content.content[i].id == id) {
              r.content.content.splice(i, 1);
              this.compatriotsObject = r.content.content;
            }
          }
        });
      });
    },
    link(id) {
      window.location.href = "/html/productDetail.html?id=" + id;
    },

    contest(index) {
      this.clickacitve1 = index;
      this.defalutSku();
    },
    conActive(index) {
      this.clickacitveTest = index;
      this.defalutSku();
    },
    processor() {
      var test = [];
      for (var i = 0; i < this.list.length; i++) {
        var fatherObject = { name: "", items: [] };
        var sonObject = { name: "" };
        var result = false;
        var index = -1;
        var name1 = this.list[i].name.slice(
          0,
          this.list[i].name.indexOf("G") + 1
        );
        var name2 = this.list[i].name.slice(
          this.list[i].name.indexOf("G") + 1,
          this.list[i].name.length
        );
        fatherObject.name = name1;
        sonObject.name = name2;
        for (var j = 0; j < test.length; j++) {
          if (test[j].name == name1) {
            result = true;
            index = j;
          }
        }
        if (result) {
          test[index].items.push(sonObject);
        } else {
          fatherObject.name = name1;
          sonObject.name = name2;
          fatherObject.items.push(sonObject);
          test.push(fatherObject);
        }
      }
      this.containerList = test;
      this.containerList[0].items = this.storageArea;
    },
    //回显
    defalutSku() {
      var name1 =
        this.containerList[this.clickacitve1].name +
        this.storageArea[this.clickacitveTest].name;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].name == name1) {
          this.skuid(this.list[i].id, 0);
        }
      }
    },
    //当sku为0 时解决方案
    skuzero() {
      // alert("该服务暂未开放，请尽情期待")
      // this.$alert('该服务暂未开放，请尽情期待', '', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     window.location.href = document.referrer;
      //   }
      // });
      alert("该服务暂未开放，请尽情期待");
      window.location.href = document.referrer;
      return;
    },
    //重置
    reset() {
      this.time = 1;
      this.number = 1;
      this.count();
    }
  },

  created() {
    // this.getFatherId(this.getId("id"));
    this.search = parseHash(this.search);
    this.fetchData().then(r => this.defalutSku(0, 0));

    //默认显示第一个sku
    // this.defalutSku();
  },
  mounted() {}
};
</script>

<style>
.m-topBar {
  background-color: #11151c !important;
}
</style>
<style scoped lang="scss">
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

/deep/ .el-select {
  margin-top: -15%;
  margin-bottom: 5%;
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
/deep/ .input1 .el-input__inner {
  border-radius: 4px;
  height: 50px;
  padding-left: 40px;
  border: 1px solid rgba(2, 97, 167, 1);
}

/deep/ .el-input__inner {
  border-radius: 0;
  height: 25px;
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
.el-input {
  margin-top: -15%;
  margin-bottom: 5%;
  width: 100px;
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
.input1 {
  width: 600px;
  height: 50px;
}
@media screen and (max-width: 1024px) {
  .input1 {
    width: 450px;
  }
}
@media screen and (max-width: 1024px) {
  .headList {
    height: 85px;
    line-height: 20px;
  }
}
</style>
