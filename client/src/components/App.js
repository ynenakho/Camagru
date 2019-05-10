import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import 'materialize-css/dist/css/materialize.min.css';

import styles from './App.module.css';

class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.App}>
        <Header />
        <div className="">{children}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
