import mongoose from 'mongoose';
import base_service from './base_service';
let Client = mongoose.model('Client');

export default base_service(Client, {});