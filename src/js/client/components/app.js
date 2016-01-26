import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'react-router';
import Routes from './routes';
import Actions from '../actions/UiActions';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routerStore from '../stores/RouterStore';
import i18next from 'i18next';
import xhr from 'i18next-xhr-backend';
import '../utils/fetch';
import '../utils/String.js';
import '../utils/Object.js';

Actions.initData();

class App extends React.Component {
    constructor() {
        super();
        i18next
            .use(xhr)
            .init({
                fallbackLng: 'en',
                load: 'languageOnly',
                backend: {
                    loadPath: '/assets/locales/{{lng}}.json'
                },
                resources: (typeof window !== 'undefined' ? window.translations : {})
            });
    }
    render() {
        if (typeof document !== 'undefined') {
            routerStore.set(
                <Router history={createBrowserHistory()}>
                    {Routes}
                </Router>
            );
        } else {
            routerStore.set(<Router>{Routes}</Router>);
        }
        return routerStore.get();
    }
}
export default App;