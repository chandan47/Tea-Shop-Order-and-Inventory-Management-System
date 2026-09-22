import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { StaffPOSView } from '../components/organisms/StaffPOSView';

export interface StaffPOSScreenProps {
  readonly testID?: string;
}

export const StaffPOSScreen: React.FC<StaffPOSScreenProps> = ({ testID }) => {
  return (
    <View style={styles.container} testID={testID}>
      <StaffPOSView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});

export default StaffPOSScreen;
