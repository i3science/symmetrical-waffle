import mongoose from 'mongoose';
import _ from 'lodash';
let Asset = mongoose.model('Asset');

/**
 * The AssetService is responsible for persisting and retrieving information to
 * and from the underlying datastore in a consistent manner.
 */
export default class AssetService {
    /**
     * Retrieve zero or more assets that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return Asset
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one assets that match the given options. In the
     * event that more than one asset matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return Asset
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new asset entity.
     * @param asset The representation of the asset to persist
     */
    static create(asset) {
        asset = new Asset(asset);
        return asset.savePromise();
    }

    /**
     * Update an existing asset entity.
     * @param asset The representation of the asset to update
     */
    static update(asset, modified) {
        _.extend(asset, modified);
        return asset.savePromise();
    }

    /**
     * Delete the asset represented by the given entity or identifier.
     * @param asset A JSON representation or identifier
     */
    delete(asset) {
        return asset.removePromise();
    }
}