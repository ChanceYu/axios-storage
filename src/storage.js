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

        // if exist cache and cache is not expired
        if(cacheData && cacheInfo && !cacheInfo.isExpired){

            // compare the request params between cache and current
            let cacheParams = this.getParams(cacheData.config);
            let params = this.getParams(config);
            if(equals(cacheParams, params)){
                return cacheData
            }
        }
    }
};

module.exports = storage