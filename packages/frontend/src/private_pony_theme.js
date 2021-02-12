import { css, cx } from '@emotion/css';

const colors = {
  good: '#E968B4',
  goodBorder: '#000',
  goodText: '#fff',
  evil: '#A271D6',
  evilBorder: '#000',
  evilText: '#fff',
  neutral: 'rgba(255,255,255,0.7)'
};

const privatePonyTheme = {
  text: {
    title: 'Private Pony',
    president: 'President',
    presidentialCandidate: 'Presidential Candidate',
    chancellor: 'Chancellor',
    evilRole: 'Night-Mare',
    evilParty: 'Night-Mare',
    goodRole: 'Pretty Pony',
    goodParty: 'Pretty Pony',
    yes: 'Yes',
    no: 'No',
    villain: 'Elmer'
  },
  colors,
  styles: {
    body: css`
      background: #ECBCD8;
      font-family: 'Indie Flower', sans-serif;
    
      * {
        font-family: 'Indie Flower', sans-serif;
      }
    `,
    button: css`
      border: none;
      background: transparent;
      font-size: larger;
    `,
    heading: css`
      background: #EC83C0;
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
      background: rgba(255,255,255,0.8);
      border-radius: 0;
      color: white;
      outline: none;
    `,
    option: null,
    optionCheckbox: css`
      flex: 0 0 auto;
    `,
    player: css`
    `,
    vote: null,
    partyAwareName: ({ party }) => {
      const commonStyles = css`
        border-radius: 4px;
        padding: 0 5px;
        margin: 0 -5px;
      `;
      if (!party) {
        return commonStyles;
      }

      const color = party === 'goodParty' ? colors.good : colors.evil; /* eslint-disable-line */

      return cx(
        commonStyles,
        css`
          background: ${color};
          color: white;
        `
      );
    },
    evilList: css`
      ul {
       li {
          color: white;
          background: ${colors.evil}
        }
      }
    `
  }
};

export default privatePonyTheme;
