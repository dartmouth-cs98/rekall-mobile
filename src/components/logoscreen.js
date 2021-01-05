import React, { Component } from 'react';
import { StyleSheet, View, Image, Button, Text, ImageBackground, Alert} from 'react-native';


class LogoScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={{ uri: '/Users/frantennis/rekall-mobile/src/assets/rekall-logo.png'}}
          />
        
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#E5E4E0'
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    button: {
      height: 40,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 10,
  },
});

export default LogoScreen;
