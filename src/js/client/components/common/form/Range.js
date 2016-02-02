import React from 'react'; // eslint-disable-line no-unused-vars
import AbstractInput from './AbstractInput';

export default class Range extends AbstractInput {
    constructor() {
        super();
    }

    getValue() {
        let value = super.getValue();
        if (!value) {
            value = this.props.max ? this.props.max / 2 : 50;
        }
        return value;
    }

    render() {
        return super.outer(
            <input
                type="range"
                id={this.props.id || this.props.name}
                name={this.props.name}
                min={this.props.min || '0'}
                max={this.props.max || '100'}
                value={this.getValue()}
                onChange={this.onChange} />);
    }
}