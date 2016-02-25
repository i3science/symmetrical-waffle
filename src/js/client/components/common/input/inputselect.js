import React from 'react'; // eslint-disable-line no-unused-vars

export default React.createClass({
    render: function() {
        if (!this.props.id) {
            return <div></div>;
        }
        var selectOptions = null;
        if (this.props.options && Array.isArray(this.props.options)) {
            selectOptions = this.props.options.map(item => {
                return (<option key={item} value={item}>{item}</option>);
            });
        } else if (this.props.options) {
            selectOptions = Object.keys(this.props.options).map((val) => {
                return (<option key={val} value={val}>{this.props.options[val]}</option>);
            });
        }
        return (
            <div style={{
                        padding: '0 0 15px 0'
                        }}>
                <div style={{
                        borderBottom: '1px solid #9e9e9e'
                        }}>
                    <label htmlFor={this.props.id} className={this.props.color ? this.props.color + '-text' : 'teal-text'}>{this.props.label}</label>
                    <select
                            id={this.props.id}
                            name={this.props.label}
                            className="browser-default"
                            style={this.props.val ? {} : {fontWeight: '500'}}
                            value={this.props.val}
                            data-parent={this.props.parent || null}
                            disabled={this.props.disabled}
                            onChange={this.props.onChange ? this.props.onChange.bind(this) : null}>
                        <option value="" disabled={this.props.placeholder ? 'disabled' : ''}>{this.props.placeholder ? this.props.placeholder : ''}</option>
                        {selectOptions}
                    </select>
                </div>
            </div>
        );
    }
});