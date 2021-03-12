import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps, RouteComponentProps } from 'react-router';
import { ReduxState } from 'reducers';

type Props = RouteProps & ConnectedProps<typeof connector>;

const PrivateRoute: FC<Props> = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  if (!Component) {
    return null;
  }
  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        authenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

const mapStateToPtops = (state: ReduxState) => ({
  authenticated: state.auth.authenticated,
});

const connector = connect(mapStateToPtops);

export default connector(PrivateRoute);
