import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Form, Input, Modal, Row, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const DetailCustomer = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const columnCoursePackage = [
    {
      title: 'Gói cước',
      render: (text, record) => {
        return null;
      },
    },
    {
      title: 'Trạng thái',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
  ];

  const columnLoginHistory = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: 'center',
    },
    {
      title: 'Thời gian',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
    {
      title: 'Thiết bị',
      render: (text, record) => {
        return null;
      },
    },
    {
      title: 'IP',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
    {
      title: 'Trình duyệt',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
    {
      title: 'Hình thức',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
  ];

  const columnStudyHistory = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: 'center',
    },
    {
      title: 'Tên khóa học',
      render: (text, record) => {
        return null;
      },
    },
    {
      title: 'Tên bài học',
      render: (text, record) => {
        return null;
      },
    },
    {
      title: 'Thời gian học cuối',
      render: (text, record) => {
        return null;
      },
    },
  ];

  const columnCompleteCourse = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: 'center',
    },
    {
      title: 'Tên khóa học',
      render: (text, record) => {
        return null;
      },
    },
    {
      title: 'Số bài học đã hoàn thành',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
    {
      title: 'Tỷ lệ hoàn thành',
      render: (text, record) => {
        return null;
      },
      align: 'center',
    },
  ];

  const handleClickChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleSubmitChangePassword = (values) => {
    console.log('values', values);
  };

  return (
    <PageContainer
      content="Tên khách hàng"
      extraContent={
        <Button type="primary" onClick={handleClickChangePassword}>
          Đổi mật khẩu
        </Button>
      }
    >
      <Card>
        <Form
          name="detail-customer"
          layout="vertical"
          initialValues={{
            fullname: 'abc',
            phone: '84937397635',
            email: '',
            date: '2020-05-09 22:09:06',
            duration: '',
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Họ và tên" name="fullname">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Điện thoại" name="phone">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Email" name="email">
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Ngày đăng ký" name="date">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Table bordered columns={columnCoursePackage} dataSource={[]} />
          <Row gutter={16}>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="Thời lượng đã học" name="duration">
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>Lịch sử truy cập</p>
        <Table bordered columns={columnLoginHistory} dataSource={[]} />
        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px', marginTop: '24px' }}>
          Lịch sử học tập
        </p>
        <Table bordered columns={columnStudyHistory} dataSource={[]} />
        <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px', marginTop: '24px' }}>
          Mức độ hoàn thành khóa học
        </p>
        <Table bordered columns={columnCompleteCourse} dataSource={[]} />
        <Row justify="center" style={{ marginTop: '24px' }}>
          <Col>
            <Button type="primary" danger>
              <Link to="/customer_manager/customer">Quay lại</Link>
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Đổi mật khẩu"
        visible={showChangePassword}
        onCancel={handleCancelChangePassword}
        footer={false}
      >
        <Form name="change-password" layout="vertical" onFinish={handleSubmitChangePassword}>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[{ required: true, message: 'Mật khẩu mới không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="password_confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Xác nhận mật khẩu mới không được để trống!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu không trùng khớp!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row gutter={8} justify="center">
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" danger onClick={handleCancelChangePassword}>
                Hủy
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default DetailCustomer;
