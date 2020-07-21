<template>
  <div id="part3"  name='part3' ref="part3">
    <el-row style="background:#fff;">
      <el-col>
        <el-row>
          <el-col>
            <el-tabs id="tabs" v-model="activeName" stretch>
              <el-tab-pane name="first">
                <div slot="label">
                  <div class="titleNumber">
                    01
                  </div>
                  <el-divider />
                  <div class="titleText">
                    公司概览
                  </div>
                </div>
                <Intro style="margin:0 7.5% 10%;" />
              </el-tab-pane>
              <el-tab-pane name="second">
                <div slot="label">
                  <div class="titleNumber">
                    02
                  </div>
                  <el-divider />
                  <div class="titleText">
                    特色服务
                  </div>
                </div>
                <Service style="margin:0 12.5% 10%;" />
              </el-tab-pane>
              <el-tab-pane name="third" >
                <div slot="label">
                  <div class="titleNumber">
                    03
                  </div>
                  <el-divider />
                  <div class="titleText">
                    应用案例
                  </div>
                </div>
                <Case style="margin:0 7.5% 10%;" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Intro from './intro';
import Service from './service';
import Case from './case';
export default {
  components: {
    Intro,
    Service,
    Case
  },
  data() {
    return {
      visible: true,
      activeName: 'first'
    };
  },
  created() {
    if (this.getId('tab') == null) {
      this.activeName = 'first';
    }else{ 
      this.activeName  = this.getId('tab').replace(/[^a-z]+/ig,"");
      
    }
  },
  // 锚点跳转
  mounted: function() {
    var hash = window.location.hash;
    var index = hash.lastIndexOf("#");
    if (index != -1) {
      var id = hash.substring(index + 1, hash.length + 1);
      var div = document.getElementById(id);
      if (div) {
        setTimeout(function() {
          //$('html,body').scrollTop($(div).offset().top - 43);
          $("html, body").animate({ scrollTop: $(div).offset().top - 43 }, 500);
        }, 500);
      }
    }
  },

  methods: {
    getId(name) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
            location.href
          ) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
      );
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__item {
  height: 0%;
  // padding-right: 183%;
}
// /deep/ .el-tabs__active-bar {
//   width: 100px !important;
// }
/deep/ .el-divider--horizontal {
  margin: 0;
}
/deep/ .el-tabs__header {
  padding-left: 12.5%;
  padding-right: 3.5%;
  background: #fff;
}
.el-divider--horizontal {
  width: 33%;
}
/deep/.el-tabs__nav-wrap::after {
  background-color: #fff;
}
/deep/.el-tabs__active-bar {
  width: 80px !important;
}
.titleNumber {
  position: relative;
  width: 90px;
  text-align: right;
  // left: 80%;
}
.titleText {
  float: left;
}
</style>
