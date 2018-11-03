import React, { Component } from 'react';

import { connect } from 'src/store';
require('./style.less');

class Board extends Component {
  constructor(){
    super();
    
    this.state = {}
  }

  onCellClick(cellIdx){
    this.props.actions.setCellStatus(cellIdx, 'active');
  }

  renderCells(cells, boardSize){
    const cellWidth = Math.floor((100 / boardSize) * 100) / 100 + '%';

    return cells.map((cell, idx) => {
      let className = 'cell';
      if(cell.get('active')) className += ' active';
      if(cell.get('winner')) className += ' winner';

      return (
        <div className={className} key={idx} style={{ width: cellWidth }} onClick={e => this.onCellClick(idx)} title={cell.get('description')}>
          <div>
            <h3 >{cell.get('text')}</h3>
          </div>
        </div>
      )
    });
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
  boardSize: state.boardSize
}))(Board);
