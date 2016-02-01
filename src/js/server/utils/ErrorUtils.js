import mongoose from 'mongoose';
let ValidationError = mongoose.Error.ValidationError;

/**
 * All messages that are pushed from server to client are pushed in a single
 * coherent object. For example:
 * {
 *   messages: [{
 *     text: 'An error occurred while trying to create an influencer',
 *     level: 'error'
 *   }, {
 *     text: 'Your influencer was created successfully',
 *     level: 'info'
 *   }],
 *   errors: {
 *     email: 'An email address is required'
 *   }
 * }
 */
export default class ErrorUtils {
    static getUniqueErrorMessage(err) {
        let output = '';

        try {
            var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_'));
            output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
        } catch (ex) {
            output = 'Unique field already exists';
        }

        return { error: { message: output } };
    }

    static getErrorMessage(err) {
        if (err instanceof ValidationError) {
            let errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return {errors: errors};
        }
        if (err.code) {
            return { messages: [{
                text: err.code + ' ' + err.err,
                level: 'error'
            }]};
        }
        if (err.message) {
            return { messages: [{
                text: err.message,
                level: 'error'
            }]};
        }
        return err;
    }

    static failureHandler(req, res) {
        return function(err){
            res.status(400).send(ErrorUtils.getErrorMessage(err));
        };
    }
}