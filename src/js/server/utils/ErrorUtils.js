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
        if (err.code) {
            return { message: err.code + ' ' + err.err };
        }
        if (err.errors) {
            return {fields: err.errors};
        }
        if (err.message) {
            return { message: err.message };
        }
        return err;
    }

    static failureHandler(req, res) {
        return function(err){
            res.status(400).send(ErrorUtils.getErrorMessage(err));
        };
    }
}