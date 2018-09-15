function isArray(arr) {
    return Array.isArray(arr) || arr instanceof Array
}

function isObject(value) {
    return value !== null && typeof value === 'object'
}

function isDefined(value) {
    return typeof value !== 'undefined'
}

function createMap() {
    return Object.create(null);
}

function equals(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    // eslint-disable-next-line no-self-compare
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN

    var t1 = typeof o1,
        t2 = typeof o2,
        length, key, keySet;
    if (t1 === t2 && t1 === 'object') {
        if (isArray(o1)) {
            if (!isArray(o2)) return false;
            if ((length = o1.length) === o2.length) {
                for (key = 0; key < length; key++) {
                    if (!equals(o1[key], o2[key])) return false;
                }
                return true;
            }
        } else {
            if (isArray(o2)) return false;

            keySet = createMap();
            for (key in o1) {
                if (!equals(o1[key], o2[key])) return false;
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && isDefined(o2[key])) return false;
            }
            return true;
        }
    }
    return false;
}

module.exports = {
    equals
}