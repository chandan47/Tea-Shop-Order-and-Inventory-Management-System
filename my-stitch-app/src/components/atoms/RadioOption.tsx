import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface RadioOptionProps {
  readonly id: string;
  readonly label: string;
  readonly subLabel?: string;
  readonly selected: boolean;
  readonly onSelect: () => void;
  readonly testID?: string;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  label,
  subLabel,
  selected,
  onSelect,
  testID,
}) => {
  return (
    <Pressable
      testID={testID ?? id}
      onPress={onSelect}
      style={({ pressed }) => [
        styles.container,
        selected && styles.containerSelected,
        pressed && styles.containerPressed,
      ]}
    >
      <View style={styles.radioRow}>
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
          {subLabel ? (
            <Text style={styles.subLabel}>{subLabel}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.outlineVariant,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLowest,
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryFixed,
  },
  containerPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceMd,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  labelSelected: {
    color: colors.primary,
  },
  subLabel: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});

export default RadioOption;
