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

const AddEditSolution = ({ checkEdit, dataSolution }) => {
  const [fileListBannerMiddle, setFileListBannerMiddle] = useState([]);
  const [bannerMiddleUrl, setBannerMiddleUrl] = useState([]);
  const [fileListBannerEnd, setFileListBannerEnd] = useState([]);
  const [bannerEndUrl, setBannerEndUrl] = useState([]);
  const [fileListIcon, setFileListIcon] = useState([]);
  const [iconUrl, setIconUrl] = useState([]);
  const [fileListBannerMobile, setFileListBannerMobile] = useState([]);
  const [bannerMobileUrl, setBannerMobileUrl] = useState([]);
  const [fileListBannerMobileEnd, setFileListBannerMobileEnd] = useState([]);
  const [bannerMobileEndUrl, setBannerMobileEndUrl] = useState([]);

  const handleBeforeUpload = (file) => {
    if (!checkImageFileUpload(file)) {
      message.error(`${file.name} không đúng định dạng!`);
    }
    return checkImageFileUpload(file) ? true : Upload.LIST_IGNORE;
  };

  const customRequestBannerMiddle = (options) => {
    const file = fileListBannerMiddle[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setBannerMiddleUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeBannerMiddle = (info) => {
    setFileListBannerMiddle(info.fileList);
  };

  const handleRemoveBannerMiddle = () => {
    setFileListBannerMiddle([]);
    setBannerMiddleUrl();
  };

  const customRequestBannerEnd = (options) => {
    const file = fileListBannerEnd[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setBannerEndUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeBannerEnd = (info) => {
    setFileListBannerEnd(info.fileList);
  };

  const handleRemoveBannerEnd = () => {
    setFileListBannerEnd([]);
    setBannerEndUrl();
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

  const customRequestBannerMobile = (options) => {
    const file = fileListBannerMobile[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setBannerMobileUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeBannerMobile = (info) => {
    setFileListBannerMobile(info.fileList);
  };

  const handleRemoveBannerMobile = () => {
    setFileListBannerMobile([]);
    setBannerMobileUrl();
  };

  const customRequestBannerMobileEnd = (options) => {
    const file = fileListBannerMobileEnd[0];
    const data = {
      file: file.name,
      content_type: file.type,
    };
    getUploadImageUrl(data).then((res) => {
      const urlRes = res?.data?.url;
      uploadToS3(urlRes, file.originFileObj);
      const urlView = urlRes ? urlRes.substring(0, urlRes.indexOf('?')) : '';
      setBannerMobileEndUrl(urlView);
    });
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const handleChangeBannerMobileEnd = (info) => {
    setFileListBannerMobileEnd(info.fileList);
  };

  const handleRemoveBannerMobileEnd = () => {
    setFileListBannerMobileEnd([]);
    setBannerMobileEndUrl();
  };

  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-solution" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên giải pháp"
              name="name"
              rules={[{ required: true, message: 'Tên giải pháp không được để trống!' }]}
            >
              <Input placeholder="Nhập tên giải pháp" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Tên rút gọn" name="short_name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả ngắn" name="short_description">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Điểm nổi bật" name="highlight">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Lợi ích" name="benefit">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Gói giải pháp"
              name="package_solution"
              rules={[{ required: true, message: 'Gói giải pháp không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn gói giải pháp -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Gói 1</Option>
                <Option value={2}>Gói 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Video demo" name="link_video">
              <Input placeholder="Nhập đường dẫn video" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="URL banner giữa trang" name="url_banner_middle">
              <Input placeholder="Nhập link" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Banner giữa trang">
              <Upload
                listType="picture-card"
                fileList={fileListBannerMiddle}
                maxCount={1}
                customRequest={customRequestBannerMiddle}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeBannerMiddle}
                onRemove={handleRemoveBannerMiddle}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="URL banner cuối trang" name="url_banner_end">
              <Input placeholder="Nhập link banner cuối trang" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Banner cuối trang">
              <Upload
                listType="picture-card"
                fileList={fileListBannerEnd}
                maxCount={1}
                customRequest={customRequestBannerEnd}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeBannerEnd}
                onRemove={handleRemoveBannerEnd}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
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
            <Form.Item label="Banner mobile">
              <Upload
                listType="picture-card"
                fileList={fileListBannerMobile}
                maxCount={1}
                customRequest={customRequestBannerMobile}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeBannerMobile}
                onRemove={handleRemoveBannerMobile}
              >
                Tải lên file .png, .jpg, .jpeg
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Banner mobile cuối trang">
              <Upload
                listType="picture-card"
                fileList={fileListBannerMobileEnd}
                maxCount={1}
                customRequest={customRequestBannerMobileEnd}
                beforeUpload={handleBeforeUpload}
                onChange={handleChangeBannerMobileEnd}
                onRemove={handleRemoveBannerMobileEnd}
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
              <Link to="/solution_manager/solution">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditSolution;
