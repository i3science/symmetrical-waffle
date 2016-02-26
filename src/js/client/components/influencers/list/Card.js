import React from 'react';
import { Link } from 'react-router';
import Score from '../profile/score';
import MediaKit from '../profile/mediakit';
import Audience from '../profile/audience';
import Channels from '../profile/channels';
import Verticals from '../profile/verticals';
import Calendar from '../profile/calendar';

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
            selected: false,
            hovering: false,
            calendarOpen: false,
            sink: true
        };
        this.toggleSelection = this.toggleSelection.bind(this);
        this.notHovering = this.notHovering.bind(this);
        this._slideIt = this._slideIt.bind(this);
        this._animateIt = this._animateIt.bind(this);
        this.hovering = this.hovering.bind(this);
    }
    toggleSelection() {
        let newState = !this.state.selected;
        this.setState({selected:newState});
        if (this.props.onSelectionChanged) {
            this.props.onSelectionChanged(this.props.influencer, newState);
        }
    }
    _slideIt(influencerId) {
        this._animateIt(influencerId);
        if (!this.state.calendarOpen) {
            this.setState({
                calendarOpen: true,
                sink: false
            });
            return;
        }
        this.setState({calendarOpen: false});
    }
    _animateIt(influencerId) {
        if (!this.state.calendarOpen) {
            $(this.refs['card-' + influencerId]).animate({
                left: '-90%'
            }, 500, 'easeInOutQuad');
        } else {
            $(this.refs['card-' + influencerId]).animate({
                left: '0'
            }, 500, 'easeInOutQuad', () => {this.setState({sink: true});});
        }
    }
    hovering() {
        this.setState({hovering: true});
    }
    notHovering() {
        this.setState({hovering: false});
    }
    render() {
        let influencer = this.props.influencer;

        influencer.score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        var active = {
            color: (this.state.selected && this.state.hovering) ? 'red darken-2' : (this.state.selected ? 'teal lighten-1' : 'yellow darken-2'),
            btn: (this.state.selected && this.state.hovering) ? 'remove' : (this.state.selected ? 'check' : 'add')
        };
        let select = '';
        if (this.props.onSelectionChanged) {
            select = (
                <a onClick={this.toggleSelection} onMouseOver={this.hovering.bind(this)} onMouseOut={this.notHovering.bind(this)}
                   className={'btn-floating btn-large waves-effect waves-light results-add '+ active.color}>
                    <i className="material-icons">{active.btn}</i>
                </a>
            );
        }
        return (
            <div key={influencer._id} className="row" style={{position:'relative'}}>
                <div className={'col ' + (this.props.onSelectionChanged ? 's11' : 's12')}>
                    <div id="before" style={{
                        position: 'absolute',
                        top: '0',
                        width: this.props.onSelectionChanged ? '91.6667%' : '100%',
                        height: '100%',
                        margin: '0 -12px',
                        padding: '10px 10px 30px'
                    }}>
                        <div style={{
                            background: '#fff',
                            margin: '0 0 0 auto',
                            width: '90%',
                            height: '100%',
                            boxShadow: '-3px 5px 13px -8px #000 inset'
                        }}>
                            <div style={{
                                transform: 'translateY(-50%)',
                                padding: '15px',
                                position: 'relative',
                                top: '50%'
                            }}>
                                <div style={{
                                    width: '100%',
                                    maxWidth: '920px'
                                }}>
                                    <Calendar
                                        id={influencer._id}
                                        panels="2"
                                        full
                                        disabled
                                        dates={influencer.availability} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={'card-' + influencer._id} className={'card-panel' + (!this.state.sink ? ' z-depth-4' : '')} style={{left: '0'}}>
                        <div className="row" style={{marginBottom:'0'}}>
                            <div className="col s9">
                                <div className="row">
                                    <Link to={'/search/results/profile/' + influencer._id}>
                                        <div className="col s3">
                                            <img className="circle responsive-img" src={'/assets/images/' + (influencer.hasImage ? influencer._id : 'default') +'.jpg'} />
                                        </div>
                                        <div className="col s6" style={{marginTop:'5%'}}>
                                            <h4 className="teal-text" style={{margin: 0}}>{influencer.name.first} {influencer.name.last}</h4>
                                            <h6 className="teal-text" style={{textTransform: 'uppercase'}}>{influencer.mediums.join(', ')}</h6>
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
                                        <Channels
                                            channels={influencer.channels}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col s3">
                                {this.props.edit ?
                                    <button type="button" className="btn-floating waves-effect waves-light blue-grey" to={this.props.edit + '/' + influencer._id}>
                                        <i className="material-icons">mode_edit</i>
                                    </button> : null}
                                <button type="button" onClick={this._slideIt.bind(null, influencer._id)}
                                   className={'btn-floating btn-large waves-effect waves-light teal right ' + (this.props.edit ? '' : 'right ') + 'calendar modal-trigger'}>
                                    <i className="material-icons">{this.state.calendarOpen ? 'forward' : 'perm_contact_calendar'} </i>
                                </button>
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