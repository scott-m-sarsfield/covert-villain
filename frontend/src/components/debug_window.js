import React, {useEffect}  from 'react';
import { useDispatch} from 'react-redux';
import {leaveGame, loadScenario, resetGame} from '../game_slice';

const useConsoleUtility = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function runDebugAction(action, params) {
      switch(action){
        case 'reset':
          dispatch(resetGame());
          break;
        case 'exit':
        case 'leave':
          dispatch(leaveGame());
          break;
        case 'load-full-lobby':
          dispatch(
            loadScenario({
              name: 'Alpha',
              code: 'ABXGYP',
              data: {
                data: {
                  code: 'ABXGYP',
                  players: [
                    'Alpha',
                    'Bravo',
                    'Charlie',
                    'Delta',
                    'Echo',
                    'Foxtrot',
                    'Golf',
                    'Hotel',
                    'India',
                    'Juliet'
                  ]
                }
              }
            })
          );
          break;
        default:
          console.log(`Action '${action}' not registered.`);
          break;
      }
    }

    global.runAction = runDebugAction;

    return () => {
      global.runAction = null;
    };
  }, [])
}

export default useConsoleUtility;
