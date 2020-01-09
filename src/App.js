import React from 'react';
import Canvas from "./components/Canvas"
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import './App.css';
import { API_WS_ROOT, API_ROOT, HEADERS} from './constants';
import burst from './components/Burst';

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

  handleRecievedBurst = response => {
    console.log(response)
    const {loc_x, loc_y} = response.animate_mo
    burst.tune({x: parseInt(loc_x), y: parseInt(loc_y)})
        .replay()
  }
  
  render() {
      return (
        <ActionCableProvider url={API_WS_ROOT}>
          <div className="App" onClick={this.handleClick} >
            <ActionCableConsumer
                      channel={{ channel: `PicturesChannel`, id: 1}}
                      onReceived={this.handleRecievedBurst} 
                      onDisconnected={() => console.log("Disconnected")}
                      onConnected={() => console.log("connected!")}/>
          </div>
        </ActionCableProvider>
      );
    }
  }

export default App;
