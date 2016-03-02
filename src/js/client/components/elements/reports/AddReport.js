import React from 'react';
import InputText from '../../common/input/inputtext';

class AddReport extends React.Component {
    constructor(props) {
        super();
        this.state = {
            item: props.item || {},
            edit: false,
            index: null,
            type: null
        };
        this._onChange = this._onChange.bind(this);
        this._cancel = this._cancel.bind(this);
        this._save = this._save.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editReport) {
            this.setState({
                edit: true,
                item: nextProps.editReport.report,
                index: nextProps.editReport.index,
                type: nextProps.editReport.type
            });
        } else {
            this._cancel();
        }
    }

    _onChange(type, event) {
        this.state.item[type] = event.target.value;
        this.setState({item: this.state.item});
    }
    _save() {
        this.props.onSave(this.props.name, this.state.item, this.state.index);
        this._cancel();

    }
    _cancel() {
        this.setState({
            edit: false,
            item: {},
            index: null,
            type: null
        });
    }
    render() {
        return (
            <div className="row" style={{marginBottom: '0'}}>
                {(this.state.edit && (this.state.type ? (this.state.type === this.props.name) : true)) ?
                    <div>
                        <hr style={{marginBottom: '20px'}}/>
                        <div className="col s4">
                            <InputText
                                id={this.props.name + '_name'}
                                label="Report Name"
                                placeholder="eg. Page Views"
                                val={this.state.item.name || null}
                                onChange={this._onChange.bind(this, 'name')}
                                active
                            />

                        </div>
                        <div className="col s2">
                            <InputText
                                type="number"
                                id={this.props.name + '_number'}
                                label="Number"
                                val={this.state.item.number || null}
                                onChange={this._onChange.bind(this, 'number')}
                                active
                            />
                        </div>
                        <div className="col s6">
                            <InputText
                                id={this.props.name + '_link'}
                                label="Link to Post"
                                placeholder="eg. http://mysite.com/mypost"
                                val={this.state.item.link || null}
                                onChange={this._onChange.bind(this, 'link')}
                                active
                            />
                        </div>
                        <div className="col s12 right-align">
                            <button
                                className="btn-flat tiny white green-text"
                                type="button"
                                onClick={this._save}
                                style={{marginRight: '40px'}}>
                                <i className="material-icons right">save</i>
                                Save
                            </button>
                            <button
                                className="btn-flat tiny white red-text"
                                type="button"
                                onClick={this._cancel}>
                                <i className="material-icons right">clear</i>
                                Cancel
                            </button>
                        </div>
                    </div> :
                    <div className="col s12 right-align">
                        <hr style={{marginBottom: '20px'}}/>
                        <button
                            type="button"
                            className="btn-flat blue-grey lighten-2 white-text"
                            onClick={() => {this.setState({edit:true});}}
                            style={{padding: '0 15px', fontSize: '12px'}}>
                            <i className="material-icons right">add</i>Add Report
                        </button>
                    </div>}
            </div>
        );
    }
}

export default AddReport;