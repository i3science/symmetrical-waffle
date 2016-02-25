import React from 'react';

import Card from '../../common/Card';
import InputTextArea from '../../common/input/inputtextarea';
import BasicProjectParams from '../common/BasicProjectParams';
import Actions from '../../../actions/UiActions';

export default class InfluencerProjectPage extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: ''
        };
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.reject = this.reject.bind(this);
        this.revise = this.revise.bind(this);
        this.accept = this.accept.bind(this);
    }

    onChangeNotes(ev) {
        this.setState({notes: ev.target.value});
    }

    reject() {
        Actions.influencerRejectProject(this.props.project, this.state.notes);
    }
    revise() {
        Actions.influencerReviseProject(this.props.project, this.state.notes);
    }
    accept() {
        Actions.influencerAcceptProject(this.props.project, this.state.notes);
    }

    render() {
        return (
            <div>
                <Card>
                    <BasicProjectParams project={this.props.project} />
                </Card>
                <Card title="Project Description">
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id vehicula enim, ac pellentesque ex. Aenean commodo neque placerat tincidunt facilisis. Duis quis augue blandit, condimentum massa et, dapibus ex. Fusce ut eros nunc. Fusce feugiat mollis dui, ut vestibulum turpis tincidunt id. Cras eget facilisis nibh. Aliquam erat volutpat. Fusce ac urna efficitur magna vestibulum porttitor vitae at velit. Donec at est risus. Aenean vel imperdiet elit. Nam vitae orci et lorem facilisis eleifend ut vitae ligula. Quisque fermentum sem id molestie ultrices. Etiam elit elit, accumsan placerat ligula vitae, vestibulum varius elit. Nam augue quam, interdum non eleifend vitae, varius sodales ipsum. Etiam eu accumsan enim, sed fringilla lectus.</p>
                        <p>Donec sagittis at nunc non tempor. Quisque lorem ante, facilisis nec varius laoreet, faucibus id diam. Proin placerat bibendum justo a auctor. Vestibulum id ex leo. Integer tristique lorem sit amet felis dapibus, id pretium purus auctor. Maecenas tincidunt eleifend malesuada. Proin eu semper orci. Nam ac lorem eu urna condimentum dictum id id urna. Curabitur euismod molestie vulputate. Curabitur at metus mauris. Proin vel lacus non tellus tincidunt volutpat. Suspendisse in posuere sapien. Mauris molestie purus leo, nec vehicula erat porta at. Aenean laoreet fringilla metus eget imperdiet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                        <p>Proin ac erat sed est ornare dictum a at ipsum. Vivamus accumsan enim quam, ut aliquet lectus iaculis nec. Curabitur at elementum elit, nec lobortis ex. Nullam et tortor porta, venenatis mi ac, luctus ligula. Vivamus dictum ornare nibh, et pharetra risus. Proin nec purus vitae sem eleifend ultrices. Morbi in est dolor. Fusce eros massa, fermentum eget enim at, eleifend viverra sem. Aliquam felis risus, porta vel mollis quis, scelerisque vitae nisi. Nunc sit amet gravida ante. Donec condimentum faucibus orci eu euismod. Aenean semper nisl eu tellus posuere, at sollicitudin turpis aliquet. Curabitur ultricies arcu est, at suscipit risus auctor luctus. Aliquam varius, sem at interdum maximus, urna dolor tristique lacus, a posuere metus ligula in nunc.</p>
                        <p>Donec fermentum orci sed ultricies venenatis. Sed in purus nec augue scelerisque sagittis. Sed sit amet risus dapibus, dignissim lectus ut, pharetra magna. Integer ullamcorper sed nibh a bibendum. In volutpat ligula ipsum, sed scelerisque enim bibendum in. Nullam non odio mi. Donec elementum dui vel ornare vehicula. Fusce ac enim mauris. Morbi nisi sapien, luctus tempor rhoncus id, lobortis eget nulla. In id velit in nunc pellentesque tempor aliquet id turpis.</p>
                        <p>Ut egestas lectus in turpis eleifend mattis. Praesent placerat vitae sem id lobortis. Proin ultrices est id nunc elementum dictum. Vestibulum euismod magna vel ultrices ultricies. Aliquam laoreet leo sed mollis sagittis. Integer justo lacus, egestas id nisi non, tristique venenatis libero. Suspendisse maximus neque ac sem dignissim, vel pretium velit placerat. Aenean eu vehicula orci. Nulla aliquam orci non nunc tempor, non gravida urna finibus. Quisque sed vulputate felis. Aliquam a aliquet ante, nec tempus orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat leo, ultricies vitae sem id, tincidunt mollis neque. Sed faucibus lobortis arcu at convallis. Nulla eget lectus in mauris pretium egestas. Aliquam ante mauris, mollis non purus ut, malesuada ornare orci.</p>
                    </div>

                    <InputTextArea
                        id="notes"
                        label="Notes"
                        val={this.state.nodes}
                        active
                        onChange={this.onChangeNotes} />
                </Card>

                <a className="red waves-effect waves-light btn-large" onClick={this.reject}>Reject Project</a>
                <a className="orange waves-effect waves-light btn-large" onClick={this.revise}>Request Revisions</a>
                <a className="teal waves-effect waves-light btn-large" onClick={this.accept}>Accept Project <i className="material-icons right">send</i></a>
            </div>
        );
    }
}