import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { css } from '@emotion/css';
import elusiveEmperorTheme from './elusive_emperor_theme';
import privatePonyTheme from './private_pony_theme';

const themes = {};

function registerTheme(key, theme) {
  themes[key] = {
    id: key,
    ...theme
  };
}

registerTheme('secretHitlerA', {
  text: {
    title: 'Secret Hitler',
    president: 'President',
    presidentialCandidate: 'Presidential Candidate',
    chancellor: 'Chancellor',
    evilRole: 'Fascist',
    evilParty: 'Fascist',
    goodRole: 'Liberal',
    goodParty: 'Liberal',
    yes: 'ja! (YES)',
    no: 'nein (NO)',
    villain: 'Hitler'
  },
  styles: {
    body: css`
      font-family: 'Potta One', sans-serif;
    
      * {
        font-family: 'Potta One', sans-serif;
      }
    `
  }
});

registerTheme('secretHitlerB', {
  text: {
    title: 'Secret Hitler',
    president: 'President',
    presidentialCandidate: 'Presidential Candidate',
    chancellor: 'Chancellor',
    evilRole: 'Fascist',
    evilParty: 'Fascist',
    goodRole: 'Liberal',
    goodParty: 'Liberal',
    yes: 'ja! (YES)',
    no: 'nein (NO)',
    villain: 'Hitler'
  },
  styles: {
    typography: css`
      position: relative;
      bottom: -0.2em;
    `
  }
});

registerTheme('elusiveEmperor', elusiveEmperorTheme);
registerTheme('privatePony', privatePonyTheme);

export function getThemeStyles(theme, component, props) {
  const styles = get(themes, [theme.id, 'styles', component]);

  if (!styles) {
    return null;
  }

  if (isFunction(styles)) {
    return styles(props);
  }

  return styles;
}

export function getThemeText(theme, key) {
  const text = get(themes, [theme.id, 'text', key]);

  if (!text) {
    console.error('No text found for', key, 'in', theme.id); /* eslint-disable-line */
  }

  return text;
}

const defaultColors = {
  evil: '#c84e4e',
  evilBorder: '#7e0c0c',
  evilText: 'inherit',
  good: '#74b5b5',
  goodBorder: '#3761ad',
  goodText: 'inherit',
  neutral: '#d8d8d8',
  neutralBorder: '#979797',
  neutralText: 'inherit'
};

export function getThemeColor(theme, key) {
  return get(themes, [theme.id, 'colors', key], get(defaultColors, key));
}

export default themes;
