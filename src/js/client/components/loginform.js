import React from 'react';

class LoginForm extends React.Component {

    render() {

        return (
            <form onSubmit={this.props.handleSubmit.bind('erer',this)}>
                <input ref="email" type="text" placeholder="email" defaultValue="admindddd@smt.com" />
                <input ref="pass" type="password" placeholder="password" />
                <br /><br />
                <div className="center-align" style={{marginBottom: '30px'}}>
                    <button type="submit" className="btn waves-light btn-large">Sign In</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;

