import { DingdingOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Result, Steps } from 'antd';
import { Fragment } from 'react';
import useStyles from './index.style';

const { Step } = Steps;

export default () => {
  const { styles } = useStyles();
  const desc1 = (
    <div className={styles.title}>
      <div
        style={{
          margin: '8px 0 4px',
        }}
      >
        <span>Lily Qu</span>
        <DingdingOutlined
          style={{
            marginLeft: 8,
            color: '#00A0E9',
          }}
        />
      </div>
      <div>2016-12-12 12:32</div>
    </div>
  );
  const desc2 = (
    <div
      style={{
        fontSize: 12,
      }}
      className={styles.title}
    >
      <div
        style={{
          margin: '8px 0 4px',
        }}
      >
        <span>Mao Mao Zhou</span>
        <a href="">
          <DingdingOutlined
            style={{
              color: '#00A0E9',
              marginLeft: 8,
            }}
          />
          <span>Remind</span>
        </a>
      </div>
    </div>
  );
  const content = (
    <>
      <Descriptions title="Project Name">
        <Descriptions.Item label="Project ID">23421</Descriptions.Item>
        <Descriptions.Item label="Owner">Lily Qu</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2016-12-12 ~ 2017-12-12</Descriptions.Item>
      </Descriptions>
      <br />
      <Steps progressDot current={1}>
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              Create Project
            </span>
          }
          description={desc1}
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              Department Review
            </span>
          }
          description={desc2}
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              Financial Review
            </span>
          }
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              Complete
            </span>
          }
        />
      </Steps>
    </>
  );
  const extra = (
    <Fragment>
      <Button type="primary">Back to List</Button>
      <Button>View Project</Button>
      <Button>Print</Button>
    </Fragment>
  );
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="success"
          title="Submission Successful"
          subTitle="The submission result page is used to provide feedback on the processing results of a series of operation tasks. If it is a simple operation, use the Message global prompt for feedback. This text area can display simple supplementary explanations. If there is a requirement to display 'documents' or similar, the gray area below can present more complex content."
          extra={extra}
          style={{
            marginBottom: 16,
          }}
        >
          {content}
        </Result>
      </Card>
    </GridContent>
  );
};
