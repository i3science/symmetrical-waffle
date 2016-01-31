import _ from 'lodash';
import moment from 'moment';

/**
 * Filters the given list of projects to display only those matching the
 * criteria given.
 *
 * Currently accepted filters:
 * {
 *   client: 'Ford',
 *   keyword: 'Thanksgiving',
 *   state: ['pending','active','inmarket','closed']
 * }
 * @param projects A list of Project objects
 * @param filters An object containing filters
 * @return A filtered list of Project objects
 */
export function list_filter(projects, filters) {
    if (projects.length === 0) {
        return [];
    }
    let results = projects.slice();

    // If we're searching for clients
    if (filters.client.length > 0 && filters.client.trim() !== '') {
        results = _.filter(results, (project) => {
            return project.client.toLowerCase().indexOf(filters.client.toLowerCase()) > -1;
        });
    }
    // If we're searching for keywords
    if (filters.keyword.length > 0 && filters.keyword.trim() !== '') {
        results = _.filter(results, (project) => {
            let searchable = (project.name + ' ' + project.client).toLowerCase();
            return searchable.indexOf(filters.keyword.toLowerCase()) > -1;
        });
    }

    let now = moment();

    // If we're *not* searching for projects in the pending state
    if (filters.state.indexOf('pending') === -1) {
        results = _.reject(results, (project) => {
            return !project.approved;
        });
    }
    // If we're *not* searching for active projects
    if (filters.state.indexOf('active') === -1) {
        results = _.reject(results, (project) => {
            return project.approved && now.isBefore(moment(project.project_live));
        });
    }
    // If we're *not* searching for in-market projects
    if (filters.state.indexOf('inmarket') === -1) {
        results = _.reject(results, (project) => {
            return now.isAfter(moment(project.project_live)) && now.isBefore(moment(project.project_end));
        });
    }
    // If we're *not* searching for closed projects
    if (filters.state.indexOf('closed') === -1) {
        results = _.reject(results, (project) => {
            return now.isAfter(moment(project.project_end));
        });
    }

    return results;
}