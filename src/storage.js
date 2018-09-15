import { CacheFactory } from 'cachefactory';
import { equals } from './utils';

const cacheFactory = new CacheFactory();

const storage = {
    cacheFactory,
    getCache(options){
        let name = options.storageMode;

        if(cacheFactory.exists(name)){
            return cacheFactory.get(name);
        }else{
            return cacheFactory.createCache(name, options)
        }
    },

    getKey(config){
        let cacheKey = config.url;
        let method = config.method.toUpperCase();

        return `${method}.${cacheKey}`;
    },

    getParams(config){
        return config.method.toUpperCase() === 'GET' ? config.params : config.data;
    },

    set(response, options){
        let oCache = this.getCache(options);
        let cacheKey = this.getKey(response.config);

        oCache.put(cacheKey, response);
    },

    get(config, options){
        let oCache = this.getCache(options);
        let cacheKey = this.getKey(config);
        let cacheData = oCache && oCache.get(cacheKey);
        let cacheInfo = oCache && oCache.info(cacheKey);

        // 判断是否有缓存，并且是否过期
        if(cacheData && cacheInfo && !cacheInfo.isExpired){

            // 判断上传请求参数和本次请求参数是否一致
            let cacheParams = this.getParams(cacheData.config);
            let params = this.getParams(config);
            if(equals(cacheParams, params)){
                return cacheData
            }
        }
    }
};

module.exports = storage