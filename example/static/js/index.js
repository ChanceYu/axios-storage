// 设置默认参数
axios.defaults.responseType = 'json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


// 配置缓存
AxiosStorage.config({
    storagePrefix: 'axios-storage-example:'
});

var api = axios.create({
    adapter: AxiosStorage.adapter
});

var formBox = document.getElementById('formBox');
var btnAdd = document.getElementById('btnAdd');
var selectUrl = document.getElementById('selectUrl');
var btnSend = document.getElementById('btnSend');
var resultValue = document.getElementById('resultValue');

// 请求数据
btnSend.addEventListener('click', function(e){
    var url = selectUrl.value;
    var params = getParams();
    
    api({
        method: 'get',
        url: url,
        params: params,
        cacheConfig: {
            maxAge: 60 * 60 * 1000
        }
    })
    .then(function(res){
        resultValue.innerHTML = JSON.stringify(res.data, null, 2);
        console.log(res);
    })
    .catch(function(e){
        console.log(e);
    });
}, false);


btnAdd.addEventListener('click', function(){
    var row = document.createElement('div');
    
    row.className = 'row';
    row.innerHTML = '<input type="text" placeholder="key" /><span>=</span><input type="text" placeholder="value" /><button type="button" class="btnRemove">-</button>';
    
    formBox.appendChild(row);
}, false);

formBox.addEventListener('click', function(e){
    var target = e.target;

    if(target.className == 'btnRemove'){
        formBox.removeChild(target.parentNode)
    }
}, false);

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