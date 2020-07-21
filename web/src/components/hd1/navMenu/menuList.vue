.<template>
  <div class="m-nav-menu-list">
    <menu-item :menu="menu" />

    <div v-if="menu.children" class="m-submenu-list">
      <div v-for="(submenu, index) in menu.children" :key="index" class="m-submenu-item">
        <menu-item :menu="submenu" />
        <menu-area v-if="submenu.children" :menu-list="submenu.children" />
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from './menuItem';
import menuArea from './menuArea';
export default {
  components: {
    menuItem,
    menuArea
  },
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
  },
  data(){
    return{
      list: [],
      list1: [],
      listLoading:false,
      screenHeight:''
    }
  },
  mounted(){
    this.screenHeight = (document.documentElement.clientHeight - 200)+'px' ;
    window.onresize = () => {
      return (() => {
        this.screenHeight = (document.documentElement.clientHeight - 200)+'px' ;
      })();
    }
  },
  methods: {
    clickTopMenu: (menu) => {
      if (menu.link) {
        window.open(menu.link, '_self');
      }
    },

  }
};
</script>

