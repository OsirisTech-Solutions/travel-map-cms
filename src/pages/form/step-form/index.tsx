import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Alert, Button, Card, Descriptions, Divider, Result, Statistic } from 'antd';
import React, { useRef, useState } from 'react';
import type { StepDataType } from './data.d';
import useStyles from './style.style';
const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="Payer Account"> {payAccount}</Descriptions.Item>
      <Descriptions.Item label="Receiver Account"> {receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="Receiver Name"> {receiverName}</Descriptions.Item>
      <Descriptions.Item label="Transfer Amount">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              Yuan
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};
const StepResult: React.FC<{
  onFinish: () => Promise<void>;
  children?: React.ReactNode;
}> = (props) => {
  const { styles } = useStyles();
  return (
    <Result
      status="success"
      title="Operation Successful"
      subTitle="Expected to arrive within two hours"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            Transfer Again
          </Button>
          <Button>View Bill</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};
const StepForm: React.FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();
  return (
    <PageContainer content="Divide a long or unfamiliar form task into multiple steps to guide users to complete it.">
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={formRef}
            title="Fill in Transfer Information"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="Payer Account"
              width="md"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: 'Please select the payer account',
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            <ProForm.Group title="Receiver Account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: 'Please select the receiver account',
                  },
                ]}
                valueEnum={{
                  alipay: 'Alipay',
                  bank: 'Bank Account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the receiver account',
                  },
                  {
                    type: 'email',
                    message: 'Account name should be in email format',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <ProFormText
              label="Receiver Name"
              width="md"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: 'Please enter the receiver name',
                },
              ]}
              placeholder="Please enter the receiver name"
            />
            <ProFormDigit
              label="Transfer Amount"
              name="amount"
              width="md"
              rules={[
                {
                  required: true,
                  message: 'Please enter the transfer amount',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'Please enter a valid amount',
                },
              ]}
              placeholder="Please enter the amount"
              fieldProps={{
                prefix: '￥',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="Confirm Transfer Information">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="After confirming the transfer, the funds will be directly deposited into the recipient's account and cannot be refunded."
                style={{
                  marginBottom: 24,
                }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
              <ProFormText.Password
                label="Payment Password"
                width="md"
                name="password"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'Payment password is required for payment',
                  },
                ]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Complete">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider
          style={{
            margin: '40px 0 24px',
          }}
        />
        <div>
          <h3>Instructions</h3>
          <h4>Transfer to Alipay Account</h4>
          <p>
            If necessary, you can put some common questions about the product here. If necessary,
            you can put some common questions about the product here. If necessary, you can put some
            common questions about the product here.
          </p>
          <h4>Transfer to Bank Account</h4>
          <p>
            If necessary, you can put some common questions about the product here. If necessary,
            you can put some common questions about the product here. If necessary, you can put some
            common questions about the product here.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};
export default StepForm;
