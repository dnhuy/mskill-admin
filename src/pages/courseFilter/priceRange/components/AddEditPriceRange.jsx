import { Button, Card, Col, Form, Input, InputNumber, Row } from 'antd';
import { Link } from 'umi';

const AddEditPriceRange = ({ checkEdit, dataPriceRange }) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Card>
      <Form name="add-edit-price-range" layout="vertical" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Nội dung hiển thị bộ lọc"
              name="name"
              rules={[{ required: true, message: 'Nội dung hiển thị bộ lọc không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá min"
              name="price_min"
              rules={[{ required: true, message: 'Giá min không được để trống!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá max"
              name="price_max"
              rules={[{ required: true, message: 'Giá max không được để trống!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
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
              <Link to="/course_filter/price_range">Hủy</Link>
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddEditPriceRange;
