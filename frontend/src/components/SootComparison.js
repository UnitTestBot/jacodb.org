import PropTypes from "prop-types";
import CodeBlock from "./CodeBlock";
import {ButtonGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";

const SootComparison = ({sootCode, javaCode, kotlinCode, ...props}) => {
    const [selected, setSelected] = useState('soot');
    const isSoot = selected === 'soot';
    const isJava = selected === 'java';
    const isKotlin = selected === 'kotlin';
    return (
        <div>
            <ButtonGroup>
                <Button variant={!isSoot ? 'active' : 'dark'} onClick={() => setSelected('soot')}>Soot</Button>
                <Button variant={!isJava ? 'active' : 'dark'} onClick={() => setSelected('java')}>JacoDB (Java)</Button>
                <Button variant={!isKotlin ? 'active' : 'dark'} onClick={() => setSelected('kotlin')}>JacoDB (Kotlin)</Button>
            </ButtonGroup>
            <div className={'java-kotlin-codeblock-container'}>
                {isSoot && <CodeBlock codeText={sootCode} mode={'java'}/>}
                {isJava && <CodeBlock codeText={javaCode} mode={'java'}/>}
                {isKotlin && <CodeBlock codeText={kotlinCode} mode={'kotlin'}/>}
            </div>
        </div>
    );
};

SootComparison.propTypes = {
    sootCode: PropTypes.string.isRequired,
    javaCode: PropTypes.string.isRequired,
    kotlinCode: PropTypes.string.isRequired,
};

export default SootComparison;