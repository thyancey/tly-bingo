import { initStore } from 'react-waterfall';
import { List, Map } from 'immutable';

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
    boardSize: 5,
    gameActive: false,
    cells: List([])
  },
  actions: {
    setBingoData: ({ dataLoaded, bingoSetIdx }, bingoData) => {
      global.tlyBingoData = [];
      for(let i = 0; i < bingoData.bingoSets.length; i++){
        global.tlyBingoData.push(bingoData.bingoSets[i]);
      }

      return {
        dataLoaded: true,
        bingoSetIdx: (global.tlyBingoData.length) > 0 ? 0 : -1
      }
    },
    endGame: ({ gameActive }) => {
      return {
        cells: List([]),
        gameActive: false
      }
    },
    setBoardSize: ({ boardSize }, newBoardSize) => {
      return {
        boardSize: newBoardSize
      }
    },
    generateBoard: ({ cells, bingoSetIdx, boardSize }) => {
      let tempList = [];

      let bingoSet = global.tlyBingoData[bingoSetIdx];
      let randomCells = shuffleArray(bingoSet.cells);

      const totalCells = boardSize * boardSize;
      const freeIdx = Math.floor(totalCells / 2);

      for(let i = 0; i < totalCells; i++){
        if(i === freeIdx){
          tempList.push(new Map({
            active: true,
            text: 'FREE',
            description: 'This one is free!'
          }));
        }else if(!randomCells[i]){
          tempList.push(new Map({
            active: true,
            text: 'FREE',
            description: 'There wasnt enough data so this one is free!'
          }));
        }else{
          tempList.push(new Map({
            active: false,
            text: randomCells[i].text,
            description: randomCells[i].description || randomCells[i].text
          }));
        }
      }

      return{
        cells: List(tempList),
        gameActive: true
      }
    },
    setCellStatus: ({ cells }, cellIdx, cellStatus) => {

      let updatedCells = cells.update(cellIdx, cell => {
          return cell.set('active', !cell.get('active'));
        });

      return {
        cells:  updatedCells
      }
    }
  }
};
 
export const { Provider, connect } = initStore(store);