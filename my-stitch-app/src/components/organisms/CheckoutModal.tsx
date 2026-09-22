import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { CartItemRow } from '../molecules/CartItemRow';
import { BillBreakdown } from '../molecules/BillBreakdown';
import { PaymentOptionCard } from '../molecules/PaymentOptionCard';
import { Button } from '../atoms/Button';
import { CartItem } from '../../data/mockData';
import { PaymentRoute } from '../../hooks/useCart';

export interface CheckoutModalProps {
  readonly visible: boolean;
  readonly cartItems: readonly CartItem[];
  readonly itemTotal: number;
  readonly gstAmount: number;
  readonly ecoDiscount: number;
  readonly finalGrandTotal: number;
  readonly selectedPaymentRoute: PaymentRoute;
  readonly isPaymentSheetVisible: boolean;
  readonly onClose: () => void;
  readonly onUpdateQuantity: (itemId: string, delta: number) => void;
  readonly onSelectPayment: (route: PaymentRoute) => void;
  readonly onOpenPaymentSheet: () => void;
  readonly onClosePaymentSheet: () => void;
  readonly testID?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  cartItems,
  itemTotal,
  gstAmount,
  ecoDiscount,
  finalGrandTotal,
  selectedPaymentRoute,
  isPaymentSheetVisible,
  onClose,
  onUpdateQuantity,
  onSelectPayment,
  onOpenPaymentSheet,
  onClosePaymentSheet,
  testID,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      testID={testID}
    >
      {/* Scrim */}
      <Pressable style={styles.scrim} onPress={onClose} />

      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        {/* Handle */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Summary</Text>
          <Pressable onPress={onClose} style={styles.closeBtn} testID="checkout-close-btn">
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
        </View>

        {/* Scrollable body */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
        >
          {/* Cart items */}
          <Text style={styles.sectionTitle}>
            Your Order · {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Text>
          {cartItems.map((ci) => (
            <CartItemRow
              key={ci.menuItem.id}
              cartItem={ci}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}

          {/* Bill */}
          <View style={styles.gap} />
          <BillBreakdown
            itemTotal={itemTotal}
            gstAmount={gstAmount}
            ecoDiscount={ecoDiscount}
            finalGrandTotal={finalGrandTotal}
          />

          {/* Payment */}
          <View style={styles.gap} />
          <PaymentOptionCard
            selectedRoute={selectedPaymentRoute}
            onSelect={onSelectPayment}
          />

          <View style={styles.gap} />
        </ScrollView>

        {/* CTA */}
        <View style={styles.footer}>
          <Button
            label={
              selectedPaymentRoute === 'upi'
                ? `Pay ₹${finalGrandTotal.toFixed(2)} via UPI`
                : `Place Order · ₹${finalGrandTotal.toFixed(2)} Cash`
            }
            onPress={onOpenPaymentSheet}
            variant="primary"
            size="lg"
            testID="checkout-pay-btn"
          />
        </View>
      </View>

      {/* Payment confirmation modal */}
      <Modal
        visible={isPaymentSheetVisible}
        animationType="slide"
        transparent
        onRequestClose={onClosePaymentSheet}
      >
        <Pressable style={styles.scrim} onPress={onClosePaymentSheet} />
        <View style={[styles.sheet, styles.paymentSheet]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {selectedPaymentRoute === 'upi' ? 'UPI Payment' : 'Cash Order Placed'}
            </Text>
            <Pressable onPress={onClosePaymentSheet} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>
          <View style={styles.paymentContent}>
            {selectedPaymentRoute === 'upi' ? (
              <>
                <Text style={styles.qrPlaceholder}>📲</Text>
                <Text style={styles.paymentHeadline}>Scan to Pay</Text>
                <Text style={styles.paymentSubtitle}>
                  ₹{finalGrandTotal.toFixed(2)} · UPI / Bharat Pay
                </Text>
                <View style={styles.qrBox}>
                  <Text style={styles.qrBoxText}>QR Code</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.qrPlaceholder}>🧾</Text>
                <Text style={styles.paymentHeadline}>Order Sent to Kitchen!</Text>
                <Text style={styles.paymentSubtitle}>
                  Pay ₹{finalGrandTotal.toFixed(2)} at counter pickup
                </Text>
                <View style={styles.successBanner}>
                  <Text style={styles.successText}>
                    ✅  Your order is in the live queue — brewing starts shortly
                  </Text>
                </View>
              </>
            )}
            <Button
              label="Done"
              onPress={onClosePaymentSheet}
              variant="secondary"
              testID="payment-done-btn"
            />
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: colors.overlayDark,
  },
  sheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius.xl * 2,
    borderTopRightRadius: borderRadius.xl * 2,
    maxHeight: '85%',
    paddingTop: spacing.spaceSm,
  },
  paymentSheet: {
    maxHeight: '70%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.outlineVariant,
    alignSelf: 'center',
    marginBottom: spacing.spaceSm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.spaceMd,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  body: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.spaceMd,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: spacing.spaceSm,
  },
  gap: {
    height: spacing.gutter,
  },
  footer: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceMd,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
  paymentContent: {
    alignItems: 'center',
    padding: spacing.gutter,
    gap: spacing.spaceMd,
  },
  qrPlaceholder: {
    fontSize: 48,
    marginTop: spacing.spaceMd,
  },
  paymentHeadline: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
  },
  paymentSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  qrBox: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrBoxText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  successBanner: {
    backgroundColor: colors.statusGreenBg,
    borderRadius: borderRadius.lg,
    padding: spacing.spaceMd,
    borderWidth: 1,
    borderColor: colors.statusGreenBorder,
    width: '100%',
  },
  successText: {
    ...typography.bodyMd,
    color: colors.statusGreenText,
    textAlign: 'center',
  },
});

export default CheckoutModal;
