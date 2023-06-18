import React from 'react';

import './styles/App.css'
import Board from './Board'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      myMusicRank: [],
      yourMusicRank: []
    }
  }

  handleMyStateChange = (newState) => {
    console.log(newState)
  };
  handleYoursStateChange = (newState) => {
    console.log(newState)
  };

  render(){
    return (
      <div className="app">
        <h1 className='large rise'>Ranking de gêneros musicais!</h1>
        <Board onStateChange={this.handleMyStateChange}/>
        <Board onStateChange={this.handleYoursStateChange}/>
      </div>
    );
  }
}

export default App;