import React from 'react'; // eslint-disable-line no-unused-vars
import AbstractInput from './AbstractInput';

class Select extends AbstractInput {
    constructor() {
        super();
    }

    render() {
        if (!this.props.options) {
            return <div/>;
        }
        let selectOptions = this.props.options.map(item => {
            return <option key={item} value={item}>{item}</option>;
        });
        return super.outer(
            <select
                id={this.props.id || this.props.name}
                name={this.props.name}
                className="browser-default"
                style={this.props.value ? {} : {color: 'rgba(0,0,0,0.23)', fontWeight: '500'}}
                defaultValue={this.props.value || ''}
                onChange={this.onChange}>
                <option value="" disabled>{this.props.placeholder || ''}</option>
                {selectOptions}
            </select>
        );
    }
}

export default Select;