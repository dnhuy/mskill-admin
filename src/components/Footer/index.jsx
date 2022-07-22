import { DefaultFooter } from '@ant-design/pro-layout';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} mobiEdu`}
      links={[
        {
          key: 'mobiEdu',
          title: 'mobiEdu',
          href: 'https://mobiedu.vn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
