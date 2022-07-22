import { PageContainer } from '@ant-design/pro-layout';
import AddEditExamGate from '../components/AddEditExamGate';

const AddExamGate = () => {
  return (
    <PageContainer>
      <AddEditExamGate checkEdit={false} />
    </PageContainer>
  );
};

export default AddExamGate;
