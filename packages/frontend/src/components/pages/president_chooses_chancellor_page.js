import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import SubmitButton from '../shared/submit_button';
import Instructions from '../shared/instructions';
import Option from '../shared/option';

const Layout = styled.div`
  min-height: calc(100vh - 50px);
  position: relative;
  padding: 30px 15px;
  box-sizing: border-box;
  
  ${({ withSubmit }) => withSubmit && css`
    padding-bottom: 80px;
  `}
`;

const PresidentChoosesChancellorPage = () => {
  const { user, data: game } = useSelector((state) => state.game);
  const [chancellorUuid, setChancellorUuid] = useState(null);

  const isPresident = user.uuid === game.president;

  return (
    <Layout withSubmit={isPresident}>
      {
        isPresident && (
          <React.Fragment>
            <Instructions>
              Choose the Chancellor:
            </Instructions>
            {
              game.players.map(({ name, uuid }) => (
                <Option key={uuid} {...{
                  label: name,
                  value: uuid,
                  selected: chancellorUuid === uuid,
                  onSelect: setChancellorUuid
                }}/>
              ))
            }
            <SubmitButton disabled={!chancellorUuid}>Submit</SubmitButton>
          </React.Fragment>
        )
      }
    </Layout>
  );
};

export default PresidentChoosesChancellorPage;
