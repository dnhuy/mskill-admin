import { PageContainer } from '@ant-design/pro-layout';
import AddEditFaqQuestion from '../components/AddEditFaqQuestion';

const AddFaqQuestion = () => {
  return (
    <PageContainer>
      <AddEditFaqQuestion checkEdit={false} />
    </PageContainer>
  );
};

export default AddFaqQuestion;
