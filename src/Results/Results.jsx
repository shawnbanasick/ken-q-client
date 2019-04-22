import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { view } from 'react-easy-state';
import state from '../state';

/* eslint react/prop-types: 0 */

const handleClick = () => {
  console.log('clicked');
  state.setState({ displayAdmin: true, displayResults: false });
};

class Results extends Component {
  render() {
    const results2 = JSON.parse(localStorage.getItem('allResults'));
    const results = JSON.stringify(results2, null, 4);
    console.log('results ' + results);

    return (
      <PageContainer>
        <HeaderDiv>
          <h1>All Results</h1>
          <NavButStatements onClick={handleClick}>Return</NavButStatements>
        </HeaderDiv>

        <ResultsSection>
          <ResultsTitle>Results</ResultsTitle>
          <ResultsDiv>
            <textarea value={results} />
          </ResultsDiv>
        </ResultsSection>
      </PageContainer>
    );
  }
}

export default view(Results);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  width: 1366px;
  height: 1004px;
  background-color: #323232;
  color: whitesmoke;
  padding: 20px;
  visibility: ${props => (props.out ? 'hidden' : 'visible')};
  animation: ${props => (props.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 1s linear;
`;

const NavButStatements = styled.button`
  position: relative;
  font-family: HelveticaNeue-CondensedBlack, Arial, Helvetica, sans-serif;
  appearance: none;
  height: 40px;
  width: 100px;
  margin-left: 45px;
  margin-top: 20px;
  color: #323232;
  background: #1985c5;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 0px solid #666;
  font-size: 150%;
  text-align: center;
  line-height: 1em;

  &:active {
    background-color: #146a9d;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: end;
`;

const ResultsSection = styled.div`
  margin-top: 50px;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 2;
  /* border: 2px solid red; */
`;

const ResultsTitle = styled.div`
  font-size: 30px;
`;

const ResultsDiv = styled.div`
  textarea {
    height: 480px;
    width: 1270px;
    background: whitesmoke;
  }
`;
