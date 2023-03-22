import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'astroturf';
import pkg from '../../package.json';

import withLayout from '../withLayout';

const MastHead = styled('div')`
  @import '../css/theme';

  composes: mb-4 from global;

  background-color: $dark;
  padding: 0;
  color: white;
  padding-bottom: 0.5rem;
`;

const Content = styled('div')`
  composes: px-4 from global;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 450px;
  margin: 0 auto;
  max-width: 800px;

  @media (max-width: 800px) {
    padding: 0 40px;
    text-align: center;
  }
`;

const Heading = styled('h1')`
  @import '../css/theme';

  color: $brand;
  font-weight: bold;
  font-size: 3.2rem;
  margin: 2rem 0;
`;

const SubHeading = styled('p')`
  composes: lead from global;

  line-height: 2;
  font-size: 1.6rem;
`;

const BrandButton = styled(Button)`
  @import '../css/theme';

  &:global(.btn-brand) {
    @include button-outline-variant($brand, $dark);
  }
`;

const FeatureCard = styled(Col).attrs({ md: 4 })`
  @import '../css/theme';

  composes: px-4 py-3 from global;
  font-weight: 400;
  line-height: 1.6;

  & h2 {
    font-size: 1.6rem;
    color: $subtle;
    font-weight: 300;
    margin-bottom: 0.6rem;
  }
`;

const ButtonToolbar = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-down(sm) {
    margin: -1rem;

    & > * {
      width: calc(100% - 2rem);
      max-width: 300px;
      margin: 1rem;
    }
  }
`;

export default withLayout(
  class HomePage extends React.Component {
    render() {
      return (
        <main id="rb-docs-content">
          <MastHead>
            <Content>
              <Heading>JA:CO</Heading>
              <SubHeading>
                Analysing Java bytecode with pleasure
              </SubHeading>
              <div className="text-muted mt-3">
                Current version: {pkg.version}
              </div>
              <div className="py-3">
              </div>
            </Content>
          </MastHead>

          <Container>
            <Row>
              <FeatureCard>
                <h2>Java/Kotlin API</h2>
                <p>
                  TODO
                </p>
              </FeatureCard>

              <FeatureCard>
                <h2>Persisted and reusable</h2>
                <p>
                  TODO
                </p>
              </FeatureCard>

              <FeatureCard>
                <h2>Not known</h2>

                <p>
                  TODO
                </p>
              </FeatureCard>
            </Row>
          </Container>
        </main>
      );
    }
  },
);
