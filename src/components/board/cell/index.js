import React, { Component } from 'react';
require('./style.less');


class Cell extends Component {
  render() {
    let className = 'cell';
    if(this.props.isActive) className += ' active';
    if(this.props.isWinner) className += ' winner';

    return (
      <div className={className} style={{ 
        width: this.props.cellWidth, 
        height: this.props.cellWidth 
      }} onClick={this.props.onCellClick} title={this.props.cellData.get('description')}>
        <div className='cell-container'>
          <div className='cell-bg' />
          <div className='cell-body'>
            <p>{this.props.cellData.get('text').toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Cell;
