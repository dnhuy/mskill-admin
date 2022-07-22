import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const WhiteList = () => {
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
      title: 'Số điện thoại',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="Nhập số điện thoại" />;
      },
    },
    {
      title: 'Khóa học',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select
            placeholder="- Chọn khóa học -"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            <Option value={1}>Khóa học 1</Option>
            <Option value={2}>Khóa học 2</Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày tạo',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày tạo"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      align: 'center',
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
          >
            <Option value={1}>Người tạo 1</Option>
            <Option value={2}>Người tạo 2</Option>
          </Select>
        );
      },
    },
    {
      title: 'Ngày hiệu lực',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày hiệu lực"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      align: 'center',
    },
    {
      title: 'Ngày hết hạn',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn ngày hết hạn"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      align: 'center',
    },
  ];

  return (
    <PageContainer>
      <IntlProvider value={intlMap[getLocale()] || viVNIntl}>
        <ProTable
          // locale={{ emptyText: "Không tìm thấy kết quả nào" }}
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
              <Link to="/customer_manager/white_list/add_white_list">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default WhiteList;
