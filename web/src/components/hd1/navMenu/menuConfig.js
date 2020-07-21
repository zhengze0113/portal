
import baseURL from '../../../api/app'

export default [{
    menuTxt: '最新活动',
    sort: 1,
    link: '/html/activity.html'
  },
  {
    menuTxt: '云产品',
    sort: 2,
    link: '/html/serviceCloud.html',
    children: []
  }
  // ,{
  //   menuTxt: '云社区',
  //   sort: 4,
  //   link: baseURL.BBS
  // }
  ,{
    menuTxt: '应用案例',
    sort: 10,
    link: '/html/about.html?tab=third'
  }, {
    menuTxt: '帮助中心',
    sort: 11,
    link: '/html/help.html'
  }
];
