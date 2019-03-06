export default async function (el, bind, vNode, init = true){
    let random = vNode.context.$utils.tool.random('mxl-scroll-');

    /* 需容纳的dom容器 */
    let container = el;
    container.style.position = 'relative';
    container.style.overflowY = 'hidden';

    if(init) {
        if(window.mxlScrollStore === undefined) {
            window.mxlScrollStore = {};
        }
        if(window.mxlScrollStore[random] === undefined) {
            window.mxlScrollStore[random] = {};
        }
        el.setAttribute('mxl-scroll-primary-key', random);

        /* 鼠标移入移出动态显示滚动条 */
        container.addEventListener('mouseenter', () => {
            container.classList.add('mxl-scroll-hover');
        });
        container.addEventListener('mouseleave', () => {
            container.classList.remove('mxl-scroll-hover');
        });
    }else {
        random = el.getAttribute('mxl-scroll-primary-key')
    }

    /* 需容纳的dom */
    let item = vNode.context.$refs[bind.value];
    if(!item) {return }
    else {item = item._isVue ? item.$el : item}

    let existSelfScroll = container.getElementsByClassName('mxl-scroll');
    existSelfScroll.length != 0 && container.removeChild(existSelfScroll[0]);

    /* 滚动条容器 */
    let scroll = document.createElement('div');
    /* 滚动条 */
    let scrollBar = document.createElement('div');
    scrollBar.id = random;

    scroll.appendChild(scrollBar);
    el.appendChild(scroll);

    /* 添加样式类 */
    scroll.classList.add('mxl-scroll');
    scrollBar.classList.add('mxl-scroll-bar');
    if(container.getAttribute('mxl-scroll-bar-class')) {
        scrollBar.classList.add(container.getAttribute('mxl-scroll-bar-class'))
    }

    /* 鼠标滑动系数 */
    let range = container.getAttribute('mxl-scroll-range')
        ? container.getAttribute('mxl-scroll-range') : 45;

    /* 动态生成滚动条容器及滚动条高度 */
    async function r(container, item, scroll, scrollBar,range) {
        await vNode.context.$nextTick();
        let containerCH = container.clientHeight;
        scroll.style.height = containerCH+'px';
        let ratio = containerCH / item.clientHeight;
        scrollBar.style.height = ratio >= 1 ? 0 : (containerCH - ( 
            (range*(ratio))
                *((item.clientHeight - containerCH)/range))) + 'px';
    }
    r(container, item, scroll, scrollBar, range);
    let listen_resize = () => r(container, item, scroll, scrollBar, range);
    if(!init) {
        window.removeEventListener('resize', window.mxlScrollStore[random].resize_func);
    }
    window.mxlScrollStore[random].resize_func = listen_resize;
    window.addEventListener('resize', listen_resize);
    

    let bInfo = vNode.context.$utils.tool.getBroswer();
    /* 动态计算滚动条位置 */
    async function rs(){
        //todo to answer self why need getElementById to find bar not scrollBar.
        document.getElementById(random).style.top = (
            Math.abs(container.scrollTop) * parseInt(container.clientHeight)
        ) / item.clientHeight + container.scrollTop + 'px';
    }
    let listen_wheel = (e) => {
        console.log('scroll container mousewheel');
        let ev = e ? e : window.event;
        ev.preventDefault();
        let isUp = ev.wheelDelta > 0 || ev.detail < 0;

        let $scrollContainer = container;
        let $scrollItem      = item;
        /* 如果dom大小足以容下则卒 */
        let maxScrollTop = $scrollItem.clientHeight - $scrollContainer.clientHeight
        if(maxScrollTop <= 0
        || $scrollContainer.scrollTop > maxScrollTop) {
            return ;
        }
        /* 计算需要改变的值 */
        let l = (isUp ? -1 : 1) * range;
        let sif = $scrollContainer.scrollTop +l;
        /* 如果剩余空间不足以按照规定的系数则向下兼容 */
        if(Math.abs(sif) > maxScrollTop) {
            l = maxScrollTop - $scrollContainer.scrollTop
        }
        /* 如果确定移动则更改dom滚动值及滚动条位置 */
        if(l != 0) {
            //console.log($scrollContainer.scrollTop , l);
            $scrollContainer.scrollTop += l;
            rs();
        }
    }
    /* 监听dom 滚动条事件 */
    let eventName = bInfo.broswer == 'Firefox' ? "DOMMouseScroll" : "mousewheel";
    if(!init) {
        window.removeEventListener(eventName, window.mxlScrollStore[random].wheel_func);
    }
    window.mxlScrollStore[random].wheel_func = listen_wheel;
    container.addEventListener(eventName, listen_wheel);
    
    /* 计算手动拖动滚动条后dom及滚动条的位置 */
    function d(e){
        let ev = e;
        ev.preventDefault();
        let range = ev.pageY - window.mxlScrollBarStart[random].position;
        container.scrollTop += range * item.clientHeight / container.clientHeight;
        rs();
        window.mxlScrollBarStart[random].position = ev.pageY;
    }
    /* 添加滚动鼠标拖动事件 */
    scrollBar.addEventListener('mousedown', function(e){
        console.log('scroll mousedown');
        let ev = e;
        ev.preventDefault();
        window.mxlScrollBarStart[random].position = ev.pageY;
        window.addEventListener('mousemove', d);
        window.mxlScrollBarStart[random].mousemove_func = d;
        let hook = () => {
            window.removeEventListener('mousemove', window.mxlScrollBarStart[random].mousemove_func);
            window.removeEventListener('mouseup', window.mxlScrollBarStart[random].mouseup_func);
        };
        window.mxlScrollBarStart[random].mouseup_func = hook
        window.addEventListener('mouseup', hook);
    });
}