import maxiloVue from 'maxilo-vue';
import './middleware'; 
let $router = maxiloVue.router.getRoute();

$router.add('/path/to', () => import('pages/test/index'));
$router.add('/system/rbac/roleGroup', () => import('pages/rbac/role_group'));
$router.add('/system/rbac/role', () => import('pages/rbac/role'));
$router.add('/system/user', () => import('pages/user/index'));
$router.add('/system/user-group', () => import('pages/user/group'));


$router.add('/system/field/table', () => import('pages/field/table'));
$router.add('/system/field/action', () => import('pages/field/action'));


$router.add('/post', () => import('pages/post'));
$router.add('/curd', () => import('pages/curd'));
$router.add('/menu', () => import('pages/menu.vue'));
$router.add('/report', () => import('pages/report'));
$router.add('/test/menu', () => import('pages/report/menu.vue'));
$router.add('/test/alone', () => import('pages/report/alone.vue'));
$router.add('/test/edit-box', () => import('pages/report/edit_box.vue'));

$router.add('/dashboard', () => import('pages/dashboard.vue'));

$router.add('/test/event', () => import('pages/test/event.vue'));
$router.add('/test/select', () => import('pages/test/select.vue'));
$router.add('/test/editTable', () => import('pages/test/editTable.vue'));

$router.add('/test1', () => import('pages/test1.vue'));
$router.add('/test2', () => import('pages/test2.vue'));
$router.add('/test/form', () => import('pages/test/form.vue'));
$router.add('/test/set', () => import('pages/test/set.vue'));
$router.add('/test/chart', () => import('pages/test/chart.vue'));
$router.add('/test/color', () => import('pages/test/color.vue'));
$router.add('/test/wrapper', () => import('pages/test/wrapper.vue'));
$router.add('/test/position', () => import('pages/test/position.vue'));
$router.add('/test/listItem', () => import('pages/test/listItem.vue'));
$router.add('/test/yeshuzhi', () => import('pages/test/yeshuzhi/index.vue'));

$router.add('/l/1/select/zx', () => import('pages/lesson/select/zhaoxue.vue'));
$router.add('/l/1/select/lzy', () => import('pages/lesson/select/lzy.vue'));
$router.add('/l/1/select/lyq', () => import('pages/lesson/select/lyq.vue'));

$router.add('/l/2/date/lyq', () => import('pages/lesson/date/lyq/calendar/indexT.vue'));
$router.add('/l/2/date/zx', () => import('pages/lesson/date/zx.vue'));

$router.add('/l/3/lodash/get/maxilo', () => import('pages/lesson/lodash/get/maxilo'));
