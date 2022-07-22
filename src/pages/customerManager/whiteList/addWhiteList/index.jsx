import { PageContainer } from '@ant-design/pro-layout';
import AddEditWhiteList from '../components/AddEditWhiteList';

const AddWhiteList = () => {
  return (
    <PageContainer>
      <AddEditWhiteList checkEdit={false} />
    </PageContainer>
  );
};

export default AddWhiteList;
