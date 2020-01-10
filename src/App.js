import React from 'react';
import CanvasesIndex from "./CanvasesIndex"
import CanvasShow from './CanvasShow'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginModal from './components/LoginModal'
import './App.css';
import Landing from './Landing'
import About from "./About"
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
  
  render() {
      return (

        // <ActionCableProvider url={API_WS_ROOT}>
          <Router >
            <LoginModal 
              modal={this.state.modal} 
              handleOnLogin={this.handleOnLogin} 
              handleOnSignup={this.handleOnSignup} 
              onClickOut={this.onClickOut}
            />
            <Navbar loggedin={this.state.loggedin} />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={About} />
            <Route exact path="/canvases" render={() => <CanvasesIndex />} />
            <Route exact path="/canvases/:id" render={routerProps => (
              <CanvasShow {...routerProps} />
            )} />
          </Router>
      );
    }
  }

export default App;
