import glamorous from 'glamorous';
import typography from 'styles/typography';

const fontJSON = typography.toJSON();
export const H1 = glamorous.h1(fontJSON.h1);
export const H4 = glamorous.h4(fontJSON.h4);
export const P = glamorous.p(fontJSON.p);
