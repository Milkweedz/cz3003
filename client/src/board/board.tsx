import Grid from 'react-css-grid'
import Tile from '../components/Tile'
import Start from '../components/Start'
import React, { Component } from 'react'
import './board.module.css'

class Board extends Component {
    state = {
        startTiles: [130, 118, 13, 1]
    }
  
    createBoard = () => {
    let tileArray = []
    for (let counter = 130; counter > 0; counter--){
      tileArray.push(counter)
    }
    return this.occupyTiles(tileArray)
  }
  
  occupyTiles = (tileArray) => {
    return tileArray.map(number => (
      <Tile number={number} />
    ))
  }
  
  render(){
    return (
      <div className="board">
        <Grid
          width={50}
          gap={0}
          >
          {this.createBoard()}  
          </Grid>
        </div>
    );
  }}

  export default Board;