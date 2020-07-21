<template>
  <div id="app">
    <el-row>
      <el-col :offset="4" :span="16" style="background:white; margin-top:10%;margin-bottom:5%;" >
          <el-row>
            <el-col style="margin-top:5%;"><div style="font-size:30px;align-content: center;text-align:center;">欢迎注册中国海油云平台</div></el-col>
            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-popover
                ref="popover"
                placement="right"
                title="注意"
                width="200"
                trigger="focus"
                content="5-15字符，请勿包含身份证/银行卡等隐私信息">
              </el-popover>
              <el-input v-model="username" v-popover:popover placeholder="请设置你的用户名"></el-input>
            </el-col>

            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-input v-model="password"  placeholder="请设置你的登录密码" show-password></el-input>
            </el-col>

            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-input v-model="password"  placeholder="再次输入您的密码" show-password></el-input>
            </el-col>
            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-select v-model="value" placeholder="请选择用户类型" style="width:100%;">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-input v-model="username"  placeholder="请输入邮箱"></el-input>
            </el-col>
            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-input v-model="username"  placeholder="请输入手机号"></el-input>
            </el-col>
            <el-col style="margin-top:2%;" :offset="7" :span="6">
              <el-input v-model="username"  placeholder="请输入图片码"></el-input>
            </el-col>
            <el-col :span="6" style="margin-left:2%;margin-top:1%;">
              <img src="@/static/images/number.png">
            </el-col>

            <el-col style="margin-top:2%;" :offset="7" :span="6">
              <el-input v-model="username"  placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="3" style="margin-left:2%;margin-top:2%;">
              <el-button style="width:100%;">获取验证码</el-button>
            </el-col>

            <el-col style="margin-top:2%;" :offset="7" :span="10">
              <el-checkbox v-model="checked">我已阅读并同意 用户协议 和 隐私声明</el-checkbox>
            </el-col>

            <el-col style="margin-top:2%;margin-bottom:5%;" :offset="7" :span="10">
              <el-button style="width:100%;" type="primary">同意条款并提交</el-button>
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
        checked: false,
        password: '',
        pics: [
          'web/static/images/banner.jpg',
          'web/static/images/banner1.jpg',
          'web/static/images/banner2.jpg',
        ],
        options: [{
          value: '身份证',
          label: '身份证'
        }, {
          value: '护照',
          label: '护照'
        }],
        value: ''
      };
    },
    methods:{
      registerUser(){
        alert("注册")
      },
      updatePasswrod(){
        alert("修改密码")
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
