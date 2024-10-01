import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Osiris Team"
      links={[
        {
          key: 'Osiris Tech Solutions',
          title: 'Osiris Tech Solutions',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/OsirisTech-Solutions',
          blankTarget: true,
        },
        {
          key: 'Osiris Tech',
          title: 'Osiris Tech',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
