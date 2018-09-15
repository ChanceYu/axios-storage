// 设置默认参数
axios.defaults.responseType = 'json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 配置缓存
AxiosStorage.config({
    storagePrefix: 'axios-storage-example:',
    storageMode: 'sessionStorage'
});

var api = axios.create({
    adapter: AxiosStorage.adapter
});

var formBox = document.getElementById('formBox');
var selectUrl = document.getElementById('selectUrl');
var selectMode = document.getElementById('selectMode');

/**
 * 请求数据
 */
document.getElementById('btnSend').addEventListener('click', function(e){
    var url = selectUrl.value;
    var mode = selectMode.value;
    var params = getParams();
    
    api({
        method: 'get',
        url: url,
        params: params,
        cacheConfig: {
            maxAge: 60 * 60 * 1000,
            storageMode: mode
        }
    })
    .then(function(res){
        document.getElementById('resultValue').innerHTML = JSON.stringify(res.data, null, 2);
        console.log(res);
    })
    .catch(function(e){
        console.log(e);
    });
}, false);

/**
 * 新增请求参数
 */
document.getElementById('btnAdd').addEventListener('click', function(){
    var row = document.createElement('div');
    
    row.className = 'row';
    row.innerHTML = '<input type="text" placeholder="key" class="key" /><span>=</span><input type="text" placeholder="value" class="value" /><button type="button" class="remove">-</button>';
    
    formBox.appendChild(row);
}, false);

/**
 * 删除请求参数
 */
formBox.addEventListener('click', function(e){
    var target = e.target;

    if(target.className == 'remove'){
        formBox.removeChild(target.parentNode)
    }
}, false);

/**
 * 清除指定模式缓存
 */
document.getElementById('btnRemove').addEventListener('click', function(e){
    var mode = selectMode.value;

    var oCache = AxiosStorage.getCache(mode);

    oCache.removeAll();
}, false);

/**
 * 清除所有缓存
 */
document.getElementById('btnRemoveAll').addEventListener('click', function(e){
    AxiosStorage.getCache('sessionStorage').removeAll();
    AxiosStorage.getCache('localStorage').removeAll();
    AxiosStorage.getCache('memory').removeAll();
}, false);

/**
 * 获取请求参数
 */
function getParams(){
    var result = {};
    var keyElems = document.querySelectorAll('.key');
    var valueElems = document.querySelectorAll('.value');

    keyElems = Array.prototype.slice.call(keyElems);
    valueElems = Array.prototype.slice.call(valueElems);

    for(var i = 0; i < keyElems.length; i++){
        var key = keyElems[i].value;
        var value = valueElems[i].value;

        if(key){
            result[key] = value || '';
        }
    }

    return result;
}