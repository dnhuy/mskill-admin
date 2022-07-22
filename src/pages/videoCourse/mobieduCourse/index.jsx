import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, Input, Select } from 'antd';
import { useRef, useState } from 'react';
import { getLocale, Link } from 'umi';

const { Option } = Select;

const MobieduCourse = () => {
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
      title: 'Tên khóa học',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
    },
    {
      title: 'ID',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
      align: 'center',
    },
    {
      title: 'Tên CP',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
      align: 'center',
    },
    {
      title: 'Tổng bài học',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: 'Thời lượng',
      render: (text, record) => {
        return null;
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
      title: 'Bán lẻ',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="" allowClear>
            <Option value={1}>Bán lẻ</Option>
            <Option value={2}>Không bán lẻ</Option>
          </Select>
        );
      },
      align: 'center',
    },
    {
      title: 'Trạng thái',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return (
          <Select placeholder="">
            <Option value={1}>Hoạt động</Option>
            <Option value={2}>Không hoạt động</Option>
          </Select>
        );
      },
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
              <Link to="/video_course/mobiedu_course/add_mobiedu_course">Thêm mới</Link>
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default MobieduCourse;
