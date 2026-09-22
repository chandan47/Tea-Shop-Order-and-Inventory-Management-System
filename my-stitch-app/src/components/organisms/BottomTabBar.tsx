import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export type AppTab = 'customer' | 'kitchen' | 'pos';

export interface BottomTabBarProps {
  readonly activeTab: AppTab;
  readonly onTabChange: (tab: AppTab) => void;
  readonly testID?: string;
}

interface TabConfig {
  readonly id: AppTab;
  readonly icon: string;
  readonly label: string;
}

const TABS: readonly TabConfig[] = [
  { id: 'customer', icon: '☕', label: 'Chai Bar' },
  { id: 'kitchen', icon: '🔥', label: 'Kitchen' },
  { id: 'pos', icon: '🧾', label: 'Counter POS' },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabChange,
  testID,
}) => {
  return (
    <View style={styles.container} testID={testID}>
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            testID={`tab-${tab.id}`}
            onPress={() => onTabChange(tab.id)}
            style={({ pressed }) => [
              styles.tabBtn,
              isActive && styles.tabBtnActive,
              pressed && !isActive && styles.tabBtnPressed,
            ]}
          >
            <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingBottom: spacing.spaceSm,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.spaceSm,
    paddingBottom: spacing.spaceXs,
    gap: 3,
    position: 'relative',
  },
  tabBtnActive: {
    backgroundColor: colors.primaryFixed,
  },
  tabBtnPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 3,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
});

export default BottomTabBar;
