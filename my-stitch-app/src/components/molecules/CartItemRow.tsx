import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { QuantityStepper } from '../atoms/QuantityStepper';
import { CartItem } from '../../data/mockData';

export interface CartItemRowProps {
  readonly cartItem: CartItem;
  readonly onUpdateQuantity: (itemId: string, delta: number) => void;
  readonly testID?: string;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  cartItem,
  onUpdateQuantity,
  testID,
}) => {
  const lineTotal = cartItem.menuItem.price * cartItem.quantity;

  return (
    <View style={styles.container} testID={testID ?? `cart-row-${cartItem.menuItem.id}`}>
      <View style={styles.infoBlock}>
        <Text style={styles.name} numberOfLines={1}>{cartItem.menuItem.name}</Text>
        {cartItem.selectedModifiers.length > 0 && (
          <Text style={styles.modifiers} numberOfLines={2}>
            {cartItem.selectedModifiers.join(' · ')}
          </Text>
        )}
        <Text style={styles.unitPrice}>₹{cartItem.menuItem.price} / unit</Text>
      </View>

      <View style={styles.rightBlock}>
        <Text style={styles.lineTotal}>₹{lineTotal.toFixed(2)}</Text>
        <QuantityStepper
          quantity={cartItem.quantity}
          onIncrement={() => onUpdateQuantity(cartItem.menuItem.id, 1)}
          onDecrement={() => onUpdateQuantity(cartItem.menuItem.id, -1)}
          testID={`cart-stepper-${cartItem.menuItem.id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.spaceMd,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    gap: spacing.spaceMd,
  },
  infoBlock: {
    flex: 1,
    gap: 3,
  },
  name: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  modifiers: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  unitPrice: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  rightBlock: {
    alignItems: 'flex-end',
    gap: spacing.spaceXs,
  },
  lineTotal: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '700',
  },
});

export default CartItemRow;
