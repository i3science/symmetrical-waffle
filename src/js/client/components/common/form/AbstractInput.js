import React from 'react';
import _ from 'lodash';

class AbstractInput extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    onChange(ev) {
        // If an object binding has been given, handle that before calling
        // onChange.
        if (typeof this.props.bind !== 'undefined'
                && typeof this.props.path !== 'undefined') {
            _.set(this.props.bind, this.props.path, ev.target.value);
        }

        // Call the onChange function if given
        if (typeof this.props.onChange !== 'undefined') {
            this.props.onChange(ev);
        }
    }

    getValue() {
        // Explicit value overrides binding
        if (typeof this.props.value !== 'undefined') {
            return this.props.value;
        }

        // Get from bound object
        if (typeof this.props.bind !== 'undefined'
                && typeof this.props.path !== 'undefined') {
            return _.get(this.props.bind, this.props.path);
        }

        return '';
    }

    getLabelClasses() {
        let classes = [];
        if (this.getValue() || this.props.active) {
            classes.push('active');
        }
        if (this.props.color) {
            classes.push(this.props.color + '-text');
        } else {
            classes.push('teal-text');
        }
        return classes.join(' ');
    }

    getInputClasses() {
        let classes = ['validate'];
        if (this.props.error) {
            classes.push('invalid');
        }
        return classes.join(' ');
    }

    outer(content) {
        let prefix = '';
        if (this.props.prefix) {
            prefix = <div
                    className="prefix center-align"
                    style={{ fontSize: '17px', marginTop: '8px'}}
                >{this.props.prefix}</div>;
        }
        let suffix = '';
        if (this.props.suffix) {
            suffix = <div
                className="suffix center-align"
                style={{ fontSize: '17px', marginTop: '8px'}}
            >{this.props.suffix}</div>;
        }
        return (
            <div className={'input-field col '+ (this.props.col ? this.props.col : 's12')}>
                {prefix || ''}
                { content }
                {suffix || ''}
                <label
                    htmlFor={this.props.id || this.props.name}
                    className={this.getLabelClasses()}
                    data-error={this.props.error}
                >{this.props.label}</label>
            </div>
        );
    }
}

AbstractInput.propTypes = {
    // Labling and naming
    name: React.PropTypes.string.isRequired,
    id: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    prefix: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    suffix: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),

    // Value and change management
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    bind: React.PropTypes.object,
    path: React.PropTypes.string,

    // Error handling
    error: React.PropTypes.string,

    // Styling
    color: React.PropTypes.string,
    col: React.PropTypes.string
};

export default AbstractInput;