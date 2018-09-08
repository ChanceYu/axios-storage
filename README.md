# axios-storage

[![NPM][img-npm]][url-npm]
[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

Caching adapter for axios. [English](./README.md) | [中文](./README-zh.md)

## Feature

- Support `localStorage`、`sessionStorage`、`memory` mode
- Support each request to be configured
- Rerequest when the request parameter is inconsistent with the last request parameter


## Install
```bash
npm install axios-storage --save
```


## Usage

You can use the axios-storage directly

```javascript
import axios from 'axios';
import AxiosStorage from 'axios-storage';

AxiosStorage.config({
    storagePrefix: 'axios-storage',
    storageMode: 'sessionStorage' // global
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


## License

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/axios-storage
[url-npm]: https://www.npmjs.com/package/axios-storage
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/axios-storage.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

