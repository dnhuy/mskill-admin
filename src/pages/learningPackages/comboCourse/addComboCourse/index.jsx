import { PageContainer } from '@ant-design/pro-layout';
import AddEditComboCourse from '../components/AddEditComboCourse';

const AddComboCourse = () => {
  return (
    <PageContainer>
      <AddEditComboCourse checkEdit={false} />
    </PageContainer>
  );
};

export default AddComboCourse;
