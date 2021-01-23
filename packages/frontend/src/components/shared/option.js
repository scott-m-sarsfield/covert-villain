import React from 'react';
import types from 'prop-types';
import styled from 'styled-components';

const OptionCheckbox = styled.div`
  position: relative;
  border: solid 1px #979797;
  background: #ffffff;
  border-radius: 4px;
  height: 30px;
  width: 30px;
`;

const Check = ({ className }) => (
  <svg className={className} width="35px" height="38px" viewBox="0 0 35 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>checked</title>
    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
      <g id="CheckboxButton" transform="translate(-15.000000, -5.000000)" stroke="#000000" strokeWidth="9">
        <g id="checked" transform="translate(21.500000, 11.548424)">
          <polyline id="Line" points="-0.244565217 18.3840216 7.75543478 24.5172815 22.2554348 -0.159513357" />
        </g>
      </g>
    </g>
  </svg>
);

Check.propTypes = {
  className: types.string
};

const OptionWrapper = styled.button`
  appearance: none;
  outline: none;
  width: 100%;
  border: solid 1px #979797;
  border-radius: 4px;
  
  background: #d8d8d8;
  display: flex;
  padding: 14px;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: 2px;
  
  &:not(:last-child){
    margin-bottom: 30px;
  }
  
  ${OptionCheckbox} {
    margin-right: 20px;
  }
`;

const StyledCheck = styled(Check)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Option = ({ label, selected, value, onSelect }) => {
  return (
    <OptionWrapper onClick={() => onSelect(value)}>
      <OptionCheckbox>
        {selected && (<StyledCheck />)}
      </OptionCheckbox>
      {label}
    </OptionWrapper>
  );
};

Option.propTypes = {
  label: types.string,
  selected: types.bool,
  value: types.string,
  onSelect: types.func.isRequired
};

export default Option;
