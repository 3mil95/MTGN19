import React, { Component } from "react";
import Frack from "./../Frack";
import "./Login.css";

class Login extends Component {
  state = { isLogdin: false, loginFail: false };

  clickHndeler = event => {
    event.preventDefault();
    this.setState({ loginFail: false });
    Frack.Login(event.target.username.value, event.target.password.value)
      .then(res => {
        sessionStorage.authToken = res.data.token;
        if (Frack.HasToken()) {
          console.log(this.props.location.url)
          if (this.props.location.url) {
            this.accessGranted(this.props.location.url);
          } else {
            this.accessGranted("/");
          }
        }
        return Frack.UpdateCurrentUser();
      })
      .catch(error => {
        console.log("error");
        this.setState({ loginFail: true });
      });
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  accessGranted = async url => {
    this.setState({ isLogdin: true });
    await this.sleep(1000);
    this.props.history.push(url);
  };

  createContent = () => {
    if (this.state.isLogdin === false) {
      return (
        <form onSubmit={this.clickHndeler}>
          <h1>Mottagningen</h1>
          <label>
            Username:
            <br />
          </label>
          <input name='username' type='text' autoComplete='off' /> <br />
          <label>
            Password:
            <br />
          </label>
          <input name='password' type='password' />
          <br />
          {this.state.loginFail ? (
            <h1 className='login-fail'>Access Denied</h1>
          ) : null}
          <input type='submit' value='logga in' />
        </form>
      );
    }
    return <h1>Access Granted</h1>;
  };

  render() {
    return (
      <div className='login-bg'>
        <div className='login-box'>{this.createContent()}</div>/>
      </div>
    );
  }
}

export default Login;
