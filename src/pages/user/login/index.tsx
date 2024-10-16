import { Footer } from '@/components';
import { useLoginMutation } from '@/redux/services/authApi';
import { KEYS } from '@/utils/constant';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, SelectLang, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
import { createStyles } from 'antd-style';
import Cookies from 'js-cookie';
import React from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div
      className={styles.lang}
      data-lang
    >
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const { styles } = useStyles();
  const intl = useIntl();
  const { setInitialState } = useModel('@@initialState');
  const [loginMutation] = useLoginMutation();
  const fetchUserInfo = async (values: REQUEST_DEFIND.LoginRequestBody) => {
    const res = await loginMutation({
      body: {
        username: values.username,
        password: values.password,
      },
    });
    if ('data' in res) {
      console.log('🚀 -------------------------🚀');
      console.log('🚀 ~ fetchUserInfo ~ s:', res);
      console.log('🚀 -------------------------🚀');
      flushSync(() => {
        Cookies.set(KEYS.ACCESS_TOKEN, res?.data?.data?.accessToken || '');
        setInitialState((s) => ({
          ...s,
          currentUser: {
            name: 'root',
          },
        }));
      });
      message.success('Đăng nhâp thành công');
      const urlParams = new URL(window.location.href).searchParams;
      window.location.href = urlParams.get('redirect') || '/';
    } else {
      message.error('Đăng nhập thất bại');
    }
  };

  const handleSubmit = async (values: REQUEST_DEFIND.LoginRequestBody) => {
    await fetchUserInfo(values);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Admin',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={
            <img
              alt="logo"
              src="/logo.svg"
            />
          }
          title="Đăng nhập"
          subTitle={'Chào mừng bạn đến với hệ thống quản trị'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as any);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              // placeholder={intl.formatMessage({
              //   id: 'pages.login.username.placeholder',
              //   defaultMessage: 'Username: Admin',
              // })}
              placeholder={'Username: Admin'}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.login.username.required" />,
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              // placeholder={intl.formatMessage({
              //   id: 'pages.login.password.placeholder',
              //   defaultMessage: 'Password: ant.design',
              // })}
              placeholder={'Password: ant.design'}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.login.password.required" />,
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox
              noStyle
              name="autoLogin"
            >
              <FormattedMessage
                id="pages.login.rememberMe"
                defaultMessage="自动登录"
              />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage
                id="pages.login.forgotPassword"
                defaultMessage="忘记密码"
              />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
