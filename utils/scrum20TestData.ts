export const scrum20TestData = {
  aboutApi: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/core/about',
  companyName: 'OrangeHRM',
  productName: 'OrangeHRM OS',
  version: '5.9',
  activeEmployees: 147,
  pastEmployees: 0,
  accountName: 'manda user',
  upgradeUrl: 'https://orangehrm.com/open-source/upgrade-to-advanced',
  supportUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/help/support',
  changePasswordUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/updatePassword',
  helpUrl: 'https://starterhelp.orangehrm.com/hc/en-us',
} as const;

export const scrum20EmployeeTotalCases = [
  { case: 'active zero employees', field: 'Active Employees' as const, total: 0, expected: '0' },
  { case: 'active comma boundary', field: 'Active Employees' as const, total: 9999, expected: '9999' },
  { case: 'active 10,001 value', field: 'Active Employees' as const, total: 10001, expected: '10001' },
  { case: 'active million-scale', field: 'Active Employees' as const, total: 1200000, expected: '1200000' },
  { case: 'terminated zero employees', field: 'Employees Terminated' as const, total: 0, expected: '0' },
  { case: 'terminated comma boundary', field: 'Employees Terminated' as const, total: 9999, expected: '9999' },
  { case: 'terminated 10,001 value', field: 'Employees Terminated' as const, total: 10001, expected: '10001' },
  { case: 'terminated million-scale', field: 'Employees Terminated' as const, total: 1200000, expected: '1200000' },
] as const;

export const scrum20UnavailableExternalDestinations = [
  { case: 'unavailable upgrade', destinationUrl: scrum20TestData.upgradeUrl, control: 'Upgrade' as const },
  { case: 'unavailable help', destinationUrl: scrum20TestData.helpUrl, control: 'Help' as const },
] as const;
