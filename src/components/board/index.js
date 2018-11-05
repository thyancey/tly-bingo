import React, { Component } from 'react';
import { List } from 'immutable';

import { connect } from 'src/store';

import Cell from './cell';
require('./style.less');

const ANIM_DELAY = 50;

class Board extends Component {
  animationTimer = null;

  constructor(){
    super();
    
    this.state = {
      
      curWinGroup: -1,
      // anim_curIdx: -1,
      anim_activeCells: new List(),
      anim_count: 0
    }
  }

  killAnimationLoop(){
    if(this.animationLoop){
      global.clearInterval(this.animationLoop);
      this.animationLoop = null;
    }
  }

  startAnimationLoop(){
    this.killAnimationLoop();
    this.setState({
      anim_activeCells: new List(),
      anim_count: 0
    });

    this.animationLoop = global.setInterval(() => {
      this.onAnimationLoop();
    }, ANIM_DELAY);

  }

  onAnimationLoop(){
    if(this.state.anim_count < this.props.winCells.size){
      this.setState({
        anim_activeCells: this.state.anim_activeCells.push(this.props.winCells.get(this.state.anim_count)),
        anim_count: this.state.anim_count + 1
      })
    }else{
      this.killAnimationLoop();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.winGroups !== this.props.winGroups){
      // console.log('winGroups changed');
    }
    if(prevProps.winCells !== this.props.winCells){
      // console.log('winCells changed');

      this.startAnimationLoop();
    }
  }

  onCellClick(cellIdx){
    this.props.actions.setCellStatus(cellIdx, 'active');
  }

  renderCells(cells, boardSize){
    const cellWidth = Math.floor((100 / boardSize) * 100) / 100 + '%';

    return cells.map((cell, idx) => 
      <Cell 
        key={idx}
        cellData={cell} 
        isActive={cell.get('active')} 
        isWinner={this.state.anim_activeCells.indexOf(idx) > -1}
        cellWidth={cellWidth} 
        onCellClick={e => this.onCellClick(idx)} />
    );
  }

  render() {
    return (
      <div className="board">
        {this.renderCells(this.props.cells, this.props.boardSize)}
      </div>
    );
  }
}

export default connect(state => ({ 
  cells: state.cells,
  boardSize: state.boardSize,
  winGroups: state.winGroups,
  winCells: state.winCells
}))(Board);
