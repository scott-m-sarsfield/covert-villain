import React, { useContext } from 'react';
import types from 'prop-types';
import useTheme from './shared/use_theme';
import { getThemeStyles } from '../theme';

const TypographyContext = React.createContext(false);

const Typography = ({ children }) => {
  const theme = useTheme();
  const typographyAdjusted = useContext(TypographyContext);

  return (
    <TypographyContext.Provider value={true}>
      <span className={typographyAdjusted ? '' : getThemeStyles(theme, 'typography')}>
        {children}
      </span>
    </TypographyContext.Provider>
  );
};

Typography.propTypes = {
  children: types.node
};

export default Typography;
