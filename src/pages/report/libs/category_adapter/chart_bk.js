
import echarts from 'test/echarts';
import chart_option from 'test/echarts/example';

export default {
    init(dom, instance){
        dom.innerHTML = '';
        let node = document.createElement('div');
        node.style.width = '100%';
        node.style.height = '100%';
        dom.appendChild(node);
        let option = chart_option[instance.type];
        let i = echarts.init(node);
        i.setOption(option);
        return i;
    },
    clear(dom){
        dom.innerHTML = '';
    },
    make(dom, instance){
        this.init(dom, instance);
    },
    resize(d, k){
        if(d.type != 'm') {
            k.resize();
        }
    },
    dbAction(){
        
    }
};