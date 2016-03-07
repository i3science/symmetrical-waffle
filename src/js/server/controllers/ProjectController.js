import _ from 'lodash';
import Q from 'q';
import context from 'request-context';
import moment from 'moment';
import base_controller from './base_controller';
import projectService from '../services/ProjectService.js';
import historyService from '../services/HistoryService.js';
import campaignElementService from '../services/CampaignElementService';
import taskService from '../services/TaskService';
import commentService from '../services/CommentService';
import mailService from '../services/MailService';
import ErrorUtils from '../utils/ErrorUtils';
import mongoose from 'mongoose';
const Influencer = mongoose.model('Influencer');
const CampaignElement = mongoose.model('CampaignElement');
const Representative = mongoose.model('Representative');

export default base_controller(projectService, 'project', {
    dates(req, res) {
        let dates = [];
        dates.push({ title: 'Project Start', date: req.project.project_start });
        dates.push({ title: 'Project Live', date: req.project.project_live });
        dates.push({ title: 'Project Finish', date: req.project.project_end });
        []
            .concat(req.project.checkpoints_start)
            .concat(req.project.checkpoints_live)
            .concat(req.project.checkpoints_end)
            .forEach((checkpoint) => {
                dates.push({ title: checkpoint.name, date: checkpoint.date });
            });

        return campaignElementService
            .list({ project: req.project._id })
            .then((elements) => {
                let elementIds = elements.map((el) => { return el._id; });
                return taskService
                    .list({ element: elementIds });
            })
            .then((tasks) => {
                tasks.forEach((task) => {
                    dates.push({ title: task.name, date: task.due });
                });
                return res.json(dates);
            });
    },
    /**
     * Return the history of modifications for an existing project.
     */
    history(req, res) {
        let historyArray = [];
        let elementIds = [];
        return historyService
            .list({ 'eventable.type': 'Project', 'eventable.id': req.project._id })
            .then((projectHistory) => {
                historyArray = historyArray.concat(projectHistory);
                return campaignElementService
                    .list({ project: req.project._id });
            })
            // Get element historyArray
            .then((elements) => {
                elementIds = elements.map((el) => { return el._id; });
                return historyService
                    .list({ 'eventable.type': 'CampaignElement', 'eventable.id': { $in: elementIds } });
            })
            .then((elementHistory) => {
                historyArray = historyArray.concat(elementHistory);
                return true;
            })
            // Get task historyArray
            .then(() => {
                return taskService
                    .list({ element: elementIds });
            })
            .then((tasks) => {
                let ids = tasks.map((task) => { return task._id; });
                return historyService
                    .list({ 'eventable.type': 'Task', 'eventable.id': { $in: ids } });
            })
            .then((taskHistory) => {
                historyArray = historyArray.concat(taskHistory);
                return commentService
                    .list({ target_type: 'CampaignElement', target_id: { $in: elementIds }});
            })
            .then((comments) => {
                let ids = comments.map((comment) => { return comment._id; });
                return historyService
                    .list({ 'eventable.type': 'Comment', 'eventable.id': { $in: ids }});
            })
            .then((commentHistory) => {
                historyArray = historyArray.concat(commentHistory);
                historyArray = _.sortBy(historyArray, (val) => { return new Date(val.created_at); });
                return res.jsonp(historyArray);
            });
    },
    sanitize(obj) {
        if (obj.organization) {
            obj.organization = obj.organization._id || obj.organization;
        }
        if (obj.client) {
            obj.client = obj.client._id || obj.client;
        }
        delete obj.__v;
        return obj;
    },
    reject(req, res) {
        let influencer = _.find(req.project.influencers, { influencer: req.loggedInUser._id });
        if (!influencer) {
            return res.status(400).send({'message':'You are not permitted to alter this project'});
        }
        influencer.influencer_approved = false;
        influencer.influencer_notes = req.body.notes;
        return req.project.savePromise()
            .then(() => {
                return res.status(204).send();
            })
            .fail((err) => {
                return res.status(400).send(err);
            });
    },
    revise(req, res) {
        let influencer = _.find(req.project.influencers, { influencer: req.loggedInUser._id });
        if (!influencer) {
            return res.status(400).send({'message':'You are not permitted to alter this project'});
        }
        influencer.influencer_notes = req.body.notes;
        return req.project.savePromise()
            .then(() => {
                return res.status(204).send();
            })
            .fail((err) => {
                return res.status(400).send(err);
            });
    },
    accept(req, res) {
        let influencer = _.find(req.project.influencers, { influencer: req.loggedInUser._id });
        if (!influencer) {
            return res.status(400).send({'message':'You are not permitted to alter this project'});
        }
        influencer.influencer_approved = true;
        influencer.influencer_notes = req.body.notes;
        return req.project.savePromise()
            .then(() => {
                return res.status(204).send();
            })
            .fail((err) => {
                return res.status(400).send(err);
            });
    },
    approve(req, res) {
        req.project.approved = true;
        req.project.approved_date = moment();
        return req.project.savePromise()
            .then(() => {
                let promises = req.project.influencers.map((inf) => {
                    return Influencer.findOne({ _id: inf.influencer })
                        .then((influencer) => {
                            let element = new CampaignElement();
                            element.type = {
                                'blogger': 'blog',
                                'vlogger': 'vlog',
                                'photo_blogger': 'photo',
                                'amplifier': 'amplification'
                            }[req.project.projectType];
                            element.assignee = inf.influencer;
                            element.project = req.project;
                            element.name = [influencer.name.first, influencer.name.last].join(' ')+'\'s '+element.type;
                            return element.savePromise();
                        });
                });
                return Q.all(promises);
            })
            .then(() => {
                return res.status(204).send();
            });
    },
    sendToClient(req, res) {
        Representative
            .find({ client: req.project.client })
            .then((reps) => {
                return mailService
                    .send('new-client-project', {
                        to: reps.map((rep) => { return rep.email; }).join(', '),
                        subject: 'Social Marketplace Campaign Created'
                    }, {
                        campaign_url: context.get('request:basePath') + '/projects/' + req.project._id
                    });
            })
            .then(() => {
                return res.status(204).send();
            })
            .fail(ErrorUtils.failureHandler(req, res));
    }
});