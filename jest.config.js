// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '__tests__/coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)']
};
