import _ from 'lodash';

Object.prefixKeys = function(arr, prefix) {
    let tmp = _.extend({}, arr);
    Object.keys(tmp).map(function(k){
        let v = tmp[k];
        delete tmp[k];
        k = prefix + k;
        tmp[k] = v;
    });
    return tmp;
};