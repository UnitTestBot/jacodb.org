import PropTypes from 'prop-types';

import Main from '../components/Main';
import Default from './index';
import PageFooter from "../components/PageFooter";
import * as React from "react";

const propTypes = {
  location: PropTypes.object.isRequired,
};

function ComponentsLayout({ children, ...props }) {
  return (
    <Default {...props}>
      <Main location={props.location}>{children}</Main>
      <PageFooter />
    </Default>
  );
}

ComponentsLayout.propTypes = propTypes;

export default ComponentsLayout;
