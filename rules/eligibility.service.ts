import { UserRequirements } from '../types/user_requirements.type';
import { EligibilityResult, EligibleSchemeOutput, IneligibleSchemeOutput } from '../types/scheme.type';
import { SchemeService } from '../schemes/scheme.service';
import { SchemeEvaluator } from './scheme.evaluator';

/**
 * Service orchestrating complete scheme eligibility evaluation.
 */
export class EligibilityService {
  private schemeService: SchemeService;
  private schemeEvaluator: SchemeEvaluator;

  constructor() {
    this.schemeService = new SchemeService();
    this.schemeEvaluator = new SchemeEvaluator();
  }

  /**
   * Evaluates user requirements against all registered schemes.
   */
  async findEligibleSchemes(user: UserRequirements): Promise<EligibilityResult> {
    // 1. Fetch all schemes from repository/service layer
    const schemes = await this.schemeService.fetchAllSchemes();

    const eligible_schemes: EligibleSchemeOutput[] = [];
    const ineligible_schemes: IneligibleSchemeOutput[] = [];

    // 2. Loop through every scheme and evaluate rules without stopping early
    for (const scheme of schemes) {
      const evaluationResult = this.schemeEvaluator.evaluateScheme(user, scheme);

      if (evaluationResult.is_eligible) {
        eligible_schemes.push({
          scheme_id: evaluationResult.scheme_id,
          scheme_name: evaluationResult.scheme_name,
          passed_rules: evaluationResult.passed_rules
        });
      } else {
        const failureReasons = evaluationResult.rule_details
          .filter(detail => !detail.passed)
          .map(detail => detail.reason);

        ineligible_schemes.push({
          scheme_id: evaluationResult.scheme_id,
          scheme_name: evaluationResult.scheme_name,
          failed_rules: evaluationResult.failed_rules,
          reasons: failureReasons
        });
      }
    }

    // 3. Return aggregated eligibility breakdown
    return {
      eligible_schemes,
      ineligible_schemes
    };
  }
}

export async function findEligibleSchemes(user: UserRequirements): Promise<EligibilityResult> {
  const service = new EligibilityService();
  return await service.findEligibleSchemes(user);
}