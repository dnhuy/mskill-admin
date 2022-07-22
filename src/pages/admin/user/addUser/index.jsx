import { PageContainer } from '@ant-design/pro-layout';
import AddEditUser from '../components/AddEditUser';

const AddUser = () => {
  return (
    <PageContainer>
      <AddEditUser checkEdit={false} />
    </PageContainer>
  );
};

export default AddUser;
