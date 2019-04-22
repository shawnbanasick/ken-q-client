import React from "react";
import styled from "styled-components";

const PositiveButton = props => {
  if (props.border) {
    return (
      <PositiveButtonWithBorder
        id={"green-" + props.index}
        onClick={props.onClick}
      >
        +
      </PositiveButtonWithBorder>
    );
  } else {
    return (
      <PositiveButtonNoBorder
        id={"green-" + props.index}
        onClick={props.onClick}
      >
        +
      </PositiveButtonNoBorder>
    );
  }
};

export default PositiveButton;

const PositiveButtonWithBorder = styled.button`
  background-color: #c7f6c7;
  box-sizing: border-box;
  font-size: 25px;
  font-weight: bold;
  width: 40px;
  height: 35px;
  border: 3px solid black;
`;

const PositiveButtonNoBorder = styled.button`
  background-color: #c7f6c7;
  font-size: 25px;
  box-sizing: border-box;
  font-weight: normal;
  width: 40px;
  height: 35px;
`;
