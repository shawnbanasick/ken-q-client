// import shuffle from 'lodash/shuffle';
import { view } from 'react-easy-state';
import React, { Component } from 'react';
// import cloneDeep from 'lodash/cloneDeep';
import styled, { keyframes } from 'styled-components';
import state from '../state';
import getRandomId from '../Utils/getRandomId';
import getFormattedViewTime from '../Utils/getFormattedViewTime';

/* eslint react/prop-types: 0 */

const handleButtonClick = e => {
  console.log(e.target.id);
  const buttonId = e.target.id;
  if (buttonId === 'StatementsButton') {
    state.setState({ displayAdmin: false, displayStatements: true });
  }
  if (buttonId === 'goButton') {
    state.setState({ displayAdmin: false, displayPresort: true });

    // shuffle the cards - once only
    // TODO - add card shuffle
    // const hasShuffledCards = localStorage.getItem('hasShuffled');
    // if (hasShuffledCards !== 'true') {
    //   const cards2 = this.props.columnStatements.statementList;
    //   const cards = cloneDeep(cards2);
    //   const shuffledCards = shuffle(cards);
    //   this.props.columnStatements.statementList = shuffledCards;
    //   localStorage.setItem(
    //     'columnStatements',
    //     JSON.stringify(this.props.columnStatements)
    //   );
    //   localStorage.setItem('hasShuffled', 'true');
    // }

    // sent participant info to state for storage
    const randomId8 = getRandomId();
    const randomId8b = getRandomId();
    const randomId16 = randomId8 + randomId8b;

    localStorage.setItem('randomId8', randomId8);
    localStorage.setItem('randomId16', randomId16);

    const startDate = getFormattedViewTime();
    localStorage.setItem('startDate', startDate);

    const startTime = Date.now();
    localStorage.setItem('projectStartTime', startTime);
  }
};

const handleEmailButtonClick = () => {
  console.log('email click');
  // pullEmailHeader();
  // var link = document.getElementById('email');
  state.setState({ displayAdmin: false, displayResults: true });

  // const emailAddress = 'banasick@gmail.com'; // localStorage.getItem('emailInput');
  // const mail = document.createElement('a');
  // mail.target = '_blank';
  // mail.href =
  //   'mailto:' + emailAddress + '?' + 'subject=Ken-Q Mobile Data&body=';

  // // const allResults = localStorage.getItem('allResults');
  // mail.href += 'test'; // allResults;
  // mail.click();

  // state.setState({ displayAdmin: true });

  // };

  // function getBody() {
  //     var emailText1 = $("#emailHeader").html();
  //     var emailText2 = $("#incomingResults").html() + "<br><br>";
  //     var emailText3 = $("#incomingComments").html();
  //     var emailTextResults = emailText1 + emailText2;
  //     return [emailTextResults, emailText3];
  // }
};

class Admin extends Component {
  render() {
    const { projectName, columnStatements, sortCharacteristics } = this.props;

    const loadStatements = localStorage.getItem('loadStatements');
    if (loadStatements !== 'true' || loadStatements === undefined) {
      localStorage.setItem(
        'columnStatements',
        JSON.stringify(columnStatements)
      );
      localStorage.setItem('loadStatements', 'true');
    }

    state.setState({ sortCharacteristics });

    return (
      <PageContainer>
        <Column1>
          <Column1Button id="emailButton" onClick={handleEmailButtonClick}>
            View Results
          </Column1Button>
          <Column1Button
            id="informationButton"
            style={{ paddingLeft: 10 }}
            onClick={handleButtonClick}
          >
            View Information
          </Column1Button>
        </Column1>
        <Column2>
          <Column2Button id="deleteButton" onClick={handleButtonClick}>
            Delete Data
          </Column2Button>
          <Column2Button
            id="StatementsButton"
            style={{ paddingLeft: 10 }}
            onClick={handleButtonClick}
          >
            Add Statements
          </Column2Button>
        </Column2>
        <Column3>
          <label htmlFor="projectNameInput">
            Project Name:
            <input
              id="projectNameInput"
              type="text"
              name="projectName"
              defaultValue={projectName}
            />
          </label>
          <label htmlFor="emailAddressInput">
            Participant Name: (optional)
            <input
              id="participantNameInput"
              type="text"
              name="participant"
              defaultValue="participant name"
            />
          </label>
        </Column3>
        <BeginQsortButton id="goButton" onClick={handleButtonClick}>
          <span style={{ fontSize: 20 }}>Start</span> <br />
          <span style={{ fontSize: 110, margin: 0, padding: 0 }}>Q</span> <br />
          <span style={{ fontSize: 20 }}>Sort</span>
        </BeginQsortButton>
        <ResultsSection>
          <ResultsTitle>Results</ResultsTitle>
          <ResultsDiv />
        </ResultsSection>
      </PageContainer>
    );
  }
}

