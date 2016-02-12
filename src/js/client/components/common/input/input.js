import React from 'react'; // eslint-disable-line no-unused-vars
import _ from 'lodash';

/**
 * The Input component is a reusable component for producing <input/> fields.
 * The point of this component is to shorten input field declarations, enforce
 * two-way binding, and increase maintainability. This component can retrieve
 * and update a property anywhere within the parent scope, provided the `this`
 * attribute is provided. Thus, it cheats a great deal in how it manages the
 * bindings. Should the property exist within the parent state, the parent's
 * `setState` method will be called in order to keep everything up to date. This
 * circumvents the overly verbose need to have the onChange attribute present
 * under normal circumstances. You can thus get away with
 *   <Input name="..." property="user.email" this={this}> 
 * rather than something longer like
 *   <input type="text" name="..." value={this.state.user.email} onChange={this.handleChange.bind(this)}>
 *
 * It is important to note that if the property referenced does not exist in
 * parent scope at all, this component will not work. Further, if the result of
 * the change action is anything other than updating the value of the property,
 * this will not work either.
 *
 * Known/allowed props:
 *  * type: String - Defaults to 'text'. The HTML input type.
 *  * name: String - The name of the input field
 *  * id: String - Defaults to name. The id of the field.
 *  * property: String - The path to the state property to display/update
 *  * this: Object - The parent component's scope within which the parent
 *        component's state object may be found.
 */
const Input = (props) => {
    let onChange = function(ev) {
        _.set(props.this, props.property, ev.target.value);
        if (props.property.startsWith('state.')) {
            props.this.setState(props.this.state);
        }
    };
    return (
        <input
            type={props.type || 'text'}
            name={props.name}
            id={props.id || props.name}
            value={_.get(props.this, props.property)}
            onChange={onChange} />
    );
};

export default Input;