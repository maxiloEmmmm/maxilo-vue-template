import maxiloVue from 'maxilo-vue';
const configs = {
    debug: maxiloVue.utils.base.env(process.env.VUE_APP_DEBUG, false),
    locale: 'zh_cn',
    baseURL: maxiloVue.utils.base.env(process.env.VUE_APP_SERVER, 'http://api.com'),
    storeKey: 'hBCVcLsFDCk1Ygo3',
};

maxiloVue.config.merge(configs)

export default maxiloVue.config.cs;