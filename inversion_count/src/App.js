import React from 'react';

import './styles/App.css'
import Board from './Board'

function countInversions(arr) {
  let count = 0;

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  function merge(left, right) {
    let merged = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        merged.push(left[i]);
        i++;
      } else {
        merged.push(right[j]);
        count += left.length - i; // Increase count by the number of remaining elements in the left subarray
        j++;
      }
    }

    return merged.concat(left.slice(i)).concat(right.slice(j));
  }

  mergeSort(arr);

  return count;
}

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
    this.setState({
      myMusicRank: newState
    })
    this.setState({
      // inversions: countInversions
    })
  };
  handleYoursStateChange = (newState) => {
    this.setState({
      yourMusicRank: newState
    })
    this.setState({
      // inversions: countInversions
    })
  };

  render(){
    return (
      <div className="app">
        <h1 className='large rise'>Ranking de gêneros musicais!</h1>
        <button onClick={()=> {console.log(this.state)}}>Teste</button>
        <Board onStateChange={this.handleMyStateChange}/>
        <Board onStateChange={this.handleYoursStateChange}/>
      </div>
    );
  }
}

export default App;