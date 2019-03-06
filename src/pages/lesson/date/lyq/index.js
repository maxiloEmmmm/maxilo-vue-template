import maxiloVue from 'maxilo-vue';
import './middleware'; 
let $router = maxiloVue.router.getRoute();

//calendar
$router.add('/calendar', () => import ('pages/test/calendar/index.vue'));

//calendar——
$router.add('/calendarT', () => import ('pages/test/calendar/indexT.vue'));

