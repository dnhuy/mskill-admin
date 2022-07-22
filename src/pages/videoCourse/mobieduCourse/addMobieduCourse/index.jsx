import { PageContainer } from '@ant-design/pro-layout';
import AddEditMobieduCourse from '../components/AddEditMobieduCourse';

const AddMobieduCourse = () => {
  return (
    <PageContainer>
      <AddEditMobieduCourse checkEdit={false} />
    </PageContainer>
  );
};

export default AddMobieduCourse;
