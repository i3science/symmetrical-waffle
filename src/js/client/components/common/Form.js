import React from 'react'; // eslint-disable-line no-unused-vars
import errorStore from '../../stores/ErrorStore';
import CheckBox from './form/CheckBox';
import GenderRange from './form/GenderRange';
import Range from './form/Range';
import Select from './form/Select';
import Text from './form/Text';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {}
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        errorStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        errorStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({ errors: errorStore.getErrors() });
    }

    render() {
        return (
            <form className={Object.keys(this.state.errors).length > 0 ? 'invalid' : ''}>
                {this.props.children}
            </form>
        );
    }
}
Form.CheckBox = CheckBox;
Form.GenderRange = GenderRange;
Form.Range = Range;
Form.Select = Select;
Form.Text = Text;

export default Form;