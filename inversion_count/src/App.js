import React from 'react';

import './styles/App.css'
import Board from './Board'
import incredible0 from './mrIncredible/0.png'
import incredible1 from './mrIncredible/1.png'
import incredible2 from './mrIncredible/2.png'
import incredible3 from './mrIncredible/3.png'
import incredible4 from './mrIncredible/4.png'

import invCount from './alghoritms/invCount';

function getMusicRank(myMusicRank, yourMusicRank) {
  const rank = []
  for (let i = 0; i < 10; i++) {
    let item = Object.values(yourMusicRank).find(item => item.pos === i)
    let item2 = Object.values(myMusicRank).find(aux => aux.genero === item.genero)
    rank.push(item2.pos)
}
  console.log(myMusicRank, yourMusicRank, rank)
  return rank
}

function getCompatibilityScale(inversionCount) {
  if (inversionCount >= 0 && inversionCount <= 10) {
    return 0;
  } else if (inversionCount >= 11 && inversionCount <= 20) {
    return 1;
  } else if (inversionCount >= 21 && inversionCount <= 30) {
    return 2;
  } else if (inversionCount >= 31 && inversionCount <= 40) {
    return 3;
  } else {
    return 4;
  }
}

const mrIncredible = [incredible0, incredible1, incredible2, incredible3, incredible4]

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      myMusicRank: [
      { genero: "Rock", pos: 0},
      { genero: "Reggae", pos: 1},
      { genero: "Funk", pos: 2},
      { genero: "Rap", pos: 3},
      { genero: "Trap", pos: 4},
      { genero: "Sertanejo", pos: 5},
      { genero: "Forró", pos: 6},
      { genero: "Pagode", pos: 7},
      { genero: "Eletrônica", pos: 8},
      { genero: "MPB", pos: 9}
    ],
      yourMusicRank: [
      { genero: "Rock", pos: 0},
      { genero: "Reggae", pos: 1},
      { genero: "Funk", pos: 2},
      { genero: "Rap", pos: 3},
      { genero: "Trap", pos: 4},
      { genero: "Sertanejo", pos: 5},
      { genero: "Forró", pos: 6},
      { genero: "Pagode", pos: 7},
      { genero: "Eletrônica", pos: 8},
      { genero: "MPB", pos: 9}
    ],
    inversions: 0
    }
  }

  handleMyStateChange = (newState) => {
    let count  = invCount(getMusicRank(newState, this.state.yourMusicRank))
    this.setState({
      myMusicRank: newState
    })
    this.setState({
      inversions: count
    })
  };
  handleYoursStateChange = (newState) => {
    console.log(newState)
    let count  = invCount(getMusicRank(this.state.myMusicRank, newState))
    this.setState({
      yourMusicRank: newState
    })
    this.setState({
      inversions: count
    })

  };

  render(){
    return (
      <div className="app">
        <h1 className='large rise'>Ranking de gêneros musicais!</h1>
        <Board onStateChange={this.handleMyStateChange}/>
        <Board onStateChange={this.handleYoursStateChange}/>
        <div className="result">
          <div className="mrIncredible" style={{ backgroundImage: `url(${mrIncredible[getCompatibilityScale(this.state.inversions)]})`}}></div>
          <div className="inversionsNumber">{this.state.inversions} Inversões</div>
        </div>
      </div>
    );
  }
}

export default App;