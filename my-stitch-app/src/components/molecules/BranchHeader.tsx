import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Badge } from '../atoms/Badge';
import { TableContext } from '../../data/mockData';

export interface BranchHeaderProps {
  readonly tableContext: TableContext;
  readonly testID?: string;
}

export const BranchHeader: React.FC<BranchHeaderProps> = ({ tableContext, testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      {/* Logo + Brand */}
      <View style={styles.logoRow}>
        <View style={styles.logoMark}>
          <Text style={styles.logoChar}>☕</Text>
        </View>
        <View style={styles.brandBlock}>
          <Text style={styles.brandName}>{tableContext.brandName}</Text>
          <Text style={styles.branchName}>{tableContext.branchName}</Text>
        </View>
      </View>

      {/* Table Badge + Avatar */}
      <View style={styles.rightBlock}>
        <View style={styles.tablePill}>
          {tableContext.isOnline && <Badge label="LIVE" variant="live" />}
          <Text style={styles.tableLabel}>
            {tableContext.branchName.split(' ')[0]} · #{tableContext.tableId}
          </Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceMd,
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoChar: {
    fontSize: 18,
  },
  brandBlock: {
    gap: 1,
  },
  brandName: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  branchName: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  rightBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceSm,
  },
  tablePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.spaceXs,
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  tableLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.labelMd,
    color: colors.onPrimary,
  },
});

export default BranchHeader;
