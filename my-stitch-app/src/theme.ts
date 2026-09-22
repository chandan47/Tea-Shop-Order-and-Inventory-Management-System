/**
 * Design system tokens extracted from Google Stitch wireframes for ChaiOps Tea Shop.
 * All components must reference tokens from this file. No hardcoded hex or rgba values in components.
 */

export const colors = {
  // Brand Primary & Containers
  primary: '#712c00',
  primaryContainer: '#92400e',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#ffc2a5',
  primaryFixed: '#ffdbcb',
  primaryFixedDim: '#ffb693',
  onPrimaryFixed: '#341000',
  onPrimaryFixedVariant: '#7a3000',
  inversePrimary: '#ffb693',

  // Secondary & Accents
  secondary: '#ac3400',
  secondaryContainer: '#fd6b36',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#5d1900',
  secondaryFixed: '#ffdbd0',
  secondaryFixedDim: '#ffb59d',
  onSecondaryFixed: '#390c00',
  onSecondaryFixedVariant: '#832600',

  // Tertiary (Fresh Leaf / Greens / Online badges)
  tertiary: '#004c20',
  tertiaryContainer: '#00672d',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#82e595',
  tertiaryFixed: '#95f8a7',
  tertiaryFixedDim: '#79db8d',
  onTertiaryFixed: '#00210a',
  onTertiaryFixedVariant: '#005323',

  // Surfaces & Backgrounds
  background: '#fff8f5',
  onBackground: '#1e1b19',
  surface: '#fff8f5',
  onSurface: '#1e1b19',
  surfaceDim: '#e0d8d5',
  surfaceBright: '#fff8f5',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#faf2ee',
  surfaceContainer: '#f4ece8',
  surfaceContainerHigh: '#eee7e3',
  surfaceContainerHighest: '#e9e1dd',
  surfaceVariant: '#e9e1dd',
  onSurfaceVariant: '#55433a',
  inverseSurface: '#33302d',
  inverseOnSurface: '#f7efeb',
  surfaceTint: '#9a4614',

  // Borders & Outlines
  outline: '#887269',
  outlineVariant: '#dcc1b6',

  // Error & Alerts
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  // Semantic Status Tags
  statusGreenBg: '#f0fdf4',
  statusGreenBorder: '#bbf7d0',
  statusGreenText: '#15803d',
  statusAmberBg: '#fffbeb',
  statusAmberBorder: '#fde68a',
  statusAmberText: '#b45309',
  statusRedBg: '#fef2f2',
  statusRedBorder: '#fecaca',
  statusRedText: '#b91c1c',
  statusTagBg: '#f5f5f4',
  statusTagBorder: '#e7e5e4',
  statusTagText: '#44403c',

  // Overlays & Neutral Dark
  darkNeutral: '#1c1917',
  darkCard: '#292524',
  overlayDark: 'rgba(0, 0, 0, 0.45)',
  overlaySubtle: 'rgba(0, 0, 0, 0.05)',
  transparent: 'transparent',
} as const;

export const spacing = {
  none: 0,
  spaceXs: 4,
  spaceSm: 8,
  spaceMd: 12,
  gutter: 16,
  spaceLg: 20,
  margin: 24,
  spaceXl: 28,
  space2xl: 32,
} as const;

export const borderRadius = {
  none: 0,
  sm: 2,
  default: 4,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

export const typography = {
  fontFamily: 'System',
  displayLg: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  statKpi: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700' as const,
    letterSpacing: -0.4,
  },
  headlineLg: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  headlineMd: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  headlineSm: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
  },
  bodyLg: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  bodyMd: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  bodySm: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  labelMd: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
  },
  labelSm: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600' as const,
    letterSpacing: 0.4,
  },
  tabularNumeric: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
} as const;

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
} as const;

export default theme;
