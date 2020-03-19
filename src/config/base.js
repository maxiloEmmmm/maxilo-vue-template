import maxiloVue from 'maxilo-vue';

maxiloVue.config.merge({
    debug: maxiloVue.utils.base.env(process.env.VUE_APP_DEBUG, false),
    locale: 'zh_cn',
    baseURL: maxiloVue.utils.base.env(process.env.VUE_APP_SERVER, 'http://api.com'),
    storeKey: 'hBCVcLsFDCk1Ygo3',
})