import express from 'express';
import authenticationController from '../../controllers/AuthenticationController';
import projectController from '../../controllers/ProjectController';

/**
 * As history can be retrieved for any entity in the application, when the
 * routes are applied, the name of the entity as created by the parent entity
 * middleware and as found in the request must be specified in order for the 
 * history controller to understand where to grab comments from.
 */
export default(/*name*/) => {
   let router = express.Router();
   router.route('/')
       .get(authenticationController.isLoggedIn, projectController.history);
   return router;
};