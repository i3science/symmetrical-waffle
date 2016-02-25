import React from 'react';

class InputDate extends React.Component {
    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);
    }
    componentDidMount() {
        if (!this.props.readOnly) {
            $(this.refs[this.props.id]).datepicker({
                defaultDate: this.props.date || '',
                dayNamesMin: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
                onSelect: this._handleChange
            });
        }
    }
    _handleChange() {
        if (this.props.onChange) {
            let datepass = $(this.refs[this.props.id]).datepicker('getDate');
            this.props.onChange($.datepicker.formatDate('mm/dd/yy', datepass), this.props.id, (this.props.parent || null));
        }
    }
    render() {
        return (
            <div>
                <input
                    ref={this.props.id}
                    type="text"
                    id={this.props.id}
                    readOnly
                    value={this.props.date || ''}
                    placeholder={this.props.placeholder || null}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }
}

export default InputDate;