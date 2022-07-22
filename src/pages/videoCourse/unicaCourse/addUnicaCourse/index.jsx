import { PageContainer } from '@ant-design/pro-layout';
import AddEditUnicaCourse from '../components/AddEditUnicaCourse';

const AddUnicaCourse = () => {
  return (
    <PageContainer>
      <AddEditUnicaCourse checkEdit={false} />
    </PageContainer>
  );
};

export default AddUnicaCourse;
