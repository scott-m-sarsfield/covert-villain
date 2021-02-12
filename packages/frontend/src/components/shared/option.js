import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import { colors } from '../pages/score_hud';
import Check from './check';
import { getThemeStyles } from '../../theme';
import useTheme from './use_theme';

const optionColors = {
  evilParty: {
    text: colors.white,
    border: colors.evilBorder,
    background: colors.evil
  },
  goodParty: {
    text: colors.white,
    border: colors.goodBorder,
    background: colors.good
  },
  default: {
    text: colors.black,
    border: colors.grey,
    background: colors.lightGrey
  }
};

const styles = {
  optionWrapper: ({ colors }) => css`
    appearance: none;
    outline: none;
    width: 100%;
    border: solid 1px ${colors.border};
    border-radius: 4px;
    
    background: ${colors.background};
    display: flex;
    padding: 14px;
    font-size: 21px;
    line-height: 30px;
    letter-spacing: 2px;
    color: inherit;
    word-break: break-all;
    
    &:not(:last-child){
      margin-bottom: 30px;
    }
    
    &:disabled {
      opacity: 0.7;
    }
  `,
  optionCheckbox: ({ colors }) => css`
    display: block;
    position: relative;
    border: solid 1px #979797;
    background: #ffffff;
    border-radius: 4px;
    height: 30px;
    width: 30px;
    margin-right: 20px;
    border-color: ${colors.border}
  `,
  check: css`
    position: absolute;
    bottom: 0;
    left: 0;
  `
};

const Option = ({ label, selected, value, onSelect, variant, disabled }) => {
  const theme = useTheme();
  const colors = optionColors[variant] || optionColors.default;
  return (
    <button {...{
      className: cx(
        styles.optionWrapper({ colors }),
        getThemeStyles(theme, 'option', { colors, selected })),
      onClick: () => onSelect(value),
      disabled
    }}>
      <div className={cx(styles.optionCheckbox({ colors }), getThemeStyles(theme, 'optionCheckbox'))}>
        {selected && (<Check className={styles.check} />)}
      </div>
      {label}
    </button>
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
