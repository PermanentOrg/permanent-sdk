/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ["<rootDir>/dist/"],
  collectCoverageFrom: ["src/**/*.ts"],
  silent: true,
  passWithNoTests: true,
};
