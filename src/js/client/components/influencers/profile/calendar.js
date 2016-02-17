import React from 'react';

class Calendar extends React.Component {
    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);
    }
    componentDidMount() {
        let dates = !this.props.dates ? '' : (this.props.dates.length > 0 ? this.props.dates : '');
        let disableIt = () => {
            return [false, ''];
        };
        $(this.refs[this.props.id]).multiDatesPicker({
            addDates: dates || '',
            dayNamesMin: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
            numberOfMonths: Number(this.props.panels) || 1,
            beforeShowDay: this.props.disabled ? disableIt : null,
            onSelect: this._handleChange
        });
    }

    _handleChange() {
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange($(this.refs[this.props.id]).multiDatesPicker('getDates'));
        }
    }

    render() {
        return (
            <div
                ref={this.props.id}
                style={{width: this.props.full ? 'auto' : (this.props.panels ? '620px' : '316px')}}
            ></div>
        );
    }
}

export default Calendar;