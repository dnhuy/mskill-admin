import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { checkImageFileUpload } from '@/common/utils';
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Switch, Upload } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const { TextArea } = Input;

const AddEditPackageSolution = ({ checkEdit, dataPackageSolution }) => {
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
      <Form name="add-edit-package-solution" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên gói"
              name="name"
              rules={[{ required: true, message: 'Tên gói không được để trống!' }]}
            >
              <Input placeholder="Nhập tên gói" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tên hiển thị" name="name_display">
              <Input placeholder="Nhập tên hiển thị" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả gói" name="description">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ảnh đại diện">
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
              label="Vị trí hiển thị"
              name="position"
              rules={[{ required: true, message: 'Vị trí hiển thị không được để trống!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hiển thị"
                unCheckedChildren="Ẩn"
                style={{ width: '120px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ưu tiên">
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
              <Link to="/solution_manager/package_solution">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditPackageSolution;
