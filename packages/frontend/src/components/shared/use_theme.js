import { useSelector } from 'react-redux';
import get from 'lodash/get';
import themes from '../../theme';

function useTheme() {
  const currentTheme = useSelector((state) => get(state, 'theme.current', 'elusiveEmperor'));

  return themes[currentTheme];
}

export default useTheme;
