module.exports = {
  default: {
    require: [
      './cucumber.conf.js',
      './step_definitions/**/*.js'
    ],
    format: [
      'progress-bar',
      'json:./reports/cucumber-report.json',
      'html:./reports/cucumber-report.html'
    ],
    paths: [
      './features/**/*.feature'
    ],
    parallel: 1,
    publishQuiet: true
  }
}; 