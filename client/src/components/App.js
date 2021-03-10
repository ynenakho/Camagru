import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
