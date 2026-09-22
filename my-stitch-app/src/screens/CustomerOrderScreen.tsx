import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { BranchHeader } from '../components/molecules/BranchHeader';
import { HeroBanner } from '../components/molecules/HeroBanner';
import { CategoryTabs } from '../components/molecules/CategoryTabs';
import { MenuList } from '../components/organisms/MenuList';
import { BottomCartBar } from '../components/organisms/BottomCartBar';
import { CheckoutModal } from '../components/organisms/CheckoutModal';
import { tableContext, heroBannerData, categories } from '../data/mockData';
import { useCart } from '../hooks/useCart';

export interface CustomerOrderScreenProps {
  readonly testID?: string;
}

export const CustomerOrderScreen: React.FC<CustomerOrderScreenProps> = ({ testID }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    cartItems,
    totalItemsCount,
    itemTotal,
    gstAmount,
    ecoDiscount,
    finalGrandTotal,
    selectedPaymentRoute,
    isCheckoutVisible,
    isPaymentSheetVisible,
    addToCart,
    updateQuantity,
    openCheckout,
    closeCheckout,
    openPaymentSheet,
    closePaymentSheet,
    setPaymentRoute,
  } = useCart();

  return (
    <View style={styles.container} testID={testID}>
      {/* Sticky header */}
      <BranchHeader tableContext={tableContext} />

      {/* Hero banner */}
      <HeroBanner
        pillTag={heroBannerData.pillTag}
        subTag={heroBannerData.subTag}
        headline={heroBannerData.headline}
        description={heroBannerData.description}
        feature1={heroBannerData.feature1}
        feature2={heroBannerData.feature2}
      />

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Menu list */}
      <View style={styles.menuContainer}>
        <MenuList
          selectedCategoryId={selectedCategory}
          cartItems={cartItems}
          onAddToCart={addToCart}
          onUpdateQuantity={updateQuantity}
        />
      </View>

      {/* Floating cart bar */}
      <BottomCartBar
        itemCount={totalItemsCount}
        grandTotal={finalGrandTotal}
        onReviewCart={openCheckout}
      />

      {/* Checkout bottom sheet */}
      <CheckoutModal
        visible={isCheckoutVisible}
        cartItems={cartItems}
        itemTotal={itemTotal}
        gstAmount={gstAmount}
        ecoDiscount={ecoDiscount}
        finalGrandTotal={finalGrandTotal}
        selectedPaymentRoute={selectedPaymentRoute}
        isPaymentSheetVisible={isPaymentSheetVisible}
        onClose={closeCheckout}
        onUpdateQuantity={updateQuantity}
        onSelectPayment={setPaymentRoute}
        onOpenPaymentSheet={openPaymentSheet}
        onClosePaymentSheet={closePaymentSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  menuContainer: {
    flex: 1,
  },
});

export default CustomerOrderScreen;
