import React from 'react'; // eslint-disable-line no-unused-vars

const Form = (props) => {
    return (
        <form>
            {props.children}
        </form>
    );
};

export default Form;