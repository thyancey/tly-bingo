import React, { Component } from 'react';
import Icon_Menu from '../../images/icon-menu.svg';

import { connect } from 'src/store';

import Button from 'src/components/reusable/button';

require('./style.less');

class Menu extends Component {

  onSizeChange(event){
    this.props.actions.endGame();
    this.props.actions.setBoardSize(event.target.value);
  }

  render() {
    let className = 'menu';
    if(this.props.isOpen){
      className += ' menu-active';
    }
    return (
      <div className={className}>
        <h1>{'Options'}</h1>
        <div className="menu-group">
          <p className="menu-group-label">{'Grid Size'}</p>
          <select value={this.props.boardSize} onChange={e => this.onSizeChange(e)}>
            <option value={3}>{'3x3'}</option>
            <option value={5}>{'5x5'}</option>
            <option value={7}>{'7x7'}</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  boardSize: state.boardSize
}))(Menu);
