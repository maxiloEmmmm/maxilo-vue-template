import maxiloVue from 'maxilo-vue';
const restful = function(pre, merge = {}){
    Object.keys(merge).forEach(v => {
        merge[v] = pre + merge[v];
    });
    return maxiloVue.utils._.merge({}, {
        DELETE: pre,
        STORE: pre,
        INDEX: pre,
        SHOW: pre,
        UPDATE: pre,
        EXIST: pre
    }, merge);
};
export default restful;