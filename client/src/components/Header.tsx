import { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector> & {
  modal?: any;
};

const Header: React.FC<Props> = ({ modal, authenticated, user }) => {
  const sidenavRef = useRef(null);

  useEffect(() => {
    M.Sidenav.init(sidenavRef.current);
    M.Modal.init(modal);
  }, []);

  const renderHeaderLinks = () => {
    if (authenticated) {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/picture">Take Picture</Link>
          </li>
          <li>
            <Link to="/signout">Sign Out</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      );
    }
  };

  const renderSideLinks = () => {
    if (authenticated && user && Object.keys(user).length !== 0) {
      return (
        <>
          <li>
            <Link to="#">Hello {user.username}</Link>
          </li>
          <li>
            <Link className="sidenav-close" to="/picture">
              Take Picture
            </Link>
          </li>
          <li>
            <Link className="sidenav-close" to="/settings">
              Settings
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <Link className="sidenav-close" to="/signout">
              Sign Out
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link className="sidenav-close" to="/signin">
              Login
            </Link>
          </li>
          <li>
            <Link className="sidenav-close" to="/signup">
              Sign Up
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <>
      <nav className="blue darken-2">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
              Camagru
            </Link>
            <a
              href="#!"
              data-target="mobile-nav"
              className="button-collapse sidenav-trigger show-on-large right"
            >
              <i className="material-icons">menu</i>
            </a>
            {renderHeaderLinks()}
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-nav" ref={sidenavRef}>
        <li>
          <Link to="/" className="sidenav-close">
            Camagru
          </Link>
        </li>
        <li>
          <div className="divider" />
        </li>
        {renderSideLinks()}
      </ul>
    </>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const connector = connect(mapStateToProps);

export default connector(Header);
