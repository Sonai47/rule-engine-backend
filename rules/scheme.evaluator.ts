import { UserRequirements } from '../types/user_requirements.type';
import { Scheme, SchemeEvaluationResult, RuleEvaluationDetail } from '../types/scheme.type';
import { evaluateRule } from './rule.evaluator';
import { ActivityService } from '../activities/activity.service';

/**
 * Evaluates a single scheme against user requirements.
 */
export class SchemeEvaluator {
  private activityService: ActivityService;

  constructor() {
    this.activityService = new ActivityService();
  }

  evaluateScheme(user: UserRequirements, scheme: Scheme): SchemeEvaluationResult {
    const passedRules: string[] = [];
    const failedRules: string[] = [];
    const ruleDetails: RuleEvaluationDetail[] = [];

    // 1. Evaluate scheme-level purpose if defined on scheme
    if (scheme.purpose) {
      const purposePassed = user.purpose === scheme.purpose;
      if (purposePassed) {
        passedRules.push('purpose');
      } else {
        failedRules.push('purpose');
      }

      ruleDetails.push({
        field: 'purpose',
        operator: '=',
        expectedValue: scheme.purpose,
        actualValue: user.purpose,
        passed: purposePassed,
        reason: purposePassed
          ? `Purpose '${user.purpose}' matches required purpose '${scheme.purpose}'`
          : `Purpose '${user.purpose}' does not match required '${scheme.purpose}'`
      });
    }

    // 2. Dynamic generic rules evaluation
    for (const rule of scheme.rules) {
      const result = evaluateRule(user, rule);
      ruleDetails.push({
        field: result.field,
        operator: result.operator,
        expectedValue: result.expectedValue,
        actualValue: result.actualValue,
        passed: result.passed,
        reason: result.reason
      });

      if (result.passed) {
        passedRules.push(rule.field);
      } else {
        failedRules.push(rule.field);
      }
    }

    // 3. Activity match check
    const activityResult = this.activityService.isActivityEligible(user, scheme);
    ruleDetails.push({
      field: 'activity',
      operator: 'IN',
      expectedValue: scheme.activities,
      actualValue: user.activity,
      passed: activityResult.passed,
      reason: activityResult.reason
    });

    if (activityResult.passed) {
      passedRules.push('activity');
    } else {
      failedRules.push('activity');
    }

    // Scheme passes only if zero rules failed
    const isEligible = failedRules.length === 0;

    return {
      scheme_id: scheme.id,
      scheme_name: scheme.name,
      is_eligible: isEligible,
      passed_rules: passedRules,
      failed_rules: failedRules,
      rule_details: ruleDetails
    };
  }
}

export function evaluateScheme(user: UserRequirements, scheme: Scheme): boolean {
  const evaluator = new SchemeEvaluator();
  const result = evaluator.evaluateScheme(user, scheme);
  return result.is_eligible;
}