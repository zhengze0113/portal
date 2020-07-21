<template>
  <div id="part3" style="background:#ECECEC;">
    <el-row>
      <el-col
        :offset="2"
        :span="20"
        style="background: white;padding-left:30px;padding-right: 30px;padding-top:20px"
      >
        <el-tabs v-model="activeName" v-loading="listLoading">
          <el-tab-pane label="服务文档" name="first">
            <Doc @func="getMsgFormSon"></Doc>
          </el-tab-pane>
          <!-- <el-tab-pane label="常见问题" name="second"><Doc></Doc></el-tab-pane>
          <el-tab-pane label="问题反馈" name="third"><Doc></Doc></el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Doc from "./doc";
export default {
  components: {
    Doc
  },
  data() {
    return {
      activeName: "first",
      listLoading: true
    };
  },
  methods: {
    getMsgFormSon(test) {
      this.listLoading = false;
    }
  }
};
</script>
<style>
.outer {
  background: #0e0e0e;
  height: 120px;
  text-align: center;
}
.top {
  color: #fff;
  width: 130px;
  height: 120px;
  display: inline-block;
  border-left: 1px solid #999;
}
.title {
  font-size: 15px;
  margin-top: 25px;
  margin-bottom: 10px;
}
.str {
  font-size: 10px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 15px;
  margin-right: 10px;
}
/*服务内容*/
.midd {
  background: #31363a;
  height: 240px;
  text-align: center;
  padding-bottom: 20px;
}
.mi {
  padding-top: 30px;
  padding-bottom: 30px;
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.mid {
  display: inline-block;
  color: #fff;
  height: 150px;
}
.mid:nth-child(2) {
  color: #00c0dd;
}
.bottom {
  background: #373d42;
  height: 300px;
}
.bott {
  padding: 0 100px;
  margin-left: 150px;
}
.bot {
  color: #00c0dd;
  width: 260px;
  height: 50px;
  margin-left: 20px;
  display: inline-block;
  border-right: 2px solid #00c0dd;
  margin-top: 20px;
}

.tit {
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
}
.st {
  font-size: 10px;
  margin-bottom: 20px;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}
.bot:nth-child(3),
.bot:nth-child(6),
.bot:nth-child(9) {
  border-right: 0px;
}
</style>
