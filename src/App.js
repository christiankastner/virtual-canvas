import React from 'react';
import Burst from "./components/Burst"
import { ActionCableProvider } from 'react-actioncable-provider';
import './App.css';
import { API_WS_ROOT, API_ROOT, HEADERS} from './constants';

class App extends React.Component {

  handleClick = e => {
    fetch(`${API_ROOT}/animate_mos`, {
      method: "POST",
      HEADERS,
      body: JSON.stringify({
        loc_x: e.pageX,
        loc_y: e.pageY
      })
    })
  }
  
  render() {
      return (
        <ActionCableProvider url={API_WS_ROOT}>
          <div className="App" onClick={this.handleClick} />
        </ActionCableProvider>
      );
    }
  }

export default App;
