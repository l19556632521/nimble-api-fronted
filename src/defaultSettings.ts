// import { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { ProLayoutProps } from '@ant-design/pro-components';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  // 拂晓蓝
  colorPrimary: '#1677FF',
  layout: "mix",
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: true,
  splitMenus: false,
  pwa: true,
  title: '快捷Api',
  logo: 'https://alylmengbucket.oss-cn-nanjing.aliyuncs.com/pictures/202308071712802.png',
  iconfontUrl: '',
  token: {

  },
};
export default Settings;



