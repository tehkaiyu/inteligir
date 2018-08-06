import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Dialog } from 'evergreen-ui';
import Button from 'components/button/Button';
import Logo from 'components/icons/Logo';
import './Navigation.css';

class Navigation extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    isDialopOpen: false,
  };

  toggleDialog = () => {
    this.setState((prevState) => {
      return {
        isDialopOpen: !prevState.isDialopOpen,
      };
    });
  };

  renderContent() {
    switch (this.props.isAuthenticated) {
      case null:
        return;
      case false:
        return (
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <Button
              className="button-outline login-button"
              onClick={this.toggleDialog}
              marginRight={10}
            >
              Get Started
            </Button>
            <Dialog
              isShown={this.state.isDialopOpen}
              hasHeader={false}
              hasFooter={false}
              onCloseComplete={this.toggleDialog}
            >
              {({ close }) => (
                <section className="login-dialog-content">
                  <h3>Welcome back.</h3>
                  <p>
                    Sign in to access your personalized homepage, support your
                    favorite authors, and create your own lessons.
                  </p>
                  <a href="/auth/google" className="login-links">
                    <Button>Sign in with Google</Button>
                  </a>
                  <a href="/auth/facebook" className="login-links">
                    <Button>Sign in with Facebook</Button>
                  </a>
                </section>
              )}
            </Dialog>
          </li>
        );
      default:
        return [
          <li className="nav-item" key="2">
            <a className="nav-link logout-button" href="/auth/logout">
              Logout
            </a>
          </li>,
        ];
    }
  }

  render() {
    return (
      <nav
        className={`nav ${this.props.location.pathname === '/' ? 'light' : ''}`}
      >
        <section className="nav-container">
          <NavLink
            to={this.props.isAuthenticated ? '/feed' : '/'}
            className="nav-logo"
          >
            <Logo />
          </NavLink>
          <ul className="nav-item-container">{this.renderContent()}</ul>
        </section>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    isAuthenticated: auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(Navigation));
