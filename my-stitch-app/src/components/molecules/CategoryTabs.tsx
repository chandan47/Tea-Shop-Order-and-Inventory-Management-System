import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Category } from '../../data/mockData';

export interface CategoryTabsProps {
  readonly categories: readonly Category[];
  readonly selectedId: string;
  readonly onSelect: (id: string) => void;
  readonly testID?: string;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedId,
  onSelect,
  testID,
}) => {
  return (
    <View style={styles.wrapper} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((cat) => {
          const isSelected = cat.id === selectedId;
          return (
            <Pressable
              key={cat.id}
              testID={`category-tab-${cat.id}`}
              onPress={() => onSelect(cat.id)}
              style={({ pressed }) => [
                styles.tab,
                isSelected && styles.tabSelected,
                pressed && !isSelected && styles.tabPressed,
              ]}
            >
              <Text style={[styles.tabText, isSelected && styles.tabTextSelected]}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  scrollContent: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.spaceSm,
    gap: spacing.spaceXs,
  },
  tab: {
    paddingHorizontal: spacing.spaceMd,
    paddingVertical: spacing.spaceXs + 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainer,
  },
  tabSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabPressed: {
    backgroundColor: colors.surfaceContainerHigh,
  },
  tabText: {
    ...typography.labelMd,
    color: colors.onSurfaceVariant,
  },
  tabTextSelected: {
    color: colors.onPrimary,
  },
});

export default CategoryTabs;
