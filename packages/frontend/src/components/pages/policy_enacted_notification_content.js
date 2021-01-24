import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import Instructions from '../shared/instructions';
import { PartyText } from '../shared/atoms';

const PolicyEnactedNotificationContent = ({ data }) => { // data prop
  const { data: game } = useSelector((state) => state.game);
  const { card } = data;

  const fascist = card < 11;

  console.log(game); /* eslint-disable-line */

  return (
    <React.Fragment>
      <Instructions>
        {fascist && <PartyText party="fascist">Fascist Policy</PartyText>}
        {!fascist && <PartyText party="liberal">Liberal Policy</PartyText>}
        <br />
        Enacted!
      </Instructions>
    </React.Fragment>
  );
};

PolicyEnactedNotificationContent.propTypes = {
  data: types.object
};

export default PolicyEnactedNotificationContent;
