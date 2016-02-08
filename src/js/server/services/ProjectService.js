import mongoose from 'mongoose';
import _ from 'lodash';
let Project = mongoose.model('Project');

/**
 * The ProjectService is responsible for persisting and retrieving information
 to and from the underlying datastore in a consistent manner.
 */
class ProjectService {
    /**
     * Retrieve zero or more projects that match the given criteria.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    list(opts) {
        return Project
            .find(opts || {})
            .populate('client')
            .exec();
    }

    /**
     * Retrieve zero or one projects that match the given options. In the event
     * that more than one project matches, the first one found will be returned.
     * There is no guarantee of any sort of natural ordering.
     * @param opts A dictionary of search options
     * @todo Document available options
     */
    findOne(opts) {
        return Project
            .findOne(opts || {})
            .populate('client')
            .exec();
    }

    /**
     * Persist a new project entity.
     * @param project The representation of the project to persist
     */
    create(project) {
        project = new Project(project);
        return project
            .savePromise()
            .spread((project) => {
                return project;
            })
            .fail((err) => {
                console.log(err); // eslint-disable-line no-console
                throw err;
            });
    }

    /**
     * Update an existing project entity.
     * @param project The representation of the project to update
     */
    update(project, modified) {
        _.extend(project, modified);
        return project.savePromise();
    }

    /**
     * Delete the project represented by the given entity or identifier.
     * @param project A JSON representation or identifier
     */
    delete(project) {
        return project.removePromise();
    }
}

export default new ProjectService();