export const TestData = {
  // Valid credentials
  validCredentials: {
    username: 'Admin',
    password: 'admin123'
  },

  // Invalid credentials for negative testing
  invalidCredentials: [
    { username: 'InvalidUser', password: 'WrongPassword', description: 'Completely invalid credentials' },
    { username: 'Admin', password: 'WrongPassword', description: 'Valid username, invalid password' },
    { username: 'NonExistentUser', password: 'admin123', description: 'Invalid username, valid password' }

  ],

  // Empty and whitespace test data for validation
  emptyUsername: { username: '', password: 'admin123', description: 'Empty username' },
  emptyPassword: { username: 'Admin', password: '', description: 'Empty password' },
  bothEmpty: { username: '', password: '', description: 'Both fields empty' },
  whitespaceUsername: { username: '   ', password: 'admin123', description: 'Whitespace-only username' },
  whitespacePassword: { username: 'Admin', password: '   ', description: 'Whitespace-only password' },
  whitespaceBoth: { username: '   ', password: '   ', description: 'Both fields whitespace-only' },

  // Fields validation test data can be added here as needed
  mandatoryFields: [
    { testcase: 'usernameRequired', username: '', password: 'admin123', description: 'Empty username' },
    { testcase: 'passwordRequired', username: 'Admin', password: '', description: 'Empty password' },
    { testcase: 'bothFieldsRequired', username: '', password: '', description: 'Both fields empty' },
    { testcase: 'whitespaceUsername', username: '   ', password: 'admin123', description: 'Whitespace-only username' },
    { testcase: 'whitespacePassword', username: 'Admin', password: '   ', description: 'Whitespace-only password' },
    { testcase: 'whitespaceBoth', username: '   ', password: '   ', description: 'Both fields whitespace-only' }
  ],

  // DASHBOARD
  dashboardTitle: 'Dashboard',
  dashboardUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',

  // Application footer
  footer: {
    version: 'OrangeHRM OS 5.9',
    copyright: '© 2005 - 2026 OrangeHRM, Inc. All rights reserved.',
    versionPattern: /OrangeHRM OS \d+\.\d+/,
    copyrightPattern: /© 2005 - \d{4} OrangeHRM, Inc\. All rights reserved\./,
    shortPageViewport: { width: 1920, height: 600 },
    viewportBottomTolerance: 24,
    loginPathPattern: /\/auth\/login$/,
    pimPathPattern: /\/pim\/viewEmployeeList$/,
    pimNavigationItem: 'PIM',
  },

  // Left-navigation
  navigationItems: [
    { name: 'Admin', href: '/web/index.php/admin/viewAdminModule' },
    { name: 'PIM', href: '/web/index.php/pim/viewPimModule' },
    { name: 'Leave', href: '/web/index.php/leave/viewLeaveModule' },
    { name: 'Time', href: '/web/index.php/time/viewTimeModule' },
    { name: 'Recruitment', href: '/web/index.php/recruitment/viewRecruitmentModule' },
    { name: 'My Info', href: '/web/index.php/pim/viewMyDetails' },
    { name: 'Performance', href: '/web/index.php/performance/viewPerformanceModule' },
    { name: 'Dashboard', href: '/web/index.php/dashboard/index' },
    { name: 'Directory', href: '/web/index.php/directory/viewDirectory' },
    { name: 'Maintenance', href: '/web/index.php/maintenance/viewMaintenanceModule' },
    { name: 'Claim', href: '/web/index.php/claim/viewClaimModule' },
    { name: 'Buzz', href: '/web/index.php/buzz/viewBuzz' }
  ],

  navigationSidebar: {
    items: [
      'Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info',
      'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'
    ],
    destinations: {
      Admin: /\/admin\/viewSystemUsers$/,
      PIM: /\/pim\/viewEmployeeList$/,
      Leave: /\/leave\/viewLeaveList$/,
      Time: /\/time\/viewEmployeeTimesheet$/,
      Recruitment: /\/recruitment\/viewCandidates$/,
      'My Info': /\/pim\/viewPersonalDetails\/empNumber\/\d+$/,
      Performance: /\/performance\/searchEvaluatePerformanceReview$/,
      Dashboard: /\/dashboard\/index$/,
      Directory: /\/directory\/viewDirectory$/,
      Maintenance: /\/maintenance\/purgeEmployee$/,
      Claim: /\/claim\/viewAssignClaim$/,
      Buzz: /\/buzz\/viewBuzz$/,
    },
    searchQueries: ['A', 'Admin', 'ad'],
    noMatchQuery: 'zzzz-no-match',
    filteredQuery: 'Admin',
    deletedCharacterQuery: 'Admi',
    expectedSearchResult: ['Admin'],
    primaryItem: 'Admin',
    dashboardItem: 'Dashboard',
    endpointItems: ['Admin', 'Buzz'],
    emptyQuery: '',
  },
};

export const ErrorMessages = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
  serviceError: 'Internal Server Error'
};

export const Urls = {
  loginPage: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  dashboardPage: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  validatePage: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
};