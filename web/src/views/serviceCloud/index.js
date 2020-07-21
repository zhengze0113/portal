import bootstrap from '../../bootstrap';
import App from './app';
import Footer from '../footer';
import Part3 from './part3';
import topBar from '../../components/hd1/topBar';

bootstrap(topBar);
bootstrap(App, {el: '#part2'});
bootstrap(Part3, {el: '#part3'});
bootstrap(Footer, {el: '#foot'});


