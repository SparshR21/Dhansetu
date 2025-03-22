import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();  // Hide splash screen after 2 seconds
      navigation.navigate('Home');  // Navigate to Home screen
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/splash.png')}  // Place your image in the assets folder
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F8DD', // Match background color
  },
  image: {
    width: 250,  // Adjust based on your design
    height: 250,
  },
});

export default Splash;
