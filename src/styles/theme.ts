interface CodeTheme {
  background: string;
  foreground: string;
  key: string;
  string: string;
  number: string;
  boolean: string;
  object: string;
  array: string;
  null: string;
  undefined: string;
  note: string;
  expander: string;
}

interface Theme {
  code: CodeTheme;
}

export type ThemedProps<P = {}> = { theme?: Theme } & P;

export const theme: Theme = {
  code: {
    background: '##fff',
    foreground: '#222',
    expander: '#5a5a5a',
    key: '#c80000',
    string: '#f5871f',
    number: '#3879d9',
    boolean: '#eab700',
    null: '#881280',
    undefined: '#881280',
    object: '#236e25',
    array: '#236e25',
    note: '#222',
  },
};
