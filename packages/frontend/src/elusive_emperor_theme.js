import { css, cx } from '@emotion/css';

const elusiveEmperorTheme = {
  text: {
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
  },
  styles: {
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
    option: ({ colors, selected }) => {
      const sharedStyles = css`
        justify-content: center;
        color: ${colors.text};
      `;

      const selectedStyles = css`
        background: ${colors.background};
      `;

      const notSelectedStyles = css`
        background: transparent;
        color: ${colors.background};
        border-color: ${colors.background};
      `;

      return cx(
        sharedStyles,
        {
          [selectedStyles]: selected,
          [notSelectedStyles]: !selected
        }
      );
    },
    optionCheckbox: css`
      display: none;
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
  }
};

export default elusiveEmperorTheme;
