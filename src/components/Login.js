import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "../styles/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isValid: false
    };
  }

  renderRedirect = () => {
    if (this.state.isValid) {
      return <Redirect to='/Events' />
    }
  }

  handleClick(event) {
    //var apiBaseUrl = "http://localhost:3000/api/";

    if (this.state.username === "admin" && this.state.password === "admin") {
      console.log("Welcome admin");
      this.setState({isValid:true})
    } else if (this.state.username === "cood" && this.state.password === "cood") {
      console.log("Welcome coordinator");
    } else {
      console.log("Username or password does not exist");
    }
  }

  render() {
    
    return (
      <div className="App">
        {this.renderRedirect()}
        <aside className="profile-card">
          <div className="profile-bio">
            <div>
              <img
                src="http://www.goodwoodmosque.org.za/images/logoImage.JPG"
                alt="logo"
                width="100"
                height="100"
              />
            </div>
            <input
              type="text"
              className="sign-up-input"
              placeholder="Enter in your username"
              autoFocus
              onChange={(event, newValue) =>
                this.setState({ username: event.target.value })
              }
            />
            <input
              type="password"
              className="sign-up-input"
              placeholder="Enter in your password"
              onChange={(event, newValue) =>
                this.setState({ password: event.target.value })
              }
            />
            <div>
              <button
                className="button"
                onClick={event => this.handleClick(event)}
              >
                Sign in
              </button>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}
export default Login;
