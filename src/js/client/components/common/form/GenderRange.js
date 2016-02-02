import React from 'react'; // eslint-disable-line no-unused-vars
import AbstractInput from './AbstractInput';
import Text from './Text';
import _ from 'lodash';

export default class GenderRange extends AbstractInput {
    constructor() {
        super();
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
        return super.getValue() || (this.props.max ? this.props.max / 2 : 50);
    }

    render() {
        if (!this.props.name) {
            return <div/>;
        }

        return super.outer(
            <div>
                <input
                    type="range"
                    id={this.props.id || this.props.name}
                    name={this.props.name}
                    min={this.props.min || '0'}
                    max={this.props.max || '100'}
                    value={this.getValue()}
                    onChange={this.onChange}
                />
                <div className="row">
                    <Text
                        id="male"
                        name="male"
                        label="Male"
                        value={this.getValue()}
                        onChange={this.props.onChange ? this.props.onChange.bind(this) : null}
                    />
                </div>
            </div>
        );
    }
}