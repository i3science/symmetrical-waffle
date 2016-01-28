import projectService from '../services/ProjectService.js';
import ErrorUtils from '../utils/ErrorUtils';

/**
 * The ProjectController is responsible for interpreting client requests and
 * formatting a response back to the client, often delegating to an
 * ProjectService instance.
 */
class ProjectController {
    /**
     * Retrieves zero or more entities that adhere to the given criteria.
     */
    list(req, res) {
        return projectService
            .list({})
            .then((projects) => {
                return res.json(projects);
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Retrieves the project indicated by the projectId request parameter.
     */
    read(req, res) {
        return res.json(req.project);
    }
    /**
     * Creates a new project account with the given information.
     */
    create(req, res) {
        return projectService
            .create(req.body)
            .spread((project) => {
                return res.status(201).send({ id: project._id });
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Updates an existing project account with the given modifications.
     */
    update(req, res) {
        return projectService
            .update(req.project, req.body)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
    /**
     * Delete an existing project account.
     */
    delete(req, res) {
        return projectService
            .remove(req.project)
            .spread(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }

    /**
     * Project middleware
     */
    findById(req, res, next, id) {
        projectService
            .findOne({ _id: id })
            .then((project) => {
                req.project = project;
                return next();
            })
            .fail((err) => {
                return next(err);
            });
    }
}

export default new ProjectController();