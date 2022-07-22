import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, DatePicker, Input, Select } from 'antd';
import { saveAs } from 'file-saver';
import { useRef, useState } from 'react';
import xlsx from 'sheetjs-style';
import { getLocale } from 'umi';

const { Option } = Select;

const DataForm = () => {
  const actionRef = useRef();

  const [collapsed, setCollapsed] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

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
      title: 'Thời gian gửi thông tin',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
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
      title: 'SĐT',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
      align: 'center',
    },
    {
      title: 'Trạng thái liên hệ',
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
            <Option value={1}>Chưa liên hệ</Option>
            <Option value={2}>Đã liên hệ</Option>
            <Option value={3}>Hủy</Option>
          </Select>
        );
      },
      align: 'center',
    },
    {
      title: 'Nhân viên chăm sóc gần nhất',
      render: (text, record) => {
        return null;
      },
      renderFormItem: () => {
        return <Input placeholder="" />;
      },
      align: 'center',
    },
    {
      title: 'Từ ngày',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn từ ngày"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      align: 'center',
    },
    {
      title: 'Tới ngày',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <DatePicker
            placeholder="Chọn tới ngày"
            format={FORMAT_DATE.NORMAL}
            style={{ width: '100%' }}
          />
        );
      },
      align: 'center',
    },
  ];

  const handleClickExport = () => {
    setLoadingExport(true);
    const wb = xlsx.utils.book_new();
    const sheet1 = [];
    const headerExport = [
      'STT',
      'Thời gian gửi thông tin',
      'Họ tên',
      'SĐT',
      'Trạng thái liên hệ',
      'Nhân viên chăm sóc gần nhất',
    ];
    sheet1.push(headerExport);

    const ws1 = xlsx.utils.aoa_to_sheet(sheet1);

    const range1 = xlsx.utils.decode_range(ws1['!ref']);
    for (let C = range1.s.c; C <= range1.e.c; C++) {
      for (let R = range1.s.r; R <= range1.e.r; R++) {
        const cellref = xlsx.utils.encode_cell({ c: C, r: R });
        if (!ws1[cellref]) continue;
        if (R === 0) {
          ws1[`${cellref}`].s = {
            font: { name: 'Calibri', bold: true, sz: '11', color: { rgb: '004390' } },
            alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          };
        }
      }
    }

    ws1['!rows'] = [{ hpx: 25 }];
    ws1['!cols'] = [
      { width: 7 },
      { width: 25 },
      { width: 30 },
      { width: 20 },
      { width: 20 },
      { width: 30 },
    ];

    const name = 'DanhSachKhachHangDeLaiThongTin';

    xlsx.utils.book_append_sheet(wb, ws1, name);

    const file = {
      name: `${name}.xlsx`,
      data: xlsx.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' }),
    };

    saveAs(new Blob([file.data], { type: 'text/plain;charset=utf-8' }), file.name);
    setLoadingExport(false);
  };

  return (
    <PageContainer title="Danh sách khách hàng để lại thông tin">
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
            <Button key="add" type="primary" onClick={handleClickExport} loading={loadingExport}>
              Xuất excel
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default DataForm;
