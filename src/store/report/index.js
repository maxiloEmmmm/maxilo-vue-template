import maxiloVue from 'maxilo-vue';
import view from './view';
import common from './common';

maxiloVue.store.add('report', {
    namespaced: true,
    modules: {
        view,
        common
    }
});

//getters['test/auth/x']

//pages/test/index.vue
//  methods
//      t this.$store.dispatch('test/auth/test', {u:123});