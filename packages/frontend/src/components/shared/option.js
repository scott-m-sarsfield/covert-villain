import React from 'react';
import types from 'prop-types';
import styled, { css } from 'styled-components';
import { colors } from '../pages/score_hud';
import Check from './check';
import { addElusiveEmperorStyles } from '../../theme';
import useTheme from './use_theme';

const optionColors = {
  evilParty: {
    colors: {
      text: colors.white,
      border: colors.evilBorder,
      background: colors.evil
    }
  },
  goodParty: {
    colors: {
      text: colors.white,
      border: colors.goodBorder,
      background: colors.good
    }
  },
  default: {
    colors: {
      text: colors.black,
      border: colors.grey,
      background: colors.lightGrey
    }
  }
};

const OptionCheckbox = styled.div``;
const StyledCheck = styled(Check)``;

const OptionWrapper = styled.button.attrs((props) => {
  return optionColors[props.variant] || optionColors.default;
})`
  appearance: none;
  outline: none;
  width: 100%;
  border: solid 1px ${(props) => props.colors.border};
  border-radius: 4px;
  
  background: ${(props) => props.colors.background};
  display: flex;
  padding: 14px;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: 2px;
  color: inherit;
  
  &:not(:last-child){
    margin-bottom: 30px;
  }
  
  ${OptionCheckbox} {
    display: block;
    position: relative;
    border: solid 1px #979797;
    background: #ffffff;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    margin-right: 20px;
    border-color: ${(props) => props.colors.border}
    
    ${StyledCheck} {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  
  ${(props) => props.disabled && css`
    opacity: 0.7;
  `}
  
  ${addElusiveEmperorStyles('option', { OptionCheckbox })}
`;

const Option = ({ label, selected, value, onSelect, variant, disabled }) => {
  const theme = useTheme();
  return (
    <OptionWrapper {...{ variant, onClick: () => onSelect(value), disabled, selected, theme }}>
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
  value: types.any,
  onSelect: types.func.isRequired,
  variant: types.string,
  disabled: types.bool
};

export default Option;
