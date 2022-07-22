import EditorToolbar, { formats, modules } from '@/components/QuillEditor/EditorToolbar';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'umi';

const { Option } = Select;

const AddEditFaqQuestion = ({ checkEdit, dataFaqQuestion }) => {
  let contentRef;

  const [content, setContent] = useState(checkEdit ? dataPost?.htmlContent : '');

  const handleChangeContent = (content) => {
    setContent(content);
  };

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-faq-tutorial" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Nội dung câu hỏi"
              name="name"
              rules={[{ required: true, message: 'Nội dung câu hỏi không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Danh mục" name="category">
              <Select
                placeholder="- Chọn danh mục -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Danh mục 1</Option>
                <Option value={2}>Danh mục 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Vị trí hiển thị"
              name="position"
              rules={[{ required: true, message: 'Vị trí hiển thị không được để trống!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Nội dung câu trả lời"
              name="content"
              rules={[{ required: true, message: 'Nội dung câu trả lời không được để trống!' }]}
            >
              <div className="text-editor">
                <EditorToolbar id="content" />
                <ReactQuill
                  theme="snow"
                  ref={(el) => {
                    contentRef = el;
                  }}
                  modules={modules(contentRef, 'content')}
                  formats={formats}
                  value={content}
                  onChange={handleChangeContent}
                />
              </div>
            </Form.Item>
          </Col>
          <Col xs={24}>
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
              <Link to="/support/faq/faq_question">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditFaqQuestion;
