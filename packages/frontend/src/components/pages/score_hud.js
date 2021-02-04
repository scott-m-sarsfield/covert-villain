import React from 'react';
import types from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull, faDove, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';

export const colors = {
  black: '#000000',
  white: '#ffffff',
  grey: '#979797',
  lightGrey: '#d8d8d8',
  red: '#c84e4e',
  redBorder: '#7e0c0c',
  blue: '#74b5b5',
  blueBorder: '#3761ad'
};

const MeterSection = styled.div.attrs((props) => ({
  filledBorderColor: get(props, 'colors.filledBorderColor', colors.black),
  filledBackgroundColor: get(props, 'colors.filledBackgroundColor', colors.grey)
}))`
  height: 16px;
  width: 16px;
  border: solid 1px ${colors.grey};
  border-radius: 8px;
  
  ${({ filled, filledBorderColor, filledBackgroundColor }) => filled && css`
      border-color: ${filledBorderColor};
      background: ${filledBackgroundColor};
    `
}
`;

const MeterWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 21px;
  margin-bottom: 5px;
  
  span {
    margin-right: 5px;
  }
  
  ${MeterSection} + ${MeterSection} {
    margin-left: 3px;
  }
`;

const Meter = ({ label, total, filled, colors }) => (
  <MeterWrapper>
    <span>{label}</span>
    {
      Array(total).fill(null).map(
        (_, i) => (
          <MeterSection key={i} filled={i < filled} colors={colors}/>
        )
      )
    }
  </MeterWrapper>
);

Meter.propTypes = {
  label: types.node.isRequired,
  total: types.number.isRequired,
  filled: types.number,
  colors: types.object
};

Meter.defaultProps = {
  filled: 0
};

const RedMeter = ({ count }) => (
  <Meter {...{
    label: (
      <FontAwesomeIcon icon={faSkull} />
    ),
    total: 6,
    filled: count,
    colors: {
      filledBorderColor: colors.redBorder,
      filledBackgroundColor: colors.red
    }
  }} />
);

RedMeter.propTypes = {
  count: types.number
};

const BlueMeter = ({ count }) => (
  <Meter {...{
    label: <FontAwesomeIcon icon={faDove} />,
    total: 5,
    filled: count,
    colors: {
      filledBorderColor: colors.blueBorder,
      filledBackgroundColor: colors.blue
    }
  }} />
);
BlueMeter.propTypes = {
  count: types.number
};

const ChaosMeter = ({ count }) => (
  <Meter
    label={<FontAwesomeIcon icon={faHourglassHalf} />}
    total={3}
    filled={count}
  />
);
ChaosMeter.propTypes = {
  count: types.number
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

function getCounts(game) {
  return {
    redCount: get(game, 'cards.redParty', []).length,
    blueCount: get(game, 'cards.blueParty', []).length,
    chaosLevel: get(game, 'chaos', 0)
  };
}

const ScoreHud = ({ className }) => {
  const { redCount, blueCount, chaosLevel } = useSelector((state) => getCounts(state.game.data));
  return (
    <Wrapper className={className}>
      <Left>
        <RedMeter count={redCount}/>
        <BlueMeter count={blueCount}/>
      </Left>
      <ChaosMeter count={chaosLevel}/>
    </Wrapper>
  );
};

ScoreHud.propTypes = {
  className: types.string
};

export default ScoreHud;
