import { PageContainer } from '@ant-design/pro-layout';
import AddEditTeacher from '../components/AddEditTeacher';

const AddTeacher = () => {
  return (
    <PageContainer>
      <AddEditTeacher checkEdit={false} />
    </PageContainer>
  );
};

export default AddTeacher;
