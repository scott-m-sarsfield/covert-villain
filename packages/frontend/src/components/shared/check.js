import React from 'react';
import types from 'prop-types';

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

export default Check;
