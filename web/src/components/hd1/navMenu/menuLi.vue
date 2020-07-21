<template>
  <div class="m-submenu-area1">
    <el-row>
      <el-col v-for="(menu, index) in menuList" :key="index" class="m-area-menu">
        <ul class="navs">
          <li>
            <!-- <png-icon :icon-class="menu.icon" /> -->
            <menu-item :menu="menu" :add-cls="'m-area-menu-item'" />
          </li>
        </ul>

        <!-- <div v-if="menu.children" class="m-submenu-area-list">
          <div v-for="(submenu, sindex) in menu.children" :key="sindex">
            <menu-item :menu="submenu" :add-cls="'m-submenu-area-list-item'" />
          </div>
        </div>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import menuItem from "./menuItem";
export default {
  components: {
    menuItem
  },
  props: {
    menuList: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      list: [],
      list1: [],
      listLoading: false,
      screenHeight: "",
      screenWidth: ""
    };
  },
  mounted() {
    this.screenHeight = document.documentElement.clientHeight * 0.66 + "px";
    this.screenWidth = document.documentElement.clientWidth * 0.8 + "px";
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.documentElement.clientWidth * 0.8 + "px";
        this.screenHeight = document.documentElement.clientHeight * 0.66 + "px";
      })();
    };
  }
};
</script>

<style scoped lang="scss">
.navs {
  list-style: none;

  li {
    display: block;
    // line-height: 40px;
    // float: left;
  }
}
</style>
