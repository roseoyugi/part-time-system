export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  account_number: string;
  national_id: string;
  department: string;
  updatedPassword: boolean;
};

export type ClaimType = {
  id: number;
  claimant_id: number;
  hours: number;
  date: string;
  department_status: string;
  registrar_status: string;
  file_url: string;
  department: string;
  unit_id: number;
};

export type ClaimantType = {
  name: string;
  email: string;
};

export type DepartmentType = {
  id: number;
  name: string;
  manager_id: string;
};

export type JobType = {
  id: number;
  name: string;
  pay_rate: string;
  department_id: string;
};

export type UnitType = {
  id: number;
  cf: number;
  department: string;
  unit_code: string;
  unit_title: string;
};

export type AccountType = {
  id: number;
  user_id: number;
  balance: number;
};
