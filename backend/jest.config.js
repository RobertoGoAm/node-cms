module.exports = {
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  transform: {
    '.(ts|tsx|js|jsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  bail: true,
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transformIgnorePatterns: ['node_modules/(?!(express-validator)/)'],
  testMatch: ['<rootDir>/src/**/*.spec.(ts|js)'],
};
