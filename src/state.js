import cloneDeep from 'lodash/cloneDeep';
import { store } from 'react-easy-state';

export default store({
  setState(update) {
    const updateKeys = Object.keys(update);
    for (let i = 0; i < updateKeys.length; i += 1) {
      this[updateKeys[i]] = update[updateKeys[i]];
    }
  },

  getState(value) {
    const returnValue = this[value];
    const newReturnValue = cloneDeep(returnValue);
    return newReturnValue;
  },
  /* App */
  displayAdmin: true,
  displayStatements: false,
  displayDemonstration: false,
  displayData: false,
  displayDelete: false,
  displayPresort: false,
  displaySort: false,
  displayPostsort: false,
  displaySurvey: false,
  displaySubmitData: false,
  displayResults: false,

  /* Admin */

  /* Sort */
  result: [],
  statements: [],
  columnN1: [],
  draggingOverColumnId: 'column99',
  sortResults: [], // array of objects
  sortResultsText: '',
  currentSortValue: '',
  columnOverload: false,
  overloadedColumn: '',
  isSortingCards: true,
  sortCompleted: false,
  numSortedStatements: 0,
  columnId: '',
  columnList: '',
  columnStatements: {},
  sortPageDurationCumulative: '',
  sortPageDurationFormatted: '',
  sortPageLastAccess: '',

  /* Post-Sort */
  statementCommentsObj: {},
  postSortPageLastAccess: '',
  postSortPageDurationCumulative: '',
  postSortPageDurationFormatted: '',
});
