import { PageContainer } from '@ant-design/pro-layout';
import AddEditCourseSubject from '../components/AddEditCourseSubject';

const AddCourseSubject = () => {
  return (
    <PageContainer>
      <AddEditCourseSubject checkEdit={false} />
    </PageContainer>
  );
};

export default AddCourseSubject;
