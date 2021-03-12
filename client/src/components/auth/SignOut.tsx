import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as authActions from '../../actions/authActions';

type Props = ConnectedProps<typeof connector>;

const SignOut: React.FC<Props> = ({ signout }) => {
  useEffect(() => {
    signout();
  }, []);

  return (
    <div className="row">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card-panel blue darken-2 white-text center">
          <h3 className="center">SORRY TO SEE YOU GO</h3>
        </div>
      </div>
    </div>
  );
};

const connector = connect(null, authActions);

export default connector(SignOut);
