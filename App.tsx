import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useEffect} from "react";
import firestore from '@react-native-firebase/firestore';

export default function App() {


  useEffect(() => {

    (async () => {
      const users = await firestore().collection('Users').doc('Fdl1XP0hb8fZL3RzFjXk').get();

      console.log(users)
    })()
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
