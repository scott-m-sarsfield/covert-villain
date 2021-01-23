import React from 'react';
import { action } from '@storybook/addon-actions';
import Option from './option';

export default ({
  title: 'Shared/Option',
  decorators: [(Story) => <div style={{ margin: '15px' }}><Story/></div>]
});

export const unchecked = () => (
  <Option {...{
    label: 'Alpha',
    value: '1',
    selected: false,
    onSelect: action('onSelect')
  }} />
);

export const checked = () => (
  <Option {...{
    label: 'Alpha',
    value: '1',
    selected: true,
    onSelect: action('onSelect')
  }} />
);
