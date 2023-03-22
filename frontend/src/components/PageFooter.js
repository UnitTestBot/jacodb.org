import * as React from 'react';
import packageJSON from '../../package.json';

let { version } = packageJSON;

if (/docs/.test(version)) {
  version = version.split('-')[0];
}

class PageFooter extends React.Component {
  render() {
    return (
      <footer className="bs-docs-footer" role="contentinfo">
        <div className="container">
          <div className="bs-docs-social">
            <ul className="bs-docs-social-buttons">
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=UnitTestBot&repo=jacodb&type=watch&count=true"
                  width={95}
                  height={20}
                  title="Star on GitHub"
                />
              </li>
              <li>
                <iframe
                  className="github-btn"
                  src="https://ghbtns.com/github-btn.html?user=UnitTestBot&repo=jacodb&type=fork&count=true"
                  width={92}
                  height={20}
                  title="Fork on GitHub"
                />
              </li>
            </ul>
          </div>
          <p>
            Code licensed under{' '}
            <a
              href="https://github.com/UniteTestBot/jacodb/blob/master/LICENSE"
              rel="noopener noreferrer"
              target="_blank"
            >
              Apache 2.0
            </a>
          </p>
          <ul className="bs-docs-footer-links muted">
            <li>Currently v{version}</li>
            <li>·</li>
            <li>
              <a href="https://github.com/UniteTestBot/jacodb/">
                GitHub
              </a>
            </li>
            <li>·</li>
            <li>
              <a href="https://github.com/UniteTestBot/jacodb/issues?state=open">
                Issues
              </a>
            </li>
            <li>·</li>
            <li>
              <a href="https://github.com/UniteTestBot/jacodb/releases">
                Releases
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default PageFooter;
