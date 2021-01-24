import React from 'react';
import types from 'prop-types';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

export const colors = {
  black: '#000000',
  white: '#ffffff',
  grey: '#979797',
  lightGrey: '#d8d8d8',
  fascist: '#c84e4e',
  fascistBorder: '#7e0c0c',
  liberal: '#74b5b5',
  liberalBorder: '#3761ad'
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

const FascistMeter = ({ count }) => (
  <Meter {...{
    label: 'F',
    total: 6,
    filled: count,
    colors: {
      filledBorderColor: colors.fascistBorder,
      filledBackgroundColor: colors.fascist
    }
  }} />
);

FascistMeter.propTypes = {
  count: types.number
};

const LiberalMeter = ({ count }) => (
  <Meter {...{
    label: 'L',
    total: 5,
    filled: count,
    colors: {
      filledBorderColor: colors.liberalBorder,
      filledBackgroundColor: colors.liberal
    }
  }} />
);
LiberalMeter.propTypes = {
  count: types.number
};

const ChaosMeter = ({ count }) => (<Meter label="C" total={3} filled={count} />);
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
    fascistCount: get(game, 'cards.fascist.length', 0),
    liberalCount: get(game, 'cards.liberal.length', 0),
    chaosLevel: get(game, 'chaos', 0)
  };
}

const ScoreHud = ({ className }) => {
  const { fascistCount, liberalCount, chaosLevel } = useSelector((state) => getCounts(state.game));
  return (
    <Wrapper className={className}>
      <Left>
        <FascistMeter count={fascistCount}/>
        <LiberalMeter count={liberalCount}/>
      </Left>
      <ChaosMeter count={chaosLevel}/>
    </Wrapper>
  );
};

ScoreHud.propTypes = {
  className: types.string
};

export default ScoreHud;
