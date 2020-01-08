import React from 'react';
import Burst from "./components/Burst"
import './App.css';

class App extends React.Component {

  handleClick = e => {
    console.log("I'm here")
    Burst.tune({x: e.pageX, y: e.pageY})
      .replay()
  }
  
  render() {
      return (
        <div className="App" onClick={this.handleClick}>
        Hello
        </div>
      );
    }
  }

export default App;
