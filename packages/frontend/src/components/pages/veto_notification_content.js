import React from 'react';
import Instructions, { Details } from '../shared/instructions';

const VetoNotificationContent = () => {
  return (
    <React.Fragment>
      <Instructions>Policies Vetoed</Instructions>

      <Details>Chaos has increased.</Details>

    </React.Fragment>
  );
};

export default VetoNotificationContent;
