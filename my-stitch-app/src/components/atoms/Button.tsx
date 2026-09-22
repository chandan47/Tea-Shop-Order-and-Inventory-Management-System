import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';

export interface ButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly testID?: string;
}

const containerStyles: Record<NonNullable<ButtonProps['variant']>, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  ghost: { backgroundColor: colors.transparent },
  danger: { backgroundColor: colors.error },
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, ViewStyle> = {
  sm: { paddingHorizontal: spacing.spaceMd, paddingVertical: spacing.spaceXs + 2, minHeight: 32 },
  md: { paddingHorizontal: spacing.spaceLg, paddingVertical: spacing.spaceSm + 2, minHeight: 44 },
  lg: { paddingHorizontal: spacing.margin, paddingVertical: spacing.spaceMd, minHeight: 52 },
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  testID,
}) => {
  const textColorStyle = {
    primary: { color: colors.onPrimary },
    secondary: { color: colors.onSurface },
    ghost: { color: colors.primary },
    danger: { color: colors.onError },
  }[variant];

  const sizeTextOverride =
    size === 'sm'
      ? { fontSize: 12, lineHeight: 16 }
      : size === 'lg'
      ? { fontSize: 17, lineHeight: 22 }
      : undefined;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        containerStyles[variant],
        sizeStyles[size],
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.onPrimary : colors.primary}
        />
      ) : (
        <Text style={[styles.baseText, textColorStyle, sizeTextOverride]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.78,
  },
  baseText: {
    ...typography.headlineSm,
  },
});

export default Button;
