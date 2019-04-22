import React from "react";
import styled from "styled-components";

const UncertainButton = props => {
  if (props.border) {
    return (
      <UncertainButtonWithBorder
        id={"yellow-" + props.index}
        onClick={props.onClick}
      >
        ?
      </UncertainButtonWithBorder>
    );
  } else {
    return (
      <UncertainButtonNoBorder
        id={"yellow-" + props.index}
        onClick={props.onClick}
      >
        ?
      </UncertainButtonNoBorder>
    );
  }
};

export default UncertainButton;

const UncertainButtonWithBorder = styled.button`
  background-color: rgba(211, 211, 211, 0.6);
  box-sizing: border-box;
  font-size: 25px;
  font-weight: bold;
  width: 40px;
  height: 35px;
  border: 3px solid black;
`;

const UncertainButtonNoBorder = styled.button`
  background-color: rgba(211, 211, 211, 0.6);
  font-size: 25px;
  box-sizing: border-box;
  font-weight: normal;
  width: 40px;
  height: 35px;
`;
