import PropTypes from "prop-types";
import CodeBlock from "./CodeBlock";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";

const JavaKotlinCodeBlock = ({javaCode, kotlinCode, ...props}) => {
    const [isJava, setIsJava] = useState(true);

    return (
        <div>
            <ButtonGroup>
                <Button variant={!isJava ? 'active' : 'dark'} onClick={() => setIsJava(true)}>Java</Button>
                <Button variant={isJava ? 'active' : 'dark'} onClick={() => setIsJava(false)}>Kotlin</Button>
            </ButtonGroup>
            <div className={'java-kotlin-codeblock-container'}>
                {isJava && <CodeBlock codeText={javaCode} mode={'java'}/>}
                {!isJava && <CodeBlock codeText={kotlinCode} mode={'kotlin'}/>}
            </div>
        </div>
    );
};

JavaKotlinCodeBlock.propTypes = {
    javaCode: PropTypes.string.isRequired,
    kotlinCode: PropTypes.string.isRequired,
};

export default JavaKotlinCodeBlock;