module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest', // Use Babel to transpile TypeScript files
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json'],
  };