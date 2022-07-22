import { PageContainer } from '@ant-design/pro-layout';
import AddEditRole from '../components/AddEditRole';

const AddRole = () => {
  return (
    <PageContainer>
      <AddEditRole checkEdit={false} />
    </PageContainer>
  );
};

export default AddRole;
