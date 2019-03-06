export default function(el, bind, vNode){
    el.addEventListener('click', function(){
        let tag = el.getAttribute('mxl-db-click-time');
        let now = new Date()
        if(tag) {
            if(now.getTime() - (new Date(tag)).getTime() < 1200) {
                bind.value();
                el.setAttribute('mxl-db-click-time', '');
            }else {
                el.setAttribute('mxl-db-click-time', now.toString());
            }
        }else {
            el.setAttribute('mxl-db-click-time', now.toString());
        }
    });
};