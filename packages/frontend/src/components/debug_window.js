import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadScenario, resetGame } from '../store/game_slice';

const scenarios = {
  partyAssignment: {
    user: {
      uuid: '3'
    },
    data: {
      phase: 'president_chooses_chancellor',
      players: [
        {
          uuid: '1',
          name: 'Alpha',
          role: 'evilRole',
          party: 'evilParty'
        },
        {
          uuid: '2',
          name: 'Bravo',
          role: 'goodRole',
          party: 'goodParty'
        },
        {
          uuid: '3',
          name: 'Charlie',
          role: 'goodRole',
          party: 'goodParty'
        },
        {
          uuid: '4',
          name: 'Delta',
          role: 'villain',
          party: 'evilParty'
        },
        {
          uuid: '5',
          name: 'Echo',
          role: 'goodRole',
          party: 'goodParty'
        }
      ],
      notifications: [
        {
          type: 'party_assignment'
        }
      ]
    },
    notificationCursor: 0
  }
};

const useConsoleUtility = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function runScenario(scenario) {
      if (!scenario) {
        console.log('unknown scenario'); /* eslint-disable-line no-console */
        return;
      }
      dispatch(
        loadScenario(scenario)
      );
    }
    function runDebugAction(action, ...args) {
      switch (action) {
        case 'reset':
          dispatch(resetGame());
          break;
        case 'load-scenario':
          return runScenario(scenarios[args[0]]);
        default:
          /* eslint-disable-next-line no-console */
          console.log(`Action '${action}' not registered.`);
          break;
      }
    }

    global.runAction = runDebugAction;

    return () => {
      global.runAction = null;
    };
  }, []);
};

export default useConsoleUtility;
