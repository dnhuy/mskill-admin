import { PageContainer } from '@ant-design/pro-layout';
import AddEditCourseCategory from '../components/AddEditCourseCategory';

const AddCourseCategory = () => {
  return (
    <PageContainer>
      <AddEditCourseCategory checkEdit={false} />
    </PageContainer>
  );
};

export default AddCourseCategory;
