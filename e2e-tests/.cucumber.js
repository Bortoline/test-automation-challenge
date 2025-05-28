module.exports = {
  default: {
    require: [
      './cucumber.conf.js',
      './step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:../reports/e2e-tests/cucumber-report.json',
      'html:../reports/e2e-tests/cucumber-report.html'
    ],
    paths: [
      './features/**/*.feature'
    ],
    parallel: 1,
    publishQuiet: true
  }
}; 