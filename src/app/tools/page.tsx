import ToolsView from '@/app/tools/components/ToolsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools'
};

const ToolsPage = () => {
  return <ToolsView />;
};

export default ToolsPage;
