import React from 'react';

const CheckBox = (props) => {
    return (
        <p>
            <input type="checkbox" id={props.id} className="filled-in" onChange={props.onChange.bind(this, props.id)}/>
            <label htmlFor={props.id}>{props.label}</label>
        </p>
    );
};

const Verticals = (props) => {
    return (
        <div className="row">
            <div className="col s3">
                <h6 className="teal-text">Design</h6>
                <CheckBox
                    id="design1"
                    label="Art & Culture"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="design2"
                    label="Fashion"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="design3"
                    label="Home Decor"
                    onChange={props.onChange}
                    filters={props.filters}
                />
            </div>
            <div className="col s3">
                <h6 className="teal-text">Technology</h6>
                <CheckBox
                    id="tech1"
                    label="Gadgets"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="tech2"
                    label="Gaming"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="tech3"
                    label="Cars"
                    onChange={props.onChange}
                    filters={props.filters}
                />
            </div>
            <div className="col s3">
                <h6 className="teal-text">Life & Love</h6>
                <CheckBox
                    id="life1"
                    label="Parenting"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="life2"
                    label="Travel"
                    onChange={props.onChange}
                    filters={props.filters}
                />
                <CheckBox
                    id="life3"
                    label="Sex & Relationships"
                    onChange={props.onChange}
                />
                <CheckBox
                    id="life4"
                    label="Lifestyle"
                    onChange={props.onChange}
                />
            </div>
            <div className="col s3">
                <h6 className="teal-text">Body</h6>
                <CheckBox
                    id="body1"
                    label="Health"
                    onChange={props.onChange}
                />
                <CheckBox
                    id="body2"
                    label="Beauty"
                    onChange={props.onChange}
                />
                <CheckBox
                    id="body3"
                    label="Fitness"
                    onChange={props.onChange}
                />
                <CheckBox
                    id="body4"
                    label="Food"
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

class Filters extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {

        // change this.props.filters to this.props.filters.verticals
        return (
            <div className="card-panel">
                <h4>Search Criteria</h4>
                <h6 className="teal-text">I am looking for an influencer...</h6>
                <hr />
                <h5 className="teal-text">Personal</h5>
                <hr />
                <h5 className="teal-text">Verticals</h5>
                <Verticals
                    onChange={this.props.onChange}
                    filters={this.props.filters}
                />
                <button className="btn">Add</button>
            </div>
        );
    }
}

export default Filters;