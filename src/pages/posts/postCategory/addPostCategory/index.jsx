import { PageContainer } from '@ant-design/pro-layout';
import AddEditPostCategory from '../components/AddEditPostCategory';

const AddPostCategory = () => {
  return (
    <PageContainer>
      <AddEditPostCategory checkEdit={false} />
    </PageContainer>
  );
};

export default AddPostCategory;
