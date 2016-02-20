import mongoose from 'mongoose';
import base_service from './base_service';
let Review = mongoose.model('Review');

export default base_service(Review, {});