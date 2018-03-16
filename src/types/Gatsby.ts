export interface AllQueryResult<T> {
  edges: {
    node: T;
  }[];
}

export interface GatsbyLayoutComponentProps<C, D> {
  layoutContext: C;
  data: D;
  children(): React.ReactNode;
}
