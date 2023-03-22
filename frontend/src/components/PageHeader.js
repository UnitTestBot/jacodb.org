import Heading from './Heading';

function PageHeader({ title, subTitle }) {
  return (
    <>
      <Heading h="1">{title}</Heading>
      {subTitle && <p className="lead">{subTitle}</p>}
    </>
  );
}

export default PageHeader;
