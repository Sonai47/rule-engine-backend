import { Rule } from './rule.type';

export interface Scheme {
  id: number;
  name: string;
  description: string;
  purpose?: string;
  rules: Rule[];
  activities: string[];
}

export interface RuleEvaluationDetail {
  field: string;
  operator: string;
  expectedValue: string | number | boolean | string[];
  actualValue: any;
  passed: boolean;
  reason: string;
}

export interface SchemeEvaluationResult {
  scheme_id: number;
  scheme_name: string;
  is_eligible: boolean;
  passed_rules: string[];
  failed_rules: string[];
  rule_details: RuleEvaluationDetail[];
}

export interface EligibleSchemeOutput {
  scheme_id: number;
  scheme_name: string;
  passed_rules: string[];
}

export interface IneligibleSchemeOutput {
  scheme_id: number;
  scheme_name: string;
  failed_rules: string[];
  reasons: string[];
}

export interface EligibilityResult {
  eligible_schemes: EligibleSchemeOutput[];
  ineligible_schemes: IneligibleSchemeOutput[];
}

