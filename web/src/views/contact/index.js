import bootstrap from '../../bootstrap';
import App from './app';
import Footer from '../footer';

import Part44 from './part44';
import topBar from '../../components/hd1/topBar';

bootstrap(topBar);
bootstrap(App, {el: '#part2'});
bootstrap(Footer, {el: '#foot'});

bootstrap(Part44, {el: '#part44'});
