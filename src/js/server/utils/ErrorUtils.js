'use strict';

class ErrorUtils {
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
        if (err.code) {
            return err.code + ' ' + err.err;
        }
        if (err.errors) {
            return err.errors;
        }
        if (err.message) {
            return { error: { message: err.message } };
        }
        return err;
    }

    static failureHandler(req, res) {
        return function(err){
            return res.status(400).send({
                message: ErrorUtils.getErrorMessage(err)
            });
        };
    }
}

export default ErrorUtils;