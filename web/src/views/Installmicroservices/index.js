import bootstrap from '../../bootstrap';
import Footer from '../footer';
import topBar from '../../components/hd1/topBar';
import App from './app';

bootstrap(topBar);
bootstrap(App, {el: '#part2'});
bootstrap(Footer, {el: '#foot'});
