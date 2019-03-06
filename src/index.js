import maxiloVue from 'maxilo-vue';
import App from './App';
import './router';
import './config';
import './store';
import './i18n';
import './utils';
import './component';

//fix scroll in componment.
// import v_scroll from 'test/v_scroll';
// maxiloVue.vue.use({install(v){
//     v.directive('mxlScroll', {
//         bind(el, bind, vNode){
//             v_scroll(el, bind, vNode)
//         },
//         componentUpdated(el, bind, vNode){
//             v_scroll(el, bind, vNode, false)
//         }
//     });
// }});

import v_db_click from 'test/v_db_click';
maxiloVue.vue.use({install(v){
    v.directive('mxlDbClick', {
        bind(el, bind, vNode){
            v_db_click(el, bind, vNode)
        }
    });
}});
import v_edit_box from 'test/v_edit_box';
maxiloVue.vue.use({install(v){
    v.directive('mxlEditBox', {
        bind(el, bind, vNode){
            v_edit_box(el, bind, vNode)
        }
    });
}});
maxiloVue.vue.use({install(v){
    v.config.ignoredElements = ['canvas-datagrid'];
}});
maxiloVue.targetComponent = App;
maxiloVue.run();