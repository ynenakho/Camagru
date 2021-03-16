import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as authActions from '../../actions/authActions';

type Props = ConnectedProps<typeof connector>;

const SignOut: React.FC<Props> = ({ signout }) => {
  useEffect(() => {
    signout();
  }, [signout]);

  return (
    <div className="section">
      <h1>SORRY TO SEE YOU GO</h1>
    </div>
  );
};

const connector = connect(null, authActions);

export default connector(SignOut);
