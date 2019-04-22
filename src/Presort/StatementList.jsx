import React from 'react';
import './StatementList.css';
// import state from '../state';
// import { useStore } from "easy-peasy";
import NegativeButton from './NegativeButton';
import PositiveButton from './PositiveButton';
import UncertainButton from './UncertainButton';
// import { useStore } from "easy-peasy";

/* eslint react/prop-types: 0 */

const handleClickNewButton = (e, forceUpdate, columnStatements) => {
  // const columnStatements = store.getState().columnStatements;
  const statements2 = columnStatements.statementList;
  const statements = statements2.slice();
  // let random = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  const idArray = e.target.id.split('-');
  const colorType = idArray[0];
  const id = idArray[1];
  if (colorType === 'green') {
    statements[id].cardColor = 'greenSortCard';
    statements[id].divColor = 'isPositiveStatement';
    statements[id].sortValue = 111;
    statements[id].greenChecked = true;
    statements[id].pinkChecked = false;
    statements[id].yellowChecked = false;
  }
  if (colorType === 'yellow') {
    statements[id].cardColor = 'yellowSortCard';
    statements[id].divColor = 'isUncertainStatement';
    statements[id].pinkChecked = false;
    statements[id].yellowChecked = true;
    statements[id].greenChecked = false;
    statements[id].sortValue = 222;
  }
  if (colorType === 'pink') {
    statements[id].cardColor = 'pinkSortCard';
    statements[id].divColor = 'isNegativeStatement';
    statements[id].pinkChecked = true;
    statements[id].yellowChecked = false;
    statements[id].greenChecked = false;
    statements[id].sortValue = 333;
  }
  columnStatements.statements = [...statements];
  //   store.dispatch.setColumnStatements(columnStatements);
  localStorage.setItem('columnStatements', JSON.stringify(columnStatements));
  forceUpdate();
};

function StatementList(props) {
  // const columnStatements = useStore(state => state.columnStatements);
  // console.log(
  //   "TCL: StatementList -> columnStatements",
  //   JSON.stringify(columnStatements)
  // );

  const { columnStatements } = props;
  const { statementList } = columnStatements; // useStore(state => state.columnStatements.statementList);
  // const statementList = columnStatements.statementList;
  return (
    <div className="is-scrollable listDiv">
      {statementList.map((item, index) => (
        <div
          id={index}
          key={item.statement}
          className={`level levelDiv ${item.divColor}`}
        >
          <div
            className="is-pulled-left"
            style={{ display: 'flex', marginRight: 25 }}
          >
            <NegativeButton
              index={index}
              border={item.pinkChecked}
              key={`${item.statement}-pink`}
              onClick={e => {
                handleClickNewButton(
                  e,
                  props.forceUpdate,
                  props.columnStatements
                );
              }}
            />
            <UncertainButton
              index={index}
              border={item.yellowChecked}
              key={`${item.statement}-yellow`}
              onClick={e => {
                handleClickNewButton(
                  e,
                  props.forceUpdate,
                  props.columnStatements
                );
              }}
            />
            <PositiveButton
              index={index}
              border={item.greenChecked}
              key={`${item.statement}-green`}
              onClick={e => {
                handleClickNewButton(
                  e,
                  props.forceUpdate,
                  props.columnStatements
                );
              }}
            />
          </div>
          <div className="level-item levelItemCustom">{item.statement}</div>
        </div>
      ))}
    </div>
  );
}

export default StatementList;
