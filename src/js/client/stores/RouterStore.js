// Created pursuant to recommendation found at:
//    https://github.com/rackt/react-router/issues/380#issuecomment-58621464
var _router = null;

exports.set = function(router) {
    _router = router;
};
exports.get = function() {
    return _router;
};