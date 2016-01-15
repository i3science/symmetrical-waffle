'use strict';

process.env.MONGO_DB = process.env.MONGO_DB || 'smp';
if (process.env.MONGO_PORT_27017_TCP_ADDR && !process.env.MONGO_URL) {
    process.env.MONGO_URL = 'mongodb://'+process.env.MONGO_PORT_27017_TCP_ADDR+':'+process.env.MONGO_PORT_27017_TCP_PORT+'/'+process.env.MONGO_DB;
}