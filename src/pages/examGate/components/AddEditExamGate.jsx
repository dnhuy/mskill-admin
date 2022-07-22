import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { checkImageFileUpload } from '@/common/utils';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Switch,
  Upload,
} from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditExamGate = ({ checkEdit, dataExamGate }) => {
  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

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

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-exam-gate" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Tiêu đề"
              name="name"
              rules={[{ required: true, message: 'Tiêu đề không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: 'List danh mục không được để trống!' }]}
            >
              <Select
                mode="multiple"
                placeholder="- Chọn danh mục -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Danh mục 1</Option>
                <Option value={2}>Danh mục 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Lĩnh vực"
              name="exam_gate_subject"
              rules={[{ required: true, message: 'List lĩnh vực không được để trống!' }]}
            >
              <Select
                mode="multiple"
                placeholder="- Chọn lĩnh vực -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Lĩnh vực 1</Option>
                <Option value={2}>Lĩnh vực 2</Option>
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
            <Form.Item label="URL" name="url">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link chi tiết" name="link_detail">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link đăng ký ngay" name="link_register">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link luyện tập" name="link_practice">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link tra cứu kết quả" name="link_search">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hoạt động"
                unCheckedChildren="Không hoạt động"
                style={{ width: '150px' }}
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
              <Link to="/exam_gate">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditExamGate;
