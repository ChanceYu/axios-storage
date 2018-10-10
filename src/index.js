import axios from 'axios';
import storage from './storage';

let defaultOptions = {
    storagePrefix: 'axios-storage',
    storageMode: 'sessionStorage',
    deleteOnExpire: 'aggressive'
}

let globalOptions = Object.assign({}, defaultOptions);

/**
 * API
 */
let AxiosStorage = {
    /**
     * global config options，
     * see all [options]{@link http://www.pseudobry.com/CacheFactory/latest/Cache.html}
     * @example
     * import axios from 'axios';
     * import AxiosStorage from 'axios-storage';
     * 
     * AxiosStorage.config({
     *   storagePrefix: 'axios-storage-example:',
     *   storageMode: 'sessionStorage'
     * });
     * 
     * @param {object} options
     * @param {string} [options.storagePrefix=axios-storage] - thhe prefix of storage
     * @param {string} [options.storageMode=sessionStorage] - the mode of storage，support `localStorage`、`sessionStorage`、`memory`
     * @param {string} [options.deleteOnExpire=aggressive] - how to handler expired storage
     */
    config(options){
        Object.assign(globalOptions, options);
    },
    /**
     * adapter
     * 
     * @example
     * import axios from 'axios';
     * import AxiosStorage from 'axios-storage';
     * 
     * const api = axios.create({
     *   adapter: AxiosStorage.adapter
     * });
     * 
     * api.get(...)
     * api.post(...)
     */
    adapter(requestConfig){
        return new Promise(function (resolve, reject) {
            let options = null;
    
            if (requestConfig.cacheConfig) {
                options = Object.assign({}, globalOptions, requestConfig.cacheConfig);
                const cacheResponse = storage.get(requestConfig, options);
    
                if (cacheResponse) {
                    cacheResponse.$storage = true;
                    return resolve(cacheResponse);
                }
            }
    
            axios.defaults.adapter
                .call(this, requestConfig)
                .then((response) => {
                    options && storage.set(response, options);
    
                    resolve(response);
                })
                .catch(reject);
        });
    },
    /**
     * Cache Object
     * 
     * @example
     * let oCache = AxiosStorage.getCache('localStorage');
     * 
     * oCache.put('foo', 'bar');
     * oCache.get('foo'); // "bar"
     * ...
     * 
     * // request data with cacheConfig
     * api({
     *   method: 'GET',
     *   url: '/data/other',
     *   cacheConfig: {
     *     maxAge: 60 * 60 * 1000,
     *     storageMode: 'localStorage'
     *   }
     * })
     * .then((res) => {
     *    console.log(res)
     * })
     * 
     * // get this request cache
     * let res = oCache.get('GET./data/other') // `res` is the same as above
     * 
     * oCache.get('[method].[url]') // `method` is uppercase, GET、POST .etc
     * 
     * @param {object|string} options
     * @param {string} [options.storageMode=sessionStorage] - storage mode
     * @return {object} Cache，see detail [Cache]{@link http://www.pseudobry.com/CacheFactory/latest/Cache.html}
     */
    getCache(options){
        if(options && typeof options === 'string'){
            options = {
                storageMode: options
            }
        }
        
        options = Object.assign({}, globalOptions, options);
        
        return storage.getCache(options)
    }
}

module.exports = AxiosStorage;