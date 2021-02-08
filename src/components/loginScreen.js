import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class LoginScreen extends Component {
    constructor(props) {
      super(props);
    }
    
    openPage = (page) => {
      const {navigation} = this.props;
      navigation.navigate(page);
    }

    render() {
      return (
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={require('../assets/loginbg.png')}
          >
          <View style={styles.textBox}>
              <Text style={styles.mainText}>Relive</Text>
              <Text style={styles.mainText}>Reality.</Text>
          </View>
          <View style={styles.buttonBox}>
              <Button uppercase={false} labelStyle={styles.labelText1} style={styles.loginButton} color='#60B572' mode='contained' onPress={()=> this.openPage('Login')}>Login</Button>
              <Button uppercase={false} labelStyle={styles.labelText2} style={styles.newAccountButton} color='white' mode='contained' onPress={()=> this.openPage('Signup')}>Create new account</Button>
          </View>
          </ImageBackground >
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
  textBox: {
      position: 'absolute',
      height: 100,
      width: 180, 
      //backgroundColor: 'red',
      //alignSelf: ',
      top: 130,
      left: 60,
  },
  mainText: {
      color: '#FFFFFF',
      fontFamily: 'AppleSDGothicNeo-Bold',
      fontSize: 50,
      shadowOffset:{  height: 1},
      shadowColor: 'black',
      shadowOpacity: 0.5,
  },
  buttonBox: {
      display: 'flex',
      //backgroundColor: 'green',
      height: 150,
      justifyContent: 'space-evenly',
      position: 'absolute',
      bottom: 80,
      alignSelf: 'center',
  },
  labelText1: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  labelText2: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  loginButton:{
      width: 250,
      height: 58,
      justifyContent: 'center',
      borderRadius: 30,
      opacity: 0.93,
  },
  newAccountButton:{
    width: 250,
    height: 58,
    justifyContent: 'center',
    borderRadius: 30,
    opacity: 0.90,
  },
});

export default LoginScreen;