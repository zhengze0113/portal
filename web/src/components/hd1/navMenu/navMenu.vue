<template>
  <div class="m-menu-container">
    <div v-for="menu in navMenuConfig" :key="menu.text" class="m-menu">
      <menu-item v-if="!menu.children" :menu="menu" />
      <!-- <menu-list v-if="menu.children" :menu="menu" /> -->
      <menu-test v-if="menu.children" :menu="menu" />
    </div>
  </div>
</template>

<script>
import './index1.scss';
import navMenuConfig from './menuConfig';
import menuItem from './menuItem';
import menuList from './menuList';
import menuTest from './menuTest';
import {
  getCloudServiceList,
  getCloudServiceResources,
  getCloudServiceCatalogs,
  getCloudServiceCatalogsC
} from '../../../api/serviceOperating';
import {
  requestParams,
  parseHash,
  appendParamsToUrl
} from '../../../utils/urlParam';
export default {
  components: {
    menuItem,
    menuList,
    menuTest
  },
  data: function() {
    return {
      navMenuConfig: navMenuConfig
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //获取数据
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceCatalogs);
      this.list = res.content.content;
      for (var i = 0; i < this.list.length; i++) {
        var child = {
          menuTxt: this.list[i].name,
          children: []
        };

        const res1 = await requestParams(
          getCloudServiceCatalogsC,
          this.list[i].id
        );
        this.list1 = res1.content.content;
        for (var j = 0; j < this.list1.length; j++) {
          var childs = {
            menuTxt: null,
            link:`/html/productDetail1.html?id=${this.list1[j].id}&productName=${this.list1[j].name}&catalogId=${this.list[i].id}&catalog=${this.list[i].name}`  
          };
          childs.menuTxt = this.list1[j].name;
          child.children.push(childs);
        }
        this.navMenuConfig[1].children.push(child);
      }
      this.listLoading = false;
    },
  }
};
</script>

<style scoped>
.m-menu-item,
.m-nav-menu-list {
  /* width: 56px; */
  height: 19px;
  /* filter: blur(10px); */
  color: #fbfbfb;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  font-weight: 290;
  line-height: 49px;
}
</style>
