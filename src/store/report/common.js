import maxiloVue from 'maxilo-vue';
import draft from 'api/wbd/draft';
const actions = {
    async save(){
        return maxiloVue.http.instance.post(draft.SAVE, {a:1});
    }
};

export default {
    namespaced: true,
    actions,
};