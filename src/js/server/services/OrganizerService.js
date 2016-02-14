import mongoose from 'mongoose';
import base_service from './base_service';
let Organizer = mongoose.model('Organizer');

export default base_service(Organizer, {});