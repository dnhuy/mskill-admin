import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { checkImageFileUpload } from '@/common/utils';
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Switch, Upload } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const { TextArea } = Input;

const AddEditCourseSubject = ({ checkEdit, dataCourseSubject }) => {
  const [fileListIcon, setFileListIcon] = useState([]);
  const [iconUrl, setIconUrl] = useState([]);
  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleBeforeUpload = (file) => {
    if (!checkImageFileUpload(file)) {
      message.error(`${file.name} không đúng định dạng!`);
    }
    return checkImageFileUpload(file) ? true : Upload.LIST_IGNORE;
  };

  const customRequestIcon = (options) => {
    const file = fileListIcon[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setIconUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeIcon = (info) => {
    setFileListIcon(info.fileList);
  };

  const handleRemoveIcon = () => {
    setFileListIcon([]);
    setIconUrl();
  };

  const customRequestImage = (options) => {
    const file = setFileListImage[0];
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
      <Form name="add-edit-course-subject" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên chủ đề"
              name="name"
              rules={[{ required: true, message: 'Tên chủ đề không được để trống!' }]}
            >
              <Input placeholder="Nhập tên chủ đề" />
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
            <Form.Item label="Icon">
              <Upload
                listType="picture-card"
                fileList={fileListIcon}
                maxCount={1}
                customRequest={customRequestIcon}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeIcon}
                onRemove={handleRemoveIcon}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
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
              <Link to="/course_filter/course_subject">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditCourseSubject;
