import React from "react";
import styled from "styled-components";

const NegativeButton = props => {
  if (props.border) {
    return (
      <NegativeButtonWithBorder
        id={"pink-" + props.index}
        onClick={props.onClick}
      >
        -
      </NegativeButtonWithBorder>
    );
  } else {
    return (
      <NegativeButtonNoBorder
        id={"pink-" + props.index}
        onClick={props.onClick}
      >
        -
      </NegativeButtonNoBorder>
    );
  }
};

export default NegativeButton;

const NegativeButtonWithBorder = styled.button`
  background-color: lightpink;
  box-sizing: border-box;
  font-size: 25px;
  font-weight: bold;
  width: 40px;
  height: 35px;
  border: 3px solid black;
`;

const NegativeButtonNoBorder = styled.button`
  background-color: lightpink;
  font-size: 25px;
  box-sizing: border-box;
  font-weight: normal;
  width: 40px;
  height: 35px;
`;
