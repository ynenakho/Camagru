import Header from 'components/Header';
import Footer from 'components/Footer';
import { ReactChild } from 'react';

type Props = {
  children: ReactChild[];
};

const App: React.FC<Props> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="app">{children}</div>
      <Footer />
    </div>
  );
};

export default App;
