import { css } from 'styled-components';
import isFunction from 'lodash/isFunction';

const themes = {
  secretHitler: {
    id: 'secretHitler',
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
  elusiveEmperor: {
    id: 'elusiveEmperor',
    title: 'Elusive Emperor',
    president: 'Vice Chair',
    presidentialCandidate: 'Vice Chair Nominee',
    chancellor: 'Supreme Chancellor',
    evilRole: 'Loyalist',
    evilParty: 'Loyalist',
    goodRole: 'Delegate',
    goodParty: 'Delegation',
    yes: 'chak! (YES)',
    no: 'den (NO)',
    villain: 'Palpatine'
  }
};

const elusiveEmperorStyles = {
  body: css`
    background: rgb(43, 43, 43);
    color: white;
    font-family: 'Jura', sans-serif;
  
    * {
      font-family: 'Jura', sans-serif;
    }
 `,
  button: css`
    border: none;
    background: transparent;
    color: white;
`,
  heading: css`
    background: rgb(60,60,60);
    color: white;
    
    svg {
      color: white;
    }
`,
  header: css` 
    color: white;
`,
  joinInput: css`
    line-height: 28px;
    border: none;
    background: rgb(60,60,60);
    color: white;
    outline: none;
`,
  option: ({ OptionCheckbox }) => css`
    justify-content: center;
    color: ${(props) => props.colors.text};
  
    ${(props) => props.selected ? css`
      background: ${(props) => props.colors.background};
    ` : css`
      background: transparent;
      color: ${(props) => props.colors.background};
      border-color: ${(props) => props.colors.background};
    `}
    
    ${OptionCheckbox} {
      display: none;
    }
`,
  player: css`
    border-width: 0 0px 1px 0px;
    background: transparent;
`,
  vote: css`
    text-align: right;
    font-size: smaller;
    border: none;
    background: none;
    
    :before {
      content: '['
    }
    
    :after {
      content: ']';
    }
`
};

export function addElusiveEmperorStyles(component, childComponents) {
  return (props) => {
    if (props.theme.id === 'elusiveEmperor') {
      const styles = elusiveEmperorStyles[component];

      if (isFunction(styles)) {
        return styles(childComponents);
      }

      return styles;
    }

    return '';
  };
}

export default themes;
