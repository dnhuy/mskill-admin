import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const User = () => {
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
      title: 'Tên đăng nhập',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Họ tên',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Quyền',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn quyền -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Quyền 1</Option>
            <Option value={2}>Quyền 2</Option>
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
            <Option value={1}>Hoạt động</Option>
            <Option value={2}>Không hoạt động</Option>
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
              <Link to="/admin/user/add_user">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default User;
