import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { RadioOption } from '../atoms/RadioOption';
import { PaymentRoute } from '../../hooks/useCart';

export interface PaymentOptionCardProps {
  readonly selectedRoute: PaymentRoute;
  readonly onSelect: (route: PaymentRoute) => void;
  readonly testID?: string;
}

export const PaymentOptionCard: React.FC<PaymentOptionCardProps> = ({
  selectedRoute,
  onSelect,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <RadioOption
        id="payment-upi"
        label="⚡  UPI / Online Payment"
        subLabel="Immediate kitchen dispatch on scan — Zero wait"
        selected={selectedRoute === 'upi'}
        onSelect={() => onSelect('upi')}
      />

      <View style={styles.gap} />

      <RadioOption
        id="payment-cash"
        label="💵  Cash at Counter"
        subLabel="Order queued · pay at counter pickup"
        selected={selectedRoute === 'cash'}
        onSelect={() => onSelect('cash')}
      />

      {selectedRoute === 'upi' && (
        <View style={styles.upiHint}>
          <Text style={styles.upiHintText}>
            🚀  Instant kitchen ledger sync on payment confirmation
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.spaceSm,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.spaceXs,
  },
  gap: {
    height: 0,
  },
  upiHint: {
    backgroundColor: colors.statusGreenBg,
    borderRadius: borderRadius.lg,
    padding: spacing.spaceSm,
    borderWidth: 1,
    borderColor: colors.statusGreenBorder,
  },
  upiHintText: {
    ...typography.bodySm,
    color: colors.statusGreenText,
    textAlign: 'center',
  },
});

export default PaymentOptionCard;
