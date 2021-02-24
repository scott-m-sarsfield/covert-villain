import React from 'react';
import types from 'prop-types';
import { css, cx } from '@emotion/css';
import Check from './check';
import { getThemeColor, getThemeStyles } from '../../theme';
import useTheme from './use_theme';
import Typography from '../typography';

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
    color: ${colors.text};
    word-break: break-all;
    text-align: left;
    
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
    border-color: ${colors.border};
    flex: 0 0 auto;
  `,
  check: css`
    position: absolute;
    bottom: 0;
    left: 0;
  `
};

function getOptionColors(theme, variant) {
  const optionColors = {
    evilParty: {
      text: getThemeColor(theme, 'evilText'),
      border: getThemeColor(theme, 'evilBorder'),
      background: getThemeColor(theme, 'evil')
    },
    goodParty: {
      text: getThemeColor(theme, 'goodText'),
      border: getThemeColor(theme, 'goodBorder'),
      background: getThemeColor(theme, 'good')
    },
    default: {
      text: getThemeColor(theme, 'neutralText'),
      border: getThemeColor(theme, 'neutralBorder'),
      background: getThemeColor(theme, 'neutral')
    }
  };

  return optionColors[variant] || optionColors.default;
}

const Option = ({ label, selected, value, onSelect, variant, disabled }) => {
  const theme = useTheme();
  const colors = getOptionColors(theme, variant);
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
      <Typography>
        {label}
      </Typography>
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
