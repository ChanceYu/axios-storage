import storage from './storage';

const defaultOptions = {
    storagePrefix: 'axios-storage',
    storageMode: 'sessionStorage',
    deleteOnExpire: 'aggressive'
}

let options = Object.assign({}, defaultOptions);
let oInstance = window.axios;

const config = (opts, instance) => {
    Object.assign(options, opts);

    if(instance) oInstance = instance;
}

const adapter = (request) => {
    return new Promise(function(resolve, reject) {
        let _options = null;

		if(request.cacheConfig && request.cacheConfig.maxAge){
            _options = Object.assign({}, options, request.cacheConfig);
            const cacheResponse = storage.get(request, _options);

            if(cacheResponse){
                cacheResponse.$storage = true;
                return resolve(cacheResponse);
            }
        }

		oInstance.defaults.adapter
			.call(this, request)
			.then(function(response) {
                _options && storage.set(response.config, _options, response);

				resolve(response);
			})
			.catch(reject);
	});
}

module.exports = {
    defaultOptions,
    config,
    adapter
}