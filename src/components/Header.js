import React from 'react';

const Header = ({children}) => {
  return (
    <div className="App">
      <header className="App-header2">
        <p>
          Edit <code>src/Header.js</code> and save to reload.
        </p>

      </header>
      {children}
    </div>
  );
}

export default Header;
