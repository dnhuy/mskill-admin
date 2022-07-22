import { PageContainer } from '@ant-design/pro-layout';
import AddEditSolution from '../components/AddEditSolution';

const AddSolution = () => {
  return (
    <PageContainer>
      <AddEditSolution checkEdit={false} />
    </PageContainer>
  );
};

export default AddSolution;
