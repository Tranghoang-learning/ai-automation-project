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

};

export const ErrorMessages = {
  invalidCredentials: 'Invalid credentials',
  requiredField: 'Required',
  serviceError: 'Internal server error'
};

export const Urls = {
  loginPage: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
  dashboardPage: 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index',
  validatePage: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
};