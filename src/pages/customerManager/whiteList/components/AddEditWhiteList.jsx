import { FORMAT_DATE } from '@/common/constant';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import moment from 'moment';
import { Link } from 'umi';

const { Option } = Select;
const { TextArea } = Input;

const AddEditWhiteList = ({ checkEdit, dataWhiteList }) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form
        name="add-edit-white-list"
        layout="vertical"
        initialValues={{
          from_date: moment(new Date(), FORMAT_DATE.DATE_TIME),
        }}
        onFinish={handleSubmit}
      >
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Khóa học"
              name="course"
              rules={[{ required: true, message: 'Khóa học không được để trống!' }]}
            >
              <Select
                mode="multiple"
                placeholder="- Chọn khóa học -"
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
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
            >
              <Select
                placeholder="- Chọn số điện thoại -"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                allowClear
              >
                <Option value={1}>Số điện thoại 1</Option>
                <Option value={2}>Số điện thoại 2</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ngày hiệu lực" name="from_date">
              <DatePicker
                showTime
                placeholder="Chọn ngày hiệu lực"
                format={FORMAT_DATE.DATE_TIME}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Ngày hết hạn" name="to_date">
              <DatePicker
                showTime
                placeholder="Chọn ngày hết hạn"
                format={FORMAT_DATE.DATE_TIME}
                style={{ width: '100%' }}
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
              <Link to="/customer_manager/white_list">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditWhiteList;
