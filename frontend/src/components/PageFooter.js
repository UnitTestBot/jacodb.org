import * as React from 'react';
import packageJSON from '../../package.json';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classNames from "classnames";
import Nav from 'react-bootstrap/Nav';

let { version } = packageJSON;

if (/docs/.test(version)) {
  version = version.split('-')[0];
}

class PageFooter extends React.Component {
  render() {
    return (
      <footer className="mast-footer">
        <br/>
        <Container>
          <Row>
            <Col md={4} className={classNames('styled-footer-card', 'px-7', 'py-3')}>
              <ul className={'no-bullets'}>
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
            </Col>

            <Col md={4} className={classNames('styled-footer-card', 'px-7', 'py-3')}>
              <ul className={'no-bullets'}>
                <li>
                  Code licensed under{' '}
                  <Nav.Link className={"footer-link"}
                      href="https://github.com/UniteTestBot/jacodb/blob/master/LICENSE"
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    Apache 2.0
                  </Nav.Link>
                </li>
                <li>
                  Source code on {' '}
                  <Nav.Link className={"footer-link"} href="https://github.com/UniteTestBot/jacodb/">
                    GitHub
                  </Nav.Link>
                </li>
              </ul>
              <br/>
              <ul className={'no-bullets'}>
                <li>
                  Copyright © 2023 JacoDB. UnitTestBot team
                </li>
              </ul>
            </Col>

            <Col md={4} className={classNames('styled-footer-card', 'px-7', 'py-3')}>
              <ul className={'no-bullets'}>
                <li>
                  <Nav.Link className={"footer-link"} href="https://github.com/UniteTestBot/jacodb/issues?state=open">
                    Issues
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className={"footer-link"} href="https://github.com/UniteTestBot/jacodb/releases">
                    Releases
                  </Nav.Link>
                </li>

              </ul>
            </Col>
            <Col md={12} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
              <div className={'footer-copyright'}>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default PageFooter;
