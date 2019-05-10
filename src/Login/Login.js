import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../_actions/user';


class Login extends Component {
    handleLogin = () => {
        this.props.userActions.attemptLogin();
    }
    render() {
        return (
            <Button onClick={this.handleLogin} variant="contained" color="primary">Login</Button>
        );
    }
}



const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
})
export default connect(null, mapDispatchToProps)(Login);

