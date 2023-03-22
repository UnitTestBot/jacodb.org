const crypto = require('crypto');
const fs = require('fs');

function getIntegrity(file) {
  const algo = 'sha384';
  const content = fs.readFileSync(require.resolve(file), 'utf8');
  const hash = crypto.createHash(algo).update(content, 'utf8').digest('base64');

  return `${algo}-${hash}`;
}

const netlify =
  process.env.NETLIFY === 'true'
    ? {
        pullRequest: process.env.PULL_REQUEST,
        reviewId: process.env.REVIEW_ID,
        branch: process.env.BRANCH,
      }
    : null;

const config = {
  version: require('./package.json').version,
  netlify,
};

module.exports = config;
