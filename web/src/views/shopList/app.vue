<template>
  <div id="app">
        <img src="/web/static/images/shopBg.png" alt="" style="width:100%;">
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {

    };
  }
};
</script>

<style>
body{
  
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
</style>
