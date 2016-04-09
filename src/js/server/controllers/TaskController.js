import Q from 'q';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import config from '../../../../config/config';
import taskService from '../services/TaskService.js';
import base_controller from './base_controller';
import ErrorUtils from '../utils/ErrorUtils';

let copy = (oldPath, newPath) => {
    let deferred = Q.defer();
    let readStream = fs.createReadStream(oldPath);
    let writeStream = fs.createWriteStream(newPath);

    readStream.on('error', (err) => {
        deferred.reject(err);
    });
    writeStream.on('error', (err) => {
        deferred.reject(err);
    });
    readStream.on('close', () => {
        fs.unlink(oldPath, () => {
            deferred.resolve(true);
        });
    });
    return deferred.promise;
};

let move = (oldPath, newPath) => {

    let deferred = Q.defer();
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            if (err.code === 'EXDEV') {
                copy(oldPath, newPath);
            } else {
                deferred.reject(err);
            }
            return;
        }
        deferred.resolve(true);
    });

};

export default base_controller(taskService, 'task', {
    list(req, res) {
        return taskService
            .list({ element: req.element._id })
            .then((tasks) => {
                return res.json(tasks);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    create(req, res) {
        let obj = this.sanitize(req.body);
        if (req.file) {
            obj.filename = req.file.originalname;
            obj.mime = req.file.mimetype || 'application/octet-stream';
        }

        let task = null;
        let fullpath = null;
        return taskService
            .create(req.element, obj)
            .spread((_task) => {
                task = _task;
                if (!req.file) {
                    return true;
                }

                let path = task._id.toString().match(/.{1,3}/g).join('/');
                fullpath = config.filesDir + '/' + path;
                let deferred = Q.defer();
                mkdirp(fullpath, function(err){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(true);
                    }
                });
                return deferred.promise
                    .then(() => {
                        move(req.file.path, fullpath + '/' + task._id.toString());
                    });
            })
            .then(() => {
                return res.status(201).send({ id: task._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    },
    file(req, res) {
        let _path = req.task._id.toString().match(/.{1,3}/g).join('/');
        let fullpath = path.resolve(config.filesDir, _path);
        fullpath = path.resolve(fullpath, req.task._id.toString());
        fs.access(fullpath, fs.R_OK, (err) => {
            if (err) {
                return res.status(404).send();
            }
            res.setHeader('Content-disposition', 'attachment; filename='+req.task.filename);
            res.setHeader('Content-Type', req.task.mime || 'application/octet-stream');
            let filestream = fs.createReadStream(fullpath);
            filestream.pipe(res);
        });
    }
});