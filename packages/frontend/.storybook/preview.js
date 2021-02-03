import './preview.css';
import '../src/index.css';
import forEach from 'lodash/forEach';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import {action} from '@storybook/addon-actions';
import Api from '../src/api';
import Socket from '../src/components/socket';

forEach(Api, (fn, name) => {
  Api[name] = action(`Api.${name}`)
});

Socket.socket = {
  on: action('socket.on'),
  off: action('socket.off'),
  emit: action('socket.emit')
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Pages',
        [
          'Joining Game',
          'Lobby',
          'Party Assignment Notification',
          'Overview',
          'Presidential Candidate Nominates Chancellor',
          'Election',
          'Election Results Notification',
          'President Chooses Policies',
          'Chancellor Enacts Policy',
          'President Approves Veto',
          'Policy Enacted Notification',
          'Presidential Powers',
          [
            'Policy Peek',
            'Investigation',
            [
              'President Investigates Player',
              'Notification'
            ],
            'Special Election',
            'Execution',
            [
              'President Executes Player',
              'Notification'
            ]
          ],
          'Game Over'
        ]
      ]
    }
  }
}
