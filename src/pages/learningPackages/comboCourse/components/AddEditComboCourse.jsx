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

const AddEditComboCourse = ({ checkEdit, dataComboCourse }) => {
  let descriptionRef;
  let infoRef;

  const [description, setDescription] = useState(checkEdit ? dataComboCourse?.htmlDescription : '');
  const [info, setInfo] = useState(checkEdit ? dataComboCourse?.htmlInfo : '');
  const [fileListBanner, setFileListBanner] = useState([]);
  const [bannerUrl, setBannerUrl] = useState([]);
  const [fileListImage, setFileListImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleChangeDescription = (content) => {
    setDescription(content);
  };

  const handleChangeInfo = (content) => {
    setInfo(content);
  };

  const handleBeforeUpload = (file) => {
    if (!checkImageFileUpload(file)) {
      message.error(`${file.name} không đúng định dạng!`);
    }
    return checkImageFileUpload(file) ? true : Upload.LIST_IGNORE;
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
      <Form name="add-edit-combo-course" layout="vertical" onFinish={handleSubmit}>
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
            <Form.Item label="Thời lượng khóa học (Giờ:Phút:Giây)" name="time">
              <DatePicker
                picker="time"
                placeholder="Chọn thời lượng"
                format={FORMAT_DATE.TIME}
                style={{ width: '100%' }}
              />
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
          <Col span={24}>
            <Form.Item label="Giới thiệu khóa học" name="short_description">
              <TextArea placeholder="Nhập nội dung giới thiệu khóa học" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả chi tiết">
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
            <Form.Item label="Banner">
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
            <Form.Item label="Khóa học phù hợp với">
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
              <Link to="/learning_packages/combo_course">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditComboCourse;
