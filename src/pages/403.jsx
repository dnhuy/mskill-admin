import { Button, Result } from 'antd';
import { history } from 'umi';

const NoPermissionPage = () => (
  <Result
    title="Không có quyền truy cập trang!"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Trang chủ
      </Button>
    }
  />
);

export default NoPermissionPage;
