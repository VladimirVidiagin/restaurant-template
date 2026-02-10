export type AppRouteId = 'home' | 'loyalty' | 'delivery' | 'about' | 'cart';

export interface AppRoute {
  id: AppRouteId;
  label: string;
  path: string;
  iconName: string;
}

export const appRoutes: AppRoute[] = [
  {
    id: 'home',
    label: 'Главная',
    path: '/',
    iconName: 'home-5-line',
  },
  {
    id: 'delivery',
    label: 'Доставка',
    path: '/delivery',
    iconName: 'truck-line',
  },
  {
    id: 'cart',
    label: 'Корзина',
    path: '/cart',
    iconName: 'shopping-cart-2-line',
  },
  {
    id: 'loyalty',
    label: 'Бонусы',
    path: '/loyalty',
    iconName: 'gift-line',
  },
  {
    id: 'about',
    label: 'О нас',
    path: '/about',
    iconName: 'information-line',
  },
];

export function getNavigationItems(): AppRoute[] {
  return appRoutes;
}
