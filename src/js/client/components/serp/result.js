import React from 'react';
import { Link } from 'react-router';

class Result extends React.Component {
    render() {
        console.log(this.props.influencers);

        let influencers = this.props.influencers.map(item => {
            return (
                <div key={item.id}>
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