
import 'element-ui/lib/theme-chalk/index.css';
import '@/static/style/views/index.scss';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import animated from 'animate.css'

import store from './store';

import Vue from 'vue';
// import GeminiScrollbar from 'vue-gemini-scrollbar';

// Vue.use(GeminiScrollbar);
// 引入的element

import Element from 'element-ui';
Vue.use(Element);
Vue.use(animated);

import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);
/**
 * 页面初始化加载
 * @param {*} App 加载的页面组件名
 * @param {*} option 加载时的配置内容
 */
// var scrollbar = new Vue.$geminiScrollbar({
//   element: document.body
// }).create();
// Vue.use(scrollbar);
export default async function bootstrap(App, option = {}) {

  if (option.preStart) {
    await option.preStart();
  }

  new Vue({
    el: option.el || '#app',
    store,
    render: h => h(App)
  });
}

