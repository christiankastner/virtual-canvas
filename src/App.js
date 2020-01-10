import React from 'react';
import CanvasesIndex from "./CanvasesIndex"
import CanvasShow from './CanvasShow'
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import { Menu } from 'semantic-ui-react'
import { API_WS_ROOT } from './constants';

class App extends React.Component {

  handleNavClick = (event) => {
    console.log(event.target.name)
  }
  
  render() {
      return (

        <ActionCableProvider url={API_WS_ROOT}>
          <Router >
            <Menu >
              <Menu.Item name="home" onClick={this.handleNavClick} >
                Home
              </Menu.Item>
              <Menu.Item name="about" onClick={this.handleNavClick} >
                About
              </Menu.Item>
              <Menu.Item name="canvases" onClick={this.handleNavClick} >
                Canvases
              </Menu.Item>
            </Menu>
            <Route exact path="/" render={() => <Redirect to="/canvases" />} />
            <Route exact path="/canvases" render={() => <CanvasesIndex />} />
            <Route exact path="/canvases/:id" render={routerProps => (
              <CanvasShow {...routerProps} />
            )} />
          </Router>
        </ActionCableProvider>
      );
    }
  }

export default App;
