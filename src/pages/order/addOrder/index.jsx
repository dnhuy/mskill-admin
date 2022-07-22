import { PageContainer } from '@ant-design/pro-layout';
import AddEditOrder from '../components/AddEditOrder';

const AddOrder = () => {
  return (
    <PageContainer>
      <AddEditOrder checkEdit={false} />
    </PageContainer>
  );
};

export default AddOrder;
