import { useState, useMemo } from 'react';
import { MenuItem, CartItem, initialCartItems, checkoutCharges } from '../data/mockData';

export type PaymentRoute = 'upi' | 'cash';

export interface UseCartReturn {
  readonly cartItems: readonly CartItem[];
  readonly totalItemsCount: number;
  readonly itemTotal: number;
  readonly gstAmount: number;
  readonly ecoDiscount: number;
  readonly finalGrandTotal: number;
  readonly selectedPaymentRoute: PaymentRoute;
  readonly isCheckoutVisible: boolean;
  readonly isPaymentSheetVisible: boolean;
  readonly setPaymentRoute: (route: PaymentRoute) => void;
  readonly updateQuantity: (itemId: string, delta: number) => void;
  readonly addToCart: (item: MenuItem) => void;
  readonly openCheckout: () => void;
  readonly closeCheckout: () => void;
  readonly openPaymentSheet: () => void;
  readonly closePaymentSheet: () => void;
}

export function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<readonly CartItem[]>(initialCartItems);
  const [selectedPaymentRoute, setSelectedPaymentRoute] = useState<PaymentRoute>('upi');
  const [isCheckoutVisible, setIsCheckoutVisible] = useState<boolean>(false);
  const [isPaymentSheetVisible, setIsPaymentSheetVisible] = useState<boolean>(false);

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.menuItem.id === itemId);
      if (existingIndex === -1 && delta > 0) {
        return prev;
      }
      return prev
        .map((ci, index) => {
          if (index === existingIndex) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.menuItem.id === item.id);
      if (existingIndex >= 0) {
        return prev.map((ci, idx) =>
          idx === existingIndex ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1, selectedModifiers: [] }];
    });
  };

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  }, [cartItems]);

  const itemTotal = useMemo(() => {
    return cartItems.reduce((acc, ci) => acc + ci.menuItem.price * ci.quantity, 0);
  }, [cartItems]);

  const gstAmount = useMemo(() => {
    return Math.round(itemTotal * checkoutCharges.gstRate * 100) / 100;
  }, [itemTotal]);

  const ecoDiscount = checkoutCharges.ecoDiscountAmount;

  const finalGrandTotal = useMemo(() => {
    const raw = itemTotal + gstAmount - ecoDiscount;
    return Math.max(0, Math.round(raw * 100) / 100);
  }, [itemTotal, gstAmount, ecoDiscount]);

  return {
    cartItems,
    totalItemsCount,
    itemTotal,
    gstAmount,
    ecoDiscount,
    finalGrandTotal,
    selectedPaymentRoute,
    isCheckoutVisible,
    isPaymentSheetVisible,
    setPaymentRoute: setSelectedPaymentRoute,
    updateQuantity,
    addToCart,
    openCheckout: () => setIsCheckoutVisible(true),
    closeCheckout: () => setIsCheckoutVisible(false),
    openPaymentSheet: () => setIsPaymentSheetVisible(true),
    closePaymentSheet: () => setIsPaymentSheetVisible(false),
  };
}

export default useCart;
