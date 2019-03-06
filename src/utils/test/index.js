import maxiloVue from 'maxilo-vue';
import get from 'lodash/get';
import set from 'lodash/set';
/* 
this.$utils.some
maxiloVue.utils.add('some', function(){
    
}); 


this.$utils.other.q
maxiloVue.utils.add('other.q', function(){

});
*/

maxiloVue.utils.add('async.alert', async function(ds, s = 0, sMsg = {}){
    if (ds.code === s) {
        await this.app.alert.base({ type: 'success', title: '操作成功' });
    } else if (ds.status === 600) {
        await this.app.alert.base({ type: 'warning', title: '信息有误!', text: this.$utils.lumen.validateErr(ds.err), time: 1000, html: true });
    } else {
        await this.app.alert.base({ type: 'warning', title: sMsg[ds.status] !== undefined ? sMsg[ds.status] : '操作失败' });
    }
}, true);

maxiloVue.utils.add('tool.pf', function(d, de = 0){
    d = parseFloat(d);
    return isNaN(d) ? de : d;
});

maxiloVue.utils.add('tool.resize', function riseze (el, cb) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'mxl-resize-wrapper');
    el.appendChild(iframe);

    let oldWidth = el.offsetWidth;
    let oldHeight = el.offsetHeight;

    function sizeChange () {
        let width = el.offsetWidth;
        let height = el.offsetHeight;
        if (width !== oldWidth || height !== oldHeight) {
            cb({width: width, height: height}, {width: oldWidth, height: oldHeight});
            oldWidth = width;
            oldHeight = height;
        }
    }

    let timer = 0;
    iframe.contentWindow.onresize = function () {
        clearTimeout(timer);
        timer = setTimeout(sizeChange, 20);
    };
});

maxiloVue.utils.add('_.get', function(){
    return get(...arguments);
})
maxiloVue.utils.add('_.set', function(){
    return set(...arguments);
})