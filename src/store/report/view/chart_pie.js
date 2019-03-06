import maxiloVue from 'maxilo-vue';
import merge from 'lodash/merge';
const state = function(){
    return {
        option: {
            series: [
                {
                    label: {
                        show: false,
                        formatter: ''
                    },
                    clockwise: true,
                    radius: {
                        n: 0,
                        w: '75%'
                    }
                }
            ],
            tooltip: {
                show: false
            }
        }
    }
}

const getters = {
};

const actions = {
    setOption({commit}, size){
        commit('set', {
            option
        });
    },
    setLabelShow({commit}, show){
        commit('set', maxiloVue.utils._.set({}, 'option.series[0].label.show', show));
    },
    setLabelFormatter({commit}, formatter){
        commit('set', maxiloVue.utils._.set({}, 'option.series[0].label.formatter', formatter));
    },
    setLabelClockwise({commit}, clockwise){
        commit('set', maxiloVue.utils._.set({}, 'option.series[0].clockwise', clockwise));
    },
    setNRadius({commit}, n_radius){
        commit('set', maxiloVue.utils._.set({}, 'option.series[0].radius.n', n_radius));
    },
    setWRadius({commit}, w_radius){
        commit('set', maxiloVue.utils._.set({}, 'option.series[0].radius.w', w_radius));
    },
    setTooltipShow({commit}, show){
        commit('set', maxiloVue.utils._.set({}, 'option.tooltip.show', show));
    }
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