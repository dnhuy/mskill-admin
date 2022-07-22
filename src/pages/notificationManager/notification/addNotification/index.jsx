import { PageContainer } from '@ant-design/pro-layout';
import AddEditNotification from '../components/AddEditNotification';

const AddNotification = () => {
  return (
    <PageContainer>
      <AddEditNotification checkEdit={false} />
    </PageContainer>
  );
};

export default AddNotification;
