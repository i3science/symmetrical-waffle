import mongoose from 'mongoose';
import base_service from './base_service';
let User = mongoose.model('User');

/**
 * The UserService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default base_service(User, {});