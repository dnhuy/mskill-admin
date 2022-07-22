import { getUploadImageUrl, uploadToS3 } from '@/api/upload';
import { FORMAT_DATE } from '@/common/constant';
import { checkImageFileUpload } from '@/common/utils';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Upload } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditPromotion = ({ checkEdit, dataPromotion }) => {
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
      <Form
        name="add-edit-promotion"
        layout="vertical"
        initialValues={{
          start_date: moment(new Date(), FORMAT_DATE.NORMAL),
          start_time: moment('00:00', FORMAT_DATE.HHMM),
          end_time: moment('23:59', FORMAT_DATE.HHMM),
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Tên CTKM"
              name="name"
              rules={[{ required: true, message: 'Tên CTKM không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Link liên kết" name="link">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Loại hình khuyến mại"
              name="promotion_type"
              rules={[{ required: true, message: 'Loại hình khuyến mại không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn loại hình khuyến mại -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Đồng giá</Option>
                <Option value={2}>Giảm giá theo %</Option>
                <Option value={3}>Giảm giá theo giá cố định</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Loại điều kiện khuyến mại"
              name="promotion_condition"
              rules={[
                { required: true, message: 'Loại điều kiện khuyến mại không được để trống!' },
              ]}
            >
              <Select
                placeholder="- Chọn loại điều kiện khuyến mại -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Lọc theo giá</Option>
                <Option value={2}>Lọc theo chuyên mục</Option>
                <Option value={3}>Lọc theo giảng viên</Option>
                <Option value={4}>Lọc theo CP</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Nội dung mã" name="code">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Không áp dụng cho các khóa học sau" name="course_not_apply">
              <Select
                mode="multiple"
                placeholder="- Chọn khóa học-"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Khóa học 1</Option>
                <Option value={2}>Khóa học 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Image">
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
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label="Ngày bắt đầu"
              name="start_date"
              rules={[{ required: true, message: 'Ngày bắt đầu không được để trống!' }]}
            >
              <DatePicker
                placeholder="Chọn ngày bắt đầu"
                format={FORMAT_DATE.NORMAL}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label="Thời gian bắt đầu"
              name="start_time"
              rules={[{ required: true, message: 'Thời gian bắt đầu không được để trống!' }]}
            >
              <DatePicker
                picker="time"
                placeholder="Chọn thời gian bắt đầu"
                format={FORMAT_DATE.HHMM}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Ngày kết thúc" name="end_date">
              <DatePicker
                placeholder="Chọn ngày kết thúc"
                format={FORMAT_DATE.NORMAL}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Thời gian kết thúc" name="end_time">
              <DatePicker
                picker="time"
                placeholder="Chọn thời gian kết thúc"
                format={FORMAT_DATE.HHMM}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Trạng thái hiển thị"
              name="view_status"
              rules={[{ required: true, message: 'Trạng thái hiển thị không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn trạng thái -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Hoạt động</Option>
                <Option value={2}>Ẩn</Option>
                <Option value={3}>Tạm dừng</Option>
                <Option value={4}>Hủy</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Đối tượng nhận khuyến mãi"
              name="receiver"
              rules={[
                { required: true, message: 'Đối tượng nhận khuyến mãi không được để trống!' },
              ]}
            >
              <Select
                placeholder="- Chọn đối tượng -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Tất cả các user</Option>
                <Option value={2}>Nhóm thuê bao SUB</Option>
                <Option value={3}>Nhóm user Đang hoạt động</Option>
                <Option value={4}>Nhóm user Không hoạt động</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Danh mục KM"
              name="category"
              rules={[{ required: true, message: 'Danh mục KM không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn danh mục KM -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={1}>Cổng thi</Option>
                <Option value={2}>Khóa học</Option>
                <Option value={3}>MobiFone</Option>
                <Option value={4}>Khác</Option>
              </Select>
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
              <Link to="/media_camplain/promotion">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditPromotion;
