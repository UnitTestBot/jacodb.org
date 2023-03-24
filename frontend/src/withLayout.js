import ApiLayout from './layouts/ApiLayout';
import DefaultLayout from './layouts';

export default function withLayout(Component) {
  return (props) => {
    const { pathname } = props.location;
    let Layout = DefaultLayout;
    if (
      pathname.startsWith('/getting-started') ||
      pathname.startsWith('/api-ref')
    ) {
      Layout = ApiLayout;
    }

    return (
      <Layout location={props.location}>
        <Component {...props} />
      </Layout>
    );
  };
}
