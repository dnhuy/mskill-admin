import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { checkImageFileUpload } from '@/common/utils';
import EditorToolbar, { formats, modules } from '@/components/QuillEditor/EditorToolbar';
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditApiCourse = ({ checkEdit, dataApiCourse }) => {
  let descriptionRef;
  let infoRef;
  let guideRef;

  const [description, setDescription] = useState(checkEdit ? dataApiCourse?.htmlDescription : '');
  const [info, setInfo] = useState(checkEdit ? dataApiCourse?.htmlInfo : '');
  const [guide, setGuide] = useState(checkEdit ? dataApiCourse?.htmlGuide : '');
  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleChangeDescription = (content) => {
    setDescription(content);
  };

  const handleChangeInfo = (content) => {
    setInfo(content);
  };

  const handleChangeGuide = (content) => {
    setGuide(content);
  };

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
      <Form name="add-edit-api-course" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Tên khóa học"
              name="name"
              rules={[{ required: true, message: 'Tên khóa học không được để trống!' }]}
            >
              <Input placeholder="Nhập tên khóa học" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Nhà cung cấp nội dung"
              name="cp"
              rules={[{ required: true, message: 'Nhà cung cấp nội dung không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn nhà cung cấp nội dung -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>NCC 1</Option>
                <Option value={2}>NCC 2</Option>
              </Select>
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
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Chủ đề"
              name="title"
              rules={[{ required: true, message: 'List chủ đề không được để trống!' }]}
            >
              <Select
                mode="multiple"
                placeholder="- Chọn chủ đề -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Chủ đề 1</Option>
                <Option value={2}>Chủ đề 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Giá gốc"
              name="price"
              rules={[{ required: true, message: 'Giá bán không được để trống!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Độ tuổi" name="age">
              <InputNumber style={{ width: '100%' }} placeholder="Độ tuổi" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giới thiệu ngắn"
              name="short_description"
              rules={[{ required: true, message: 'Giới thiệu ngắn không được để trống!' }]}
            >
              <TextArea placeholder="Nhập nội dung giới thiệu khóa học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Bạn sẽ học được gì (Lợi ích)" name="benefit">
              <TextArea />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giới thiệu chi tiết"
              name="description"
              rules={[{ required: true, message: 'Giới thiệu chi tiết không được để trống!' }]}
            >
              <div className="text-editor">
                <EditorToolbar id="description" />
                <ReactQuill
                  theme="snow"
                  ref={(el) => {
                    descriptionRef = el;
                  }}
                  modules={modules(descriptionRef, 'description')}
                  formats={formats}
                  value={description}
                  onChange={handleChangeDescription}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Phù hợp với">
              <div className="text-editor">
                <EditorToolbar id="info" />
                <ReactQuill
                  theme="snow"
                  ref={(el) => {
                    infoRef = el;
                  }}
                  modules={modules(infoRef, 'info')}
                  formats={formats}
                  value={info}
                  onChange={handleChangeInfo}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Hướng dẫn sử dụng">
              <div className="text-editor">
                <EditorToolbar id="guide" />
                <ReactQuill
                  theme="snow"
                  ref={(el) => {
                    guideRef = el;
                  }}
                  modules={modules(guideRef, 'guide')}
                  formats={formats}
                  value={guide}
                  onChange={handleChangeGuide}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Ảnh minh họa">
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
            <Form.Item label="Video giới thiệu" name="link">
              <Input placeholder="Link video giới thiệu khóa học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Hình thức học"
              name="study_form"
              rules={[{ required: true, message: 'Hình thức học không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn phương thức học -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Không xác định</Option>
                <Option value={2}>Học trên Website và App</Option>
                <Option value={3}>Học trên Website</Option>
                <Option value={4}>Học trên Ứng dụng</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="URL học trên ứng dụng" name="url_app">
              <Input placeholder="Link học ứng dụng" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="URL học trên website"
              name="url_web"
              rules={[{ required: true, message: 'URL học trên website không được để trống!' }]}
            >
              <Input placeholder="Link học trên site" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Vị trí hiển thị"
              name="position"
              rules={[{ required: true, message: 'Vị trí hiển thị không được để trống!' }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Trạng thái">
              <Switch
                checkedChildren="Hoạt động"
                unCheckedChildren="Ẩn"
                style={{ width: '120px' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Khóa học HOT">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" style={{ width: '120px' }} />
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
              <Link to="/learning_packages/api_course">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditApiCourse;
