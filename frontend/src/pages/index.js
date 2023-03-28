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
                        <div className={classNames('styled-content')} style={{paddingLeft: '10%'}}>
                            <h1 className={'styled-heading'}>
                                <img src={require('/src/assets/logo.svg')} alt={'JacoDB'} className={'logo-class'}/>
                            </h1>
                            <p className={classNames('styled-sub-heading', 'lead')}>
                                Analysing Java bytecode with pleasure
                            </p>
                            <div className="text-muted mt-3">
                                Current version: {pkg.version}
                            </div>

                        </div>
                    </div>

                    <Container>

                        JacoDB is a library that allows you to get information about Java bytecode outside the JVM
                        process and to store it in a database. While Java Reflection makes it possible to inspect code
                        at runtime, Java Compilation Database does the same for bytecode stored in a file system.
                        <p/>

                        Implementation principles:
                        <p/>

                        <ul>
                            <li> asynchronous, thread-safe and extendable API</li>
                            <li> immutability where it's possible </li>
                            <li> allow binding to specific Java runtime version (starting with Java 1.8)</li>
                            <li> java bytecode processing and analyzing (starting with Java 1.8)</li>
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
