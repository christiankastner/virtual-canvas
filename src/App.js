import React from 'react';
import CanvasesIndex from "./CanvasesIndex"
import CanvasShow from './CanvasShow'
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import { API_WS_ROOT } from './constants';

class App extends React.Component {
  
  render() {
      return (
        <ActionCableProvider url={API_WS_ROOT}>
          <Router >
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
