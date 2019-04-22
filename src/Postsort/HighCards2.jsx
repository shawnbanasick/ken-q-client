// import state from "../../store";
import React, { Component } from 'react';
import getPostSortCardStyleHigh from './getPostSortCardStyleHigh';

/* eslint react/prop-types: 0 */

const styles = {
  container: {
    width: '80%',
    border: `2px solid black`,
    marginTop: 50,
    marginLeft: '10%',
    borderRadius: `3px`,
  },
  cardAndTextHolder: {
    display: `flex`,
    alignContent: `center`,
    background: `#7e7e7e`,
  },
  textHolder: {
    marginTop: 5,
    flexGrow: 5,
  },
  cardTag: {
    width: `100%`,
    background: `#c7f6c7`,
    color: `black`,
    textAlign: `center`,
  },
};

// format example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

class HighCards extends Component {
  // on leaving card comment section,
  onBlur = (event, columnStatements, columnDisplay, itemId) => {
    const cards = columnStatements.vCols[columnDisplay];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;

    const identifier = `${columnDisplay}_Card${itemId + 1}`;

    // pull in state object for comments
    const statementCommentsObj =
      JSON.parse(localStorage.getItem('statementCommentsObj')) || {};

    // to update just the card that changed
    cards.map(el => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, ' ');
        const comment = comment2.replace(/,/g, ' ');
        // assign to main data object for confirmation / debugging
        el.comment = comment;

        // assign to comments object
        statementCommentsObj[identifier] = `${el.id}>>>${comment}`;
      }
      return el;
    });

    localStorage.setItem(
      'statementCommentsObj',
      JSON.stringify(statementCommentsObj)
    );

    localStorage.setItem('columnStatements', JSON.stringify(columnStatements));
  }; // end onBlur

  render() {
    const {
      height,
      width,
      columnDisplay,
      agreeObj,
      highCards2,
      columnStatements,
    } = this.props;
    const { agreeText, placeholder } = agreeObj;

    return highCards2.map((item, index) => (
      <div key={item.statement} style={styles.container}>
        <div style={styles.cardTag}>{agreeText}</div>
        <div style={styles.cardAndTextHolder}>
          <div />
          <div style={getPostSortCardStyleHigh(height, width)}>
            {item.statement}
          </div>
          <div className="tagContainerDiv">
            <textarea
              data-gramm_editor="false"
              id={item.id}
              className="commentTextArea"
              placeholder={placeholder}
              defaultValue={item.comment}
              onBlur={e => {
                this.onBlur(e, columnStatements, columnDisplay, index);
              }}
            />
          </div>
        </div>
      </div>
    ));
  }
}

export default HighCards;
