import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface BottomCartBarProps {
  readonly itemCount: number;
  readonly grandTotal: number;
  readonly onReviewCart: () => void;
  readonly testID?: string;
}

export const BottomCartBar: React.FC<BottomCartBarProps> = ({
  itemCount,
  grandTotal,
  onReviewCart,
  testID,
}) => {
  if (itemCount === 0) return null;

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        onPress={onReviewCart}
        style={({ pressed }) => [styles.bar, pressed && styles.barPressed]}
        testID="bottom-cart-bar-btn"
      >
        <View style={styles.leftBlock}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{itemCount}</Text>
          </View>
          <Text style={styles.reviewLabel}>Review Cart</Text>
        </View>
        <Text style={styles.totalText}>₹{grandTotal.toFixed(2)}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // above bottom tab bar
    left: spacing.gutter,
    right: spacing.gutter,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceMd,
    shadowColor: colors.darkNeutral,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  barPressed: {
    opacity: 0.85,
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
  },
  countBadge: {
    width: 26,
    height: 26,
    borderRadius: borderRadius.full,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    ...typography.labelMd,
    color: colors.onSecondaryContainer,
    fontWeight: '700',
  },
  reviewLabel: {
    ...typography.headlineSm,
    color: colors.onPrimary,
  },
  totalText: {
    ...typography.headlineMd,
    color: colors.onPrimary,
    fontWeight: '700',
  },
});

export default BottomCartBar;
