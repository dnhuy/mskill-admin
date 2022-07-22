import { Button, Result } from 'antd';
import { history } from 'umi';

const NoFoundPage = () => (
  <Result
    // status="404"
    title="Địa chỉ trang web không tồn tại!"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Trang chủ
      </Button>
    }
  />
);

export default NoFoundPage;
