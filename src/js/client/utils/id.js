export function shorten(id) {
    return new Buffer(id, 'hex').toString('base64');
}
export function lengthen(id) {
    return new Buffer(id, 'base64').toString('hex');
}