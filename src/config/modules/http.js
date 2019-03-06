import maxiloVue from 'maxilo-vue';

/* 
响应超时时间
maxiloVue.http.request_time_out = 60000; */

/* 响应异常处理 
 maxiloVue.http.adapter.responseErrorException = function(e){
    
};*/

/* 
xhr 请求过滤器
maxiloVue.http.adapter.beforeRequest = function (xhr) {
    let juid = maxiloVue.store.instance.getters[maxiloVue.utils.tool.getSystemKey() + 'Auth/juid'];
    if(juid) {
        xhr.setRequestHeader('juid', juid);
    }
}; 
*/

maxiloVue.http.adapter.dataAdapter = function (d) {
    return d.data;
};