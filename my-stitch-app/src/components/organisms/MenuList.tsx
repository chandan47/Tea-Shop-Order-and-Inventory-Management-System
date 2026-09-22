import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { MenuItem, CartItem, menuItems as allMenuItems } from '../../data/mockData';
import { MenuItemCard } from '../molecules/MenuItemCard';
import { spacing } from '../../theme';

export interface MenuListProps {
  readonly selectedCategoryId: string;
  readonly cartItems: readonly CartItem[];
  readonly onAddToCart: (item: MenuItem) => void;
  readonly onUpdateQuantity: (itemId: string, delta: number) => void;
  readonly testID?: string;
}

export const MenuList: React.FC<MenuListProps> = ({
  selectedCategoryId,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  testID,
}) => {
  const filtered = selectedCategoryId === 'all'
    ? allMenuItems
    : allMenuItems.filter((item) => item.categoryId === selectedCategoryId);

  const cartMap = new Map(cartItems.map((ci) => [ci.menuItem.id, ci]));

  return (
    <FlatList
      testID={testID}
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <MenuItemCard
          item={item}
          cartItem={cartMap.get(item.id)}
          onAddToCart={onAddToCart}
          onUpdateQuantity={onUpdateQuantity}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 120, // space for bottom cart bar
    paddingTop: spacing.spaceSm,
  },
  separator: {
    height: spacing.spaceXs,
  },
});

export default MenuList;
