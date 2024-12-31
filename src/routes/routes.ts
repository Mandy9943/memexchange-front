import { RouteNamesEnum } from '@/localConstants';
import { RouteType } from '@multiversx/sdk-dapp/types';
import { Coins, Home, PlusCircle } from 'lucide-react';

interface RouteWithTitleType extends Omit<RouteType, 'component'> {
  title: string;
  icon: React.ElementType;
}

export const adminRoutes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.adminRewards,
    title: 'Rewards',
    icon: PlusCircle
  }
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
