import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons/faGithub';
import pkg from "../../package.json";
import SearchBar from "./SearchBar";


const NAV_LINKS = [
    {
        link: '/',
        title: 'Overview',
        exact: true,
        style: {
            color: '#ffc107',
            fontWeight: 600
        }
    },
    {
        link: '/documentation/installation',
        title: 'Documentation',
    },
    {
        link: '/usage-examples/type-solving',
        title: 'Usage Examples',
    },
    {
        link: '/about/about-the-project',
        title: 'About',
    },
];

const propTypes = {
    activePage: PropTypes.string,
};

function NavMain({activePage}) {
    return (
        <>
            <Navbar bg="dark" expand="lg" sticky={'top'}>
                <Container>
                    <Navbar.Toggle className={"styled-header-toggler"} aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {NAV_LINKS.map(({link, title, exact, style}) => (
                                <Nav.Link
                                    className={"styled-nav-link"}
                                    key={link}
                                    href={link}
                                    active={
                                        exact ? activePage === link : activePage.startsWith(link)
                                    }
                                    style={style}
                                >
                                    {title}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <SearchBar/>
                        <OverlayTrigger
                            placement="bottom"
                            delay={{show: 200}}
                            overlay={<Tooltip id="t-github">Github</Tooltip>}
                        >
                            <Nav.Link
                                href={`https://github.com/UnitTestBot/jacodb/releases/tag/v${pkg.version}`}
                                target="_blank"
                                className={"styled-nav-link version-number-link"}
                                rel="noopener noreferrer"
                            >
                                <span className={"version-number"}>Version: {pkg.version}</span>
                                <FontAwesomeIcon icon={faGithub} size="lg"/>
                                <span className="visually-hidden">Github</span>
                            </Nav.Link>
                        </OverlayTrigger>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

NavMain.propTypes = propTypes;

export default NavMain;
