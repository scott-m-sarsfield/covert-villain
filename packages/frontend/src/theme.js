import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import elusiveEmperorTheme from './elusive_emperor_theme';

const themes = {};

function registerTheme(key, theme) {
  themes[key] = {
    id: key,
    ...theme
  };
}

registerTheme('secretHitler', {
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
  }
});

registerTheme('elusiveEmperor', elusiveEmperorTheme);

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

export default themes;
