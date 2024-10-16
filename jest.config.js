//Run with 
//npm run test --coverage --watchAll=false

/** @type {import('jest').Config} */
const config = {
    verbose: false,
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.js'],
  };
  
  module.exports = config;