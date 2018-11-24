import React, { Component } from 'react';
import { List } from 'immutable';

import { connect } from 'src/store';
import { getRowIdxFromCellIdx, getColIdxFromCellIdx } from 'src/utils';

import Cell from './cell/';
import LegendItem from './legend/legend-item';
import Button from 'src/components/reusable/button';

require('./style.less');

const ANIM_DELAY = 50;

class Board extends Component {
  animationTimer = null;

  constructor(){
    super();
    
    this.state = {
      anim_activeRows: new List(),
      anim_activeCols: new List(),
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
      anim_activeCols: new List(),
      anim_activeRows: new List(),
      anim_activeCells: new List(),
      anim_count: 0
    });

    this.animationLoop = global.setInterval(() => {
      this.onAnimationLoop();
    }, ANIM_DELAY);

  }

  onAnimationLoop(){
    if(this.state.anim_count < this.props.winCells.size){
      const curIdx = this.props.winCells.get(this.state.anim_count);
      // console.log(getColIdxFromCellIdx(curIdx, this.props.boardSize), getRowIdxFromCellIdx(curIdx, this.props.boardSize));

      let activeRow = getRowIdxFromCellIdx(curIdx, this.props.boardSize);
      let activeCol = getColIdxFromCellIdx(curIdx, this.props.boardSize);
      this.setState({
        anim_activeRows: this.state.anim_activeRows.indexOf(activeRow) === -1 ? this.state.anim_activeRows.push(activeRow) : this.state.anim_activeRows,
        anim_activeCols: this.state.anim_activeCols.indexOf(activeCol) === -1 ? this.state.anim_activeCols.push(activeCol) : this.state.anim_activeCols,
        anim_activeCells: this.state.anim_activeCells.push(curIdx),
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

  renderCells(cells, cellWidth){

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

  renderLegendItems(legendList, type, cellSize, activeItems){
    return legendList.map((item, idx) => (
      <LegendItem 
        key={idx}
        type={type} 
        cellSize={cellSize}
        text={item}
        isWinner={activeItems.indexOf(idx) > -1} />
    ));
  }

  render() {
    const cellWidth = Math.floor((100 / this.props.boardSize) * 100) / 100 + '%';
    const compensatedCellWidth = `calc(${cellWidth} + 1px)`; //- accounts for margins

    return (
      <div className="board">
        <div className="board-top">
          {this.renderLegendItems(this.props.legend, 'top', cellWidth, this.state.anim_activeCols)}
        </div>
        <div className="board-side">
          {this.renderLegendItems(this.props.legend, 'side', cellWidth, this.state.anim_activeRows)}
        </div>
        <div className="board-cells" >
          {this.renderCells(this.props.cells, compensatedCellWidth)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ 
  cells: state.cells,
  boardSize: state.boardSize,
  winGroups: state.winGroups,
  winCells: state.winCells,
  legend: state.boardData.get('legend')
}))(Board);
