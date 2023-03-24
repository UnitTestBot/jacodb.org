import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'astroturf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

// const Banner = styled(Navbar).attrs({
//   as: 'header',
//   variant: 'dark',
//   role: 'banner',
// })`
//   @import '../css/theme.scss';ø

//   composes: text-light justify-content-center from global;
//   min-height: 4rem;
//   background-color: $darker;
//   filter: none;
//   -webkit-filter: none;

//   a {
//     margin-left: 1em;
//     color: $brand;
//   }

//   @include media-breakpoint-up(md) {
//     z-index: 1040;
//   }
// `;

const StyledNavbar = styled(Navbar).attrs({
  as: 'header',
  variant: 'dark',
  role: 'banner',
})`
  @import '../css/theme.scss';

  min-height: 4rem;
  background-color: $darker;
  z-index: 1;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: 0rem;
    z-index: 1040;
  }
`;

const SkipToContentLink = styled('a')`
  composes: visually-hidden visually-hidden-focusable bg-primary text-white px-4 py-2 me-2 from global;
`;

const StyledNavLink = styled(Nav.Link)`
  @import '../css/theme.scss';

  & + & {
    margin-left: $spacer;
  }

  &:global(.active) {
    font-width: 700;
  }
`;

const StyledDropdown = styled(Dropdown)`
  @import '../css/theme.scss';

  margin-right: $spacer;
`;

const NAV_LINKS = [
  {
    link: '/',
    title: 'Home',
    exact: true,
  },
  {
    link: '/getting-started/introduction',
    title: 'Getting Started',
  },
  {
    link: '/api-ref/api-reference',
    title: 'Documentation',
  },
  {
    link: '/swagger-ui/index.html',
    title: 'Demo',
  },
];

const propTypes = {
  activePage: PropTypes.string,
};

function NavMain({ activePage }) {
  return (
    <>
      <StyledNavbar expand collapseOnSelect>
        <Container fluid>
          <SkipToContentLink href="#rb-docs-content" tabIndex="0">
            Skip to content
          </SkipToContentLink>

          <Nav role="navigation" id="top" className="d-none d-md-flex">
            {NAV_LINKS.map(({ link, title, exact }) => (
              <StyledNavLink
                key={link}
                href={link}
                active={
                  exact ? activePage === link : activePage.startsWith(link)
                }
              >
                {title}
              </StyledNavLink>
            ))}
          </Nav>
          <Nav className="ms-auto pe-md-5">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 200 }}
              overlay={<Tooltip id="t-github">Github</Tooltip>}
            >
              <StyledNavLink
                href="https://github.com/UnitTestBot/jacodb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
                <span className="visually-hidden">Github</span>
              </StyledNavLink>
            </OverlayTrigger>
          </Nav>
        </Container>
      </StyledNavbar>
    </>
  );
}

NavMain.propTypes = propTypes;

export default NavMain;