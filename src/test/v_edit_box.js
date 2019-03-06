import { resolve } from "url";

export default function(el, bind, vNode){
    let container = el;
    el.style.position = 'absolute';
    el.style.cursor = 'move';
    let actions = ['r', 'b', 'br'];

    let edit_box = document.createElement('div');
    edit_box.classList.add('mxl-edit-box');

    container.setAttribute('tabindex', 1),
    //fix tabindex makeoutline
    container.style.outline = 'none'
    container.addEventListener('blur', function(e){
        edit_box.classList.remove('editing');
    });
    container.addEventListener('mousedown', function(e){
        edit_box.classList.add('editing');
        //todo add click to follow mouse move.

        let ev = e
        edit_box.setAttribute('mxl-edit-drag-move-x', ev.pageX);
        edit_box.setAttribute('mxl-edit-drag-move-y', ev.pageY);
        function x(e){
            let ev = e;
            let res = m(container, edit_box, ev);
            if(bind.value) {
                bind.value(res);
            }
        }
        function y(){
            window.removeEventListener('mousemove', x);
            window.removeEventListener('mouseup', y);
        }
        window.addEventListener('mousemove', x);
        window.addEventListener('mouseup', y);

    });

    actions.forEach((action) => {
        let point = document.createElement('span');
        point.classList.add('mxl-edit-box-point', action);
        point.addEventListener('mousedown', function(e){
            e.stopPropagation();
            e.preventDefault();
            let ev = e;
            edit_box.setAttribute('mxl-edit-move-x', ev.pageX);
            edit_box.setAttribute('mxl-edit-move-y', ev.pageY);
            function x(e){
                let ev = e;
                let res = eval(`${action}(container, edit_box, ev)`);
                if(bind.value) {
                    bind.value(res);
                }
            }
            function y(){
                window.removeEventListener('mousemove', x);
                window.removeEventListener('mouseup', y);
            }
            window.addEventListener('mousemove', x);
            window.addEventListener('mouseup', y);
        });
        edit_box.appendChild(point);
    });

    prependChild(container, edit_box);
};

function pf(d, de = 0){
    d = parseFloat(d);
    return isNaN(d) ? de : d;
}

function b(container, dom, e){
    let ev = e;
    let pageY = pf(dom.getAttribute('mxl-edit-move-y'));
    let range = e.pageY - pageY;
    container.style.height = pf(container.style.height, container.clientHeight) + range + 'px';
    dom.setAttribute('mxl-edit-move-y', ev.pageY);
    return {
        h: range,
        type: 'b'
    }
}
function r(container, dom, e){
    let ev = e;
    let pageX = pf(dom.getAttribute('mxl-edit-move-x'));
    let range = ev.pageX - pageX;
    container.style.width = pf(/%/.test(container.style.width) ? container.clientWidth * pf(container.style.width) / 100 : container.style.width, container.clientWidth) + range + 'px';
    dom.setAttribute('mxl-edit-move-x', ev.pageX);
    return {
        w: range,
        type: 'r'
    }
}
function br(container, dom, e){
    let bRes = b(container, dom, e);
    let rRes = r(container, dom, e);
    return {
        h: bRes.h,
        w: rRes.w,
        type: 'br'
    }
}
function m(container, dom, e){
    let ev = e;
    let pageY = pf(dom.getAttribute('mxl-edit-drag-move-y'));
    let pageX = pf(dom.getAttribute('mxl-edit-drag-move-x'));
    let rangeX = ev.pageX - pageX;
    let rangeY = ev.pageY - pageY;
    container.style.left = pf(container.style.left) + ev.pageX - pageX + 'px';
    container.style.top = pf(container.style.top) + ev.pageY - pageY + 'px';
    dom.setAttribute('mxl-edit-drag-move-y', ev.pageY);
    dom.setAttribute('mxl-edit-drag-move-x', ev.pageX);
    return {
        l: rangeX,
        t: rangeY,
        type: 'm'
    }
}
function prependChild(parent, newChild){
    if(parent.firstChild){
        parent.insertBefore(newChild,parent.firstChild);
    } else {
        parent.appendChild(newChild);
    }
    return parent;
}

function getTransformObj(transform){
    let ts = transform.split(' ');
    let tmp = {};
    if(!transform) {
        return {none: ''};
    }
    ts.forEach(v => {
        v = v.replace(')', '');
        let vs = v.split('(');
        if(vs.length == 1) {
            tmp['none'] = '';
        }else {
            tmp[vs[0]] = vs[1];
        }
    });
    return tmp;
}
function getTransformStr(transformObj){
    let items = Object.keys(transformObj);
    if(transformObj.none !== undefined && items.length !== 1) {
        delete transformObj.none;
    }
    return Object.keys(transformObj).map(v => {
        return v == 'none' ? v : `${v}(${transformObj[v]})`;
    }).join(' ');
}