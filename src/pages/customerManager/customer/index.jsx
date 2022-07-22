import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const Customer = () => {
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
      title: (_, type) => (type === 'table' ? 'Họ tên' : 'Từ khóa tìm kiếm'),
      dataIndex: 'keyword',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'Điện thoại',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'E-mail',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Lượt mua lẻ',
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
            placeholder="Chọn ngày kết thúc"
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
            <Button key="detail" type="primary">
              <Link to="/customer_manager/customer/detail_customer">Chi tiết</Link>
            </Button>,
            <Button key="transaction" type="primary">
              <Link to="/customer_manager/customer/transaction_history">Giao dịch</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default Customer;
