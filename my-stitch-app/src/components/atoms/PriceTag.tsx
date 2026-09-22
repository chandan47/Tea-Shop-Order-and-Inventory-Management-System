import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export interface PriceTagProps {
  readonly amount: number;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly strikethrough?: boolean;
  readonly testID?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  amount,
  size = 'md',
  strikethrough = false,
  testID,
}) => {
  const formatted = `₹${amount.toFixed(2)}`;

  const textStyle = [
    styles.base,
    size === 'sm' && styles.sm,
    size === 'lg' && styles.lg,
    strikethrough && styles.strikethrough,
  ];

  return (
    <Text testID={testID} style={textStyle}>
      {formatted}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    ...typography.tabularNumeric,
    color: colors.onSurface,
  },
  sm: {
    fontSize: 11,
    lineHeight: 14,
  },
  lg: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: colors.onSurfaceVariant,
  },
});

export default PriceTag;
