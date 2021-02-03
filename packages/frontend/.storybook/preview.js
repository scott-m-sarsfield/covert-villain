import './preview.css';
import '../src/index.css';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

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
          'Presidential Candidate Nominates Chancellor',
          'Election Results Notification',
          'Policy Enacted Notification'
        ]
      ]
    }
  }
}
