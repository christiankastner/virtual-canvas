import React, { useState } from 'react';
import { connect } from 'react-redux'
import CanvasesIndex from "./pages/CanvasIndex/CanvasesIndex"
import CanvasShow from './pages/CanvasShow/CanvasShow'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginModal from './components/LoginModal'
import Landing from './pages/Landing/Landing'
import Login from "./pages/Login/Login"
import About from "./pages/About/About"
import UserShow from './pages/UserShow/UserShow'
import Navbar from './components/NavBar/Navbar';

const App = props => {

  const [modal,setModal] = useState(false)

  const toggleModal = () => setModal(!modal)
  
    return (
        <Router >
          <LoginModal 
            modal={modal} 
            toggleModal={toggleModal}
          />
          <Navbar
            toggleModal={toggleModal} 
          />
          <Route exact path="/" render={() => {
            return (<>
              <Landing />
            </>)
          }}/>
          <Route exact path="/login" render={routerProps => <Login {...routerProps} />}/>
          <Route exact path="/about" render={routerProps => <About {...routerProps} />}/>
          <Route exact path="/user" >
            {props.user_id ? <UserShow /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/canvases" render={routerProps => <CanvasesIndex {...routerProps} />} />
          <Route exact path="/canvases/:id" render={routerProps => (
            <CanvasShow {...routerProps} />
          )} />
        </Router>
    );
  }

const mapStateToProps = state => {
  return {
    user_id: state.user_id
  }
}

export default connect(mapStateToProps)(App);
