import { FORMAT_DATE } from '@/common/constant';
import { PageContainer } from '@ant-design/pro-layout';
import { intlMap, viVNIntl } from '@ant-design/pro-provider';
import ProTable, { IntlProvider } from '@ant-design/pro-table';
import { Button, Col, DatePicker, Input, Row } from 'antd';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRef, useState } from 'react';
import xlsx from 'sheetjs-style';
import { getLocale, Link } from 'umi';
import styles from './index.less';

const TransactionHistory = () => {
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
      title: 'Thời gian giao dịch',
      render: (text, record) => {
        return null;
      },
      hideInSearch: true,
      align: 'center',
    },
    {
      title: (_, type) => (type === 'table' ? 'Nội dung giao dịch' : 'Từ khóa tìm kiếm'),
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
      title: 'Kênh thanh toán',
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

  const handleClickExport = () => {
    setLoadingExport(true);
    const wb = xlsx.utils.book_new();
    const sheet1 = [];
    const headerExport = [
      'STT',
      'Thời gian giao dịch',
      'Nội dung giao dịch',
      'Giá trị đơn hàng',
      'Kênh thanh toán',
      'Trạng thái',
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
      { width: 30 },
      { width: 40 },
      { width: 20 },
      { width: 30 },
      { width: 20 },
    ];

    const name = `${moment(new Date()).format(FORMAT_DATE.YYYY_MM_DD)}_lichsugiaodichmuale`;

    xlsx.utils.book_append_sheet(wb, ws1, name);

    const file = {
      name: `${name}.xlsx`,
      data: xlsx.write(wb, { bookType: 'xlsx', bookSST: false, type: 'array' }),
    };

    saveAs(new Blob([file.data], { type: 'text/plain;charset=utf-8' }), file.name);
    setLoadingExport(false);
  };

  return (
    <PageContainer
      className={styles.pageContainerTransaction}
      content="Tên khách hàng"
      extraContent={
        <Row gutter={8}>
          <Col>
            <Button type="primary">
              <Link to="/customer_manager/customer/detail_customer">Chi tiết</Link>
            </Button>
          </Col>
          <Col>
            <Button type="primary">Lịch sử trừ cước di động</Button>
          </Col>
          <Col>
            <Button type="primary">Lịch sử MO-MT</Button>
          </Col>
        </Row>
      }
    >
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
            <Button key="detail" type="primary" onClick={handleClickExport} loading={loadingExport}>
              Export
            </Button>,
          ]}
        />
      </IntlProvider>
    </PageContainer>
  );
};

export default TransactionHistory;
