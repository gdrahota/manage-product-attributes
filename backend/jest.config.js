/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: false,
  collectCoverageFrom: [
    '**/*.{ts, js}',
    '!**/node_modules/**',
    '!src/tsv-import/**/*.*',
    '!tests/setup/**/*.*',
    '!**/mock-data.ts',
    '!**/generic-charts/**/*.ts',
    '!**/charts/**/*.*',
  ],
  testTimeout: 20000,
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node', 'd.ts']
}
