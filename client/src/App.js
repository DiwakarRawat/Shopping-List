import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';


import { loadUser } from './actions/authActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  // Add propTypes for isAuthenticated
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    //store.dispatch(loadUser());
  }

  render() {
    console.log('App component rendering...');
    const { isAuthenticated } = this.props;
    console.log('isAuthenticated:', isAuthenticated);

    return (
      <div className="App"> {/* This is now the top-level element App renders */}
        <AppNavbar />
        <Container>
          { isAuthenticated === true ? (
              <>
                <ItemModal />
                <ShoppingList />
              </>
            ) : (
              <div className="welcome-message text-center my-5">
                <h1 className="display-4 mb-4">Welcome to Your Shopping List!</h1>
                <p className="lead">
                  Log in or register to start managing your items.
                </p>
                <p>
                  Your personal shopping companion awaits.
                </p>
              </div>
            )
          }
        </Container>
      </div>
    );
  }
  
}
// Map the Redux state to component props
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Connect App component to Redux
export default connect(mapStateToProps, {loadUser})(App); 