import { DocSearch } from '@docsearch/react';
import startCase from 'lodash/startCase';
import classNames from 'classnames';
import * as React from 'react';
import Nav from 'react-bootstrap/Nav';

import styled from 'astroturf';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const MenuButton = styled(Button).attrs({ variant: 'link' })`
  composes: p-0 d-md-none ms-3 from global;

  line-height: 1;
  color: #212529;
`;

const SidePanel = styled('div')`
  @import '../css/theme';

  $top: 4rem;

  composes: d-flex flex-column from global;

  background-color: #f7f7f7;

  @include media-breakpoint-up(md) {
    position: sticky;
    top: $top;
    z-index: 1000;
    height: calc(100vh - #{$top});
    background-color: #f7f7f7;
    border-right: 1px solid $divider;
  }

  & > * + * {
    border-top: 1px solid $divider;
  }
`;

const OverflowWrapper = styled('div')`
  @import '../css/theme';

  @include media-breakpoint-up(md) {
    display: flex !important;
    height: 100% !important;
    flex-direction: column;
    max-height: calc(100vh - 8.5rem);
  }
`;

const TableOfContents = styled(Nav)`
  @import '../css/theme';

  composes: pt-2 pb-4 flex-column from global;

  @include media-breakpoint-up(md) {
    height: 100% !important;
    overflow: auto;
    margin-right: -15px;
    padding-right: calc(15px + 1rem);
    flex-wrap: nowrap;
  }
`;

const TocLink = styled(Nav.Link)`
  @import '../css/theme';

  &.active,
  &:global(.active) {
    font-weight: 500;
    color: $text !important;
  }

  &.active {
    margin-top: 1rem;

    & + * {
      margin-bottom: 1rem;
    }
  }

  &,
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: transparentize($text, 0.25);
    transition: color 0.2s ease-out;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: $subtle-on-dark;
  }
`;

const TocSubLink = styled(TocLink)`
  font-size: 90%;
  padding-top: 0.25rem;
`;

const documentation = [
  'installation',
  'basic-usage',
  'database-features',
  'classpath-features',
  'instructions',
  'graphs',
  'migration',
  '/docs/index.html'
];

const usageExamples = [
  'type-solving',
  'approximations',
  'symbolic-execution',
  'ifds'
];

const about = [
  'about-the-project',
  'benchmarking',
  '/swagger-ui/index.html'
];

const nameOverrides = {
  'types-classes': 'Types and Classes',
  'instructions-and-graphs': 'Instructions and Graphs',
  'ifds': 'IFDS',
  '/docs/index.html': {absolute: true, name: 'API Reference'},
  'about-the-project': 'About the Project',
  '/swagger-ui/index.html': {absolute: true, name: 'Testing API'},
};

function NavSection({ heading, location: { pathname }, items, path }) {
  let active = pathname.startsWith(path);
  return (
    <>
      <TocLink
        active={active}
        href={items ? `${path}/${items[0]}/` : `${path}/`}
        className={classNames(
          'js-search-toc-item',
          active && 'js-search-active',
        )}
      >
        {heading}
      </TocLink>

      {items && (
        <Nav activeKey={pathname} onSelect={() => {}} className="d-block child-nav-item">
          {items.map((name) => {
            const override = nameOverrides[name];
            const absolute = (override || {}).absolute;
            const overrideName = (override || {}).name || override;
            const targetPath = absolute ? name : `${path}/${name}/`;
            return (
                <Nav.Item key={`${path}/${name}/`}>
                  <TocSubLink href={targetPath}>
                    {overrideName || startCase(name.toLowerCase())}
                  </TocSubLink>
                </Nav.Item>
            )
          })}
        </Nav>
      )}
    </>
  );
}

class SideNav extends React.Component {
  state = { collapsed: false };

  handleCollapse = () => {
    this.setState((s) => ({ collapsed: !s.collapsed }));
  };

  render() {
    const { location, ...props } = this.props;
    return (
      <SidePanel {...props}>
        <Collapse in={this.state.collapsed}>
          <OverflowWrapper>
            <TableOfContents role="complementary">
              <NavSection
                  heading="Documentation"
                  path="/documentation"
                  location={location}
                  items={documentation}
              />
              <NavSection
                heading="Usage Examples"
                path="/usage-examples"
                location={location}
                items={usageExamples}
              />
              <NavSection
                heading="About"
                path="/about"
                location={location}
                items={about}
              />

            </TableOfContents>
          </OverflowWrapper>
        </Collapse>
      </SidePanel>
    );
  }
}

export default SideNav;
