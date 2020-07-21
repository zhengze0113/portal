<template>
 <!-- <div>
    <div class="m-topBar">
      <slot name="beforeName" />
      <div class="w-name">
        <div class="logo" style="margin-top:-5px;margin-left:200%;">
          <a href="#/dashboard/main">
            <img src="@/static/images/logo.png">
          </a>
        </div>
      </div>
      </div>
    </div>-->
<div>
  <div class="m-topBar">
      <div style="margin-left:15%;"><img src="@/static/images/logo.png"></div>
      <div style="margin-top:1%;"><img src="@/static/images/line.png"></div>
      <div style="margin-left:1%;padding-top:3px;color: #0261a7;">重置密码</div>
      <div @click="back" style="margin-left:55%;padding-top:3px;color: #0261a7; cursor:pointer;">返回首页</div>
  </div>
</div>
</template>

<script>
  import './index.scss';
  import ToolBar from './toolBar/toolBar';
  import NavMenu from './navMenu/navMenu';
  export default {
    name: 'App',
    components: {
      ToolBar,
      NavMenu
    },
    methods:{
      back(){
        location.href='/html';
      }
    }
  };
</script>

