import React from 'react'; // eslint-disable-line no-unused-vars
import _ from 'lodash';

import Channels from './channels';
import Verticals from './verticals';
import Score from './score';
import Work from './work';
import MediaKit from './mediakit';
import Personal from './personal';
import Audience from './audience';
import Calendar from './calendar';
import Reviews from './reviews';


let influencerExtended = {
    score: '95',
    location: 'Toronto, Canada',
    bio: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
    availability: [],
    work: [
        {
            name: 'Blog 1',
            path: 'whoknows'
        },
        {
            name: 'Blog 2',
            path: 'whoknows'
        },
        {
            name: 'Blog 3',
            path: 'whoknows'
        },
        {
            name: 'Blog 4',
            path: 'whoknows'
        }
    ]
    // reviews: [
    //     {
    //         id: '12345',
    //         image: '',
    //         body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae',
    //         stars: 3
    //     },
    //     {
    //         id: '23456',
    //         image: '',
    //         body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae',
    //         stars: 5
    //     },
    //     {
    //         id: '34567',
    //         image: '',
    //         body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae',
    //         stars: 4
    //     },
    //     {
    //         id: '45678',
    //         image: '',
    //         body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae',
    //         stars: 1
    //     }
    // ]

};

const Profile = (props) => {

    // TODO -- until the influencer object is complete
    let influencer = _.merge(props.influencer, influencerExtended);

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
                                <h4 className="teal-text" style={{margin: 0}}>{influencer.name.first} {influencer.name.last}</h4>
                                <h6 className="teal-text">CREATOR{influencer.amplifier ? ' / AMPLIFIER' : ''}</h6>
                                <br />
                                <Channels
                                    channels={influencer.channels}
                                    col="s4"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <h5>Bio</h5>
                                <p style={{
                                border: '1px solid rgba(0,0,0,0.1)',
                                padding: '10px'}}>{influencer.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col s3">
                        <Score
                            id={influencer._id}
                            score={influencer.score}
                            size="200"
                        />
                        <p className="center teal-text">INFLUENCER SCORE</p>
                        <Verticals
                            verticals={influencer.verticals}
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
                            audience={influencer.audience}
                        />
                    </div>
                </div>
                <h5>Personal</h5>
                <br />
                <div className="row">
                    <div className="col s12">
                        <Personal
                            personal={influencer.personal}
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
                                work={influencer.work}
                                itemsize="200"
                            />
                        </div>
                    </div>
                    <div className="col s4">
                        <MediaKit
                            mediakit={influencer.mediaKit}
                        />
                    </div>
                </div>
            </div>
            <div className="card-panel">
                <Calendar
                    id="profile"
                    full
                    disabled
                    dates={influencer.availability}
                />
            </div>
            <div className="card-panel">
                <h5 style={{marginBottom: '30px'}}>Reviews</h5>
                <div style={{padding: '0 2%'}}>
                    <Reviews
                        influencer={influencer}
                    />
                </div>

            </div>
        </div>
    );
};

export default Profile;