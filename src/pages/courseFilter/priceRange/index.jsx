import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, Input, InputNumber } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const PriceRange = () => {
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
      title: 'Nội dung hiển thị bộ lọc',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Vị trí hiển thị',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <InputNumber placeholder="" />;
      },
      align: 'center',
    },
    {
      title: 'Mức giá',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
    },
    {
      title: 'Số lượng khóa học',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
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
              <Link to="/course_filter/price_range/add_price_range">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default PriceRange;
