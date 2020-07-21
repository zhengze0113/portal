<template>
  <div class="aways">
      <div class="m-topBar">
        <slot name="beforeName" />
        <div class="w-name">
          <div class="logo" style="margin-top:5px;">
            <a href="/html">
              <img src="@/static/images/haiyoulogo1.png"  style="width:26%;" />
            </a>
            
          </div>
          <div class="title">
            <a href="/html" class="haiyou">
              <!-- <img src="@/static/images/title.png" /> -->
              中国海油云平台
            </a>
          </div>
        </div>
        <slot name="beforeNavMenu" />

        <slot name="beforeToolBar" />
        <ToolBar />
        <slot name="afterToolBar" />
      </div>
      <div class="m-topBar" style="margin-top:50px">
        <NavMenu />
        <Login />
      </div>
  </div>
</template>

<script>
 import ToolBar from "./toolBar/toolBar";
import NavMenu from "./navMenu/navMenu";
import Login from "./navMenu/Login";
export default {
  name: "App",
  components: {
    ToolBar,
    NavMenu,
    Login
  }
};
</script>
<style  scoped  lang="scss" >
  @import "./index2.scss";
  .haiyou {
  color: #fbfbfb;
  text-decoration: none;
  font-size: 14px;
}
 /*.aways:hover .m-topBar{*/
  /*background-color: #11151c;*/
/*}*/
</style>
