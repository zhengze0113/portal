.<template>
  <div class="m-nav-menu-list">
    <menu-item :menu="menu" />
    <div v-if="menu.children" class="m-submenu-list">
      <div v-for="(submenu, index) in menu.children" :key="index" class="m-submenu-item" ref="ite">
        <ul class="nav">
          <li>
            <span class="li-text">{{submenu.menuTxt}}</span>
            <el-divider></el-divider>
            <menu-area v-if="submenu.children" :menu-list="submenu.children" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from "./menuItem";
import menuArea from "./menuLi";
export default {
  components: {
    menuItem,
    menuArea
  },
  props: {
    menu: {
      type: Object,
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
    this.screenHeight = document.documentElement.clientHeight - 200 + "px";
    this.screenWidth = document.documentElement.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.documentElement.clientHeight - 200 + "px";
        this.screenWidth = document.documentElement.clientWidth;
      })();
    };
    let menu = document.querySelector(".m-submenu-list");
    menu.style.width = this.screenWidth * 0.70 + "px";
    // menu.style.height = document.documentElement.clientHeight - 100 + "px";
  },
  methods: {
    clickTopMenu: menu => {
      if (menu.link) {
        window.open(menu.link, "_self");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.m-submenu-list {
}
.nav {
  list-style: none;
  display: inline;
  li {
    display: inline;
    // line-height: 40px;
    // float: left;
  }
  .li-text {
    font-size: 14px;
  }
}
.el-divider--horizontal {
  width: 123px;
  height: 1px;
  background: rgba(224, 224, 224, 1);
  opacity: 0.3;
  margin: 10px 0 0px 0;
}
</style>>


