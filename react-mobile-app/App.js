import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from './router';

export default class App extends React.Component {
  render() {
    return (
        <Navigation style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    minHeight:800
  }
});

console.disableYellowBox = true;
