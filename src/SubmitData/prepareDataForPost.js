import includes from 'lodash/includes';
import calculateTotalProjectTime from './calculateTotalProjectTime';
import getFormattedViewTime from '../Utils/getFormattedViewTime';

const prepareDataForPost = (commentArrays, surveyResults2) => {
  console.log('TCL: prepareDataForPost -> surveyResults2', surveyResults2);
  const surveyResults = surveyResults2.data;
  const columnStatements = JSON.parse(localStorage.getItem('columnStatements'));

  const endDate = getFormattedViewTime();

  // let columnStatements = store.getState().columnStatements;
  const resultsJson = {};
  resultsJson.randomId8 = localStorage.getItem('randomId8');
  resultsJson.randomId16 = localStorage.getItem('randomId16');

  resultsJson.startDate = localStorage.getItem('startDate');
  resultsJson.endDate = endDate;

  resultsJson.preSortPageLastAccess = localStorage.getItem(
    'setPreSortPageLastAccess'
  );

  resultsJson.sortPageLastAccess = localStorage.getItem(
    'setSortPageLastAccess'
  );

  resultsJson.postSortPageLastAccess = localStorage.getItem(
    'setPostSortPageLastAccess'
  );

  resultsJson.surveyPageLastAccess = localStorage.getItem(
    'setSurveyPageLastAccess'
  );

  const preSortTime = localStorage.getItem('setPreSortPageDurationFormatted');
  const sortTime = localStorage.getItem('setSortPageDurationFormatted');
  const postSortTime = localStorage.getItem('setPostSortPageDurationFormatted');
  const surveyTime = localStorage.getItem('setSurveyPageDurationFormatted');

  const totalProjectTime = calculateTotalProjectTime(
    preSortTime,
    sortTime,
    postSortTime,
    surveyTime
  );

  resultsJson.preSortPageDuration = preSortTime;
  resultsJson.sortPageDuration = sortTime;
  resultsJson.postSortPageDuration = postSortTime;
  resultsJson.surveyPageDuration = surveyTime;
  resultsJson.totalProjectTime = totalProjectTime;

  // set up postSort comments in object
  const lookUpTable = {
    columnN6: -6,
    columnN5: -5,
    columnN4: -4,
    columnN3: -3,
    columnN2: -2,
    columnN1: -1,
    column0: 0,
    column1: 1,
    column2: 2,
    column3: 3,
    column4: 4,
    column5: 5,
    column6: 6,
    column7: 7,
    column8: 8,
    column9: 9,
    column10: 10,
    column11: 11,
    column12: 12,
    column13: 13,
  };

  const sortValueAssignedArray = [];
  const commentKeys = [];
  const columnStatementsVcolsKeys = Object.keys(columnStatements.vCols);

  // iterate through all sort columns
  for (let i = 0; i < columnStatementsVcolsKeys.length; i++) {
    // iterate within each sort column
    const identifier = columnStatementsVcolsKeys[i];

    for (let j = 0; j < columnStatements.vCols[identifier].length; j++) {
      // assign sort values
      columnStatements.vCols[identifier][j].sortValue = lookUpTable[identifier];
      // setup for comments integration
      if (includes(commentArrays, identifier)) {
        commentKeys.push(`${identifier}_Card${j + 1}`);
      }
    }
    sortValueAssignedArray.push(...columnStatements.vCols[identifier]);
  }

  // sort objects in array
  sortValueAssignedArray.sort((a, b) =>
    a.statementNum > b.statementNum ? 1 : -1
  );
  // assign the appropriate sort value to the string
  let sortString = '';
  for (let k = 0; k < sortValueAssignedArray.length; k++) {
    if (sortValueAssignedArray[k].sortValue >= 0) {
      sortString = `${sortString}+${sortValueAssignedArray[k].sortValue}|`;
    } else {
      sortString = `${sortString + sortValueAssignedArray[k].sortValue}|`;
    }
  }
  // trim last bar from string
  sortString = sortString.slice(0, -1);

  resultsJson.sort = sortString;

  const statementCommentsObj = JSON.parse(
    localStorage.getItem('statementCommentsObj')
  );
  // CREATE COMMENT OBJECT
  for (let m = 0; m < commentKeys.length; m++) {
    const comment = statementCommentsObj[commentKeys[m]];
    if (comment) {
      resultsJson[commentKeys[m]] = comment;
    } else {
      resultsJson[commentKeys[m]] = 'no comment entered';
    }
  }

  // add survey results to resultsJson object
  let keys = Object.keys(surveyResults);
  keys = keys.sort();

  for (let i = 0; i < keys.length; i++) {
    resultsJson[keys[i]] = surveyResults[keys[i]];
  }

  let allResults = JSON.parse(localStorage.getItem('allResults'));
  if (allResults === undefined || allResults === null) {
    allResults = {};
  }

  allResults[resultsJson.randomId16] = { ...resultsJson };

  localStorage.setItem('allResults', JSON.stringify(allResults));

  console.log(
    'TCL: prepareDataForPost -> allResults',
    JSON.stringify(allResults, null, 2)
  );

  // localStorage.setItem('resultsJson', JSON.stringify(resultsJson));
};

export default prepareDataForPost;
