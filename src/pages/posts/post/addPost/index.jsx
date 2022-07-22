import { PageContainer } from '@ant-design/pro-layout';
import AddEditPost from '../components/AddEditPost';

const AddPost = () => {
  return (
    <PageContainer>
      <AddEditPost checkEdit={false} />
    </PageContainer>
  );
};

export default AddPost;
