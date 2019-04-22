import styled, { keyframes } from 'styled-components';
import React, { Component } from 'react';
import StatementList from './StatementList';
import state from '../state';
import calculateTimeOnPage from '../Utils/calculateTimeOnPage';

/* eslint react/prop-types: 0 */

const handleClick = () => {
  console.log('clicked');
  state.setState({ displayAdmin: true, displayPresort: false });
};

const handleClick2 = () => {
  console.log('clicked');
  state.setState({ displaySort: true, displayPresort: false });
};

let startTime;

class PreSort extends Component {
  componentDidMount() {
    startTime = Date.now();
  }

  componentWillUnmount() {
    calculateTimeOnPage(startTime, 'preSortPage', 'PreSortPage');
  }

  render() {
    const forceUpdate = () => {
      this.forceUpdate();
    };
    // nextButtonText
    const { titleText, columnStatements } = this.props;

    return (
      <PageContainer>
        <TitleDiv>
          <div>{titleText}</div>
          <div>
            <NavButStatements onClick={handleClick}>Admin</NavButStatements>
            <NavButStatements onClick={handleClick2}>Sort</NavButStatements>
          </div>
        </TitleDiv>
        <StatementList
          columnStatements={columnStatements}
          forceUpdate={forceUpdate}
        />
      </PageContainer>
    );
  }
}

export default PreSort;

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
  visibility: ${props => (props.out ? 'hidden' : 'visible')};
  animation: ${props => (props.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 1s linear;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0;
  width: 100%;
  padding-left: 50px;
  height: 120px;
  background: steelblue;
  text-align: center;
  color: white;
  font-size: 35px;
`;

const NavButStatements = styled.button`
  font-family: HelveticaNeue-CondensedBlack, Arial, Helvetica, sans-serif;
  appearance: none;
  height: 40px;
  width: 100px;
  font-size: 25px;
  margin-left: 845px;
  margin-top: 20px;
  color: whitesmoke;
  background: #323232;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 0px solid #666;
  text-align: center;
  line-height: 1em;

  &:active {
    background-color: #146a9d;
  }
`;
