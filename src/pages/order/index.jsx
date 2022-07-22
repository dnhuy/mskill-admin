import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const Order = () => {
  const actionRef = useRef();

  const [collapsed, setCollapsed] = useState(false);

  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return <div>{index + 1}</div>;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: (_, type) => (type === 'table' ? 'Mã đơn hàng' : 'Từ khóa tìm kiếm'),
      dataIndex: 'keyword',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Giá trị đơn hàng',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Khách hàng (email)',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'SĐT',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Hình thức thanh toán',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="- Chọn hình thức thanh toán -" allowClear>
            <Option value={1}>VMS</Option>
            <Option value={2}>Chuyển khoản</Option>
            <Option value={3}>CoD</Option>
            <Option value={4}>OnePay</Option>
          </Select>
        );
      },
    },
    {
      title: 'Thanh toán',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="- Chọn trạng thái thanh toán -" allowClear>
            <Option value={1}>Chưa thanh toán</Option>
            <Option value={2}>Đã thanh toán</Option>
          </Select>
        );
      },
    },
    {
      title: 'Trạng thái',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="- Chọn trạng thái -" allowClear>
            <Option value={1}>Chờ thanh toán</Option>
            <Option value={2}>Đã thanh toán</Option>
            <Option value={3}>Thất bại</Option>
          </Select>
        );
      },
    },
    {
      title: 'Tìm từ ngày',
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày bắt đầu"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      hideInTable: true,
      align: 'center',
    },
    {
      title: 'Tìm đến ngày',
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày kết thúc"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      hideInTable: true,
      align: 'center',
    },
    {
      title: 'Đối tác',
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn đối tác -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Đối tác 1</Option>
            <Option value={2}>Đối tác 2</Option>
          </Select>
        );
      },
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <IntlProvider value={intlMap[getLocale()] || viVNIntl}>
        <ProTable
          size="small"
          bordered
          actionRef={actionRef}
          form={{
            layout: 'vertical',
          }}
          columns={columns}
          request={(params) => {
            // return getListOrder(params)
            return {
              data: [],
              success: true,
            };
          }}
          search={{
            collapsed,
            onCollapse: setCollapsed,
            searchText: 'Tìm kiếm',
            resetText: 'Làm mới',
            collapseRender: () => {
              return null;
            },
          }}
          pagination={{
            locale: { items_per_page: '/ trang' },
            showTotal: (total, range) => <span>{`${range[0]} - ${range[1]} / ${total}`}</span>,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100'],
            defaultPageSize: 20,
            hideOnSinglePage: true,
          }}
          toolBarRender={() => [
            <Button key="add" type="primary">
              <Link to="/order/add_order">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default Order;
