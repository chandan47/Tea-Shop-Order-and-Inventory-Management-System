import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, FlatList } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { QuantityStepper } from '../atoms/QuantityStepper';
import { menuItems, MenuItem } from '../../data/mockData';

export interface StaffPOSViewProps {
  readonly testID?: string;
}

interface POSCartItem {
  readonly item: MenuItem;
  quantity: number;
}

export const StaffPOSView: React.FC<StaffPOSViewProps> = ({ testID }) => {
  const [posCart, setPosCart] = useState<POSCartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addItem = (item: MenuItem) => {
    setPosCart((prev) => {
      const idx = prev.findIndex((ci) => ci.item.id === item.id);
      if (idx >= 0) {
        return prev.map((ci, i) =>
          i === idx ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQty = (itemId: string, delta: number) => {
    setPosCart((prev) =>
      prev
        .map((ci) =>
          ci.item.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const totalItems = posCart.reduce((acc, ci) => acc + ci.quantity, 0);
  const subtotal = posCart.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
  const gst = Math.round(subtotal * 0.05 * 100) / 100;
  const grandTotal = subtotal + gst;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setPosCart([]);
      setOrderPlaced(false);
    }, 2500);
  };

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🧾 Counter POS Terminal</Text>
        <Badge label="STAFF" variant="chef" />
      </View>

      <View style={styles.body}>
        {/* Left: Menu grid */}
        <View style={styles.menuPanel}>
          <Text style={styles.panelTitle}>Menu</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {menuItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => addItem(item)}
                style={({ pressed }) => [
                  styles.menuRow,
                  pressed && styles.menuRowPressed,
                ]}
                testID={`pos-menu-${item.id}`}
              >
                <View style={styles.menuRowInfo}>
                  <Text style={styles.menuRowName} numberOfLines={1}>{item.name}</Text>
                  {item.badge && item.badgeType && (
                    <Badge label={item.badge} variant={item.badgeType} />
                  )}
                </View>
                <Text style={styles.menuRowPrice}>₹{item.price}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Right: Cart + Bill */}
        <View style={styles.cartPanel}>
          <Text style={styles.panelTitle}>Current Order</Text>

          {posCart.length === 0 ? (
            <Text style={styles.emptyCart}>No items added yet</Text>
          ) : (
            <ScrollView style={styles.cartScroll} showsVerticalScrollIndicator={false}>
              {posCart.map((ci) => (
                <View key={ci.item.id} style={styles.cartRow}>
                  <View style={styles.cartRowInfo}>
                    <Text style={styles.cartRowName} numberOfLines={1}>{ci.item.name}</Text>
                    <Text style={styles.cartRowUnit}>₹{ci.item.price} × {ci.quantity}</Text>
                  </View>
                  <View style={styles.cartRowRight}>
                    <Text style={styles.cartRowTotal}>
                      ₹{(ci.item.price * ci.quantity).toFixed(2)}
                    </Text>
                    <QuantityStepper
                      quantity={ci.quantity}
                      onIncrement={() => updateQty(ci.item.id, 1)}
                      onDecrement={() => updateQty(ci.item.id, -1)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Bill */}
          {posCart.length > 0 && (
            <View style={styles.billBlock}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Items ({totalItems})</Text>
                <Text style={styles.billValue}>₹{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>GST (5%)</Text>
                <Text style={styles.billValue}>₹{gst.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.billRow}>
                <Text style={styles.grandLabel}>Total</Text>
                <Text style={styles.grandValue}>₹{grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          )}

          {/* Success */}
          {orderPlaced && (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>✅ Order sent to Kitchen!</Text>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Button
              label="🗑 Clear"
              onPress={() => setPosCart([])}
              variant="ghost"
              size="sm"
              disabled={posCart.length === 0}
            />
            <Button
              label={`Place Order · ₹${grandTotal.toFixed(2)}`}
              onPress={handlePlaceOrder}
              variant="primary"
              size="md"
              disabled={posCart.length === 0}
              testID="pos-place-order-btn"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  menuPanel: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.outlineVariant,
    padding: spacing.spaceMd,
  },
  cartPanel: {
    flex: 1,
    padding: spacing.spaceMd,
  },
  panelTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.spaceSm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.spaceSm,
    paddingHorizontal: spacing.spaceSm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.spaceXs,
    backgroundColor: colors.surfaceContainerLowest,
  },
  menuRowPressed: {
    backgroundColor: colors.primaryFixed,
  },
  menuRowInfo: {
    flex: 1,
    gap: 4,
  },
  menuRowName: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  menuRowPrice: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '700',
  },
  emptyCart: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.spaceLg,
  },
  cartScroll: {
    flex: 1,
  },
  cartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.spaceSm,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    gap: spacing.spaceXs,
  },
  cartRowInfo: {
    flex: 1,
  },
  cartRowName: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  cartRowUnit: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  cartRowRight: {
    alignItems: 'flex-end',
    gap: spacing.spaceXs,
  },
  cartRowTotal: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  billBlock: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: spacing.spaceSm,
    gap: spacing.spaceXs,
    marginTop: spacing.spaceSm,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  billLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  billValue: {
    ...typography.tabularNumeric,
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginVertical: 4,
  },
  grandLabel: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  grandValue: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '700',
  },
  successBanner: {
    backgroundColor: colors.statusGreenBg,
    borderRadius: borderRadius.lg,
    padding: spacing.spaceSm,
    borderWidth: 1,
    borderColor: colors.statusGreenBorder,
    marginTop: spacing.spaceXs,
  },
  successText: {
    ...typography.bodyMd,
    color: colors.statusGreenText,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.spaceSm,
    marginTop: spacing.spaceSm,
  },
});

export default StaffPOSView;
