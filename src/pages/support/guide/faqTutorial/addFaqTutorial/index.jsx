import { PageContainer } from '@ant-design/pro-layout';
import AddEditFaqTutorial from '../components/AddEditFaqTutorial';

const AddFaqTutorial = () => {
  return (
    <PageContainer>
      <AddEditFaqTutorial checkEdit={false} />
    </PageContainer>
  );
};

export default AddFaqTutorial;
