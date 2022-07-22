import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditPostCategory = ({ checkEdit, dataPostCategory }) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-post-category" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề"
              name="name"
              rules={[{ required: true, message: 'Tiêu đề không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link" name="link">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thứ tự hiển thị" name="position">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Loại hình" name="type">
              <Select placeholder="- Chọn hình thức -">
                <Option value={1}>Blog</Option>
                <Option value={2}>Video</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tiêu đề SEO" name="seo_title">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả SEO" name="seo_description">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Từ khóa SEO" name="seo_key">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hoạt động"
                unCheckedChildren="Ẩn"
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
              <Link to="/posts/post_category">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditPostCategory;
