import React from 'react';
import Canvas from "./components/Canvas"
import { ActionCableProvider } from 'react-actioncable-provider';
import './App.css';
import { API_WS_ROOT, API_ROOT, HEADERS} from './constants';

class App extends React.Component {

  handleClick = e => {
    fetch(`${API_ROOT}/animate_mos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        loc_x: e.pageX,
        loc_y: e.pageY,
        user_id: 1,
        picture_id: 1
      })
    })
  }
  
  render() {
      return (
        <ActionCableProvider url={API_WS_ROOT}>
          <div className="App" onClick={this.handleClick} >
            <Canvas />
          </div>
        </ActionCableProvider>
      );
    }
  }

export default App;
