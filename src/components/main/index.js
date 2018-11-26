import React, { Component } from 'react';

import { connect } from 'src/store';

import Board from 'src/components/board';
import defaultBoardData from 'src/components/board/defaultBoardData.json';

import Button from 'src/components/reusable/button';
import Modal from 'src/components/modal';

require('./style.less');

class Main extends Component {
  constructor(){
    super();

    this.loadStoreData();
    this.state = {
      modalOpen: false
    };
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
    this.props.actions.setBingoData(defaultBoardData);
  }

  onEndGameButton(){
    this.props.actions.endGame();
  }

  onNewGameButton(){
    this.setModal(true);
  }

  setModal(modalState){
    this.setState({
      modalOpen: modalState
    });
  }

  renderButtons(gameActive, boardSize){
    if(!gameActive){
      return (
        <div className="buttons">
          <Button onClick={e => this.onNewGameButton()}>{'+ New Game'}</Button>
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
        <Modal isOpen={this.state.modalOpen} onCloseModal={() => this.setModal(false)} />
      </div>
    );
  }
}

export default connect(state => ({ 
  dataLoaded: state.dataLoaded,
  gameActive: state.gameActive,
  boardSize: state.boardSize
}))(Main);
