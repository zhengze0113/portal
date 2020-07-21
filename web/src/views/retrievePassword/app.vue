<template>
  <div id="app">

    <el-row>
      <el-col :offset="4" :span="16" style="background:white; margin-top:10%;margin-bottom:5%;padding-bottom:15%;" >
        <el-row>
          <el-col style="margin-top:5%;"><div style="font-size:30px;align-content: center;text-align:center;">找回密码</div></el-col>
          <el-col style="margin-top:2%;" :offset="7" :span="10">
            <el-popover
              ref="popover"
              placement="right"
              title="注意"
              width="200"
              trigger="focus"
              content="5-15字符，请勿包含身份证/银行卡等隐私信息">
            </el-popover>
            <el-input v-model="username" v-popover:popover placeholder="请输入邮箱地址"></el-input>
          </el-col>

          <el-col style="margin-top:2%;margin-bottom:5%;" :offset="7" :span="10">
            <el-button style="width:100%;" @click="next()" type="primary">下一步</el-button>
          </el-col>

        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import topBar from '../../components/hd1/topBar';
  export default {
    name: 'App',
    components: {
      topBar
    },
    data: function () {
      return {
        username:'',
        password: '',
        pics: [
          '/web/static/images/banner.jpg',
          '/web/static/images/banner1.jpg',
          '/web/static/images/banner2.jpg',
        ]
      };
    },
    methods:{
      next(){
        location.href='/html/retrievePassword2.html';
      }
    }
  };
</script>

<style>
  body{

  }
  .m-topBar{
   background-color: #11151c !important;
  }
  .el-carousel__indicators--outside {
    position: absolute;
    bottom: 0px;
  }
  .el-carousel__container {
    position: relative;
    height: 420px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 420px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .userPassword{
    width:350px;
    height:350px;
    background:white;
    margin-top:11%;
    margin-left:-25%;
    border-top:2px solid #0261a7;
  }
</style>
