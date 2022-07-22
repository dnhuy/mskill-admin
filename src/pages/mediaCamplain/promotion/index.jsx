import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const Promotion = () => {
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
      title: 'Tên CTKM',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="Nhập tên CTKM" />;
      },
    },
    {
      title: 'Loại hình KM',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn loại hình KM -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Loại hình KM 1</Option>
            <Option value={2}>Loại hình KM 2</Option>
          </Select>
        );
      },
    },
    {
      title: 'Danh mục KM',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn danh mục KM -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Danh mục KM 1</Option>
            <Option value={2}>Danh mục KM 2</Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày bắt đầu',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày bắt đầu"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
    },
    {
      title: 'Ngày kết thúc',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày kết thúc"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
    },
    {
      title: 'Trạng thái hiển thị',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn trạng thái hiển thị -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Hoạt động</Option>
            <Option value={2}>Ẩn</Option>
            <Option value={3}>Tạm dừng</Option>
            <Option value={4}>Hủy</Option>
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
          <Select
            placeholder="- Chọn trạng thái -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Đang diễn ra</Option>
            <Option value={2}>Chưa bắt đầu</Option>
            <Option value={3}>Đã kết thúc</Option>
          </Select>
        );
      },
    },
    {
      title: 'Người tạo',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn người tạo -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Người tạo 1</Option>
            <Option value={2}>Người tạo 2</Option>
          </Select>
        );
      },
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
              <Link to="/media_camplain/promotion/add_promotion">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default Promotion;
