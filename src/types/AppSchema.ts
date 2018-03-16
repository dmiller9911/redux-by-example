export interface AppSchema extends JSONSchema {
  id: string;
  title: string;
}

export type SchemaType = 'object' | 'string' | 'boolean' | 'null' | 'array' | 'number' | 'undefined';

interface Dictionary<T> {
  [key: string]: T;
}

export interface JSONSchema {
  type: SchemaType;
  isImmutable?: boolean;
  immutableType?: string;
  items?: JSONSchema;
  patternProperties?: Dictionary<JSONSchema>;
  properties?: Dictionary<JSONSchema>;
}
