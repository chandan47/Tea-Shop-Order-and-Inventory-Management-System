import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface BadgeProps {
  readonly label: string;
  readonly variant?: 'bestseller' | 'chef' | 'pairing' | 'live' | 'tag' | 'pill' | 'highlight';
  readonly testID?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'tag',
  testID,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'bestseller':
        return styles.bestsellerContainer;
      case 'chef':
        return styles.chefContainer;
      case 'pairing':
        return styles.pairingContainer;
      case 'live':
        return styles.liveContainer;
      case 'pill':
        return styles.pillContainer;
      case 'highlight':
        return styles.highlightContainer;
      case 'tag':
      default:
        return styles.tagContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'bestseller':
        return styles.bestsellerText;
      case 'chef':
        return styles.chefText;
      case 'pairing':
        return styles.pairingText;
      case 'live':
        return styles.liveText;
      case 'pill':
        return styles.pillText;
      case 'highlight':
        return styles.highlightText;
      case 'tag':
      default:
        return styles.tagText;
    }
  };

  return (
    <View style={[styles.baseBadge, getContainerStyle()]} testID={testID}>
      {variant === 'live' && <View style={styles.liveDot} />}
      <Text style={[styles.baseText, getTextStyle()]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  baseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.spaceXs + 2,
    paddingVertical: spacing.spaceXs / 2,
    alignSelf: 'flex-start',
  },
  baseText: {
    ...typography.labelSm,
  },
  bestsellerContainer: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
  },
  bestsellerText: {
    color: colors.onSecondary,
    fontWeight: '700',
  },
  chefContainer: {
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.sm,
  },
  chefText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  pairingContainer: {
    backgroundColor: colors.tertiaryContainer,
    borderRadius: borderRadius.sm,
  },
  pairingText: {
    color: colors.onTertiary,
    fontWeight: '700',
  },
  liveContainer: {
    backgroundColor: colors.statusGreenBg,
    borderColor: colors.statusGreenBorder,
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.spaceSm,
    gap: spacing.spaceXs,
  },
  liveText: {
    color: colors.statusGreenText,
    fontWeight: '600',
  },
  pillContainer: {
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.spaceSm,
  },
  pillText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  highlightContainer: {
    backgroundColor: colors.statusAmberBg,
    borderColor: colors.statusAmberBorder,
    borderWidth: 1,
    borderRadius: borderRadius.sm,
  },
  highlightText: {
    color: colors.statusAmberText,
    fontWeight: '700',
  },
  tagContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    lineHeight: 13,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.tertiary,
  },
});

export default Badge;
