/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: 'tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["<rootDir>/lib/"],
  collectCoverageFrom: ["src/**/*.ts"],
  silent: true,
  passWithNoTests: true,
};
