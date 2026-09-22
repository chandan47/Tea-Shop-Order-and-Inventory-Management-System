import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Badge } from '../atoms/Badge';

export interface HeroBannerProps {
  readonly pillTag: string;
  readonly subTag: string;
  readonly headline: string;
  readonly description: string;
  readonly feature1: string;
  readonly feature2: string;
  readonly testID?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  pillTag,
  subTag,
  headline,
  description,
  feature1,
  feature2,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      {/* Left Content */}
      <View style={styles.contentBlock}>
        <View style={styles.tagRow}>
          <Badge label={pillTag} variant="pill" />
          <Text style={styles.subTag}>{subTag}</Text>
        </View>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.featureRow}>
          <View style={styles.featureChip}>
            <Text style={styles.featureIcon}>🏺</Text>
            <Text style={styles.featureText}>{feature1}</Text>
          </View>
          <View style={styles.featureChip}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>{feature2}</Text>
          </View>
        </View>
      </View>

      {/* Right Illustration */}
      <View style={styles.illustrationBlock}>
        <View style={styles.kulhadEmoji}>
          <Text style={styles.kulhadText}>🍵</Text>
        </View>
        <View style={styles.glowRing} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.darkCard,
    marginHorizontal: spacing.gutter,
    marginTop: spacing.spaceSm,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    padding: spacing.gutter,
    alignItems: 'center',
  },
  contentBlock: {
    flex: 1,
    gap: spacing.spaceSm,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
  },
  subTag: {
    ...typography.labelSm,
    color: colors.onPrimaryFixed,
    opacity: 0.7,
  },
  headline: {
    ...typography.headlineMd,
    color: colors.onPrimary,
  },
  description: {
    ...typography.bodySm,
    color: colors.inverseOnSurface,
    opacity: 0.75,
  },
  featureRow: {
    flexDirection: 'row',
    gap: spacing.spaceXs,
    marginTop: spacing.spaceXs,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.inverseSurface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: 3,
  },
  featureIcon: {
    fontSize: 10,
  },
  featureText: {
    ...typography.labelSm,
    color: colors.inverseOnSurface,
  },
  illustrationBlock: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kulhadEmoji: {
    zIndex: 2,
  },
  kulhadText: {
    fontSize: 52,
  },
  glowRing: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    opacity: 0.2,
  },
});

export default HeroBanner;
