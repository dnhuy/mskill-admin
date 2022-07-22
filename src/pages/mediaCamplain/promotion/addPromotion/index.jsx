import { PageContainer } from '@ant-design/pro-layout';
import AddEditPromotion from '../components/AddEditPromotion';

const AddPromotion = () => {
  return (
    <PageContainer>
      <AddEditPromotion checkEdit={false} />
    </PageContainer>
  );
};

export default AddPromotion;
