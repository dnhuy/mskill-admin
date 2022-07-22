import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { FORMAT_DATE } from '@/common/constant';
import { checkImageFileUpload } from '@/common/utils';
import EditorToolbar, { formats, modules } from '@/components/QuillEditor/EditorToolbar';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Switch,
  Upload,
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditPost = ({ checkEdit, dataPost }) => {
  let contentRef;

  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [content, setContent] = useState(checkEdit ? dataPost?.htmlContent : '');

  const handleBeforeUpload = (file) => {
    if (!checkImageFileUpload(file)) {
      message.error(`${file.name} không đúng định dạng!`);
    }
    return checkImageFileUpload(file) ? true : Upload.LIST_IGNORE;
  };

  const customRequestImage = (options) => {
    const file = fileListImage[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setImageUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeImage = (info) => {
    setFileListImage(info.fileList);
  };

  const handleRemoveImage = () => {
    setFileListImage([]);
    setImageUrl();
  };

  const handleChangeContent = (content) => {
    setContent(content);
  };

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form
        name="add-edit-post"
        layout="vertical"
        initialValues={{
          from_date: moment(new Date(), FORMAT_DATE.DATE_TIME),
        }}
        onFinish={handleSubmit}
      >
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
            <Form.Item label="Chuyên mục" name="category">
              <Select
                placeholder="- Chọn chuyên mục -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Chuyên mục 1</Option>
                <Option value={2}>Chuyên mục 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Thời gian đọc"
              name="time"
              rules={[{ required: true, message: 'Thời gian đọc không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item
              label="Gắn thẻ"
              name="tag"
              rules={[{ required: true, message: 'Tag không được để trống!' }]}
            >
              <Select
                mode="multiple"
                placeholder="- Chọn thẻ -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Tag 1</Option>
                <Option value={2}>Tag 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Hình ảnh">
              <Upload
                listType="picture-card"
                fileList={fileListImage}
                maxCount={1}
                customRequest={customRequestImage}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeImage}
                onRemove={handleRemoveImage}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Tóm tắt nội dung"
              name="content_summary"
              rules={[{ required: true, message: 'Tóm tắt nội dung không được để trống!' }]}
            >
              <TextArea rows={3} />
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
          <Col xs={24} md={12}>
            <Form.Item label="Xuất bản từ ngày" name="from_date">
              <DatePicker
                showTime
                placeholder="Chọn ngày xuất bản"
                format={FORMAT_DATE.DATE_TIME}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Xuất bản đến ngày" name="to_date">
              <DatePicker
                showTime
                placeholder="Chọn ngày kết thúc"
                format={FORMAT_DATE.DATE_TIME}
                style={{ width: '100%' }}
              />
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
          <Col xs={24} md={12}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hoạt động"
                unCheckedChildren="Ẩn"
                style={{ width: '120px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Nổi bật">
              <Switch checkedChildren="Ưu tiên" unCheckedChildren="Ẩn" style={{ width: '120px' }} />
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
              <Link to="/posts/post">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditPost;
