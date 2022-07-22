import { Button, Card, Col, Form, Input, Row, Select, Switch } from 'antd';
import { Link } from 'umi';

const { TextArea } = Input;
const { Option } = Select;

const AddEditRole = ({ checkEdit, dataRole }) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-role" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên quyền"
              name="name"
              rules={[{ required: true, message: 'Tên quyền không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Danh sách quyền" name="role_list">
              <Select
                mode="multiple"
                placeholder="- Chọn danh sách quyền -"
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
              <Link to="/admin/role">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditRole;
