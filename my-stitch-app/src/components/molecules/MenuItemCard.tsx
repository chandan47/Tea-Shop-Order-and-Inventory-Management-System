import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Badge } from '../atoms/Badge';
import { QuantityStepper } from '../atoms/QuantityStepper';
import { MenuItem, CartItem } from '../../data/mockData';

export interface MenuItemCardProps {
  readonly item: MenuItem;
  readonly cartItem?: CartItem;
  readonly onAddToCart: (item: MenuItem) => void;
  readonly onUpdateQuantity: (itemId: string, delta: number) => void;
  readonly testID?: string;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  testID,
}) => {
  const quantity = cartItem?.quantity ?? 0;

  return (
    <View style={styles.card} testID={testID ?? `menu-item-${item.id}`}>
      {/* Item image */}
      <Image
        source={{ uri: item.imageUri }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Badges row */}
        {item.badge && item.badgeType && (
          <Badge label={item.badge} variant={item.badgeType} />
        )}

        {/* Name + Price */}
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

        {/* Tags */}
        {item.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {item.tags.map((tag) => (
              <Badge key={tag} label={tag} variant="tag" />
            ))}
          </View>
        )}

        {/* Cart controls */}
        <View style={styles.cartRow}>
          {item.unitLabel ? (
            <Text style={styles.unitLabel}>{item.unitLabel}</Text>
          ) : (
            <View />
          )}
          {quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              onIncrement={() => onUpdateQuantity(item.id, 1)}
              onDecrement={() => onUpdateQuantity(item.id, -1)}
              testID={`stepper-${item.id}`}
            />
          ) : (
            <Pressable
              onPress={() => onAddToCart(item)}
              style={({ pressed }) => [styles.addBtn, pressed && styles.addBtnPressed]}
              testID={`add-btn-${item.id}`}
            >
              <Text style={styles.addBtnText}>+ ADD</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    marginHorizontal: spacing.gutter,
    marginVertical: spacing.spaceXs,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surfaceContainer,
  },
  content: {
    padding: spacing.spaceMd,
    gap: spacing.spaceXs,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.spaceSm,
  },
  name: {
    ...typography.headlineSm,
    color: colors.onSurface,
    flex: 1,
  },
  price: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '700',
  },
  description: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.spaceXs,
    marginTop: 2,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.spaceXs,
  },
  unitLabel: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  addBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.spaceMd,
    paddingVertical: spacing.spaceXs + 2,
  },
  addBtnPressed: {
    opacity: 0.75,
  },
  addBtnText: {
    ...typography.labelMd,
    color: colors.onPrimary,
  },
});

export default MenuItemCard;
