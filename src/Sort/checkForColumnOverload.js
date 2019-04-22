import state from '../state';

const checkForColumnOverload = (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements
) => {
  // const sortCharacteristics = store.getState().sortCharacteristics;
  const sortCharacteristics = state.getState('sortCharacteristics');

  const qSortPattern = [...sortCharacteristics.qSortPattern];

  const { qSortHeaderNumbers } = sortCharacteristics;

  if (forcedSorts === true) {
    const tempArray = [];
    columnLengthCheckArray.forEach(function(item, index) {
      if (item > qSortPattern[index]) {
        tempArray.push(qSortHeaderNumbers[index]);

        // store.dispatch.setSortCompleted(false);
        state.setState({ setSortCompleted: false });
        // store.dispatch.setOverloadedColumn(qSortHeaderNumbers[index]);
        state.setState({ setOverloadedColumn: qSortHeaderNumbers[index] });
        // store.dispatch.setColumnOverload(true);
        state.setState({ setColumnOverload: true });
        // store.dispatch.setIsSortingCards(false);
        state.setState({ setIsSortingCards: false });

        return null;
      }
    });
    if (tempArray.length === 0) {
      // store.dispatch.setColumnOverload(false);
      state.setState({ setColumnOverload: false });
      // store.dispatch.setIsSortingCards(true);
      state.setState({ setIsSortingCards: true });
    }
  }

  const numSortedStatements = columnLengthCheckArray.reduce(function(acc, val) {
    return acc + val;
  });

  // store.dispatch.setNumSortedStatements(numSortedStatements);
  state.setState({ numSortedStatements });

  if (forcedSorts === false) {
    if (numSortedStatements === totalStatements) {
      // store.dispatch.setSortCompleted(true);
      state.setState({ setSortCompleted: true });

      // store.dispatch.setIsSortingCards(false);
      state.setState({ setIsSortingCards: false });
    } else {
      // store.dispatch.setSortCompleted(false);
      state.setState({ setSortCompleted: false });

      state.setState({ setIsSortingCards: true });
      // store.dispatch.setIsSortingCards(true);
    }
  }
};

export default checkForColumnOverload;
