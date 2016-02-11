import mongoose from 'mongoose';
import _ from 'lodash';
let CampaignElement = mongoose.model('CampaignElement');

/**
 * The CampaignElementService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
export default class CampaignElementService {
    /**
     * Retrieve zero or more campaign elements that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static list(opts) {
        opts = opts || {};
        return CampaignElement
            .find(opts)
            .exec();
    }

    /**
     * Retrieve zero or one campaign elements that match the given options. In the
     * event that more than one campaign element matches, the first one found will be
     * returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    static findOne(opts) {
        return CampaignElement
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new campaign element entity.
     * @param campaignElement The representation of the campaign element to persist
     */
    static create(campaignElement) {
        campaignElement = new CampaignElement(campaignElement);
        return campaignElement.savePromise();
    }

    /**
     * Update an existing campaign element entity.
     * @param campaignElement The representation of the campaign element to update
     */
    static update(campaignElement, modified) {
        _.extend(campaignElement, modified);
        return campaignElement.savePromise();
    }

    /**
     * Delete the campaign element represented by the given entity or identifier.
     * @param campaignElement A JSON representation or identifier
     */
    delete(campaignElement) {
        return campaignElement.removePromise();
    }
}