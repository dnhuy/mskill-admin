import { FORMAT_DATE } from '@/common/constant';
import EditorToolbar, { formats, modules } from '@/components/QuillEditor/EditorToolbar';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'umi';

const { TextArea } = Input;
const { Option } = Select;

const AddEditNotification = ({ checkEdit, dataNotification }) => {
  let contentRef;

  const [content, setContent] = useState(checkEdit ? dataNotification?.htmlContent : '');
  const [sendType, setSendType] = useState(1);

  const handleChangeContent = (content) => {
    setContent(content);
  };

  const handleChangeSendType = (value) => {
    setSendType(value);
  };

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form
        name="add-edit-notification"
        layout="vertical"
        initialValues={{
          send_type: 1,
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tiêu đề thông báo"
              name="title"
              rules={[{ required: true, message: 'Tiêu đề thông báo không được để trống!' }]}
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
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: 'Nội dung không được để trống!' }]}
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
          <Col span={24}>
            <Form.Item label="Người nhận" name="receiver">
              <Select
                mode="multiple"
                placeholder="- Chọn người nhận -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Người nhận 1</Option>
                <Option value={2}>Người nhận 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Cài đặt gửi thông báo" name="send_type">
              <Select placeholder="- Chọn cài đặt gửi thông báo -" onChange={handleChangeSendType}>
                <Option value={1}>Lên lịch</Option>
                <Option value={2}>Gửi ngay</Option>
              </Select>
            </Form.Item>
          </Col>
          {sendType === 1 && (
            <Col xs={24} md={12} lg={8}>
              <Form.Item label="Ngày gửi" name="date_time">
                <DatePicker
                  showTime
                  placeholder="Chọn ngày gửi"
                  format={FORMAT_DATE.DATE_TIME}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          )}
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
            <Button>Lưu nháp</Button>
          </Col>
          <Col>
            <Button type="primary" danger>
              <Link to="/notification_manager/notification">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditNotification;
