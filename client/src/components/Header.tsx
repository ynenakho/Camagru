import { useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const Header: React.FC<Props> = ({ authenticated, user }) => {
  const sidenavRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (showSidebar) {
      const handleClickOutside = (e: MouseEvent) => {
        if ((e.target as HTMLElement).id) return;
        if (
          sidenavRef.current &&
          !sidenavRef.current.contains(e.target as Node)
        ) {
          closeSidebar();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showSidebar]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const renderHeaderLinks = () => {
    if (authenticated) {
      return (
        <>
          <Link to="/picture">Take Picture</Link>
          <Link to="/signout">Sign Out</Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signin">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      );
    }
  };

  const renderSideLinks = () => {
    if (authenticated && user && Object.keys(user).length !== 0) {
      return (
        <>
          <h2>Hello {user.username}</h2>
          <Link className="sidebar-link" to="/" onClick={closeSidebar}>
            Home
          </Link>
          <Link className="sidebar-link" to="/picture" onClick={closeSidebar}>
            Take Picture
          </Link>
          <Link className="sidebar-link" to="/settings" onClick={closeSidebar}>
            Settings
          </Link>
          <Link className="sidebar-link" to="/signout" onClick={closeSidebar}>
            Sign Out
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="sidebar-link" to="/signin" onClick={closeSidebar}>
            Login
          </Link>
          <Link className="sidebar-link" to="/signup" onClick={closeSidebar}>
            Sign Up
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="header-wrapper">
      <div className="header">
        <Link to="/" className="brand-logo">
          <h1>Camagru</h1>
        </Link>
        <div className="buttons">
          {renderHeaderLinks()}
          <i
            className="fas fa-bars fa-lg button"
            onClick={toggleSidebar}
            id="menu-button"
          ></i>
        </div>
      </div>
      <div
        ref={sidenavRef}
        className={`sidebar ${showSidebar ? 'show-sidebar' : ''}`}
      >
        {renderSideLinks()}
      </div>
    </nav>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user,
});

const connector = connect(mapStateToProps);

export default connector(Header);
