<template>
  <div id="part3" style="background:#f3f3f3;margin-top:0px;">
    <el-row>
      <el-col :span="16" :offset="4">
        <div
          style="font-family:'Microsoft YaHei';font-size:14px;  color: #999999;line-height:18px;font-size:14px;margin-top:15px;margin-bottom:15px;"
        >新闻报道 &gt; {{teach.title}}</div>
      </el-col>
      <el-col :span="16" :offset="4" style="background:white;">
        <el-col :span="24" style="text-align:center;">
          <div
            style="margin-top: 23px;margin-bottom:5px;color: #333333; font-family:'Microsoft YaHei';font-size: 24px; font-style: normal;font-stretch: normal;font-weight: 400;line-height: 32px;"
          >{{teach.title}}</div>
          <div
            style="margin-bottom:10px;color: #999999;font-family: 'Microsoft YaHei';font-size: 14px;font-style: normal;font-stretch: normal;font-weight: 400;line-height: 18px;"
          >{{teach.createdTime}}</div>
        </el-col>
        <el-col
          :span="22"
          :offset="1"
          style=" color: #666666;font-family: 'Microsoft YaHei';font-size: 14px;font-style: normal;  font-stretch: normal;
                        font-weight: 400;line-height:24px;text-align: left;"
        >
          <div style>本报讯（记者 冯哲）</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp; 10月25日，中国海油党组理论学习中心组（扩大）举行2019年第十四次集体学习和研讨交流，深入学习习近平总书记关于巡视工作的重要论述，准确领会中央巡视工作的新要求、新部署、新举措，系统解读新修订的《中国共产党问责条例》（简称《条例》）。中国海油党组书记、董事长汪东进主持学习研讨，要求坚决贯彻落实习近平总书记重要指示批示精神和党中央决策部署，把中国海油的全面从严治党推向深入。&#xA;&#xA;中央纪委国家监委法规室副主任夏晓东系统梳理党内问责的历史沿革和发展历程，对新修订的《条例》逐条进行解读。国务院国资委党委巡视工作领导小组成员、党委巡视工作办公室主任贾春曲，对国资委和中管企业落实中央巡视整改工作情况进行了全面讲解。&#xA;&#xA;在家的集团公司党组成员吕波、陈壁、温冬芬、钟庆明、徐可强参加学习研讨。</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;汪东进结合学习思考和工作实际，对中国海油扎实推进全面从严治党提出要求：</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;一是及时跟进学习领会习近平总书记系列重要讲话精神。各级党员领导干部要带头示范、先学一步、学深一层，做到深学深悟、常学常新，用习近平新时代中国特色社会主义思想武装头脑、指导实践、推动工作。</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;二是切实增强推进全面从严治党的思想自觉和行动自觉。各级党组织和广大党员干部要提高政治站位，始终绷紧党要管党、从严治党这根弦，深入抓、持续抓，把严的要求、严的标准、严的举措传达到基层党组织和广大党员。&#xA;&#xA;</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;三是认真贯彻执行《条例》，用好全面从严治党新的制度利器。要从坚决做到“两个维护”的政治高度，切实把管党治党责任扛在肩上、工作抓在手上，坚持真管真严、敢管敢严、长管长严，对破底线、越红线的行为敢于较真碰硬，下决心解决宽松软的问题。要正确运用问责方式、工作程序，充分发挥震慑和警示效应。同时坚持将严管和厚爱结合，激励干部担当作为。&#xA;&#xA;</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;四是以高度的政治责任感推进巡视工作。要深刻领会中央关于巡视工作要求的精神实质，按照全国巡视工作会议的部署，深入推进巡视工作。要抓好巡视整改和成果运用，把整改与日常监督、深化改革结合起来，扎实做好巡视整改“后半篇文章”。&#xA;&#xA;</div>
          <div>&nbsp;&nbsp; &nbsp;&nbsp;党组其他成员在研讨发言中表示，不断强化责任意识、担当精神，落实好主体责任和监督责任，以高质量巡视整改成果推动公司高质量发展。&#xA;&#xA;集团公司总助、总师，有限公司首席财务官、副总裁，集团公司及有限公司机关部门负责人列席集体学习。集团公司党组工作机构和纪检监察组负责人列席研讨交流</div>
        </el-col>
        <el-col :span="22" :offset="1" style="  height: 1px;border: 1px solid #dedede;margin-top:15px;"></el-col>
        <el-col
          :span="22"
          :offset="1"
          style="margin-top:15px;text-align:left; color: #333333;font-family: 'Microsoft YaHei';font-size: 14px;font-style: normal; font-stretch: normal;font-weight: 400;"
        >
          <div
            style="margin-bottom:10px;line-height: 18px;cursor: pointer;"
            @click="news()" v-if="adds.index"
          >上一篇：{{adds.title}}</div>
          <div
            style="margin-bottom:14px;line-height: 18px; cursor: pointer;"
            @click="newsubtract()" v-if="subtract.index"
          >下一篇：{{subtract.title}}</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getJournalismonly, getJournalism } from "../../api/CMSApi.js";
import Pagination from "../../components/pagination";
import { requestParams, parseHash } from "../../utils/urlParam";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      money: 0,
      multipleSelection: [],
      ltotal: null,
      disabled: true,
      list: [],
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      listLoading: false,
      dialogVisible: false,
      cartInfo: [],
      addorder: {
        amount: 0,
        catalog: "",
        description: "订单",
        discount: 0,
        items: [],
        name: "",
        payMode: "AFTERWARDS",
        tags: "",
        userId: "1",
        tenantId: "1"
      },
      teach: {},
      adds: {},
      subtract: {},
      id: "",
      information:[]
      
    };
  },
  mounted() {
    // this.toggleSelection([this.tableData[0], this.tableData[1]]);
  },
  created() {
    this.fetchData();
    this.fetch();
  },
  methods: {
    //获取地址栏的id信息
    getQueryVariable(variable) {
      //获取参数id
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },

    //获取数据
    async fetchData() {
      this.listLoading = true;
      this.id = this.getQueryVariable("id");
      const res = await requestParams(getJournalismonly, this.id);
      this.teach = res;
    },
    //获取全部数据
    async fetch() {
      getJournalism().then(r => {
            this.information =r;
        for (var i = 0; i < r.length; i++) {
          if (r[i].id == this.id) {
            //console.log(r[i+1]); 
             console.log(i)
               if(i>0){ 
                 console.log(i)
                  this.adds = r[i-1];
                  this.adds.index=i-1;
                 }
                  console.log(this.adds.index) 
                 if(i<r.length-1){
                 this.subtract = r[i + 1];
                  this.subtract.index=i+1;  
                 }
                console.log(this.subtract); 
          }
           
        }
        console.log(this.adds);
        this.newall = r;
      });
    },
    news(){
          if(this.adds.index>=0){
          location.href = "/html/news.html?id=" + this.adds.id;
      }
    },
    newsubtract() {
      if(this.subtract.index<this.information.length){
         location.href = "/html/news.html?id=" + this.subtract.id;
      }
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    }
  }
};
</script>
<style scoped>
.el-input-number--mini {
  width: 95px;
}
</style>

