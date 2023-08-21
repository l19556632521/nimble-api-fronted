import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
const Footer: React.FC = () => {
  const defaultMessage = '快捷API，让编程变得轻松';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '快捷API接口平台',
          title: '快捷API',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/l19556632521/nimble-api-backend.git',
          blankTarget: true,
        },
        {
          key: '接口文档',
          title: 'Open API',
          href: 'http://localhost:8000/umi/plugin/openapi',
          blankTarget: true,
        },
        // 添加备案信息链接
        {
          key: '备案信息',
          title: '皖ICP备2023009937号-1',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
