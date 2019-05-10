import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class Header extends Component {
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    M.Modal.init(this.props.modal);
  }

  renderHeaderLinks = () => {
    if (this.props.authenticated) {
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

  renderSideLinks = () => {
    const { authenticated, user } = this.props;
    if (authenticated) {
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

  render() {
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
              {this.renderHeaderLinks()}
            </div>
          </div>
        </nav>
        <ul
          className="sidenav"
          id="mobile-nav"
          ref={sidenav => (this.sidenav = sidenav)}
        >
          <li>
            <Link to="/" className="sidenav-close">
              Camagru
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          {this.renderSideLinks()}
        </ul>
      </>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Header);
