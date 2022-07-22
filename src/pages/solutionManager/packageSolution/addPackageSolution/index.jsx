import { PageContainer } from '@ant-design/pro-layout';
import AddEditPackageSolution from '../components/AddEditPackageSolution';

const AddPackageSolution = () => {
  return (
    <PageContainer>
      <AddEditPackageSolution checkEdit={false} />
    </PageContainer>
  );
};

export default AddPackageSolution;
