const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [ 'text', 'lcov' ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  testMatch: ['**/*.spec.ts'],
};


