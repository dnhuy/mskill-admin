import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const Notification = () => {
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
      title: 'Tiêu đề thông báo',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
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
      title: 'Ngày gửi',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Từ ngày',
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
      title: 'Đến ngày',
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
      title: 'Trạng thái',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="- Chọn trạng thái -" allowClear>
            <Option value={1}>Lưu nháp</Option>
            <Option value={2}>Chưa gửi</Option>
            <Option value={3}>Đã gửi</Option>
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
              <Link to="/notification_manager/notification/add_notification">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default Notification;
