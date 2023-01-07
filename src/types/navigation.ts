import {
  ChartSquareBarIcon,
  ShoppingBagIcon,
  TableIcon,
  TagIcon,
  ColorSwatchIcon,
  ScissorsIcon
} from '@heroicons/react/outline'

/**
 * Navigation tab element.
 */
export interface NavigationTab {
  name: string,
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element,
}

/**
 * Dashboard navigation tab names.
 */
export const tabs = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  colors: "Colors",
  sizes: "Sizes"
};

/**
 * Dashboard navigation tabs.
 */
export const navigation = [
  { name: tabs.dashboard, icon: ChartSquareBarIcon },
  { name: tabs.orders, icon: TableIcon },
  { name: tabs.products, icon: ShoppingBagIcon },
  { name: tabs.categories, icon: TagIcon },
  { name: tabs.colors, icon: ColorSwatchIcon },
  { name: tabs.sizes, icon: ScissorsIcon },
] as NavigationTab[];
