import { initStore } from 'react-waterfall';
import { List, Map } from 'immutable';

import { checkForWin, checkForWinGroups, getDefaultLegend } from 'utils';

//- yanked from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }

  return array;
}


const store = {
  initialState: {
    dataLoaded:false,
    bingoSetIdx: -1,
    boardData: new Map({
      legend: new List()
    }),
    boardSize: 5,
    gameActive: false,
    winCells: List([]),
    winGroups: List([]), // - each set of bingo wins, might not be needed soon
    cells: List([])
  },
  actions: {
    setBingoData: ({}, bingoData) => {
      global.tlyBingoData = [];
      for(let i = 0; i < bingoData.bingoSets.length; i++){
        global.tlyBingoData.push(bingoData.bingoSets[i]);
      }

      return {
        dataLoaded: true,
        bingoSetIdx: (global.tlyBingoData.length) > 0 ? 0 : -1
      }
    },
    endGame: ({}) => {
      return {
        cells: List([]),
        gameActive: false,
        winCells: List([]),
        winGroups: List([]),
        boardData: new Map({
          legend: new List()
        })
      }
    },
    setBoardSize: ({}, newBoardSize) => {
      return {
        boardSize: +newBoardSize
      }
    },
    generateBoard: ({ bingoSetIdx, boardSize }) => {
      let tempList = [];

      let bingoSet = global.tlyBingoData[bingoSetIdx];
      let randomCells = shuffleArray(bingoSet.cells);

      const totalCells = boardSize * boardSize;
      const freeIdx = Math.floor(totalCells / 2);

      for(let i = 0; i < totalCells; i++){
        if(i === freeIdx){
          tempList.push(new Map({
            active: true,
            winner: false,
            text: 'FREE',
            description: 'This one is free!'
          }));
        }else if(!randomCells[i]){
          tempList.push(new Map({
            active: true,
            winner: false,
            text: 'FREE',
            description: 'There wasnt enough data so this one is free!'
          }));
        }else{
          tempList.push(new Map({
            active: false,
            winner: false,
            text: randomCells[i].text,
            description: randomCells[i].description || randomCells[i].text
          }));
        }
      }

      const foundLegend = bingoSet.legends && bingoSet.legends[boardSize] || getDefaultLegend(boardSize);

      return{
        cells: List(tempList),
        gameActive: true,
        boardData: new Map({
          legend: new List(foundLegend)
        })
      }
    },
    setCellStatus: ({ cells, winGroups, winCells, boardSize }, cellIdx, cellStatus) => {

      // - updates every cell every cycle, but allows for play after a win
      let updatedCells = cells.map((cell, idx) => {
        let activeVal = cellIdx === idx ? !cell.get('active') : cell.get('active');

        return cell.merge({
          active: activeVal
        });
      });

      const newWinGroups = checkForWinGroups(updatedCells, boardSize);
      const newWinCells = [];
      for(let i = 0; i < newWinGroups.length; i++){
        for(let j = 0; j < newWinGroups[i].length; j++){
          newWinCells.push(newWinGroups[i][j]);
        }
      }

      return {
        cells:  updatedCells,
        winCells: (newWinCells.length !== winCells.size) ? new List(newWinCells) : winCells,
        winGroups: (newWinGroups.length !== winGroups.size) ? new List(newWinGroups) : winGroups
      }
    }
  }
};
 
export const { Provider, connect } = initStore(store);