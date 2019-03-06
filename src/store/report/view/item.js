import maxiloVue from 'maxilo-vue';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
const state = function(){
    return {
        item: {}
    }
}

const getters = {
};

const actions = {
    setItem({commit}, item){
        commit('setItem', item);
    }
};

const mutations = {
    setItem(state, payload){
        state.item = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};