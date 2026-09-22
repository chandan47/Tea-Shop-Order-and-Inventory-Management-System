import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { KitchenQueueView } from '../components/organisms/KitchenQueueView';
import { Badge } from '../components/atoms/Badge';
import { useOrderQueue } from '../hooks/useOrderQueue';

export interface KitchenQueueScreenProps {
  readonly testID?: string;
}

export const KitchenQueueScreen: React.FC<KitchenQueueScreenProps> = ({ testID }) => {
  const { tickets, markCashCollected, markReady, markHandover } = useOrderQueue();

  const totalActive = tickets.filter((t) => t.stage !== 'handover').length;

  return (
    <View style={styles.container} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Live Kitchen Queue</Text>
          <Text style={styles.headerSub}>KDS · KR Mangalam Flagship</Text>
        </View>
        <View style={styles.headerRight}>
          <Badge label="LIVE" variant="live" />
          <View style={styles.activeCount}>
            <Text style={styles.activeCountNum}>{totalActive}</Text>
            <Text style={styles.activeCountLabel}>active</Text>
          </View>
        </View>
      </View>

      {/* Kanban queue */}
      <KitchenQueueView
        tickets={tickets}
        onMarkCashCollected={markCashCollected}
        onMarkReady={markReady}
        onMarkHandover={markHandover}
      />
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
    backgroundColor: colors.darkCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.inverseSurface,
  },
  headerLeft: {
    gap: 2,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onPrimary,
  },
  headerSub: {
    ...typography.bodySm,
    color: colors.inverseOnSurface,
    opacity: 0.7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
  },
  activeCount: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: 4,
  },
  activeCountNum: {
    ...typography.headlineMd,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  activeCountLabel: {
    ...typography.labelSm,
    color: colors.onPrimaryContainer,
  },
});

export default KitchenQueueScreen;
