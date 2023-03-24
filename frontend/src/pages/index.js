import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pkg from '../../package.json';

import withLayout from '../withLayout';
import classNames from "classnames";


export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <main id="rb-docs-content">
          <div className={classNames('mast-head', 'mb-4')}>
            <div className={classNames('styled-content', 'px-4')}>
              <h1 className={'styled-heading'}>JAHA</h1>
              <p className={classNames('styled-sub-heading', 'lead')}>
                Analysing Java bytecode with pleasure
              </p>
              <div className="text-muted mt-3">
                Current version: {pkg.version}
              </div>
              <div className="py-3">
              </div>
            </div>
          </div>

          <Container>
            <Row>
              <Col md={4} className={classNames('styled-feature-card', 'px-4','py-3')}>
                <h2>Java/Kotlin API</h2>
                <p>
                  TODO
                </p>
              </Col>

              <Col md={4} className={classNames('styled-feature-card', 'px-4','py-3')}>
                <h2>Persisted and reusable</h2>
                <p>
                  TODO
                </p>
              </Col>

              <Col md={4} className={classNames('styled-feature-card', 'px-4','py-3')}>
                <h2>Not known</h2>

                <p>
                  TODO
                </p>
              </Col>
            </Row>
          </Container>
        </main>
      );
    }
  },
);
