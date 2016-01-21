import React from 'react';
import InfluencerCard from './Card';

/**
 * The InfluencerCardList creates a list of influencer card representations as
 * displayed in search results or in the influencer admin section.
 *
 * Allowed properties:
 *  * influencers: [Object]. Required. The influencers to be represented in the
 *        card list
 *  * onSelectionChanged: function. Optional. When supplied, each time an
 *        influencer is (un)selected, this callback will be invoked. The first
 *        argument is the influencer object, the second is boolean `true` if
 *        selected or `false` if unselected.
 */
class InfluencerCardList extends React.Component {
    render() {
        console.log (this.props);
        if (this.props.influencers) {
            let influencers = this.props.influencers.map((item, index) => {
                return <InfluencerCard
                    key={index}
                    influencer={item}
                    onSelectionChanged={this.props.onSelectionChanged}/>;
            });
            return (
                <div>
                    {influencers}
                </div>

            );
        } else {
            return (
                <div></div>

            );
        }
    }
}

export default InfluencerCardList;