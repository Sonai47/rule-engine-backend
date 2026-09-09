import { UserRequirements } from './types/user_requirements.type';
import { findEligibleSchemes } from './rules/eligibility.service';

/**
 * Main entry point for the Rule Engine.
 * Accepts user requirements and evaluates them against all schemes in the system.
 */
export async function runRuleEngine(userRequirements: UserRequirements) {
  return await findEligibleSchemes(userRequirements);
}

// Standalone execution entry point for testing and verification
async function main() {
  const userRequirements: UserRequirements = {
    purpose: 'business',
    activity: 'grocery_retail',
    loan_amount: 100000,
    project_cost: 250000,
    annual_family_income: 320000,
    is_sc: true
  };

  console.log('==================================================');
  console.log('INPUT USER REQUIREMENTS:');
  console.log(JSON.stringify(userRequirements, null, 2));
  console.log('==================================================\n');

  const result = await runRuleEngine(userRequirements);

  console.log('==================================================');
  console.log('RULE ENGINE EVALUATION RESULT:');
  console.log(JSON.stringify(result, null, 2));
  console.log('==================================================');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Rule Engine Execution Error:', err);
  });
}