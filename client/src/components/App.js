import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'materialize-css/dist/css/materialize.min.css';

const App = props => {
  const { children } = props;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default App;
