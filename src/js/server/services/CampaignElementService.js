import mongoose from 'mongoose';
import base_service from './base_service';
import influencerService from './InfluencerService';
import projectService from './ProjectService';
import representativeService from './RepresentativeService';
import organizerService from './OrganizerService';
let CampaignElement = mongoose.model('CampaignElement');

export default base_service(CampaignElement, {
    /**
     * Lists all users available for assignment to tasks and such under an given
     * element. This includes the element assignee, staff of the client to which
     * the project applies, and organizers.
     * @param element The element we're searching
     * @return A list of assignees
     */
    listAssignees(project, element) {
        let assignees = [];

        // 1) Get element assignee
        return influencerService.findOne({ _id: element.assignee })
            .then((assignee) => {
                assignees.push(assignee);
                return projectService.findOne({ _id: element.project });
            })
            .then((project) => {
                // 2) Get project client staff
                return [project, representativeService.list({ client: project.client })];
            })
            .spread((project/*, reps*/) => {
                // 3) Get project organizers
                return organizerService.list({ organization:project.organization });
            })
            .then((/*organizers*/) => {
                return assignees;
            });
    }
});