import React from 'react';
import "../styles/login.css";

function Login() {
  return (
    <div className="App">
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
          />
          <input
            type="password"
            className="sign-up-input"
            placeholder="Enter in your password"
            autoFocus
          />
          <div>
            <button className="button ">Sign in</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default Login;
