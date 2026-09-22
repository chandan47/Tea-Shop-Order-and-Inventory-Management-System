import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CustomerOrderScreen } from './src/screens/CustomerOrderScreen';
import { KitchenQueueScreen } from './src/screens/KitchenQueueScreen';
import { StaffPOSScreen } from './src/screens/StaffPOSScreen';
import { BottomTabBar, AppTab } from './src/components/organisms/BottomTabBar';
import { colors } from './src/theme';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('customer');

  const renderScreen = () => {
    switch (activeTab) {
      case 'kitchen':
        return <KitchenQueueScreen />;
      case 'pos':
        return <StaffPOSScreen />;
      case 'customer':
      default:
        return <CustomerOrderScreen />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.container}>
          <View style={styles.screenContainer}>
            {renderScreen()}
          </View>
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});
