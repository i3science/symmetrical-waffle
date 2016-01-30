export default ([
    'INITIALIZE',

    // Filter-specific
    'ADD_FILTER',
    'UPDATE_FILTERS',
    'REMOVE_FILTER',

    // User-specific
    'ADD_USER',
    'UPDATE_USER',

    // Influencer-specific
    'CREATE_INFLUENCER',
    'UPDATE_INFLUENCER',
    'ADD_INFLUENCER_TO_LIST',
    'INFLUENCER_RESULTS',
    'INFLUENCER_LIST_REFRESHED',

    // Project-specific constants
    'REFRESH_PROJECTS',
    'GET_PROJECT',
    'CREATE_PROJECT',
    'UPDATE_PROJECT',
    'DELETE_PROJECT',

    // Security-specific
    'PASSWORD_RESET_REQUESTED',
    'USER_FOUND_BY_RESET'
].reduce((obj, val) => {
    obj[val] = val;
    return obj;
}, {}));