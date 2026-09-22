import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface QuantityStepperProps {
  readonly quantity: number;
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
  readonly minQuantity?: number;
  readonly testID?: string;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 0,
  testID,
}) => {
  const canDecrement = quantity > minQuantity;

  return (
    <View style={styles.container} testID={testID}>
      <Pressable
        onPress={onDecrement}
        disabled={!canDecrement}
        style={({ pressed }) => [
          styles.stepBtn,
          !canDecrement && styles.stepBtnDisabled,
          pressed && canDecrement && styles.stepBtnPressed,
        ]}
        testID={testID ? `${testID}-decrement` : undefined}
      >
        <Text style={[styles.stepIcon, !canDecrement && styles.stepIconDisabled]}>−</Text>
      </Pressable>

      <View style={styles.countContainer}>
        <Text style={styles.countText}>{quantity}</Text>
      </View>

      <Pressable
        onPress={onIncrement}
        style={({ pressed }) => [
          styles.stepBtn,
          pressed && styles.stepBtnPressed,
        ]}
        testID={testID ? `${testID}-increment` : undefined}
      >
        <Text style={styles.stepIcon}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnDisabled: {
    opacity: 0.35,
  },
  stepBtnPressed: {
    backgroundColor: colors.outlineVariant,
  },
  stepIcon: {
    ...typography.headlineMd,
    color: colors.primary,
    lineHeight: 20,
  },
  stepIconDisabled: {
    color: colors.onSurfaceVariant,
  },
  countContainer: {
    minWidth: spacing.spaceLg,
    alignItems: 'center',
    paddingHorizontal: spacing.spaceXs,
  },
  countText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
});

export default QuantityStepper;
