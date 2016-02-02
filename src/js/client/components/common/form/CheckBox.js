import React from 'react'; // eslint-disable-line no-unused-vars
import AbstractInput from './AbstractInput';

export default class CheckBox extends AbstractInput {
    constructor() {
        super();
    }

    render() {
        return (
            <p>
                <input type="checkbox"
                    id={this.props.id || this.props.name}
                    name={this.props.name}
                    checked={this.props.checked}
                    className="filled-in"
                    onChange={this.props.onChange.bind(this)} />
                <label htmlFor={this.props.id || this.props.name}>{this.props.label}</label>
            </p>
        );
    }
}