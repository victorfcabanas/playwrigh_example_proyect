const fs = require('fs');
const path = require('path');

class ConsolidatedReportGenerator {
  constructor() {
    this.results = {
      summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        flaky: 0,
        duration: 0
      },
      categories: {},
      trends: [],
      failureAnalysis: [],
      recommendations: []
    };
  }

  generateReport() {
    console.log('🔄 Generating consolidated test report...');
    this.collectTestResults();
    this.analyzeResults();
    this.generateHTML();
    this.generateJSON();
    this.sendMetrics();
    console.log('✅ Consolidated report generated successfully');
  }

  collectTestResults() {
    const artifactsDir = './artifacts';
    if (!fs.existsSync(artifactsDir)) {
      console.warn('⚠️ No artifacts directory found');
      return;
    }

    const dirs = fs.readdirSync(artifactsDir);
    for (const dir of dirs) {
      const resultsPath = path.join(artifactsDir, dir, 'results.json');
      if (fs.existsSync(resultsPath)) {
        try {
          const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
          this.processResults(results, dir);
        } catch (e) {
          console.warn(`Could not read results from ${resultsPath}: ${e.message}`);
        }
      }
    }
  }

  processResults(results, category) {
    const categoryName = this.extractCategory(category);
    if (!this.results.categories[categoryName]) {
      this.results.categories[categoryName] = { passed: 0, failed: 0, duration: 0 };
    }

    results.suites?.forEach((suite) => {
      suite.specs?.forEach((spec) => {
        spec.tests?.forEach((test) => {
          this.results.summary.totalTests++;
          const status = test.results?.[0]?.status;
          if (status === 'passed') {
            this.results.summary.passed++;
            this.results.categories[categoryName].passed++;
          } else if (status === 'failed') {
            this.results.summary.failed++;
            this.results.categories[categoryName].failed++;
            this.results.failureAnalysis.push({
              test: test.title,
              category: categoryName,
              error: test.results[0].error?.message,
              file: spec.file
            });
          } else {
            this.results.summary.skipped++;
          }

          const duration = test.results?.[0]?.duration || 0;
          this.results.summary.duration += duration;
          this.results.categories[categoryName].duration += duration;
        });
      });
    });
  }

  extractCategory(dirName) {
    if (dirName.includes('e2e')) return 'e2e';
    if (dirName.includes('api')) return 'api';
    if (dirName.includes('accessibility')) return 'accessibility';
    if (dirName.includes('security')) return 'security';
    if (dirName.includes('mobile')) return 'mobile';
    if (dirName.includes('performance')) return 'performance';
    return 'other';
  }

  analyzeResults() {
    const total = this.results.summary.totalTests || 1;
    const successRate = (this.results.summary.passed / total) * 100;
    if (successRate < 95) {
      this.results.recommendations.push('🔴 Success rate below 95%. Investigate failing tests.');
    }

    if (this.results.summary.duration > 1800000) {
      this.results.recommendations.push('⚠️ Test execution time exceeds 30 minutes. Consider optimizing.');
    }

    const errorPatterns = {};
    this.results.failureAnalysis.forEach((failure) => {
      const errorType = this.categorizeError(failure.error);
      errorPatterns[errorType] = (errorPatterns[errorType] || 0) + 1;
    });
    this.results.errorPatterns = errorPatterns;
  }

  categorizeError(error) {
    if (!error) return 'Unknown';
    if (error.includes('Timeout')) return 'Timeout';
    if (error.includes('Network')) return 'Network';
    if (error.includes('Element not found')) return 'Locator';
    if (error.includes('Assert')) return 'Assertion';
    return 'Other';
  }

  generateHTML() {
    const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Automated Consolidated Test Report</title>
  <style>body{font-family:Arial,sans-serif;margin:20px}.summary{background:#f5f5f5;padding:20px;border-radius:8px}.success{color:#28a745}.failure{color:#dc3545}.category{margin:10px 0;padding:15px;border:1px solid #ddd;border-radius:4px}</style>
</head>
<body>
  <h1>🚗 Consolidated Test Report</h1>
  <div class="summary">
    <h2>📊 Summary</h2>
    <p><strong>Total Tests:</strong> ${this.results.summary.totalTests}</p>
    <p><strong class="success">Passed:</strong> ${this.results.summary.passed}</p>
    <p><strong class="failure">Failed:</strong> ${this.results.summary.failed}</p>
    <p><strong>Skipped:</strong> ${this.results.summary.skipped}</p>
    <p><strong>Duration:</strong> ${(this.results.summary.duration / 1000 / 60).toFixed(2)} minutes</p>
  </div>
  <h2>📋 Test Categories</h2>
  ${Object.entries(this.results.categories).map(([category, data]) => `
    <div class="category">
      <h3>${category.toUpperCase()}</h3>
      <p>Passed: ${data.passed} | Failed: ${data.failed} | Duration: ${(data.duration / 1000).toFixed(2)}s</p>
    </div>
  `).join('')}
  <h2>🔍 Failure Analysis</h2>
  ${this.results.failureAnalysis.length ? `<ul>${this.results.failureAnalysis.slice(0,10).map(f=>`<li><strong>${f.test}</strong> (${f.category}): ${f.error}</li>`).join('')}</ul>` : '<p>No failures to report! 🎉</p>'}
  <h2>💡 Recommendations</h2>
  <ul>${this.results.recommendations.map(rec=>`<li>${rec}</li>`).join('')}</ul>
  <footer><p><em>Generated on ${new Date().toISOString()}</em></p></footer>
</body>
</html>`;

    try {
      fs.mkdirSync('./reports', { recursive: true });
      fs.writeFileSync('./reports/consolidated-report.html', template);
      console.log('HTML report written to ./reports/consolidated-report.html');
    } catch (e) {
      console.error('Failed to write HTML report:', e.message);
    }
  }

  generateJSON() {
    const jsonReport = {
      ...this.results,
      metadata: {
        generatedAt: new Date().toISOString(),
        environment: process.env.TEST_ENV || 'unknown',
        branch: process.env.GITHUB_REF_NAME || 'unknown',
        commit: process.env.GITHUB_SHA || 'unknown'
      }
    };

    try {
      fs.mkdirSync('./reports', { recursive: true });
      fs.writeFileSync('./reports/consolidated-report.json', JSON.stringify(jsonReport, null, 2));
      console.log('JSON report written to ./reports/consolidated-report.json');
    } catch (e) {
      console.error('Failed to write JSON report:', e.message);
    }
  }

  sendMetrics() {
    const metrics = {
      'test.total': this.results.summary.totalTests,
      'test.passed': this.results.summary.passed,
      'test.failed': this.results.summary.failed,
      'test.duration': this.results.summary.duration,
      'test.success_rate': this.results.summary.passed / (this.results.summary.totalTests || 1) * 100
    };

    if (process.env.DATADOG_API_KEY) {
      // send to datadog if configured (implementation omitted)
      console.log('Would send metrics to Datadog');
    }
  }
}

if (require.main === module) {
  const generator = new ConsolidatedReportGenerator();
  generator.generateReport();
}

module.exports = ConsolidatedReportGenerator;
