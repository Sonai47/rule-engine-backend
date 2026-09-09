// user-requirements.type.ts
export interface UserRequirements {
  purpose: string;
  activity: string;
  loan_amount: number;
  project_cost: number;
  annual_family_income: number;
  is_sc: boolean;
  [key: string]: any;
}