import mongoose from 'mongoose';
import base_service from './base_service';
let Organization = mongoose.model('Organization');

export default base_service(Organization, {});