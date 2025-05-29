import HeroTagView from '@/app/(MainLayout)/tools/components/HeroTagView/HeroTagView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Hero tag'
};
export default function Play() {
  return <HeroTagView />;
}
