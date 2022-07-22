import { PageContainer } from '@ant-design/pro-layout';
import AddEditExamGateSubject from '../components/AddEditExamGateSubject';

const AddExamGateSubject = () => {
  return (
    <PageContainer>
      <AddEditExamGateSubject checkEdit={false} />
    </PageContainer>
  );
};

export default AddExamGateSubject;
