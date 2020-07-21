<template>
  <div id="app">
    <topBar></topBar>
    <el-row>
      <el-col :span="4" :offset="2" style="margin-top:5%;">
        <div style="text-align: center;margin-top:100%;color:#666666;">
          页面丢失了<br>
          （{{count}}秒后自动回到首页）
          <el-button @click="goBack()" style="margin-top:30px;" type="primary" size="small" >回到首页</el-button>
        </div>
      </el-col>
      <el-col :span="17" :offset="1" style="margin-top:10%;">
        <p ><img src="@/static/images/404.png" style="width:70%;"></p>
      </el-col>

    </el-row>
    <!--<div style="margin-left:100px;margin-bottom:40px;">-->
      <!--<div style="width:100px;height:100px;background: black;"></div>-->
      <!--<div class="a">-->
    <!--</div>-->
  </div>
</template>

<script>
import layout from '../../components/layout/index';
import topBar from '../../components/hd1/topBar';


export default {
  name: 'App',
  components: {
    layout,
    topBar
  },
  data(){
    return {
      count : 3
    }
  },
  methods:{
    goBack(){
      window.location.href="/html"
    },
  },
  mounted(){
    var _this = this;
    setTimeout( function(){
      _this.count = 2;
      setTimeout( function(){
        _this.count = 1;
        setTimeout( function(){
          _this.count = 0;
          _this.goBack();
        },1000)
      },1000)
    },1000)

  }
};
</script>

<style>
  .m-topBar{
   background-color: #11151c !important;
  }
</style>
<style lang="scss" scoped>

  .el-button--primary{
    background-color: #0261a7;
    border-color: #0261a7;
    border-radius: 0;
  }
  /*.a{*/
    /*width:0;*/
    /*height:0;*/
    /*border-left:50px solid transparent;*/
    /*border-right:50px solid transparent;*/
    /*border-top:15px solid black;*/
  /*}*/

</style>
