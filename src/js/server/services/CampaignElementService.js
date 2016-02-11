import mongoose from 'mongoose';
import _ from 'lodash';
import Q from 'q';
import influencerService from './InfluencerService';
import projectService from './ProjectService';
import representativeService from './RepresentativeService';
import organizerService from './OrganizerService';
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

    /**
     * Lists all users available for assignment to tasks and such under an given
     * element. This includes the element assignee, staff of the client to which
     * the project applies, and organizers.
     * @param element The element we're searching
     * @return A list of assignees
     */
    static listAssignees(project, element) {
        let assignees = [];

        // 1) Get element assignee
        return influencerService.findOne({ _id: element.assignee })
            .then((assignee) => {
                assignees.push(assignee);
                return projectService.findOne({ _id: element.project });
            })
            .then((project) => {
                console.log('Project: ', project);
                // 2) Get project client staff
                return [project, representativeService.list({ client: project.client })];
            })
            .spread((project, reps) => {
                console.log('Reps: ', reps);
                // 3) Get project organizers
                return organizerService.list({ organization:project.organization })
            })
            .then((organizers) => {
                console.log('Organizers: ', organizers);
                return assignees;
            })

        // // 2) Get project client staff
        // console.log('Project')
        // CampaignElement
        //     .find
        // return campaignElementService
        //     .listAssignees(req.element)
        //     .then((assignees) => {
        //         return res.jsonp(assignees);
        //     })
        //     .fail(ErrorUtils.failureHandler(req, res));
    }
}