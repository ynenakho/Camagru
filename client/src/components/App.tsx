import Header from 'components/Header';
import Footer from 'components/Footer';

type Props = {
  children: React.ReactChild[];
};

const App: React.FC<Props> = ({ children }) => {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default App;
