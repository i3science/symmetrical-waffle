import React from 'react'; // eslint-disable-line no-unused-vars
import CheckBox from './form/CheckBox';
import GenderRange from './form/GenderRange';
import Range from './form/Range';
import Select from './form/Select';
import Text from './form/Text';

let Form = () => {
    return (
        <form>
            {this.props.children}
        </form>
    );
};
Form.CheckBox = CheckBox;
Form.GenderRange = GenderRange;
Form.Range = Range;
Form.Select = Select;
Form.Text = Text;

export default Form;