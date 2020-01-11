import React from 'react';
import CanvasesIndex from "./CanvasesIndex"
import CanvasShow from './CanvasShow'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { API_ROOT } from './constants/index'
import LoginModal from './components/LoginModal'
import './App.css';
import Landing from './Landing'
import About from "./About"
import UserShow from './UserShow'
import Navbar from './components/Navbar';

class App extends React.Component {

  state = {
    loggedin: !!localStorage["id"],
    modal: false
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleLogout = () => {
    this.setState({
      loggedin: false
    }, () => localStorage.clear())
  }

  // This takes in a string to specify whether the fetch is to find a user to login or create a user to sign up
  handleUserFetch = (fetch_route) => {
    return (user) => {
      this.fetchUser(`${API_ROOT}/${fetch_route}`, user)
    }
  }

  fetchUser = (path, user) => {
    return fetch(path, {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
        .then(resp => resp.json())
        .then(this.loginCallBack)
  }

  loginCallBack = (json) => {
    if (!json.error) {
        this.setState({
            loggedin: true,
            modal: false
        }, () => {
            localStorage.setItem('id', json.id)
            localStorage.setItem('email', json.email)     
        })
    } else {
        console.log(json)
    }
  }
  
  render() {
      return (
          <Router >
            <LoginModal 
              modal={this.state.modal} 
              handleOnLogin={this.handleUserFetch("users/login")} 
              handleOnSignup={this.handleUserFetch("users")} 
              toggleModal={this.toggleModal}
            />
            <Navbar loggedin={this.state.loggedin} 
              toggleModal={this.toggleModal} 
              handleLogout={this.handleLogout} 
            />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={About} />
            <Route path="/user" >
            {this.state.loggedin ? <UserShow 
                                      userId={localStorage["id"]}
                                      handleLogout={this.handleLogout}
                                      />
              : <Redirect to="/" />}
            </Route>
            <Route exact path="/canvases" render={() => <CanvasesIndex />} />
            <Route exact path="/canvases/:id" render={routerProps => (
              <CanvasShow {...routerProps} />
            )} />
          </Router>
      );
    }
  }

export default App;
