import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import {Button, Card, Descriptions, Form, message, Input, Spin, Divider} from 'antd';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoByIdUsingPOST,
} from '@/services/nimble-api-backend/interfaceInfoController';
import { useModel,useParams } from '@@/exports';
import { getFreeInvokeInterfaceCountUsingPOST } from '@/services/nimble-api-backend/userInterfaceInfoController';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [invokeRes, setInvokeRes] = useState<any>();
  // const [invokeRes, setInvokeRes] = useState<any>(null);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
      console.log("data:", data);
      console.log("dssd");

    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoByIdUsingPOST({
        id: params.id,
        ...values,
      });
      // // 调用成功后刷新页面
      // window.location.reload();
      setInvokeRes(res.data);  
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const getFreeInterface = async () => {
    setInvokeLoading(true);
    try {
      const res = await getFreeInvokeInterfaceCountUsingPOST({
        userId: loginUser?.id,
        interfaceInfoId: data?.id,
      });
      if (res.data) {
        message.success('获取调用次数成功');
      } else {
        message.error('获取失败请重试');
      }
    } catch (e:any) {
      message.error(e.message);
    }
    setInvokeLoading(false);
    loadData();
    return
  };
  return (
    <PageContainer title="快捷API在线调用平台">
      <Card>
        {data ? (
          <Descriptions 
              title={data.name} column={1} 
              extra={
                <Button onClick={getFreeInterface}>获取次数</Button>
              }    
          >
            <Descriptions.Item label="接口状态">{data.status ? '上线中' : '已下线'}</Descriptions.Item>
            <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="接口剩余调用次数">{data.availablePieces}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" 
          //  initialValues={{
          //   userRequestParams: data?.id === 1 ? 'JSON.stringify({"name": "yupi"})' : ""
          // }}
            onFinish={onFinish}>
            {/* initialValues={{userRequestParams:data?.parameterExample}} */}
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
