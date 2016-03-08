import Q from 'q';
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import Datauri from 'datauri';
import config from '../../../../config/config';
import assetService from '../services/AssetService.js';
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

/**
 */
export default class AssetController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    static list(req, res) {
        return assetService
            .list({})
            .then((assets) => {

                assets = assets.map((asset) => {
                    if (!asset.mime) {
                        return asset;
                    }

                    let _path = asset._id.toString().match(/.{1,3}/g).join('/');
                    let fullpath = path.resolve(config.filesDir, _path);
                    fullpath = path.resolve(fullpath, asset._id.toString());

                    let datauri = null;
                    if (asset.mime.indexOf('jpg') > -1 || asset.mime.indexOf('jpeg') > -1
                            || asset.mime.indexOf('png') > -1) {
                        datauri = new Datauri(fullpath);
                        datauri.mimetype = asset.mime;
                    }
                    asset.datauri = 'data:'+asset.mime+';base64,'+datauri.base64;
                    return asset;
                });

                return res.json(assets);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the asset indicated by the assetId request parameter.
     */
    static read(req, res) {
        return res.json(req.asset);
    }
    static file(req, res) {
        let _path = req.asset._id.toString().match(/.{1,3}/g).join('/');
        let fullpath = path.resolve(config.filesDir, _path);
        fullpath = path.resolve(fullpath, req.asset._id.toString());
        fs.access(fullpath, fs.R_OK, (err) => {
            if (err) {
                return res.status(404).send();
            }
            res.setHeader('Content-disposition', 'attachment; filename='+req.asset.name);
            res.setHeader('Content-Type', req.asset.mime || 'application/octet-stream');
            let filestream = fs.createReadStream(fullpath);
            filestream.pipe(res);
        });
    }
    /**
     * Creates a new asset with the given information.
     */
    static create(req, res) {
        let asset = null;
        let fullpath = null;
        return assetService
            .create({
                name: req.file.originalname,
                mime: req.file.mimetype || 'application/octet-stream'
            })
            .spread((_asset) => {
                asset = _asset;
                let path = asset._id.toString().match(/.{1,3}/g).join('/');
                fullpath = config.filesDir + '/' + path;
                let deferred = Q.defer();
                mkdirp(fullpath, function(err){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(true);
                    }
                });
                return deferred.promise;
            })
            .then(() => {
                return move(req.file.path, fullpath + '/' + asset._id.toString());
            })
            .then(() => {
                return res.status(201).send({ id: asset._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing list account with the given modifications.
     */
    static update(req, res) {
        return assetService
            .update(req.asset, req.body)
            .spread(() => {
                // TODO file updates. versioning?
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing list account.
     */
    static delete(req, res) {
        return assetService
            .remove(req.asset)
            .spread(() => {
                // TODO need to remove the file
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Asset middleware
     */
    static findById(req, res, next, id) {
        assetService
            .findOne({ _id: id })
            .then((asset) => {
                req.asset = asset;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}