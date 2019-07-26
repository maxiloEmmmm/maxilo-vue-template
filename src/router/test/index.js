import maxiloVue from 'maxilo-vue';
import './middleware'; 
let $router = maxiloVue.router.getRoute();

$router.add('/path/to', () => import('pages/test/index'));
