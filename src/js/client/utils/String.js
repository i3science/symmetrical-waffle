String.prototype.replaceAll = function(map) {
    var re = new RegExp(Object.keys(map).join('|'), 'gi');

    return this.replace(re, function(matched){
        return map[matched.toLowerCase()];
    });
};