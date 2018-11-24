import React, { Component } from 'react';
import Icon_Menu from '../../images/icon-menu.svg';

import { connect } from 'src/store';

import Board from 'src/components/board';
import defaultBoardData from 'src/components/board/defaultBoardData.json';

import Button from 'src/components/reusable/button';

require('./style.less');

class Main extends Component {
  constructor(){
    super();

    this.loadStoreData();
  }

  loadStoreData(){
    const url = './data/bingo.json';
    console.log(`reading app data from '${url}'`);

    fetch(url).then(response => {
                      return response.json();
                    }, 
                    err => {
                      console.error('Error fretching url, using default data', err);
                      this.setDefaultData();
                    }) //- bad url responds with 200/ok? so this doesnt get thrown
              .then(json => {
                      this.props.actions.setBingoData(json);
                      return true;
                    }, 
                    err => {
                      console.error('Error parsing store JSON (or the url was bad), using default data', err);
                      this.setDefaultData();
                    });
  }

  setDefaultData(){
    console.log('set defaultData')
    this.props.actions.setBingoData(defaultBoardData);
  }

  onEndGameButton(){
    console.log("on End gam")
    this.props.actions.endGame();
  }

  onNewGameButton(){
    this.props.actions.generateBoard(3);
  }

  onSizeChange(event){
    this.props.actions.setBoardSize(event.target.value);
  }

  onMenuButton(){

  }

  renderButtons(gameActive, boardSize){
    if(!gameActive){
      return (
        <div className="buttons">
          <Button onClick={e => this.onNewGameButton()}>{'+ New Game'}</Button>
            <select value={boardSize} onChange={e => this.onSizeChange(e)}>
            <option value={3}>{'3x3'}</option>
            <option value={5}>{'5x5'}</option>
            <option value={7}>{'7x7'}</option>
          </select>
        </div>
      );
    }else {
      return (
        <div className="buttons">
          <Button onClick={e => this.onEndGameButton()}>{'End Game'}</Button>
        </div>
      );
    }
  }


  render() {
    return (
      <div>
        <section id="header">
          <div className="menubutton">
            <Button onClick={e => this.onEndGameButton()}><Icon_Menu /></Button>
          </div>
          <div className="logo">
            <h1>{'Bingotown'}</h1>
          </div>
          {this.props.dataLoaded && this.renderButtons(this.props.gameActive, this.props.boardSize)}
        </section>
        <section id="body">
          <Board/>
        </section>
        <section id="footer">

        </section>
      </div>
    );
  }
}

export default connect(state => ({ 
  dataLoaded: state.dataLoaded,
  gameActive: state.gameActive,
  boardSize: state.boardSize
}))(Main);
