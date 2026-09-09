import { UserRequirements } from '../types/user_requirements.type';
import { Rule } from '../types/rule.type';
import { compareValues } from '../utils/operator.util';

export interface SingleRuleResult {
  field: string;
  operator: string;
  expectedValue: any;
  actualValue: any;
  passed: boolean;
  reason: string;
}

/**
 * Generic evaluator for single rules.
 * Dynamically compares rule.field, rule.operator, and rule.value against user requirements.
 */
export function evaluateRule(user: UserRequirements, rule: Rule): SingleRuleResult {
  const actualValue = user[rule.field];

  if (actualValue === undefined) {
    return {
      field: rule.field,
      operator: rule.operator,
      expectedValue: rule.value,
      actualValue: undefined,
      passed: false,
      reason: `Field '${rule.field}' is missing in user requirements.`
    };
  }

  const passed = compareValues(actualValue, rule.operator, rule.value);

  const reason = passed
    ? `Rule passed: ${rule.field} (${actualValue}) ${rule.operator} ${rule.value}`
    : `Rule failed: ${rule.field} (${actualValue}) failed condition '${rule.operator} ${rule.value}'`;

  return {
    field: rule.field,
    operator: rule.operator,
    expectedValue: rule.value,
    actualValue,
    passed,
    reason
  };
}