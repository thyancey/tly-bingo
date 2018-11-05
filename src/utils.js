import { List, Map } from 'immutable';

export function checkForWin(cellList, gridSize){
  let winningCells = null;

  //- check top left to bottom right bingos
  winningCells = checkWin_diagonalDown(cellList, gridSize);
  if(winningCells) return winningCells;

  //- check bottom left to top right bingos
  winningCells = checkWin_diagonalUp(cellList, gridSize);
  if(winningCells) return winningCells;

  //- check left to right bingos
  for(let r = 0; r < gridSize; r++){
    winningCells = checkWin_row(r, cellList, gridSize);
    if(winningCells) return winningCells;
  }

  //- check top to bottom bingos
  for(let c = 0; c < gridSize; c++){
    winningCells = checkWin_column(c, cellList, gridSize);
    if(winningCells) return winningCells;
  }


  //- no win
  return null;
}

export function checkForWinGroups(cellList, gridSize){
  let winGroups = [];
  let winningCells = null;

  //- check top left to bottom right bingos
  winningCells = checkWin_diagonalDown(cellList, gridSize);
  if(winningCells) winGroups.push(winningCells);

  //- check bottom left to top right bingos
  winningCells = checkWin_diagonalUp(cellList, gridSize);
  if(winningCells) winGroups.push(winningCells);

  //- check left to right bingos
  for(let r = 0; r < gridSize; r++){
    winningCells = checkWin_row(r, cellList, gridSize);
    if(winningCells) winGroups.push(winningCells);
  }

  //- check top to bottom bingos
  for(let c = 0; c < gridSize; c++){
    winningCells = checkWin_column(c, cellList, gridSize);
    if(winningCells) winGroups.push(winningCells);
  }

  return winGroups;
}


export function checkWin_row(rowIdx, cellList, gridSize){
  let retList = [];
  for(let c = 0; c < gridSize; c++){
    let cellIdx = getCellIndexFromRowsAndCols(rowIdx, c, gridSize);
    if(cellList.get(cellIdx).get('active')){
      retList.push(cellIdx);
    } else{
      return null;
    }
  }

  return retList;
}

export function checkWin_column(colIdx, cellList, gridSize){
  let retList = [];
  for(let r = 0; r < gridSize; r++){
    let cellIdx = getCellIndexFromRowsAndCols(r, colIdx, gridSize);
    if(cellList.get(cellIdx).get('active')){
      retList.push(cellIdx);
    } else{
      return null;
    }
  }

  return retList;
}

export function checkWin_diagonalDown(cellList, gridSize){
  let retList = [];
  const endIdx = (gridSize * gridSize);

  for(let i = 0; i < endIdx; i = i + gridSize + 1){
    if(cellList.get(i).get('active')){
      retList.push(i);
    } else{
      return null;
    }
  }

  return retList;
}

export function checkWin_diagonalUp(cellList, gridSize){
  let retList = [];
  const endIdx = gridSize - 1;

  const firstIdx = getCellIndexFromRowsAndCols(gridSize - 1, 0, gridSize);

  for(let i = firstIdx; i >= endIdx; i = i - gridSize + 1){
    if(cellList.get(i).get('active')){
      retList.push(i);
    } else{
      return null;
    }
  }

  return retList;
}

export function getCellIndexFromRowsAndCols(rowIdx, colIdx, gridSize){
  return (rowIdx * gridSize) + colIdx;
}