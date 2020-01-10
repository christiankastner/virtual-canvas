import React from 'react';
import CanvasesIndex from "./CanvasesIndex"
import CanvasShow from './CanvasShow'
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Landing from './Landing'
import About from "./About"
import { API_WS_ROOT } from './constants';
import Navbar from './components/Navbar';

class App extends React.Component {
  
  render() {
      return (

        <ActionCableProvider url={API_WS_ROOT}>
          <Router >
            <Navbar />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/about" component={About} />
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
