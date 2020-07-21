import bootstrap from '../../bootstrap';
import App from './app';
import Footer from '../footer';


import topBar from '../../components/hd1/topBar';

bootstrap(topBar);
bootstrap(App, {el: '#app'});
bootstrap(Footer, {el: '#foot'});

