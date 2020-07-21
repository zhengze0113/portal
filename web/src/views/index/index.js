import bootstrap from '../../bootstrap';
import App from './app';
import Part3 from './part3';
import Part4 from './part4';
import Part5 from './part5';
import Part6 from './part6';
import Footer from '../footer';
import topBar from '../../components/hd1/topBar';

import {getContacts, getActivity, getActivityInfo, createdActivityInfo} from '../../api/contect';

bootstrap(topBar);
bootstrap(App, {el: '#part2'});
bootstrap(Part3, {el: '#part3'});
bootstrap(Part4, {el: '#part4'});
bootstrap(Part5, {el: '#part5'});
bootstrap(Part6, {el: '#part6'});
bootstrap(Footer, {el: '#foot'});




//getContacts().then(r => console.log(r));
// console.log("这是服务");
// getActivity().then(r => console.log(r));
//
// getActivityInfo(1).then(r => console.log(r))


// const test = {
//   "category": "test",
//   "content": "test",
//   "deleted": true,
//   "status": "test",
//   "title": "test"}
// createdActivityInfo(test).then(r => console.log(r));
