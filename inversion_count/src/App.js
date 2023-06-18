import React from 'react';

import './styles/App.css'
import Board from './Board'
import incredible0 from './mrIncredible/0.png'
import incredible1 from './mrIncredible/1.png'
import incredible2 from './mrIncredible/2.png'
import incredible3 from './mrIncredible/3.png'
import incredible4 from './mrIncredible/4.png'

function sortAndCount(L) {
  if (L.length <= 1) {
    return 0;
  }

  const mid = Math.floor(L.length / 2);
  const A = L.slice(0, mid);
  const B = L.slice(mid);

  const rA = sortAndCount(A);
  const rB = sortAndCount(B);

  const r = mergeAndCount(A, B);

  return rA + rB + r;
}

function mergeAndCount(A, B) {
  let i = 0;
  let j = 0;
  let inversions = 0;

  while (i < A.length && j < B.length) {
    if (A[i] <= B[j]) {
      i++;
    } else {
      inversions += A.length - i;
      j++;
    }
  }

  return inversions;
}

function getMusicRank(myMusicRank, yourMusicRank) {
  return Object.entries(yourMusicRank).map(([key, value]) => myMusicRank[key].pos);
}

function getCompatibilityScale(inversionCount) {
  if (inversionCount >= 0 && inversionCount <= 10) {
    return 0; // Low Compatibility
  } else if (inversionCount >= 11 && inversionCount <= 20) {
    return 1; // Moderate Compatibility
  } else if (inversionCount >= 21 && inversionCount <= 30) {
    return 2; // Average Compatibility
  } else if (inversionCount >= 31 && inversionCount <= 40) {
    return 3; // High Compatibility
  } else {
    return 4; // Very High Compatibility
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
    let count  = sortAndCount(getMusicRank(newState, this.state.yourMusicRank))
    this.setState({
      myMusicRank: newState
    })
    this.setState({
      inversions: count
    })
  };
  handleYoursStateChange = (newState) => {
    let count  = sortAndCount(getMusicRank(this.state.yourMusicRank, newState))
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
        <button onClick={()=> console.log(this.state)}>Teste</button>
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