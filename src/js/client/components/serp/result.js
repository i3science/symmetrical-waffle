import React from 'react';
import { Link } from 'react-router';
import Actions from '../../actions/actions';

class Result extends React.Component {
    render() {
        let influencers = this.props.influencers.map(item => {
            var active = {
                color: 'yellow darken-2',
                btn: 'add',
                onClick: this.props.addToList.bind(this, item)
            };
            if ((this.props.selectedInfluencers).indexOf(item)> -1) {
                active = {
                    color: 'green darken-2',
                    btn: 'check',
                    onClick: ''
                };
            }
            return (
                <div key={item.id} className="row">
                    <div className="col s10">
                        <Link to={"/profile/"+item.id}>
                            <div className="card-panel">
                                <div className="row">
                                    <div className="col s7">
                                        <div className="row">
                                            <div className="col s3">
                                                <img className="circle responsive-img" src={'images/' + item.id +'-profile.jpg'} />
                                            </div>
                                            <div className="col s9">
                                                <h3 className="teal-text" style={{margin: 0}}>{item.name.first} {item.name.last}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s2"></div>
                                    <div className="col s3"></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <a onClick={active.onClick}
                       className={'btn-floating btn-large waves-effect waves-light '+ active.color}>
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