import bootstrap from '../../bootstrap';
import App from './app';
import Footer from '../footer';
// import Part4 from './part4';
// import Part3 from './part3';
import topBar from '../../components/hd1/topBar';

bootstrap(topBar);
bootstrap(App, {el: '#part2'});
bootstrap(Footer, {el: '#foot'});
// bootstrap(Part4, {el: '#part4'});
// bootstrap(Part3, {el: '#part3'});
