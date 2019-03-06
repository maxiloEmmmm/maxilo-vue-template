import maxiloVue from 'maxilo-vue';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
const state = function(){
    return {
        area: {w: 0, h: 0, p: {t: 0}},
        use_grid_line: false,
        content: {
            area: {
                p: {
                    t: 0,
                    l: 0
                }
            }
        },
        scale: 1
    }
}

const getters = {
};

const actions = {
    setViewScale({state, commit}, scale){
        commit('repairScale', parseFloat(scale));
    },
    setWrapperScale({state, commit}, scale){
        commit('set', {
            scale: parseFloat((state.scale+scale).toFixed(1))
        });
    },
    setWrapperWidth({commit}, w) {
        commit('set', {
            area: {w}
        });
        return this;
    },
    setWrapperHeight({commit}, h) {
        commit('set', {
            area: {h}
        });
        return this;
    },
    setWrapperDesignContentTop({commit}, t){
        commit('set', maxiloVue.utils._.set({}, 'content.area.p.t', t));
    },
    setWrapperDesignContentLeft({commit}, l){
        commit('set', maxiloVue.utils._.set({}, 'content.area.p.l', l));
    },
    setUseGridLine({commit}, u){
        commit('set', {
            use_grid_line: u
        });
        return this;
    }
};

const mutations = {
    set(state, payload) {
        if(payload.scale !== undefined) {
            if(payload.scale < 0.1) {
                payload.scale = 0.1
            }
            if(payload.scale > 2) {
                payload.scale = 2
            }
        }
        state = merge(state, payload);
    },
    repairScale(state, payload){
        state.scale = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};