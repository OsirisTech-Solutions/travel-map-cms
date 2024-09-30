import { CloseCircleOutlined, RightOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import { Button, Card, Result } from 'antd';
import { Fragment } from 'react';
import useStyles from './index.style';

export default () => {
  const { styles } = useStyles();
  const Content = (
    <Fragment>
      <div className={styles.title}>
        <span>The following errors occurred in your submission:</span>
      </div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <CloseCircleOutlined
          style={{
            marginRight: 8,
          }}
          className={styles.error_icon}
        />
        <span>Your account has been frozen</span>
        <a
          style={{
            marginLeft: 16,
          }}
        >
          <span>Unfreeze now</span>
          <RightOutlined />
        </a>
      </div>
      <div>
        <CloseCircleOutlined
          style={{
            marginRight: 8,
          }}
          className={styles.error_icon}
        />
        <span>Your account is not eligible for application</span>
        <a
          style={{
            marginLeft: 16,
          }}
        >
          <span>Upgrade now</span>
          <RightOutlined />
        </a>
      </div>
    </Fragment>
  );
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
          extra={
            <Button type="primary">
              <span>Go back and modify</span>
            </Button>
          }
          style={{
            marginTop: 48,
            marginBottom: 16,
          }}
        >
          {Content}
        </Result>
      </Card>
    </GridContent>
  );
};
