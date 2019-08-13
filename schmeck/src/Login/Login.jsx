import React, { Component } from "react";
import Frack from "./../Frack";
import "./Login.css";

class Login extends Component {
  state = { isLogdin: false, loginFail: false, accessestext: ""};
  accessestext = "Access Granted"

  clickHndeler = event => {
    event.preventDefault();
    this.setState({ loginFail: false });
    Frack.Login(event.target.username.value.toLowerCase(), event.target.password.value)
      .then(res => {
        sessionStorage.authToken = res.data.token;
        if (Frack.HasToken()) {
          this.props.login()
          if (this.props.location.url) {
            this.accessGranted(this.props.location.url);
          } else {
            this.accessGranted("/");
          }
        }
        return Frack.UpdateCurrentUser();
      })
      .catch(error => {
        this.setState({ loginFail: true });
      });
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  accessGranted = async url => {
    this.setState({ isLogdin: true });
    for (let i = 0; i < this.accessestext.length +1; i++){
      this.setState({accessestext: this.accessestext.substr(0,i)})
      await this.sleep(50);
    }
    await this.sleep(500);
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
          <input type='submit' value='Logga in' />
        </form>
      );
    }
    return <h1>{this.state.accessestext}</h1>;
  };

  render() {
    return (
      <div className='login-bg'>
        <div className='login-box'>{this.createContent()}</div>
      </div>
    );
  }
}

export default Login;
