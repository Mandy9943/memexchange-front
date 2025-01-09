import { RouteNamesEnum } from '@/localConstants';
import { RouteType } from '@multiversx/sdk-dapp/types';
import { Coins, Home, PlusCircle } from 'lucide-react';

interface RouteWithTitleType extends Omit<RouteType, 'component'> {
  title: string;
  icon: React.ElementType;
  description?: string;
}

export const adminRoutes: RouteWithTitleType[] = [
  {
    path: '/admin',
    title: 'Dashboard',
    icon: Home,
    description: 'Overview of system statistics and quick actions'
  },
  {
    path: '/admin/rewards',
    title: 'Rewards',
    icon: PlusCircle,
    description: 'Manage reward tasks and point systems'
  }
  // Add more admin routes as needed
];

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    icon: Home
  },
  {
    path: RouteNamesEnum.memeCoins,
    title: 'Meme coins',
    icon: Coins
  },
  {
    path: RouteNamesEnum.createCoin,
    title: 'Create coin',
    icon: PlusCircle
  }
];
