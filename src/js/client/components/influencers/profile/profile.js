import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import Channels from './channels';
import Verticals from './verticals';
import Score from './score';
import Work from './work';
import MediaKit from './mediakit';
import Personal from './personal';
import Audience from './audience';
import Calendar from './calendar';
import Reviews from './reviews';

const Profile = (props) => {
    return (
        <div >
            <div className="card-panel z-depth-4">
                <div className="row" style={{marginBottom: '0'}}>
                    <div className="col s9">
                        <div className="row" style={{marginBottom: '0'}}>
                            <div className="col s3">
                                <img className="circle responsive-img" src={'/assets/images/' + (props.influencer.hasImage ? props.influencer._id : 'default') +'.jpg'} />
                            </div>
                            <div className="col s9">
                                <h4 className="teal-text" style={{margin: 0}}>{props.influencer.name.first} {props.influencer.name.last}</h4>
                                <h6 className="teal-text">CREATOR{props.influencer.amplifier ? ' / AMPLIFIER' : ''}</h6>
                                <br />
                                <Channels
                                    channels={props.influencer.channels}
                                    col="s4"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <h5>Bio</h5>
                                <p style={{
                                border: '1px solid rgba(0,0,0,0.1)',
                                padding: '10px'}}>{props.influencer.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s3">
                        <div className="right-align">
                            <Link className="btn-floating waves-effect waves-light blue-grey" to={'/preferences/influencers/edit/' + props.influencer._id}>
                                <i className="material-icons">mode_edit</i>
                            </Link>
                        </div>
                        <Score
                            id={props.influencer._id}
                            score={props.influencer.score}
                            size="200"
                        />
                        <p className="center teal-text">INFLUENCER SCORE</p>
                        <Verticals
                            verticals={props.influencer.verticals}
                        />
                    </div>
                </div>
            </div>
            <div className="card-panel">
                <h5>Audience</h5>
                <br />
                <div className="row">
                    <div className="col s12">
                        <Audience
                            audience={props.influencer.audience}
                        />
                    </div>
                </div>
                <h5>Personal</h5>
                <br />
                <div className="row">
                    <div className="col s12">
                        <Personal
                            personal={props.influencer.personal}
                        />
                    </div>
                </div>
            </div>
            <div className="card-panel">
                <div className="row" style={{marginBottom: '0'}}>
                    <div className="col s8">
                        <h5 style={{marginBottom: '30px'}}>Work Demonstration</h5>
                        <div style={{padding: '0 2%'}}>
                            <Work
                                work={props.influencer.work}
                                itemsize="200"
                            />
                        </div>
                    </div>
                    <div className="col s4">
                        <MediaKit
                            mediakit={props.influencer.mediaKit}
                        />
                    </div>
                </div>
            </div>
            <div className="card-panel">
                <Calendar
                    id="profile"
                    full
                    disabled
                    dates={props.influencer.availability}
                />
            </div>
            <div className="card-panel">
                <h5 style={{marginBottom: '30px'}}>Reviews</h5>
                <div style={{padding: '0 2%'}}>
                    <Reviews
                        influencer={props.influencer}
                    />
                </div>

            </div>
        </div>
    );
};

export default Profile;