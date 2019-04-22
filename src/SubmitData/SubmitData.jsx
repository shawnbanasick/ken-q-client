import React, { Component } from 'react';
import './SubmitData.css';
import state from '../state';

/* eslint react/prop-types: 0 */

const handleClick = () => {
  console.log('clicked');
  state.setState({ displayAdmin: true, displaySubmitData: false });
};

class SubmitData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showError: false,
      showTransmit: true,
    };
    this.transmitData = this.transmitData.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
  }

  componentDidMount() {
    // );
    this.transmitData();
  }

  showSuccess = () => {
    this.setState({
      showSuccess: true,
      showError: false,
      showTransmit: false,
    });
  };

  showError = () => {
    this.setState({
      showError: true,
      showTransmit: false,
      showSuccess: false,
    });
  };

  transmitData = () => {
    const resultsJson = JSON.parse(localStorage.getItem('allResults'));
    // console.log('TCL: SubmitData -> transmitData -> resultsJson', resultsJson);
    // const firebase = window.firebase;
    const participantId = resultsJson.randomId16;
    console.log(
      'TCL: SubmitData -> transmitData -> participantId',
      participantId
    );

    // firebase
    //   .database()
    //   .ref(participantId)
    //   .set(resultsJson, error => {
    //     if (error) {
    //       console.log(JSON.stringify('there was a data transmission error'));
    //       this.showError();
    //     } else {
    //       console.log(JSON.stringify('data transmission success'));
    //       this.showSuccess();
    //     }
    //   });

    // console.log(
    //   "TCL: SubmitData -> componentDidMount -> resultsJson",
    //   JSON.stringify(resultsJson, null, 2)
    // );
  };

  render() {
    if (this.state.showError === true) {
      return (
        <div className="SubmitData">
          <div className="titleDivSubmitData">
            <h1>Submit Data</h1>
          </div>

          <div className="transmittingAnimation">
            <div className="loading-screen">
              <div className="loadingScreenTitle">
                There was a data transmission error. Please click the "Submit"
                button to try again!
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.showSuccess === true) {
      return (
        <div className="SubmitData">
          <div className="titleDivSubmitData">
            <h1>Submit Data</h1>
          </div>

          <div className="transmittingAnimation">
            <div className="loading-screen">
              <div className="loadingScreenTitle">Success!</div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.showTransmit === true) {
      return (
        <div className="SubmitData">
          <div className="titleDivSubmitData">
            <h1>Submit Data</h1>
          </div>

          <div className="transmittingAnimation">
            <div className="loading-screen">
              <div className="loadingScreenTitle">
                Survey Complete - Thank You!
              </div>
              <button
                className="postSortButton"
                type="button"
                onClick={handleClick}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SubmitData;

/*
loading wave animation from https://codepen.io/anron/pen/ZPXzKP?page=1&
Anton Lapko
*/
