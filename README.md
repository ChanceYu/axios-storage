# axios-storage

[![NPM][img-npm]][url-npm]

[![Language][img-javascript]][url-github]
[![License][img-mit]][url-mit]

Caching adapter for axios.

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


<a name="AxiosStorage"></a>

## AxiosStorage
All methods

**Kind**: global variable  

* [AxiosStorage](#AxiosStorage)
    * [.config(options, instance)](#AxiosStorage.config)
    * [.adapter()](#AxiosStorage.adapter)
    * [.getCache(options)](#AxiosStorage.getCache) ⇒ <code>object</code>

<a name="AxiosStorage.config"></a>

### AxiosStorage.config(options, instance)
global config options，
see all [options](http://www.pseudobry.com/CacheFactory/latest/Cache.html)

**Kind**: static method of [<code>AxiosStorage</code>](#AxiosStorage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.storagePrefix] | <code>string</code> | <code>&quot;axios-storage&quot;</code> | thhe prefix of storage |
| [options.storageMode] | <code>string</code> | <code>&quot;sessionStorage&quot;</code> | the mode of storage，support `localStorage`、`sessionStorage`、`memory` |
| [options.deleteOnExpire] | <code>string</code> | <code>&quot;aggressive&quot;</code> | how to handler expired storage |
| instance | <code>object</code> | <code>window.axios</code> | axios object |

**Example**  
```js
import axios from 'axios';
import AxiosStorage from 'axios-storage';

AxiosStorage.config({
  storagePrefix: 'axios-storage-example:',
  storageMode: 'sessionStorage'
}, axios);
```
<a name="AxiosStorage.adapter"></a>

### AxiosStorage.adapter()
adapter

**Kind**: static method of [<code>AxiosStorage</code>](#AxiosStorage)  
**Example**  
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
Cache Object

**Kind**: static method of [<code>AxiosStorage</code>](#AxiosStorage)  
**Returns**: <code>object</code> - Cache，see detail [Cache](http://www.pseudobry.com/CacheFactory/latest/Cache.html)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  |  |
| [options.storageMode] | <code>string</code> | <code>&quot;sessionStorage&quot;</code> | storage mode |

**Example**  
```js
let oCache = AxiosStorage.getCache('localStorage');

oCache.put('foo', 'bar');
oCache.get('foo'); // "bar"
...
```



## Thanks

[cachefactory](https://www.npmjs.com/package/cachefactory)


## License

[![license][img-mit]][url-mit]


[url-github]: https://github.com/ChanceYu/axios-storage
[url-npm]: https://www.npmjs.com/package/axios-storage
[url-mit]: https://opensource.org/licenses/mit-license.php

[img-npm]: https://nodei.co/npm/axios-storage.png?compact=true
[img-javascript]: https://img.shields.io/badge/language-JavaScript-brightgreen.svg
[img-mit]: https://img.shields.io/badge/license-MIT-blue.svg

