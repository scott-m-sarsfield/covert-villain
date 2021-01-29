import React from 'react';
import types from 'prop-types';
import { useSelector } from 'react-redux';
import Instructions from '../shared/instructions';
import { PartyAwareName } from '../shared/atoms';

const ExecutionNotificationContent = ({ data }) => { // data prop
  const { data: game } = useSelector((state) => state.game);
  const { uuid } = data;
  const { president } = game;

  return (
    <React.Fragment>
      <Instructions>
        <PartyAwareName uuid={president} /> executed
        <br />
        <PartyAwareName uuid={uuid} />
      </Instructions>
    </React.Fragment>
  );
};

ExecutionNotificationContent.propTypes = {
  data: types.object
};

export default ExecutionNotificationContent;
