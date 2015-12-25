import React from 'react';
import { Link } from 'react-router';
import Score from '../profile/score';
import MediaKit from '../profile/mediakit';
import Audience from '../profile/audience';
import Reach from '../profile/reach';
import Verticals from '../profile/verticals';

class Result extends React.Component {
    render() {
        let influencers = this.props.influencers.map((item,index) => {
            item.score = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
            var active = {
                color: 'yellow darken-2',
                btn: 'add',
                onClick: this.props.addToList.bind(this, item)
            };
            if ((this.props.selectedInfluencers).indexOf(item)> -1) {
                active = {
                    color: 'teal lighten-1',
                    btn: 'check',
                    onClick: ''
                };
            }
            return (
                <div key={item._id} className="row" style={{position:'relative'}}>
                    <div className="col s11">
                        <div className={!index ? 'card-panel z-depth-4' : 'card-panel'}>
                            <div className="row" style={{marginBottom:'0'}}>
                                <div className="col s9">
                                    <div className="row">
                                        <Link to={'/results/profile/'+item.id}>
                                            <div className="col s3">
                                                <img className="circle responsive-img" src={'images/' + item._id +'.jpg'} />
                                            </div>
                                            <div className="col s6" style={{marginTop:'5%'}}>
                                                <h4 className="teal-text" style={{margin: 0}}>{item.name.first} {item.name.last}</h4>
                                                <h6 className="teal-text">CREATOR{item.amplifier ? ' / AMPLIFIER' : ''}</h6>
                                                <Verticals
                                                    verticals={item.verticals}
                                                />
                                            </div>
                                            <div className="col s3">
                                                <Score
                                                    id={item._id}
                                                    score={item.score}
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
                                                audience={item.audience}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" style={{marginBottom:'0',marginTop:'20px'}}>
                                        <div className="col s12">
                                            <Reach
                                                reach={item.reach}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col s3">
                                    <a href={'#modal'+index}
                                       className="btn-floating btn-large waves-effect waves-light teal right calendar modal-trigger">
                                        <i className="material-icons">perm_contact_calendar</i>
                                    </a>
                                    <div id={'modal'+index} className="modal">
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
                                        mediakit={item.mediaKit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <a onClick={active.onClick}
                       className={'btn-floating btn-large waves-effect waves-light results-add '+ active.color}>
                        <i className="material-icons">{active.btn}</i>
                    </a>
                </div>
            );
        });
        return (
            <div>
                {influencers}
            </div>

        );
    }
}

export default Result;