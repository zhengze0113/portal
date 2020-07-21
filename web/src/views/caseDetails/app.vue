<template>
  
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
    background-color: #062b5f;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
