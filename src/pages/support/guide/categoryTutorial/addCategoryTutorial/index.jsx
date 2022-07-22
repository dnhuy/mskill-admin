import { PageContainer } from '@ant-design/pro-layout';
import AddEditCategoryTutorial from '../components/AddEditCategoryTutorial';

const AddCategoryTutorial = () => {
  return (
    <PageContainer>
      <AddEditCategoryTutorial checkEdit={false} />
    </PageContainer>
  );
};

export default AddCategoryTutorial;
