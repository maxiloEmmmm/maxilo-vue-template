import types from './mutations-type';
import maxiloVue from 'maxilo-vue';
const state = {
    userinfo: {}
};

const getters = {
    userinfo: state => state.userinfo,
    login: state => Object.keys(state.userinfo).length,
};

const actions = {
    login({ commit }, userinfo) {
        return new Promise(async (resolve, reject) => {
            commit(types.USER.SET_USER, {username: 'hello'});
            resolve();
        });
    },
    loginOut({ commit }) {
        return new Promise(async (resolve, reject) => {
            commit(types.USER.SET_DESTORY);
            resolve();
        });
    },
    test({commit}, u) {
        commit(types.USER.SET_USER, u);
    }
};

const mutations = {
    [types.USER.SET_DESTORY](state) {
        state.userinfo = {};
    },
    [types.USER.SET_USER](state, userData) {
        state.userinfo = userData;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};