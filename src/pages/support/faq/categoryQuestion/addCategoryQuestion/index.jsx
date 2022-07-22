import { PageContainer } from '@ant-design/pro-layout';
import AddEditCategoryQuestion from '../components/AddEditCategoryQuestion';

const AddCategoryQuestion = () => {
  return (
    <PageContainer>
      <AddEditCategoryQuestion checkEdit={false} />
    </PageContainer>
  );
};

export default AddCategoryQuestion;
