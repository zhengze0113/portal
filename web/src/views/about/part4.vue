<template>
  <div id="part4">
    <el-row class="app-row">
      <el-row class="app">
        <div style="line-height:80px;font-size:28px;text-align:center;">场景案例</div>
      </el-row>
      <el-row
        :span="24"
        style="background-image:url('/web/static/images/index/04.png');background-size:256%;position:relative;background-position: -342px -223px;"
      >
       <el-col :span="5" v-for="(item,index) in app" :key="index" class="applist">
          <img :src="item.pic" height="3rem"/>
          <h3
            style="text-align:center;margin-top:15px;margin-bottom:15px;margin-left:-44%"
          >{{item.title}}</h3>
          <div style="font-size:12px;color:#aaaaaa;width:80%;margin-left:10%">{{item.detail}}</div>
        </el-col>
      </el-row>
    </el-row>
    <el-row style="background:#fff;background-size:100%;width: 60%;
  margin-left: 20%;display:none;">
      <el-row class="team">
        <div style="line-height:80px;font-size:28px;text-align:center;">合作伙伴</div>
      </el-row>
      <el-row :span="24">
        <el-col :span="5" v-for="(item,index) in team" :key="index" class="teamlist">
          <img :src="item.pic" :class="[index==0||index==6?class2:class1]" />
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      class1: "teamlistimg",
      class2: "teamlistimg1",
      advantage: [
        {
          pic: "/web/static/images/index/youshi1.png",
          title: "高性价比",
          detail:
            "相比传统的IDC，节约80%成本投入，对比其他服务商，你会节省60%成本投入"
        },
        {
          pic: "/web/static/images/index/youshi2.png",
          title: "高性价比",
          detail:
            "相比传统的IDC，节约80%成本投入，对比其他服务商，你会节省60%成本投入"
        },
        {
          pic: "/web/static/images/index/youshi4.png",
          title: "高性价比",
          detail:
            "相比传统的IDC，节约80%成本投入，对比其他服务商，你会节省60%成本投入"
        },
        {
          pic: "/web/static/images/index/youshi4.png",
          title: "高性价比",
          detail:
            "相比传统的IDC，节约80%成本投入，对比其他服务商，你会节省60%成本投入"
        },
        {
          pic: "/web/static/images/index/youshi5.png",
          title: "高性价比",
          detail:
            "相比传统的IDC，节约80%成本投入，对比其他服务商，你会节省60%成本投入"
        }
      ],
      app: [
        {
          pic: "/web/static/images/index/app1.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app2.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app3.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app4.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app5.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app6.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app7.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        },
        {
          pic: "/web/static/images/index/app8.png",
          title: "企业效能",
          detail: "提升研发效能，降低研发成本，实现真正的CI/CD和独立交付"
        }
      ],
      team: [
        {
          pic: "/web/static/images/index/hz1.png"
        },
        {
          pic: "/web/static/images/index/hz2.png"
        },
        {
          pic: "/web/static/images/index/hz3.png"
        },
        {
          pic: "/web/static/images/index/hz4.png"
        },
        {
          pic: "/web/static/images/index/hz5.png"
        },
        {
          pic: "/web/static/images/index/hz6.png"
        },
        {
          pic: "/web/static/images/index/hz7.png"
        },
        {
          pic: "/web/static/images/index/hz8.png"
        },
        {
          pic: "/web/static/images/index/hz9.png"
        },
        {
          pic: "/web/static/images/index/hz10.png"
        },
        {
          pic: "/web/static/images/index/hz11.png"
        },
        {
          pic: "/web/static/images/index/hz12.png"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style>
#part4 {
  background: rgb(243, 243, 243);
  height: auto;
}
.advantage {
  width: 60%;
  margin-left: 20%;
}
.servicetitle {
  font-size: 28px;
  line-height: 60px;
  text-align: center;
}
.adv-row {
  width: 60%;
  margin-left: 20%;
}
.adv {
  position: relative;
  width: 60%;
  margin-left: 20%;
}
.avdlist {
  background: #fff;
  margin-right: 1%;
  width: 19%;
  height: 280px;
}
.avdlist img {
  position: relative;
  display: block;
  left: 25%;
  top: 5%;
  width: 80px;
  height: 80px;
}
.app-row {
  width: 60%;
  margin-left: 20%;
}
.app {
  width: 60%;
  margin-left: 20%;
}.applist {
  background: #fff;
  margin-right: 1.5%;
  width: 23.6%;
  height: 185px;
  margin-bottom: 20px;
  padding: 20px 10px 20px 10px;
}
.applist:nth-child(4),
.applist:last-child{
  margin-right: 0;
}
.applist img {
  position: relative;
  display: block;
  left: 8%;
  top: 5%;
  width: 40px;
  height: 40px;
}
.team-row {
  width: 60%;
}
.team {
  width: 60%;
  margin-left: 20%;
}
.teamlist {
  margin-right: 3%;
  width: 22%;
  height: 50px;
  margin-bottom: 35px;
  text-align: center;
}
.teamlistimg {
  margin: 0 auto;
  width: 50%;
}
.teamlistimg1 {
  width: 30%;
}
.teamlist:nth-child(9),
.teamlist:nth-child(10),
.teamlist:nth-child(11),
.teamlist:nth-child(12) {
  margin-bottom: 0;
}
</style>
