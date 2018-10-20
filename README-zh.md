# axios-storage

[![NPM][img-npm]][url-npm]

[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

[English](./README.md) | [中文](./README-zh.md)

axios 库请求缓存插件

## 特点

- 支持 `localStorage`、`sessionStorage`、`memory` 三种模式
- 支持每个请求单独配置
- 如果本次请求参数和上次的不一致，那么不使用缓存，而是会重新发起请求


## 安装
使用 npm:

```bash
npm install axios-storage --save
```

使用 cdn:

```html
<script src="https://unpkg.com/axios-storage/dist/axios-storage.js"></script>
```


## 使用

```javascript
import axios from 'axios';
import AxiosStorage from 'axios-storage';

// 全局配置
AxiosStorage.config({
    storagePrefix: 'axios-storage',
    storageMode: 'sessionStorage',
    maxAge: 120 * 60 * 1000
});

const api = axios.create({
    adapter: AxiosStorage.adapter
});

api({
    method: 'get',
    url: '/data',
    cacheConfig: {
        maxAge: 60 * 60 * 1000,
        storageMode: 'sessionStorage'
    }
})
.then(function(res){
    console.log(res);
})

api({
    method: 'get',
    url: '/data/other',
    cacheConfig: {
        maxAge: 60 * 60 * 1000,
        storageMode: 'localStorage'
    }
})
.then(function(res){
    console.log(res);
})

// 使用全局配置
api({
    method: 'get',
    url: '/data/other',
    cacheConfig: true
})
.then(function(res){
    console.log(res);
})
```


<a name="AxiosStorage"></a>

## API

* [AxiosStorage](#AxiosStorage)
    * [.config(options)](#AxiosStorage.config)
    * [.adapter()](#AxiosStorage.adapter)
    * [.getCache(options)](#AxiosStorage.getCache) ⇒ <code>object</code>

<a name="AxiosStorage.config"></a>

### AxiosStorage.config(options)
全局配置参数，
查看所有参数[详情](http://www.pseudobry.com/CacheFactory/latest/Cache.html)


| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.storagePrefix] | <code>string</code> | <code>&quot;axios-storage&quot;</code> | storage 缓存前缀 |
| [options.storageMode] | <code>string</code> | <code>&quot;sessionStorage&quot;</code> | 缓存模式，支持 `localStorage`、`sessionStorage`、`memory` |
| [options.deleteOnExpire] | <code>string</code> | <code>&quot;aggressive&quot;</code> | 如何处理过期的缓存，默认过期就会删除 |

**示例**  
```js
import axios from 'axios';
import AxiosStorage from 'axios-storage';

AxiosStorage.config({
  storagePrefix: 'axios-storage-example:',
  storageMode: 'sessionStorage'
});
```
<a name="AxiosStorage.adapter"></a>

### AxiosStorage.adapter()
适配器

**示例**  
```js
import axios from 'axios';
import AxiosStorage from 'axios-storage';

const api = axios.create({
  adapter: AxiosStorage.adapter
});

api.get(...)
api.post(...)
```
<a name="AxiosStorage.getCache"></a>

### AxiosStorage.getCache(options) ⇒ <code>object</code>
缓存对象

**Returns**: <code>object</code> - Cache，查看详情 [Cache](http://www.pseudobry.com/CacheFactory/latest/Cache.html)  

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| options | <code>object</code> \| <code>string</code> |  |  |
| [options.storageMode] | <code>string</code> | <code>&quot;sessionStorage&quot;</code> | 缓存模式 |

**示例**  
```js
let oCache = AxiosStorage.getCache('localStorage');

oCache.put('foo', 'bar');
oCache.get('foo'); // "bar"
...

// 配置cacheConfig
api({
  method: 'GET',
  url: '/data/other',
  cacheConfig: {
    maxAge: 60 * 60 * 1000,
    storageMode: 'localStorage'
  }
})
.then((res) => {
   console.log(res)
})

// 获取请求的缓存
let res = oCache.get('GET./data/other') // `res` 和上面的 `res` 结果一样

oCache.get('[method].[url]') // `method` 是大写, GET、POST 等
```



## 示例
[example](./example)

```bash
cd example && npm install
```
```bash
node app.js
```
安装和启动之后，浏览器打开 [http://localhost:3000/](http://localhost:3000/) 就可以查看


## 感谢

[cachefactory](https://www.npmjs.com/package/cachefactory)


## 协议

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/axios-storage
[url-npm]: https://www.npmjs.com/package/axios-storage
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/axios-storage.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

