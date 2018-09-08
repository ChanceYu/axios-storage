import { CacheFactory } from 'cachefactory';

import utils from './utils';

const cacheFactory = new CacheFactory();

const storage = {
    getCacheObject(options){
        let name = options.storageMode;

        if(cacheFactory.exists(name)){
            return cacheFactory.get(name);
        }else{
            return cacheFactory.createCache(name, options)
        }
    },

    getCacheKey(config){
        let cacheKey = config.url;
        let method = config.method.toUpperCase();

        cacheKey = `${method}.${cacheKey}`;

        return cacheKey;
    },

    getReqParams(config){
        return config.method.toUpperCase() === 'GET' ? config.params : config.data;
    },

    set(config, options, data){
        if(!utils.isObject(data)) return;

        let oCache = this.getCacheObject(options);
        let cacheKey = this.getCacheKey(config);
        
        oCache.put(cacheKey, data);
    },

    get(config, options){
        let oCache = this.getCacheObject(options);
        let cacheKey = this.getCacheKey(config);
        let cacheData = oCache && oCache.get(cacheKey);
        let cacheInfo = oCache && oCache.info(cacheKey);

        // 判断是否有缓存，并且是否过期
        if(cacheData && cacheInfo && !cacheInfo.isExpired){

            // 判断上传请求参数和本次请求参数是否一致
            let cacheParams = this.getReqParams(cacheData.config);
            let params = this.getReqParams(config);
            if(utils.equals(cacheParams, params)){
                return cacheData
            }
            
        }
    }
};

module.exports = storage