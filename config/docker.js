'use strict';

if (process.env.MONGO_PORT_27017_TCP_ADDR && !process.env.MONGO_BASE) {
    process.env.MONGO_BASE = 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/';
}