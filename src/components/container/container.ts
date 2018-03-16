import glamorous from 'glamorous';
import { minWidthSmall } from '../../styles/breakpoints';

export const Container = glamorous.div({
  maxWidth: '90%',
  marginRight: 'auto',
  marginLeft: 'auto',
  [minWidthSmall]: {
    maxWidth: '80%',
    marginLeft: '8%',
  },
});
