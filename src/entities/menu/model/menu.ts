import coldStarter1 from '@/shared/assets/images/menu/coldStarters/Витело тонатидзе.png';
import coldStarter2 from '@/shared/assets/images/menu/coldStarters/Грузинский бахче.png';
import coldStarter3 from '@/shared/assets/images/menu/coldStarters/Дары мегрелии.png';
import coldStarter4 from '@/shared/assets/images/menu/coldStarters/Домашние соленья.png';
import coldStarter5 from '@/shared/assets/images/menu/coldStarters/Сациви.png';
import coldStarter6 from '@/shared/assets/images/menu/coldStarters/Сырная тарелка от бабушки мармар.png';

import mainCourse1 from '@/shared/assets/images/menu/mainСourses/Оджахури со свининой.png';
import mainCourse2 from '@/shared/assets/images/menu/mainСourses/Чахохбили.png';
import mainCourse3 from '@/shared/assets/images/menu/mainСourses/Шкмерули с курицей.png';

export type MenuCategoryId = 'coldStarters' | 'mainCourses';

export interface MenuDish {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  slug: string;
}

export interface MenuCategory {
  id: MenuCategoryId;
  name: string;
  dishes: MenuDish[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'coldStarters',
    name: 'Холодные закуски',
    dishes: [
      {
        id: 'vitelo-tonatidze',
        title: 'Витело тонатидзе',
        image: coldStarter1,
        price: 690,
        description:
          'Тонко нарезанная телятина с нежным соусом на основе тунца, майонеза и каперсов.',
        slug: 'vitelo-tonatidze',
      },
      {
        id: 'gruzinskiy-bahche',
        title: 'Грузинский бахче',
        image: coldStarter2,
        price: 520,
        description: 'Подборка сезонных овощей и свежей зелени по-грузински.',
        slug: 'gruzinskiy-bahche',
      },
      {
        id: 'dary-megrelii',
        title: 'Дары мегрелии',
        image: coldStarter3,
        price: 580,
        description: 'Ассорти традиционных мегрельских закусок к вину и чаче.',
        slug: 'dary-megrelii',
      },
      {
        id: 'domashnie-solenya',
        title: 'Домашние соленья',
        image: coldStarter4,
        price: 450,
        description: 'Овощные соленья по семейному рецепту, подаются с зеленью.',
        slug: 'domashnie-solenya',
      },
      {
        id: 'satsivi',
        title: 'Сациви',
        image: coldStarter5,
        price: 640,
        description: 'Курица под густым ореховым соусом с ароматными специями.',
        slug: 'satsivi',
      },
      {
        id: 'syrnaya-tarelka-ot-babushki-marmar',
        title: 'Сырная тарелка от бабушки мармар',
        image: coldStarter6,
        price: 710,
        description: 'Подборка кавказских сыров по рецептам бабушки Мармар.',
        slug: 'syrnaya-tarelka-ot-babushki-marmar',
      },
    ],
  },
  {
    id: 'mainCourses',
    name: 'Горячие блюда',
    dishes: [
      {
        id: 'odzhahuri-so-svininoy',
        title: 'Оджахури со свининой',
        image: mainCourse1,
        price: 890,
        description: 'Обжаренные кусочки свинины с картофелем и луком в пряных специях.',
        slug: 'odzhahuri-so-svininoy',
      },
      {
        id: 'chahohbili',
        title: 'Чахохбили',
        image: mainCourse2,
        price: 820,
        description: 'Традиционное тушёное блюдо из курицы с томатами и зеленью.',
        slug: 'chahohbili',
      },
      {
        id: 'shkmeruli-s-kuricey',
        title: 'Шкмерули с курицей',
        image: mainCourse3,
        price: 860,
        description: 'Курица в сливочно-чесночном соусе, запечённая до золотистой корочки.',
        slug: 'shkmeruli-s-kuricey',
      },
    ],
  },
];

export function findDishBySlug(slug: string): { category: MenuCategory; dish: MenuDish } | null {
  for (const category of menuCategories) {
    const dish = category.dishes.find((item) => item.slug === slug);

    if (dish) {
      return { category, dish };
    }
  }

  return null;
}
