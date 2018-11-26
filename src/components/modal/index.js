import React, { Component } from 'react';
import Icon_Close from '../../images/icon-close.svg';

import { connect } from 'src/store';

import Button from 'src/components/reusable/button';

require('./style.less');

class Modal extends Component {

  onSizeChange(event){
    this.props.actions.setBoardSize(event.target.value);
  }

  onChangeBingoData(event){
    this.props.actions.setBingoDataIdx(event.target.value);
  }

  onGameStart(){
    this.props.onCloseModal();
    this.props.actions.generateBoard(3);
  }

  onBgClick(){
    this.props.onCloseModal();
  }

  onCloseClick(){
    this.props.onCloseModal();
  }

  renderBingoData(bingoGlossary){
    if(!bingoGlossary){
      return null;
    }else{
      return (
        <select value={this.props.bingoDataIdx} onChange={e => this.onChangeBingoData(e)}>
          {bingoGlossary.map((item, idx) => (
            <option key={idx} value={idx}>{item.get('title')}</option>
          ))}
        </select>
      );
    }
  }

  renderGrid(bingoData){
    if(!bingoData){
      return null;
    }else{
      return (
        <select value={this.props.boardSize} onChange={e => this.onSizeChange(e)}>
          {bingoData.get('gridSizes').map((item, idx) => (
            <option key={idx} value={item.get('gridSize')} disabled={!item.get('available') || null}>{item.get('title')}</option>
          ))}
        </select>
      );
    }
  }

  render() {
    let className = 'modal';
    if(this.props.isOpen){
      className += ' modal-active';
    }
    return (
      <div className={className}>
        <div className="modal-bg" onClick={() => this.onBgClick()}/>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">
              {'Start a new BINGOTOWN game'}
            </h1>
            <div className="modal-close" onClick={() => this.onCloseClick()}>
              <Icon_Close width="100%" height="100%" />
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-group">
              <p className="modal-group-label">{'Data Set'}</p>
              {this.renderBingoData(this.props.bingoGlossary)}
            </div>
            <div className="modal-group">
              <p className="modal-group-label">{'Grid Size'}</p>
              {this.renderGrid(this.props.bingoGlossary.get(this.props.bingoDataIdx))}
            </div>
          </div>
          <div className="modal-footer">
            <Button onClick={e => this.onGameStart()}>{'Start Game'}</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  boardSize: state.boardSize,
  bingoDataIdx: state.bingoDataIdx,
  bingoGlossary: state.bingoGlossary
}))(Modal);
