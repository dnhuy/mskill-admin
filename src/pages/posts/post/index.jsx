import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const Post = () => {
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
      title: (_, type) => (type === 'table' ? 'Tiêu đề' : 'Từ khóa tìm kiếm'),
      dataIndex: 'keyword',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Chuyên mục',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn chuyên mục -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Chuyên mục 1</Option>
            <Option value={2}>Chuyên mục 2</Option>
          </Select>
        );
      },
    },
    {
      title: (_, type) => (type === 'table' ? 'BTV' : 'Người đăng'),
      dataIndex: 'post_by',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn BTV -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>BTV 1</Option>
            <Option value={2}>BTV 2</Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày đăng',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
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
            <Option value={2}>Ẩn</Option>
          </Select>
        );
      },
    },
    {
      title: 'Lượt đọc',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
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
            placeholder="Chọn đến ngày"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      hideInTable: true,
      align: 'center',
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
              <Link to="/posts/post/add_post">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default Post;
