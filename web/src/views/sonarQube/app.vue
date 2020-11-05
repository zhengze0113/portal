<template>
  <div id="app" style="background-color: #E9E9E9">
    <el-row style="height:100px;background: white;">
      <el-col :span="24"></el-col>
    </el-row>
    <el-row style="height:70px;background:rgba(255,255,255,1);">
      <el-col :span="24">
        <el-row>
          <el-col :offset="3" class="buyTitle">服务购买</el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--参数项-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
        <p class="skuFont">资源选项</p>
        <el-col :offset="2">
          <el-form
            :model="monitoringFrom"
            ref="monitoringFrom"
            :label-position="labelPosition"
            label-width="150px"
            style="width:60%"
            class="demo-ruleForm"
          >
            <el-form-item
              label="项目信息："
              prop="namespace"
              :rules="[{ required: true, message: '项目信息不能为空'}]"
            >
              <el-select
                v-model="monitoringFrom.namespace"
                filterable
                placeholder="请选择"
                style="width:100%"
              >
                <el-option
                  v-for="item in optionProject"
                  :key="item.name"
                  :label="item.displayName"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="sonarQube地址："
              prop="sonar_url"
              :rules="[{ required: true, message: 'sonarQube地址不能为空'},{type:'url',message:'请填写正确的url地址'}]"
            >
              <el-input v-model="monitoringFrom.sonar_url" placeholder="请添加sonarQube地址"></el-input>
            </el-form-item>
       
          </el-form>
        </el-col>
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
              <span class="rightFont">包年</span>
            </el-button>
          </el-col>
          <el-col :offset="2" style="margin-bottom:30px;">
            <span class="skuDivFont">购买时长</span>
            <el-select v-model="date" size="small" @change="countMonth">
              <el-option
                v-for="item in duration"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span class="skuDivFont">&emsp;</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--服务协议-->
    <el-row style="margin-top:30px;">
      <el-col :offset="3" :span="18" style="background: #FFF;">
         <el-col :span="3"> <p class="skuFont" >服务协议</p></el-col>

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
      <el-col :span="24" style="background: #FFF;height:100px;" :class="isFixed?'fixed':''">
        <el-col :offset="15" style="color: #666666;line-height: 100px;">
          服务费用：
          <span class="money">￥{{price}}</span>
          <el-button
            style="border-radius:0;width:87px;height:30px;background:rgba(3,97,167,1);padding-left: 14px;margin-left:5%;"
            @click="submitForm('monitoringFrom')"
            v-if="disable==true"
          >
            <span class="rightFont">提交订单</span>
          </el-button>
          <el-popover
            placement="bottom-start"
            width="150"
            trigger="click"
            content="请仔细阅读服务协议，确认后再提交订单"
            v-if="disable==false"
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
  getResourcesSku, //获取云资源下的sku
  getResourcesSkuInfo, //查询详细sku信息
  getClusters, //获取集群
  getProject //项目信息
} from "../../api/serviceOperating";
import { requestParams } from "../../utils/urlParam";
export default {
  name: "App",
  data: function() {
    return {
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
      date: [],
      count: 1,
      price: 0,
      number: 1,
      mode: "MONTH",
      edit: [],
      skuData: "",
      disable: false,
      sum: 0,
      addorder: {
        //提交订单数据
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
      skulist: [],
      skuInfoSpecs: null,
      skuInfo: null,
      id: "",
      labelPosition: "left",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      search: {
        params: '',
        page: 1,
        rows: 100
      },
      //表单数据
      monitoringFrom: {
        namespace: "",
        uid: "", // 唯一 id - 订单id
        sonar_url: "", // 从云平台获取 nexus url 信息
        life_limit: 1, // 用户选择的使用年限来传给后端
        user: ""
      }
    };
  },
  methods: {
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
      const r = await requestParams(getResourcesSkuInfo, row.id);
      this.price = r.content.price.price;

      if (this.mode == "MONTH") {
        console.log(this.mode);
        this.sum = r.content.price.price * this.time;
        this.sum = Math.floor(this.sum * 100) / 100;
      }
      if (this.mode == "YEAR") {
        console.log(this.mode);
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    //提交订单
    async commitOrder() {
      //提交订单参数
      const r = await requestParams(getResourcesSkuInfo, this.radio);
      console.log(r);

      this.skuInfo = r.content;
      this.skuInfoSpecs = r.content.specs;
      this.skuInfo.category = this.name;
      console.log(this.monitoringFrom.namespace);
      //项目创建
      console.log(this.monitoringFrom);
      for (var i = 0; i < this.skuInfoSpecs.length; i++) {
        if (this.skuInfoSpecs[i].name == "项目信息") {
          this.skuInfoSpecs[i].paramValue = this.monitoringFrom.namespace;
          this.skuInfoSpecs[i].namespace = this.getObjectName(
            this.monitoringFrom.namespace
          );
        }
        if (this.skuInfoSpecs[i].name == "sonarQube地址") {
          this.skuInfoSpecs[i].paramValue = this.monitoringFrom.sonar_url;
        
        }
        if (this.skuInfoSpecs[i].name == "使用年限") {
          this.skuInfoSpecs[i].paramValue = this.monitoringFrom.life_limit+"年";
       
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
        this.addorder.amount = this.sum;
        this.addorder.items[0].amount = this.time;
        this.addorder.items[0].finalPrice = this.price;
        this.addorder.items[0].basicPrice = this.price;
        this.addorder.items[0].skuId = this.radio;
        this.addorder.items[0].category = this.getId("productName");
        this.addorder.items[0].name = this.getId("productName");
        this.addorder.items[0].params = JSON.stringify(this.skuInfoSpecs);
        this.addorder.items[0].duration = this.time;
        console.log(this.addorder);
        // 存储
        var data = JSON.stringify(this.addorder);
        console.log(data);
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
      console.log(this.time);
      console.log(this.price);
      console.log(this.number);

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
    //选择时长
    async countMonth(data) {
      console.log(data);
      const r = await requestParams(getResourcesSkuInfo, data);
      console.log(r);
      this.price = r.content.price.price;
      if (r.content.name == "1年") {
        this.monitoringFrom.life_limit = 1;
        this.time=1;
      }
      if (r.content.name == "3年") {
        this.monitoringFrom.life_limit = 3;
        this.time=3;
      }
      if (r.content.name == "5年") {
        this.monitoringFrom.life_limit = 5;
        this.time=5;
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
      this.duration = list;
      console.log(this.duration);
      this.date = this.duration[0].id;
      if (this.duration[0].name == "1年") {
        this.monitoringFrom.life_limit = 1;
      }
      if (this.duration[0].name == "3年") {
        this.monitoringFrom.life_limit = 3;
      }
      if (this.duration[0].name == "5年") {
        this.monitoringFrom.life_limit = 5;
      }
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
          cckj: "",
          version: "V 1.0",
          money: ""
        };
        skuObject.id = sku.id;
        skuObject.name = sku.name;
        skuObject.money = sku.price.price;

        for (var j = 0; j < sku.specs.length; j++) {
          if (sku.specs[j].name == "CPU") {
            skuObject.cpu = sku.specs[j].paramValue;
          }
          if (sku.specs[j].name == "内存") {
            skuObject.gb = sku.specs[j].paramValue;
          }
          if (sku.specs[j].name == "存储空间") {
            skuObject.cckj = sku.specs[j].paramValue;
          }
        }
        this.skulist.push(skuObject);
      }
      this.skuData = this.skulist[0];
      
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
      this.regionalInformation = this.edit[0].value;
    },
    //获取项目信息下拉框
    async getProject1() {
      //获取
      const res1 = await requestParams(getProject);
      this.optionProject = res1.content;
      this.projectinformation = this.optionProject[0].name;
    },
    getClustersLabel(val) {
      let obj = {};
      obj = this.edit.find(item => {
        return item.value == val;
      });
      let getName = "";
      getName = obj.label;
      console.log(getName);
      return getName;
    },
    getObjectName(val) {
      let obj = {};
      obj = this.optionProject.find(item => {
        return item.name == val;
      });
      console.log(obj);
      let getName = "";
      getName = obj.displayName;
      return getName;
    }
  },

  created() {
    
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

@media screen and (max-width: 1024px) {
  .headList {
    height: 85px;
    line-height: 20px;
  }
}
</style>