export default view(Admin);

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
  display: grid;
  justify-items: center;
  grid-template-columns: 341px 342px 342px 341px;
  grid-template-rows: 350px auto;
  width: 1366px;
  height: 1004px;
  background-color: #323232;
  color: white;
  padding-top: 20px;
  visibility: ${props => (props.out ? 'hidden' : 'visible')};
  animation: ${props => (props.out ? fadeOut : fadeIn)} 0.2s linear;
  transition: visibility 1s linear;
`;

const Column1 = styled.div`
  grid-column-start: 1;
  grid-row-start: 1;
  /* border: 2px solid yellow; */
`;

const Column2 = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  /* border: 2px solid yellow; */
`;

const Column3 = styled.div`
  width: 250px;
  grid-column-start: 3;
  grid-row-start: 1;
  /* border: 2px solid yellow; */

  input {
    width: 250px;
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const Column1Button = styled.button`
  position: relative;
  font-family: HelveticaNeue-CondensedBlack, Arial, Helvetica, sans-serif;
  appearance: none;
  height: 140px;
  width: 250px;
  margin-left: 45px;
  margin-bottom: 15px;
  margin-top: 10px;
  color: #323232;
  background: #1985c5;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  border: 0px solid #666;
  font-size: 300%;
  line-height: 1em;
  outline: none;
  -webkit-user-select: none;

  &:active {
    background-color: #146a9d;
  }
`;

const Column2Button = styled.button`
  position: relative;
  font-family: HelveticaNeue-CondensedBlack, Arial, Helvetica, sans-serif;
  appearance: none;
  width: 250px;
  height: 140px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 46px;
  color: #323232;
  background: #1985c5;
  border: 0px solid #666;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  font-size: 300%;
  text-align: center;
  line-height: 1.05em;
  outline: none;
  -webkit-user-select: none;

  &:active {
    background-color: #146a9d;
  }
`;

const BeginQsortButton = styled.button`
  appearance: none;
  position: relative;
  font-family: HelveticaNeue-CondensedBlack, Arial, Helvetica, sans-serif;
  margin-left: 5px;
  width: 250px;
  margin-top: 2px;
  height: 250px;
  background: #55b262;
  color: #323232;
  font-weight: 900;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  grid-column-start: 4;
  grid-row-start: 1;
  font-size: 50px;
  text-align: center;
  user-select: none;
  border: 0px solid black;
  outline: none;

  &:active {
    background-color: #448e4e;
  }
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
  height: 480px;
  width: 1270px;
  background: whitesmoke;
`;

/*
// shuffle the cards - once only
    let hasShuffledCards = sessionStorage.getItem("hasShuffled");
    if (hasShuffledCards !== "true") {
      const cards2 = this.props.columnStatements.statementList;
      const cards = cloneDeep(cards2);
      const shuffledCards = shuffle(cards);
      this.props.columnStatements.statementList = shuffledCards;
      sessionStorage.setItem(
        "columnStatements",
        JSON.stringify(this.props.columnStatements)
      );
      sessionStorage.setItem("hasShuffled", "true");
    }


 // sent participant info to state for storage
    const randomId8 = getRandomId();
    const randomId8b = getRandomId();
    const randomId16 = randomId8 + randomId8b;

    sessionStorage.setItem("randomId8", randomId8);
    sessionStorage.setItem("randomId16", randomId16);

    let startDate = getFormattedViewTime();
    sessionStorage.setItem("startDate", startDate);

    startTime = Date.now();
    sessionStorage.setItem("projectStartTime", startTime);


*/
