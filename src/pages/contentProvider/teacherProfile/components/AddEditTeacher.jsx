import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { checkImageFileUpload } from '@/common/utils';
import { Button, Card, Col, Form, Input, message, Row, Switch, Upload } from 'antd';
import { useState } from 'react';
import { Link } from 'umi';

const { TextArea } = Input;

const AddEditTeacher = ({ checkEdit, dataTeacher }) => {
  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [fileListBanner, setFileListBanner] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);

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

  const customRequestBanner = (options) => {
    const file = fileListBanner[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setBannerUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeBanner = (info) => {
    setFileListBanner(info.fileList);
  };

  const handleRemoveBanner = () => {
    setFileListBanner([]);
    setBannerUrl();
  };

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-teacher" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên giảng viên"
              name="name"
              rules={[{ required: true, message: 'Tên giảng viên không được để trống!' }]}
            >
              <Input placeholder="Nhập tên giảng viên" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Chức danh" name="job_title">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Đường dẫn giảng viên" name="url">
              <Input />
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
            <Form.Item label="Hỉnh ảnh Banner">
              <Upload
                listType="picture-card"
                fileList={fileListBanner}
                maxCount={1}
                customRequest={customRequestBanner}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeBanner}
                onRemove={handleRemoveBanner}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Trình độ"
              name="degree"
              rules={[{ required: true, message: 'Trình độ không được để trống!' }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Kinh nghiệm"
              name="experience"
              rules={[{ required: true, message: 'Kinh nghiệm không được để trống!' }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Kỹ năng"
              name="skill"
              rules={[{ required: true, message: 'Kỹ năng không được để trống!' }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giới thiệu"
              name="description"
              rules={[{ required: true, message: 'Giới thiệu không được để trống!' }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Giảng viên tiêu biểu">
              <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" style={{ width: '120px' }} />
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
              <Link to="/content_provider/teacher_profile">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditTeacher;
