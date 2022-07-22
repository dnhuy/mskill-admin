import { PageContainer } from '@ant-design/pro-layout';
import AddEditPriceRange from '../components/AddEditPriceRange';

const AddPriceRange = () => {
  return (
    <PageContainer>
      <AddEditPriceRange checkEdit={false} />
    </PageContainer>
  );
};

export default AddPriceRange;
