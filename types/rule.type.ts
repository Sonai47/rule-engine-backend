// rule.type.ts
export type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=';

export interface Rule {
  field: string;
  operator: Operator | string;
  value: string | number | boolean;
}