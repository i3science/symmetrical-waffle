import React from 'react'; // eslint-disable-line no-unused-vars
import AbstractInput from './AbstractInput';

export default class Text extends AbstractInput {
    constructor() {
        super();
    }

    render() {
        return super.outer(
            <input
                type="text"
                id={this.props.id || this.props.name}
                name={this.props.name}
                className={this.getInputClasses()}
                placeholder={this.props.placeholder || ''}
                value={super.getValue()}
                onChange={this.onChange}/>);
    }
}