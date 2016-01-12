import React from 'react';

class Profile extends React.Component {
    render() {
        let reach = this.props.influencer.reach.map(item => {
            let icon;
            switch (item.medium) {
                case 'facebook':
                    icon = 'perm_identity';
                    break;
                case 'twitter':
                    icon = 'query_builder';
                    break;
                case 'pinterest':
                    icon = 'polymer';
                    break;
                case 'instagram':
                    icon = 'print';
                    break;
                case 'youtube':
                    icon = 'play_for_work';
                    break;
                case 'blog':
                    icon = 'invert_colors';
                    break;
                case 'googleplus':
                    icon = 'email';
                    break;
            }
              // export this to a constant... 1am is not the time for this...
              // all work and no play makes homer something something...
            return (
                <div key={item.medium} className="valign-wrapper col s4" style={{height:'40px',marginBottom:'10px'}}>
                    <h6 className="valign teal-text">
                        <i className="material-icons circle teal lighten-3 white-text"
                           style={{
                               padding:'4px',
                               border:'2px solid #009688',
                               margin:'0 10px'
                           }}>{icon}</i>
                        {item.value}
                    </h6>
                </div>
            );
        });
        return (
            <div >
                <div className="card-panel z-depth-4">
                    <div className="row">
                        <div className="col s7">
                            <div className="row">
                                <div className="col s3">
                                    <img className="circle responsive-img" src={'/images/' + this.props.influencer._id +'.jpg'} />
                                </div>
                                <div className="col s9">
                                    <h3 className="teal-text" style={{margin: 0}}>{this.props.influencer.name.first} {this.props.influencer.name.last}</h3>
                                </div>
                            </div>
                            {reach}
                        </div>
                        <div className="col s2 teal lighten-4" style={{height:'200px'}}>something</div>
                        <div className="col s3 teal " style={{height:'200px'}}>something</div>
                    </div>
                </div>
                <div className="card-panel" style={{height:'300px'}}>
                    {this.props.influencer.name.first} {this.props.influencer.name.last}
                </div>
            </div>
        );
    }
}

export default Profile;