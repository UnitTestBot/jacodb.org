import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import withLayout from '../withLayout';
import classNames from "classnames";
import trackPageGA from "../components/google-analytics";
import JavaKotlinCodeBlock from "../components/JavaKoltinCodeBlock";
import {useState} from "react";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CodeBlock from "../components/CodeBlock";
import PageFooter from "../components/PageFooter";


const MavenGradleBlock = ({gradleCode, mavenCode, ...props}) => {
    const [isJava, setIsJava] = useState(true);

    return (
        <div>
            <ButtonGroup>
                <Button variant={!isJava ? 'active' : 'dark'} onClick={() => setIsJava(true)}>Gradle</Button>
                <Button variant={isJava ? 'active' : 'dark'} onClick={() => setIsJava(false)}>Maven</Button>
            </ButtonGroup>
            <div className={'java-kotlin-codeblock-container'}>
                {isJava && <CodeBlock codeText={gradleCode} mode={'kotlin'}/>}
                {!isJava && <CodeBlock codeText={mavenCode} mode={'xml'}/>}
            </div>
        </div>
    );
};


export default withLayout(
    class HomePage extends React.Component {
        render() {
            trackPageGA();
            return (
                <main id="jc-docs-content">
                    <div className={classNames('mast-head', 'mb-4')}>
                        <div className={classNames('styled-content')}>
                            <h1 className={'styled-heading'}>
                                <img src={require('/src/assets/logo.svg')} alt={'JacoDB'} className={'logo-class'}/>
                            </h1>
                            {/*<p className={classNames('styled-heading', 'lead')} style={{textAlign: 'center'}}>*/}
                            {/*    Make the most of JVM bytecode analysis.*/}
                            {/*</p>*/}
                        </div>
                    </div>

                    <Container>
                        <br/>
                        <h2 className={'styled-card-like-header'}>What is JacoDB?</h2>
                        <br/>
                        <p>
                            JacoDB is the Java Compilation Database for <a href="/about/benchmarks">fast and effective</a> JVM bytecode analysis.
                        </p>
                        <p>For any kind of program analysis, you need to know the program structure.
                            Whether you develop an IDE-internal static analyzer, a CI solution, or a custom checker to scan Java/Kotlin code for errors and vulnerabilities,
                            you need to get info about classes, methods, fields, parameters.
                            Most of the tools build AST from the source code, but what if you have no source code?
                            What if building AST is not enough for finding an error? Or if you deal with multilingual project?</p>
                        <p>JacoDB meets all these cases. With JacoDB library, you analyze JVM bytecode represented as a list of three-address instructions.
                            You can get class hierarchies and call graphs, investigate annotations, methods, fields, and their usages — either stored in memory or persisted.</p>
                    </Container>

                    <Container>
                        <br/>
                        <h2 className={'styled-card-like-header'}>Features</h2>
                        <br/>
                    </Container>

                    <Container>
                        <p>Benefit from high performance and Java/Kotlin API, and get use of more JacoDB features.</p>
                    </Container>

                    <Container>
                        <Row>
                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Create extensions</h2>
                                <p>JacoDB has an extensible API — create a custom plugin to process bytecode, store data, or intervene into the program flow. </p>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Persist and reuse</h2>
                                <p>You can store information about classes, hierarchies, annotations, methods, fields, and parameters in an SQLite database and reuse it for  fast start-ups, or you can perform in-memory operations with your data.</p>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Reduce memory consumption</h2>
                                <p>Due to balance between the <i>lazy</i> and <i>eager</i> initialization types, JacoDB shows high performance while consuming less resources.</p>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Rely on immutability</h2>
                                <p>Each object returned by JacoDB is immutable — like an independent snapshot of classes, which cannot be modified since it is created.</p>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Make use of concurrency</h2>
                                <p>Due to immutability, JacoDB is thread-safe and provides you with an asynchronous API. If one sends a request to JacoDB while loading JAR-files from another thread, JacoDB represents only a consistent state of the JAR-files being loaded. It is the completely loaded JAR-file that appears in JacoDB output.</p>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Choose JVM runtime</h2>
                                <p>You can bind your plugin processes to a specific Java runtime version (since Java 1.8), so there are no version conflicts.</p>
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <br/>
                        <h2 className={'styled-card-like-header'}>Get started</h2>
                        <br/>
                        <p>Add this to <code>dependencies</code> in <code>build.gradle.kts</code> (for Gradle) or <code>pom.xml</code> (for Maven):</p>
                    </Container>

                    <Container>
                        <MavenGradleBlock
                            gradleCode={`
                            implementation(group = "org.jacodb", name = "jacodb-api", version = jacodbVersion)
                            implementation(group = "org.jacodb", name = "jacodb-core", version = jacodbVersion)
                            implementation(group = "org.jacodb", name = "jacodb-analysis", version = jacodbVersion)
                        `}
                            mavenCode={`   
                            <dependencies>
                                <dependency>
                                    <groupId>org.jacodb</groupId>
                                    <artifactId>jacodb-core</artifactId>
                                </dependency>
                                <dependency>
                                    <groupId>org.jacodb</groupId>
                                    <artifactId>jacodb-api</artifactId>
                                </dependency>
                                <dependency>
                                    <groupId>org.jacodb</groupId>
                                    <artifactId>jacodb-analysis</artifactId>
                                </dependency>
                            </dependencies>                                
                        `}/>
                    </Container>

                    <Container>
                        <br/>
                        <h2 className={'styled-card-like-header'}>Docs, examples, and more</h2>
                        <br/>
                    </Container>

                    <Container>
                        <p>Learn more on JacoDB to make use of it in your project and feel free to contribute.</p>
                    </Container>

                    <Container>
                        <Row>
                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Find detailed <a href="/documentation/installation/">documentation</a></h2>
                                <ul>
                                    <li>Get info on <a href="/documentation/types-classes">types and classes</a>.</li>
                                    <li>Store and query additional information based on bytecode with <a href="/documentation/classpath-features">classpath</a> and <a href="/documentation/database-features">database features</a>.</li>
                                    <li>Get use of <a href="/documentation/instructions-and-graphs">raw bytecode instructions and control flow graphs</a>.</li>
                                    <li>Learn how to <a href="/documentation/migration">migrate</a> from <a href="https://github.com/soot-oss/soot">Soot</a>.</li>
                                    <li>Search through the full <a href="/documentation/api-reference">API reference</a>.</li>
                                </ul>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Get inspired with real <a href="/documentation/examples">examples</a></h2>
                                <ul>
                                    <li>Try <a href="/usage-examples/basic">basic examples</a> as the building blocks for your scenario.</li>
                                    <li>Find the story about using JacoDB for <a href="/usage-examples/symbolic-execution">symbolic execution</a> based project.</li>
                                    <li>Learn how to benefit from JacoDB when creating a <a href="/usage-examples/type-solving">type solver</a>.</li>
                                    <li>Know how to implement <a href="/usage-examples/approximations">approximations</a> for program analysis algorithms.</li>
                                    <li>Check the <a href="/usage-examples/ifds">IFDS</a> project example.</li>
                                </ul>
                            </Col>

                            <Col md={4} className={classNames('styled-feature-card', 'px-7', 'py-3')}>
                                <h2>Learn more <a href="/documentation/about">about</a> the project</h2>
                                <ul>
                                    <li>Find more on <a href="/about/about">maintainers and contributing</a>.</li>
                                    <li>Get information on JacoDB <a href="/about/benchmarks">benchmarking</a>.</li>
                                    <li>Test JacoDB <a href="/swagger-ui/index.html">API</a>.</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
                    <br/>
                    <PageFooter />
                </main>
            );
        }
    },
);
