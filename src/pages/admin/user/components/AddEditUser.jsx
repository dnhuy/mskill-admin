import { Button, Card, Col, Form, Input, Row, Select, Switch } from 'antd';
import { Link } from 'umi';

const { Option } = Select;

const AddEditUser = ({ checkEdit, dataUser }) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-user" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên đăng nhập"
              name="name"
              rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Họ tên"
              name="fullname"
              rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="E-mail" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Điện thoại" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Quyền" name="role">
              <Select
                placeholder="- Chọn quyền -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Quyền 1</Option>
                <Option value={2}>Quyền 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mật khẩu" name="password">
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="password_confirm"
              dependencies={['password']}
              rules={[
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
          </Col>
          <Col xs={24}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hoạt động"
                unCheckedChildren="Chặn"
                style={{ width: '120px' }}
              />
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
              <Link to="/admin/user">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditUser;
