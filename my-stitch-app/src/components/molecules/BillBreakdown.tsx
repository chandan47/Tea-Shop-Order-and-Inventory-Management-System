import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { checkoutCharges } from '../../data/mockData';

export interface BillBreakdownProps {
  readonly itemTotal: number;
  readonly gstAmount: number;
  readonly ecoDiscount: number;
  readonly finalGrandTotal: number;
  readonly testID?: string;
}

export const BillBreakdown: React.FC<BillBreakdownProps> = ({
  itemTotal,
  gstAmount,
  ecoDiscount,
  finalGrandTotal,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      {/* Line items */}
      <BillRow label="Items Total" value={`₹${itemTotal.toFixed(2)}`} />
      <BillRow
        label={`GST (${(checkoutCharges.gstRate * 100).toFixed(0)}% CGST + SGST)`}
        value={`₹${gstAmount.toFixed(2)}`}
      />
      <BillRow
        label="Packaging"
        value={checkoutCharges.packagingLabel}
        valueStyle={styles.freeLabel}
      />
      <BillRow
        label="Platform Fee"
        value={checkoutCharges.platformFeeLabel}
        valueStyle={styles.freeLabel}
      />
      <BillRow
        label="Eco Kulhad Deposit Discount"
        value={`-₹${ecoDiscount.toFixed(2)}`}
        valueStyle={styles.discountLabel}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* Grand Total */}
      <View style={styles.grandRow}>
        <Text style={styles.grandLabel}>Grand Total</Text>
        <Text style={styles.grandValue}>₹{finalGrandTotal.toFixed(2)}</Text>
      </View>

      {/* Footer notice */}
      <Text style={styles.footer}>{checkoutCharges.footerNotice}</Text>
    </View>
  );
};

interface BillRowProps {
  readonly label: string;
  readonly value: string;
  readonly valueStyle?: object;
}

const BillRow: React.FC<BillRowProps> = ({ label, value, valueStyle }) => (
  <View style={rowStyles.container}>
    <Text style={rowStyles.label}>{label}</Text>
    <Text style={[rowStyles.value, valueStyle]}>{value}</Text>
  </View>
);

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.spaceXs,
  },
  label: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  value: {
    ...typography.tabularNumeric,
    color: colors.onSurface,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.xl,
    padding: spacing.gutter,
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.spaceXs,
  },
  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.spaceXs,
  },
  grandLabel: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  grandValue: {
    ...typography.headlineMd,
    color: colors.primary,
    fontWeight: '700',
  },
  freeLabel: {
    color: colors.tertiary,
    fontWeight: '600',
  },
  discountLabel: {
    color: colors.tertiary,
    fontWeight: '700',
  },
  footer: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.spaceSm,
    fontStyle: 'italic',
  },
});

export default BillBreakdown;
