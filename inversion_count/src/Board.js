import { Draggable } from "react-drag-reorder";
import {React, Component} from 'react'
import './styles/Board.css'
import rockImage from './generos/rock.gif'
import reggaeImage from './generos/reggae.gif'
import funkImage from './generos/funk.gif'
import rapImage from './generos/rap.gif'
import trapImage from './generos/trap.gif'
import sertanejoImage from './generos/sertanejo.gif'
import forroImage from './generos/forro.gif'
import pagodeImage from './generos/pagode.gif'
import raveImage from './generos/rave.gif'
import mpbImage from './generos/mpb.gif'

class Board extends Component {
  
  state = {
    generosMusicais: [
      { genero: "Rock", pos: 0, image: rockImage },
      { genero: "Reggae", pos: 1, image: reggaeImage },
      { genero: "Funk", pos: 2, image: funkImage },
      { genero: "Rap", pos: 3, image: rapImage},
      { genero: "Trap", pos: 4, image: trapImage},
      { genero: "Sertanejo", pos: 5, image: sertanejoImage },
      { genero: "Forró", pos: 6, image: forroImage },
      { genero: "Pagode", pos: 7, image: pagodeImage },
      { genero: "Eletrônica", pos: 8, image: raveImage },
      { genero: "MPB", pos: 9, image: mpbImage }
    ]
  };

  getChangedPos = (currentPos, newPos) => {
    const updatedPositions = this.state.generosMusicais.map((item) => {
      if(item.pos === currentPos){
        return {...item, pos: newPos}
      }
      else if (currentPos < newPos) {
        if (item.pos > currentPos && item.pos <= newPos) {
          return { ...item, pos: item.pos - 1 };
        }
      } else if (currentPos > newPos) {
        if (item.pos >= newPos && item.pos < currentPos) {
          return { ...item, pos: item.pos + 1 };
        }
      }
      return item;
    });
    this.props.onStateChange(updatedPositions.sort((a, b) => a.pos - b.pos));
    this.setState({
      generosMusicais: updatedPositions
    });
  };

  render() {
    
    return (
      <div>
        <div className="plaid">
          <Draggable onPosChange={this.getChangedPos}>
            {this.state.generosMusicais.map((item, index) => (
              <div key={index} className="square" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="gender">
                  {item.genero}
                </div>
              </div>
          ))}
          </Draggable>
        </div>
        {Array.from({ length: 10 }, (_, index) => (
          <div className="number" key={index + 1}>{index + 1}º</div>
        ))}
      </div>
    );
  }
}

export default Board;