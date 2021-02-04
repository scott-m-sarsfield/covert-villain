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
  evil: '#c84e4e',
  evilBorder: '#7e0c0c',
  good: '#74b5b5',
  goodBorder: '#3761ad'
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

const EvilMeter = ({ count }) => (
  <Meter {...{
    label: (
      <FontAwesomeIcon icon={faSkull} />
    ),
    total: 6,
    filled: count,
    colors: {
      filledBorderColor: colors.evilBorder,
      filledBackgroundColor: colors.evil
    }
  }} />
);

EvilMeter.propTypes = {
  count: types.number
};

const GoodMeter = ({ count }) => (
  <Meter {...{
    label: <FontAwesomeIcon icon={faDove} />,
    total: 5,
    filled: count,
    colors: {
      filledBorderColor: colors.goodBorder,
      filledBackgroundColor: colors.good
    }
  }} />
);
GoodMeter.propTypes = {
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
    evilCount: get(game, 'cards.evilParty', []).length,
    goodCount: get(game, 'cards.goodParty', []).length,
    chaosLevel: get(game, 'chaos', 0)
  };
}

const ScoreHud = ({ className }) => {
  const { evilCount, goodCount, chaosLevel } = useSelector((state) => getCounts(state.game.data));
  return (
    <Wrapper className={className}>
      <Left>
        <EvilMeter count={evilCount}/>
        <GoodMeter count={goodCount}/>
      </Left>
      <ChaosMeter count={chaosLevel}/>
    </Wrapper>
  );
};

ScoreHud.propTypes = {
  className: types.string
};

export default ScoreHud;
