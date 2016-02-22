import _ from 'lodash';

export function compare(filter, item) {
    let compareRange = (prop, from, to) => {
        return (
            (from ? (prop >= Number(from)) : true) &&
            (to ? (prop <= Number(to)) : true)
        );
    };
    let findProperty = (target, prop) => {
        if (target.hasOwnProperty(prop)) {
            return target[prop];
        }
        for (var props in target) {
            if (target.hasOwnProperty(props) && target[props].hasOwnProperty(prop)) {
                if ((typeof target[props] === 'object') && !Array.isArray(target[props])) {
                    return findProperty(target[props], prop);
                } else {
                    return false;
                }
            }
        }
    };
    let loopThrough = (fil, inf) => {
        for (var prop in fil) {
            if(fil.hasOwnProperty(prop)) {
                if (Array.isArray(fil[prop])) {
                    let isit = _.intersection(fil[prop], inf[prop]);
                    if (!(isit.length === fil[prop].length) && (fil[prop].length > 0)) {
                        return false;
                    }
                } else if ((typeof fil[prop] === 'object') && !Array.isArray(fil[prop])) {
                    let innerFil = fil[prop],
                        innerInf = inf[prop];
                    if (!(loopThrough(innerFil, innerInf))) {
                        return false;
                    }
                } else {
                    if (prop.indexOf('range') > -1) {
                        let propRoot = prop.split('_')[0];
                        console.log(findProperty(inf, propRoot), fil[propRoot + '_range_from'], fil[propRoot + '_range_to']);
                        if (!(compareRange(findProperty(inf, propRoot), fil[propRoot + '_range_from'], fil[propRoot + '_range_to']))) {
                            return false;
                        }
                    } else if (['sex','employment'].indexOf(prop) !== -1) {
                        if (!(findProperty(inf, prop) === fil[prop]) && (fil[prop] !== '')) {
                            return false;
                        }
                    } else {
                        if (!(prop === 'type') && !(_.includes(_.lowerCase(findProperty(inf, prop)), _.lowerCase(fil[prop])))) {
                            return false;
                        }
                    }

                }
            }
        }
        return true;
    };
    return item.filter(function(it) {
        return loopThrough(filter, it);
    });
}