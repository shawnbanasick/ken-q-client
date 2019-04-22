import isEqual from 'lodash/isEqual';
import state from '../state';
import checkForColumnOverload from './checkForColumnOverload';

/**
 * Moves an item from one list to another list.
 */
const move = (
  sourceListArray,
  destinationListArray,
  droppableSource,
  droppableDestination,
  columnStatements,
  totalStatements,
  sortCharacteristics
) => {
  const { qSortPattern, qSortHeaders, forcedSorts } = sortCharacteristics;

  const destClone = [...destinationListArray];

  // to splice in and out
  const [removed] = sourceListArray.splice(droppableSource.index, 1);
  destinationListArray.splice(droppableDestination.index, 0, removed);

  sourceListArray[droppableSource.droppableId] = [removed];
  destinationListArray[droppableDestination.droppableId] = [...destClone];

  // to assign to object and register results to state
  const result = {};
  result[droppableSource.droppableId] = [...sourceListArray];
  result[droppableDestination.droppableId] = [...destinationListArray];

  // to save to state and auto update lists
  // store.dispatch.setResult(result);
  state.setState({ result });

  // for sort complete checking
  const columnLengthCheckArray = [];
  for (let i = 0; i < qSortHeaders.length; i++) {
    const currentColumnLength =
      columnStatements.vCols[`column${qSortHeaders[i]}`];
    columnLengthCheckArray.push(currentColumnLength.length);
  }
  // sort mutates, so clone
  const qSortPatternClone = [...qSortPattern];
  const overloadArrayCheck = [...columnLengthCheckArray];
  const match = isEqual(columnLengthCheckArray, qSortPatternClone);
  // console.log("TCL: qSortPatternClone", qSortPatternClone);
  // console.log("TCL: columnLengthCheckArray", columnLengthCheckArray);

  checkForColumnOverload(overloadArrayCheck, forcedSorts, totalStatements);

  // to disable checking if unforced Q sorts allowed
  if (forcedSorts === true) {
    if (match === true) {
      // store.dispatch.setSortCompleted(true);
      // state.setState({ sortCompleted: true });
      localStorage.setItem('sortCompleted', 'true');
      // store.dispatch.setIsSortingCards(false);
      // state.setState({ isSortingCards: false });
      localStorage.setItem('isSortingCards', 'false');
    } else {
      // store.dispatch.setSortCompleted(false);
      // state.setState({ sortCompleted: false });
      localStorage.setItem('sortCompleted', 'false');
    }
  }
  return null;
};

export default move;
