# axios-storage

[![NPM][img-npm]][url-npm]
[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

axios 请求缓存插件 [English](./README.md) | [中文](./README-zh.md)

## 特点

- 支持 `localStorage`、`sessionStorage`、`memory` 三种缓存模式
- 支持配置每个请求的缓存时间和模式
- 自动处理请求参数不一致的情况，当本次请求和上次请求参数不一致，不使用缓存，而是发送请求


## 安装
```bash
npm install axios-storage --save
```


## 使用

```javascript
import axios from 'axios';
import AxiosStorage from 'axios-storage';

AxiosStorage.config({
    storagePrefix: 'axios-storage',
    storageMode: 'sessionStorage' // 全局
}, axios);

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
```


## 协议

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/axios-storage
[url-npm]: https://www.npmjs.com/package/axios-storage
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/axios-storage.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

