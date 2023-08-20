import Footer from '@/components/Footer';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  LoginFormPage,
  ProFormCheckbox,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
// const { initialState, setInitialState } = useModel('@@initialState');
import { Alert, message, Tabs } from 'antd';
import React, { useRef,useState } from 'react';
import logo from '../../../../public/icons/program.png';
import { userLoginUsingPOST,userRegisterUsingPOST } from '@/services/nimble-api-backend/userController';
import { flushSync } from 'react-dom';

type LoginType = 'account' | 'register' ;

const pandaBackImg = "https://alylmengbucket.oss-cn-nanjing.aliyuncs.com/pictures/202308091940067.jpg";
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [LoginType, setLoginType] = useState<LoginType>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();

  const fetchUserInfo =  (userInfo: API.UserVO) => {
    if (userInfo) {
      flushSync(() => {
        //设置用户登录信息到全局对象中去
        setInitialState({loginUser: userInfo});
      });
    }
  };

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword} = values;
    if (checkPassword) {
        // 注册
        if (userPassword !== checkPassword) {
            message.error('两次输入密码不一致！');
            return;
        }
        const res = await userRegisterUsingPOST(values);
        if (res.code === 0) {
            // 注册成功
            const defaultRegisterSuccessMessage = '注册成功！';
            message.success(defaultRegisterSuccessMessage)
            // 切换到登录
            setLoginType('account');
            // 重置表单
            formRef.current?.resetFields();
        }

    } else {
        try{
            // 登录
            const res = await userLoginUsingPOST({
                ...values,
            });
            // 如果登录成功（响应有数据）
            if (res.data) {
                // 获取当前URL的查询参数
                const urlParams = new URL(window.location.href).searchParams;
                
                fetchUserInfo(res.data);
                // 设置一个延迟100毫秒的定时器
                // 定时器触发后，导航到重定向URL，如果没有重定向URL，则导航到根路径
                history.push(urlParams.get('redirect') || '/');
                // setTimeout(() => {
                //     history.push(urlParams.get('redirect') || '/');
                //     // 重定向到 redirect 参数所在的位置
                //     // location.href = urlParams.get('redirect') || '/';
                // }, 100);
                //更新全局状态，设置登录用户的信息
                // setInitialState({
                //     loginUser: res.data
                // });
                console.log('url=' + urlParams);
                console.log('url=' + urlParams.get('redirect'));
                console.log('登录成功 loginuser=', res.data);
                return;
            }
            // 如果抛出异常
            } catch (error) {
            // 定义默认的登录失败消息
            const defaultLoginFailureMessage = '登录失败，请重试！';
            // 在控制台打印出错误
            console.log(error);
            // 使用 message 组件显示错误信息
            message.error(defaultLoginFailureMessage);
            }
        }
    }
// };

return (
  <div>
      <div
          style={{
              backgroundColor: 'white',
              height: 'calc(100vh - 100px)',
              margin: 0,
          }}
      >
          <LoginFormPage
              backgroundImageUrl={pandaBackImg}
              logo={logo}
              title="Nimble Free API"
              subTitle="快捷API接口平台"
              initialValues={{
                  autoLogin: true,
              }}
              onFinish={async (values) => {
                  await handleSubmit(values as API.UserRegisterRequest);
              }}
          >
              {
                  <Tabs
                      centered
                      activeKey={LoginType}
                      onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                  >
                      <Tabs.TabPane key={'account'} tab={'登录'}/>
                      <Tabs.TabPane key={'register'} tab={'注册'}/>
                  </Tabs>
              }
              {LoginType === 'account' && (
                  <>
                      <ProFormText
                          name="userAccount"
                          fieldProps={{
                              size: 'large',
                              prefix: <UserOutlined/>,
                          }}
                          placeholder={'请输入用户名'}
                          rules={[
                              {
                                  required: true,
                                  message: '用户名是必填项！',
                              },
                          ]}
                      />
                      <ProFormText.Password
                          name="userPassword"
                          fieldProps={{
                              size: 'large',
                              prefix: <LockOutlined/>,
                          }}
                          placeholder={'请输入密码'}
                          rules={[
                              {
                                  required: true,
                                  message: '密码是必填项！',
                              },
                          ]}
                      />
                       <div
                          style={{
                              marginBottom: 24,
                          }}
                      >
                          <ProFormCheckbox noStyle name="autoLogin">
                              自动登录
                          </ProFormCheckbox>
                      </div>
                  </>
              )}
              {LoginType === 'register' && (
                  <>
                      <ProFormText
                          fieldProps={{
                              size: 'large',
                              prefix: <UserOutlined/>,
                          }}
                          name="userAccount"
                          placeholder={'请输入用户名'}
                          rules={[
                              {
                                  required: true,
                                  message: '用户名是必填项！',
                              },
                              {
                                  min: 4,
                                  message: '长度不能少于4位！',
                              },
                          ]}
                      />
                      <ProFormText.Password
                          fieldProps={{
                              size: 'large',
                              prefix: <LockOutlined/>,
                          }}
                          name="userPassword"
                          placeholder={'请输入密码'}
                          rules={[
                              {
                                  required: true,
                                  message: '密码是必填项！',
                              },
                              {
                                  min: 8,
                                  message: '长度不能少于8位！',
                              },
                          ]}
                      />
                      <ProFormText.Password
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined/>,
                        }}
                        name="checkPassword"
                        placeholder={'请再次输入密码'}
                        rules={[
                            {
                                required: true,
                                message: '密码是必填项！',
                            },
                            {
                                min: 8,
                                message: '长度不能少于8位！',
                            },
                        ]}
                    />
                  </>
              )}
          </LoginFormPage>
      </div>
      <Footer/>
  </div>
);
};
export default Login;


