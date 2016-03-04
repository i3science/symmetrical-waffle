import mongoose from 'mongoose';
import base_service from './base_service';
let Influencer = mongoose.model('Influencer');

export default base_service(Influencer, {});