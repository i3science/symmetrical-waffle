import _ from 'lodash';
import mongoose from 'mongoose';
let Organization = mongoose.model('Organization');

/**
 * The OrganizationService is responsible for persisting and retrieving
 * information to and from the underlying datastore in a consistent manner.
 */
class OrganizationService {
    /**
     * Retrieve zero or more organizations that match the given options.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    list(opts) {
        return Organization
            .find(opts || {})
            .exec();
    }

    /**
     * Retrieve zero or one organizations that match the given options. In the
     * event that more than one organization matches, the first one found will
     * be returned. There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    findOne(opts) {
        return Organization
            .findOne(opts || {})
            .exec();
    }

    /**
     * Persist a new organization entity.
     * @param organization The representation of the organization to persist
     */
    create(organization) {
        organization = new Organization(organization);
        return organization.savePromise();
    }

    /**
     * Update an existing organization entity.
     * @param organization The representation of the organization to update
     */
    update(organization, modified) {
        _.extend(organization, modified);
        return organization.savePromise();
    }

    /**
     * Delete the organization represented by the given entity or identifier.
     * @param organization A JSON representation or identifier
     */
    delete(organization) {
        return organization.removePromise();
    }
}

export default new OrganizationService();