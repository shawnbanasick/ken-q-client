import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { view } from 'react-easy-state';
import Admin from './Admin/Admin';
import Statements from './Statements/Statements';
import Presort from './Presort/Presort';
import Sort from './Sort/Sort';
import PostSort from './Postsort/PostSort';
import Survey from './Survey/Survey';
import SubmitData from './SubmitData/SubmitData';
import Results from './Results/Results';
import state from './state';

/* eslint react/prop-types: 0 */

class App extends Component {
  render() {
    const displayAdmin = state.getState('displayAdmin');
    const displayPresort = state.getState('displayPresort');
    const displayStatements = state.getState('displayStatements');
    const displaySort = state.getState('displaySort');
    const displayPostsort = state.getState('displayPostsort');
    const displaySurvey = state.getState('displaySurvey');
    const displaySubmitData = state.getState('displaySubmitData');
    const displayResults = state.getState('displayResults');

    const {
      adminData,
      columnStatements,
      preSortData,
      sortPageData,
      postSortData,
      surveyData,
    } = this.props;

    return (
      <PageContainer>
        {displayAdmin && (
          <Admin
            {...adminData}
            sortCharacteristics={sortPageData.sortCharacteristics}
            columnStatements={columnStatements}
            out={displayAdmin}
          />
        )}
        {displayStatements && (
          <Statements
            out={displayStatements}
            columnStatements={columnStatements}
          />
        )}
        {displayResults && <Results out={displayResults} />}
        {displayPresort && (
          <Presort
            {...preSortData}
            out={displayPresort}
            columnStatements={columnStatements}
          />
        )}
        {displaySort && (
          <Sort
            {...sortPageData}
            out={displaySort}
            sortPageData={sortPageData}
          />
        )}
        {displayPostsort && (
          <PostSort {...postSortData} out={displayPostsort} />
        )}
        {displaySurvey && <Survey {...surveyData} out={displaySurvey} />}
        {displaySubmitData && <SubmitData out={displaySubmitData} />}
      </PageContainer>
    );
  }
}

export default view(App);

const PageContainer = styled.div`
  background-color: black;
  /* width: 1366px;
  height: 1024px;
  
  padding: 20px; */
`;
