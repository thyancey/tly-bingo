import React, { Component } from 'react';
require('./style.less');


class LegendItem extends Component {
  render() {
    let className = 'legend-item';
    // console.log('activeItems: ', activeItems)
    if(this.props.isWinner){
      className += ' winner';
    }

    return (
      <div className={className} style={{ 
        width: this.props.type === 'top' && this.props.cellSize ? this.props.cellSize : null,
        height: this.props.type === 'side' && this.props.cellSize ? this.props.cellSize: null
       }}>
        <div className='legend-item-body'>
          <h3>{this.props.text}</h3>
        </div>
      </div>
    );
  }
}

export default LegendItem;
