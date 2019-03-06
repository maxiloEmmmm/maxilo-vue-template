import maxiloVue from 'maxilo-vue';
import merge from 'lodash/merge';
const state = function(){
    return {
        sheet: {
            fontSize: 0
        },
        placeholder: '',
        content: ''
    }
}

const getters = {
};

const actions = {
    setSheetFontSize({commit}, size){
        commit('set', {
            sheet: {fontSize: size}
        });
    },
    setPlaceholder({commit}, placeholder){
        commit('set', {
            placeholder
        });
    },
    setContent({commit}, content){
        commit('set', {
            content
        });
    },
};

const mutations = {
    set(state, payload) {
        state = merge(state, payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};