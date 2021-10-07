import * as React from 'react';
import {View, Text, StatusBar, StyleSheet, SafeAreaView} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
