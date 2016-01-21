import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Score from '../profile/score';
import MediaKit from '../profile/mediakit';
import Audience from '../profile/audience';
import Reach from '../profile/reach';
import Verticals from '../profile/verticals';

/**
 * The InfluencerCard represents a single influencer as displayed in search
 * results or in the influencer admin section. Cards may be wrapped in a list
 * or displayed singly.
 *
 * Allowed properties:
 *  * influencer: Object. Required. The influencer to be represented by the card
 *  * selected: boolean. Optional. Determines whether the influencer is pre-
 *        selected. Defaults to false.
 *  * onSelectionChanged: function. Optional. When supplied, enables selection
 *        toggling. Each time the influencer selection is changed, this callback
 *        will be invoked. The first argument is the influencer object and the
 *        second is boolean `true` if selected or `false` for unselected.
 */
class InfluencerCard extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: false
        };
        this.toggleSelection = this.toggleSelection.bind(this);
    }

    toggleSelection() {
        let newState = !this.state.selected;
        this.setState({selected:newState});
        if (this.props.onSelectionChanged) {
            this.props.onSelectionChanged(this.props.influencer, newState);
        }
    }

    render() {
        let influencer = this.props.influencer;

        influencer.score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        var active = {
            color: this.state.selected ? 'teal lighten-1' : 'yellow darken-2',
            btn: this.state.selected ? 'check' : 'add'
        };
        let select = '';
        if (this.props.onSelectionChanged) {
            select = (
                <a onClick={this.toggleSelection}
                   className={'btn-floating btn-large waves-effect waves-light results-add '+ active.color}>
                    <i className="material-icons">{active.btn}</i>
                </a>
            );
        }
        return (
            <div key={influencer._id} className="row" style={{position:'relative'}}>
                <div className={'col ' + (this.props.onSelectionChanged ? 's11' : 's12')}>
                    <div className='card-panel'>
                        <div className="row" style={{marginBottom:'0'}}>
                            <div className="col s9">
                                <div className="row">
                                    <Link to={'/search/results/profile/'+influencer._id}>
                                        <div className="col s3">
                                            <img className="circle responsive-img" src={'/images/' + influencer._id +'.jpg'} />
                                        </div>
                                        <div className="col s6" style={{marginTop:'5%'}}>
                                            <h4 className="teal-text" style={{margin: 0}}>{influencer.name.first} {influencer.name.last}</h4>
                                            <h6 className="teal-text">CREATOR{influencer.amplifier ? ' / AMPLIFIER' : ''}</h6>
                                            <Verticals
                                                verticals={influencer.verticals}
                                            />
                                        </div>
                                        <div className="col s3">
                                            <Score
                                                id={influencer._id}
                                                score={influencer.score}
                                                size="150"
                                            />
                                            <p className="center teal-text">INFLUENCER SCORE</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <h5>Audience Stats</h5>
                                        <Audience
                                            audience={influencer.audience}
                                        />
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom:'0',marginTop:'20px'}}>
                                    <div className="col s12">
                                        <Reach
                                            reach={influencer.reach}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col s3">
                                <a href={'#modal'}
                                   className="btn-floating btn-large waves-effect waves-light teal right calendar modal-trigger">
                                    <i className="material-icons">perm_contact_calendar</i>
                                </a>
                                <div id={'modal'} className="modal">
                                    <div className="modal-content">
                                        <h4>Modal Header</h4>
                                        <p>A bunch of text</p>
                                    </div>
                                    <div className="modal-footer">
                                        <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                                    </div>
                                </div>
                                <br />
                                <MediaKit
                                    mediakit={influencer.mediaKit}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {select}
            </div>
        );
    }

}
export default InfluencerCard;