import React from 'react'; // eslint-disable-line no-unused-vars
import { Link } from 'react-router';
import InputDate from '../../common/input/inputdate';
import ProjectStatusDate from './ProjectStatusDate';
import moment from 'moment';


class NewCheckpoint extends React.Component {
    constructor() {
        super();
        this.state = {
            addButton: 'block',
            newFields: 'none'
        };
        this._add = this._add.bind(this);
        this._cancel = this._cancel.bind(this);
    }
    _add() {
        event.preventDefault();
        this.setState({
            addButton: 'none',
            newFields: 'block'
        });
    }
    _cancel() {
        this.setState({
            addButton: 'block',
            newFields: 'none'
        });
    }

    render() {
        let newDate = '';
        let addDate = (date) => {
            newDate = date;
        };
        let add = (event) => {
            event.preventDefault();
            this._add();
        };
        let cancel = (event) => {
            event.preventDefault();
            $(this.refs[this.props.phase + '_name']).val('');
            this._cancel();
        };
        let submit = (event) => {
            event.preventDefault();
            if (!((this.refs[this.props.phase + '_name'].value && newDate) === '')) {
                this.props.onChange(newDate, this.refs[this.props.phase + '_name'].value, ('checkpoints_' + this.props.id));
                $(this.refs[this.props.phase + '_name']).val('');
                this._cancel();
            }
        };
        return (
            <div className="row">
                <div style={{display: this.state.newFields}}>
                    <div className="col s6">
                        <div className="input-field">
                            <input
                                ref={this.props.phase + '_name'}
                                id={this.props.phase + '_name'}
                                type="text"
                                placeholder="Checkpoint"/>
                        </div>
                    </div>
                    <div className="col s6">
                        <InputDate
                            id={this.props.id + '_date'}
                            parent={this.props.parent || null}
                            //date={moment(this.props.val).format('MM/DD/YYYY') || null}
                            onChange={addDate}
                        />
                    </div>
                    <div className="col s12">
                        <Link to="" className="red-text" onClick={cancel}>
                            <i className="material-icons">clear</i>
                        </Link>
                        <Link to="" className="green-text right" onClick={submit}>
                            <i className="material-icons">done</i>
                        </Link>
                    </div>
                </div>
                <div className="col s12 right-align" style={{display: this.state.addButton}}>
                    <Link to="" onClick={add} className="green-text">
                        <div className="btn-flat tiny white teal-text" style={{padding: '0', fontSize: '12px'}}>
                            <i className="material-icons right">add</i>Add Checkpoint
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}


const ProjectCheckpoints = (props) => {
    if (!props.checkpoints) {
        return <div></div>;
    }
    let projectCheckpoints = props.checkpoints.map((item, index) => {
        return (
            <div key={index} className="row checkmarks" style={{position: 'relative'}}>
                <div className="col s6">
                    <p>{item.name}</p>
                </div>
                <div className="col s6" style={{marginRight: '-28px'}}>
                    <p style={{marginBottom: '12px'}}>{moment(item.date).format('MM/DD/YYYY')}</p>
                </div>
                <button
                    style={{
                        padding: '0',
                        position: 'absolute',
                        top: '0'
                    }}
                    onClick={props.removeCheckmark.bind(null, index, props.phase)}
                    type="button"
                    className="btn-flat white red-text">
                    <i className="material-icons">clear</i>
                </button>
            </div>
        );
    });

    return (
        <div>
            {projectCheckpoints}
            <NewCheckpoint
                id={props.phase}
                onChange={props.onChange}
            />
        </div>
    );
};

const ProjectDates = (props) => {
    console.log(props);
    return (
        <div className="row project-dates">
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectStatusDate
                        id="project_start"
                        label="Project Start:"
                        val={props.project.project_start}
                        onChange={props.handleDate}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_start || null}
                        phase="start"
                        removeCheckmark={props.removeCheckmark}
                        onChange={props.handleDate}
                    />
                </div>
            </div>
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectStatusDate
                        id="project_live"
                        label="Project Live:"
                        val={props.project.project_live}
                        onChange={props.handleDate}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_live || null}
                        phase="live"
                        removeCheckmark={props.removeCheckmark}
                        onChange={props.handleDate}
                    />
                </div>
            </div>
            <div className="col s4">
                <div style={{width: '300px', margin: '0 auto'}}>
                    <ProjectStatusDate
                        id="project_end"
                        label="Project End:"
                        val={props.project.project_end}
                        onChange={props.handleDate}
                    />
                    <ProjectCheckpoints
                        checkpoints={props.project.checkpoints_end || null}
                        phase="end"
                        removeCheckmark={props.removeCheckmark}
                        onChange={props.handleDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectDates;
