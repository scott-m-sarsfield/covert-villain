import React from 'react';
import get from 'lodash/get';
import map from 'lodash/map';

const LobbyScreen = ({game}) => (
  <div>
    <span>players</span>
    <ul>
      {map(get(game, 'data.players', []), (player, i) => {
        return (
          <li key={i}>{player}</li>
        )
      })}
    </ul>
  </div>
);

export default LobbyScreen;
