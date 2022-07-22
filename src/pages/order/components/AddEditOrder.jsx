import { formatNumberVietnamese } from '@/common/utils';
import { Button, Card, Col, Form, Input, message, Popconfirm, Row, Select, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditOrder = ({ checkEdit, dataOrder }) => {
  const [formOrder] = Form.useForm();

  const [dataSourceCourse, setDataSourceCourse] = useState([]);

  const columnCourse = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
      align: 'center',
      width: 60,
    },
    {
      title: 'Tên khóa học',
      render: (text, record) => {
        return <div style={{ textAlign: 'left' }}>{record.name_course}</div>;
      },
      align: 'center',
    },
    {
      title: 'Đơn giá',
      render: (text, record) => {
        return <div>{formatNumberVietnamese(record.price)}</div>;
      },
      align: 'center',
    },
    {
      title: 'Giảm giá',
      render: (text, record) => {
        return <div>{formatNumberVietnamese(record.discount)}</div>;
      },
      align: 'center',
    },
    {
      title: 'Thành tiền',
      render: (text, record) => {
        return <div>{formatNumberVietnamese(record.price - record.discount)}</div>;
      },
      align: 'center',
    },
    {
      title: 'Thao tác',
      render: (text, record) => {
        return (
          <Popconfirm
            title={<div style={{ width: 'max-content' }}>Xác nhận xóa khóa học!</div>}
            onConfirm={() => handleDeleteCourse(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button size="small" type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        );
      },
      align: 'center',
      width: 100,
    },
  ];

  const handleDeleteCourse = (record) => {
    const temp = dataSourceCourse.filter((c) => c.course_id !== record.course_id);
    setDataSourceCourse(temp);
  };

  const handleClickAddCourse = () => {
    const courseId = formOrder.getFieldValue('course');
    if (typeof courseId === 'undefined') {
      message.error('Chưa chọn khóa học!');
    } else if (dataSourceCourse.find((c) => c.course_id === courseId)) {
      message.error('Khóa học đã được chọn!');
    } else {
      dataSourceCourse.unshift({
        key: courseId,
        course_id: courseId,
        name_course: `Khóa học ${courseId}`,
        price: courseId * 1000000,
        discount: courseId * 100000,
      });
      setDataSourceCourse([...dataSourceCourse]);
      formOrder.resetFields(['category', 'course']);
    }
  };

  const handleSubmitFailed = (values) => {
    message.error(values.errorFields[0].errors[0]);
  };

  const handleSubmit = (values) => {
    if (dataSourceCourse.length < 1) {
      message.error('Chưa có sản phẩm!');
    }
    console.log('values', values);
  };

  return (
    <Card>
      <Form
        name="add-edit-order"
        layout="vertical"
        form={formOrder}
        onFinish={handleSubmit}
        onFinishFailed={handleSubmitFailed}
      >
        <Row>
          <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>
            Thông tin khách hàng
          </p>
        </Row>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label="Khách hàng" name="customer">
              <Select
                placeholder="- Chọn khách hàng -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Khách hàng 1</Option>
                <Option value={2}>Khách hàng 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label="Họ và tên"
              name="fullname"
              rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Điện thoại không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="E-mail" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Mã giảm giá" name="coupon_code">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>
            Chi tiết đơn hàng
          </p>
        </Row>
        <Row gutter={32}>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Chuyên mục" name="category">
              <Select
                placeholder="- Chọn chuyên mục -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Chuyên mục 1</Option>
                <Option value={2}>Chuyên mục 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={12}>
            <Form.Item label="Khóa học" name="course">
              <Select
                placeholder="- Chọn khóa học -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Khóa học 1</Option>
                <Option value={2}>Khóa học 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6} style={{ display: 'flex', alignItems: 'end' }}>
            <Form.Item style={{ width: '100%' }}>
              <Button type="primary" style={{ width: '100%' }} onClick={handleClickAddCourse}>
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Table bordered columns={columnCourse} dataSource={dataSourceCourse} />
        <Row>
          <p style={{ fontSize: '18px', fontWeight: 500, marginTop: '24px', marginBottom: '12px' }}>
            Thông tin thanh toán
          </p>
        </Row>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label="Hình thức thanh toán" name="payment_method">
              <Select
                placeholder="- Chọn hình thức thanh toán -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Online</Option>
                <Option value={2}>CoD</Option>
                <Option value={3}>SMS</Option>
                <Option value={4}>Chuyển khoản ngân hàng</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Kênh thanh toán" name="payment">
              <Select
                placeholder="- Chọn kênh thanh toán -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>VMS</Option>
                <Option value={2}>Chuyển khoản</Option>
                <Option value={3}>CoD</Option>
                <Option value={4}>OnePay</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Trạng thái thanh toán" name="payment_status">
              <Select placeholder="- Chọn trạng thái thanh toán -">
                <Option value={1}>Chưa thanh toán</Option>
                <Option value={2}>Đã thanh toán</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>Thông tin khác</p>
        </Row>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label="Ghi chú đơn hàng" name="note">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8} justify="center">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" danger>
              <Link to="/order">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditOrder;
