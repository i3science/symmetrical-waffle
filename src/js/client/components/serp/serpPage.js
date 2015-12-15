import React from 'react';
import AppStore from '../../stores/store';
import Results from './result';

class Serp extends React.Component {
    constructor() {
        super();
        this.state = {
            influencers: AppStore.getAllInfluencers()
        };
    }
    render() {
        return (
            <div>
                <Results
                    influencers={this.state.influencers}
                />
            </div>
        );
    }
}

export default Serp;