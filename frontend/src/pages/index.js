import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import withLayout from '../withLayout';
import classNames from "classnames";
import ReactGA from 'react-ga';

export default withLayout(
    class HomePage extends React.Component {
        render() {
            ReactGA.initialize('G-43F2VNGSJH');
            ReactGA.pageview(window.location.pathname + window.location.search);
            return (
                <main id="jc-docs-content">
                    <div className={classNames('mast-head', 'mb-4')}>
                        <div className={classNames('styled-content')}>
                            <h1 className={'styled-heading'}>
                                <img src={require('/src/assets/logo.svg')} alt={'JacoDB'} className={'logo-class'}/>
                            </h1>
                            <p className={classNames('styled-sub-heading', 'lead')} style={{textAlign: 'center'}}>
                                Analysing Java bytecode with pleasure
                            </p>
                        </div>
                    </div>

                    <Container>

                        JacoDB (Java Compilation Database) is a library that allows you to get information about Java bytecode outside the JVM
                        process and to store it in a database. While Java Reflection makes it possible to inspect code
                        at runtime, JacoDB does the same for bytecode stored in a file system.
                        <p/>

                        Implementation principles:
                        <p/>

                        <ul>
                            <li> asynchronous, thread-safe and extendable API</li>
                            <li> immutability where possible </li>
                            <li> binding to a specific Java runtime version (since Java 1.8)</li>
                            <li> Java bytecode processing and analyzing (since Java 1.8)</li>
                            <li> persistence: reusing data between restarts</li>
                            <li> fast start-up </li>
                        </ul>
                    </Container>
                    <Container>
                        <Row>
                            <Col md={4} className={classNames('styled-feature-card', 'px-4', 'py-3')}>
                                <h2>Java/Kotlin API</h2>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-4', 'py-3')}>
                                <h2>Persisted and reusable</h2>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-4', 'py-3')}>
                                <h2>Fast and async</h2>
                            </Col>
                        </Row>
                    </Container>
                </main>
            );
        }
    },
);
