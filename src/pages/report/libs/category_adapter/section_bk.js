
import tool from 'maxilo-vue/lib/core/utils/tool.js'
function pf(d, de = 0){
    d = parseFloat(d);
    return isNaN(d) ? de : d;
}
export default {
    init(dom, instance){
        dom.innerHTML = '';
        let node = null;
        switch(instance.type) {
            case 'title': {
                node = document.createElement('h2');
                node.style.textAlign = 'center'
                node.setAttribute('contenteditable', false);
            }
        }
        let key = tool.random('mxl-report-section-');
        
        node.style.width = instance.area.width + 'px'
        node.style.height = instance.area.height + 'px';
        node.style.border = '1px solid red';
        dom.setAttribute('id', key);
        dom.appendChild(node);
        node.addEventListener('click', function(e){
            e.preventDefault();
        });
        return key;
    },
    clear(){

    },
    make(dom, instance){
        return this.init(dom, instance);
    },
    resize(d, key){
        let dom = document.getElementById(key).children[0];
        switch(d.type){
            case 'r': {
                dom.style.width = pf(dom.style.width) + d.w + 'px';
            }break;
            case 'b': {
                dom.style.height = pf(dom.style.height) + d.h + 'px';
            }break;
            case 'br': {
                dom.style.width = pf(dom.style.width) + d.w + 'px';
                dom.style.height = pf(dom.style.height) + d.h + 'px';
            }
        }
    },
    dbAction(dom, instance){
        switch(instance.type) {
            case 'title': {
                dom.children[0].setAttribute('contenteditable', true);
                dom.children[0].focus();
            }
        }
    },
};