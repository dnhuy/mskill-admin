import { PageContainer } from '@ant-design/pro-layout';
import AddEditApiCourse from '../components/AddEditApiCourse';

const AddApiCourse = () => {
  return (
    <PageContainer>
      <AddEditApiCourse checkEdit={false} />
    </PageContainer>
  );
};

export default AddApiCourse;
