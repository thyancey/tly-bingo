import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { connect } from 'src/store';

import Board from 'src/components/board';
import defaultBoardData from 'src/components/board/defaultBoardData.json';

import Button from 'src/components/reusable/button';
import Modal from 'src/components/modal';

import theme from 'src/themes/theme.js';

require('./style.less');

const Header = styled.section`
  position: absolute;
  z-index: 1;

  left: 0;
  top: 0;
  width: 100%;
  height: ${props => props.theme.value.headerHeight};

  box-shadow: ${props => props.theme.shadow.z3};
  background-color: ${props => props.theme.color.grey};

  >div{
    position:absolute;
  }
`

const HeaderButtons = styled.div`
  position:absolute;
  top:0;
  right:0;

  height:100%;
  width:20rem;
`

const HeaderButton = styled(Button)`
  position:absolute;
  right:2rem;
  top:50%;
  transform:translateY(-50%);
`

const Logo = styled.div`
  width:100%;
  height:8rem;

  h1{
    font-size:5rem;
    color:${props => props.theme.color.grey};
    text-shadow: ${props => props.theme.mixins.textStroke('2px','1px',props.theme.color.blue)};

    text-align:center;
  }
`

const App = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  top:0;

  overflow:hidden;
`

const Body = styled.div`
  position:absolute;
  left:0;
  top: calc(${props => props.theme.value.headerHeight} + 2rem);
  width:100%;
  bottom:0;
`

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
        <HeaderButtons>
          <HeaderButton onClick={e => this.onNewGameButton()}>{'+ New Game'}</HeaderButton>
        </HeaderButtons>
      );
    }else {
      return (
        <HeaderButtons>
          <HeaderButton onClick={e => this.onEndGameButton()}>{'End Game'}</HeaderButton>
        </HeaderButtons>
      );
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <App>
          <Header id="header">
            <Logo className="logo">
              <h1>{'Bingotown'}</h1>
            </Logo>
            {this.props.dataLoaded && this.renderButtons(this.props.gameActive, this.props.boardSize)}
          </Header>
          <Body>
            <Board/>
          </Body>
          <section id="footer">

          </section>
          <Modal isOpen={this.state.modalOpen} onCloseModal={() => this.setModal(false)} />

        </App>
      </ThemeProvider>
    );
  }
}

export default connect(state => ({ 
  dataLoaded: state.dataLoaded,
  gameActive: state.gameActive,
  boardSize: state.boardSize
}))(Main);
