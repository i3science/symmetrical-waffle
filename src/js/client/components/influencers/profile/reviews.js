import React from 'react';
import { Link } from 'react-router';
import Actions from '../../../actions/UiActions';
import reviewStore from '../../../stores/ReviewStore';

const Star = (props) => {
    return (
        <i className={'material-icons' + (props.color ? ' ' + props.color + '-text' : ' teal-text') + (props.disabled ? ' ' + props.disabled : '')} style={{fontSize: '35px'}}>star</i>
    );
};

const Rating = (props) => {

    let rating = [];

    for (var i=0; i < 5; i++) {
        if (i < props.stars) {
            rating.push(<Star key={i} />);
        } else {
            rating.push(<Star key={i} disabled="text-lighten-5" />);
        }
    }
    return (
        <div className="center-align">
            {rating}
        </div>
    );
};

const Review = (props) => {
    return (
        <div className="row">
            <div className="col s6">
                <img className="circle responsive-img left" style={{width: '80px', marginRight: '30px', boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.5)'}} src="/assets/images/default.jpg" />
                <div style={{overflow: 'hidden', height: '90px', position: 'relative'}}>
                    <p style={{fontSize: '15px', margin: '0'}}>{props.review.review}</p>
                    <div style={{
                        height: '20px',
                        width: '100%',
                        position: 'absolute',
                        bottom: '0',
                        marginLeft: '-12px',
                        boxShadow: '0px -23px 12px -7px #fff inset'
                    }}></div>
                </div>
            </div>
            <div className="col s3">
                <Rating
                    stars={props.review.rating}
                />
            </div>
            <div className="col s3 center-align">
                <Link
                    to="/search"
                    className="amber accent-3 waves-effect waves-light btn center">
                    <i className="material-icons right">subject</i> Read More
                </Link>
            </div>
        </div>
    );
};

export default class Reviews extends React.Component {
    constructor() {
        super();
        this.state = {};
        this._onReviewsChange = this._onReviewsChange.bind(this);
    }

    componentDidMount() {
        reviewStore.addChangeListener(this._onReviewsChange);
        Actions.findReviewsForInfluencer(this.props.influencer);
    }

    componentWillUnmount() {
        reviewStore.removeChangeListener(this._onReviewsChange);
    }

    _onReviewsChange() {
        this.setState({ reviews: reviewStore.getReviews() });
    }

    render() {
        if (!this.state.reviews) {
            return <div>No reviews yet.</div>;
        }
        let reviews = this.state.reviews.map((item, index) => {
            return (
                <Review
                    key={index}
                    review={item}
                />
            );
        });
        return (
            <div>
                {reviews}
            </div>
        );
    }
}