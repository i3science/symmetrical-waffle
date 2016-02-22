import mongoose from 'mongoose';
import base_service from './base_service';
let List = mongoose.model('List');

export default base_service(List, {});