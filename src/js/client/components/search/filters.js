import React from 'react';

const CheckBox = (props) => {
    return (
        <p>
            <input type="checkbox" id={props.id} className="filled-in" onChange={props.onChange.bind(this, props.id)}/>
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

class Filters extends React.Component {
    render() {
        return (
            <div className="card-panel">
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an influencer...</h6>
                <hr />
                <h5 className="teal-text">Personal</h5>
                <hr />
                <h5 className="teal-text">Verticals</h5>
                <div className="row">
                    <form action="#">
                        <div className="col s3">
                            <h6 className="teal-text">Design</h6>
                            <CheckBox
                                id="design1"
                                label="Art & Culture"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="design2"
                                label="Fashion"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="design3"
                                label="Home Decor"
                                onChange={this.props.onChange}
                            />
                        </div>
                        <div className="col s3">
                            <h6 className="teal-text">Technology</h6>
                            <CheckBox
                                id="tech1"
                                label="Gadgets"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="tech2"
                                label="Gaming"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="tech3"
                                label="Cars"
                                onChange={this.props.onChange}
                            />
                        </div>
                        <div className="col s3">
                            <h6 className="teal-text">Life & Love</h6>
                            <CheckBox
                                id="life1"
                                label="Parenting"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="life2"
                                label="Travel"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="life3"
                                label="Sex & Relationships"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="life4"
                                label="Lifestyle"
                                onChange={this.props.onChange}
                            />
                        </div>
                        <div className="col s3">
                            <h6 className="teal-text">Body</h6>
                            <CheckBox
                                id="body1"
                                label="Health"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="body2"
                                label="Beauty"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="body3"
                                label="Fitness"
                                onChange={this.props.onChange}
                            />
                            <CheckBox
                                id="body4"
                                label="Food"
                                onChange={this.props.onChange}
                            />
                        </div>
                    </form>
                </div>

                <button className="btn">Add</button>
            </div>
        );
    }
}

export default Filters;