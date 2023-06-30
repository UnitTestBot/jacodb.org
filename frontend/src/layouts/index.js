import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import * as React from 'react';

import NavMain from '../components/NavMain';
import Heading from '../components/Heading';
import CodeBlock from '../components/CodeBlock';
import LinkedHeading from '../components/LinkedHeading';
import PageHeader from '../components/PageHeader';
import SEO from '../seo';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Table from "react-bootstrap/Table";

const getMode = (className = '') => {
  const [, mode] = className.match(/language-(\w+)/) || [];
  return mode;
};

const components = {
  wrapper: (props) => <React.Fragment {...props} />,
  h1: (props) => <Heading h="1" {...props} />,
  h2: (props) => <LinkedHeading h="2" {...props} />,
  h3: (props) => <LinkedHeading h="3" {...props} />,
  h4: (props) => <LinkedHeading h="4" {...props} />,
  h5: (props) => <LinkedHeading h="5" {...props} />,
  table: (props) => <Table striped bordered hover {...props}/>,
  pre: (props) =>
    React.isValidElement(props.children) ? (
      <CodeBlock
        codeText={props.children.props.children}
        mode={getMode(props.children.props.className)}
      />
    ) : (
      <pre {...props} />
    ),
  PageHeader,
};

const propTypes = {
  location: PropTypes.object.isRequired,
};

function DefaultLayout({ children, location }) {
  return (
    /* Change dir to "rtl" for RTL dev */
    <ThemeProvider dir="ltr">
      <div>
        <SEO pathname={location.pathname} />
        <NavMain activePage={location.pathname} />
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
    </ThemeProvider>
  );
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;
