// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firebase from '../services/firebase';
import { connect } from 'react-redux';
import { logIn, newVRCode } from '../actions/userActions';

class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      email: '', 
      password: '',
      isLoading: false
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        this.props.logIn(res.user.uid);
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Drawer', { screen: 'EXPLORE' })
      })
      .then(() => {
        newVRCode(this.props.user.uid);
      })
      .catch(error => this.setState({ 
        errorMessage: error.message,
        isLoading: false,
        email: '', 
        password: ''
      }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
         <Image
            style={styles.image}
            source={require('../assets/background.jpg')} />
        <View style={styles.thirdcontainer}>
            <Image style={styles.image2}
                  source={require('../assets/REKALL_header.png')}
            />
        </View>
        <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              placeholderTextColor="#8D8D8D"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              placeholderTextColor="#8D8D8D"
              value={this.state.password}
              onChangeText={(val) => this.updateInputVal(val, 'password')}
              maxLength={15}
              secureTextEntry={true}
            /> 
          </View>
          <View style={styles.signUpContainer}> 
            <TouchableOpacity onPress={() => this.userLogin()}>
              <View style={styles.buttonBox}>
                  <Text style={styles.loginLabel}>Login</Text>
              </View> 
            </TouchableOpacity>
            <Text 
              style={styles.loginText}
              onPress={() => this.props.navigation.navigate('Signup')}>
              Don't have account? Click here to signup
            </Text>
          </View>
        
        

        <View style = {styles.error}>
        <Text>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 10,
      //opacity: 0.3,
      width: '100%',
      height: '100%',
  },
  thirdcontainer: {
    //backgroundColor: 'pink',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    height: 100,
  },
  
  // container: {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   padding: 35,
  //   backgroundColor: '#fff'
  // },
  inputContainer: {
    height: 250,
    //backgroundColor: 'blue',
    justifyContent: 'flex-end',
    
  },
  inputStyle: {
    width: '80%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    color: '#8D8D8D',
  },
  signUpContainer: {
    display: 'flex',
    //backgroundColor: 'green',
    height: 150,
    justifyContent: 'center',
  },
  buttonBox:{
    backgroundColor: "#FFFFFF",
    width: 180,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset:{ width: 1, height: 3},
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  loginLabel:{
    textAlign: 'center',
    color: '#8D8D8D',
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 30,
  },
  loginText: {
    color: '#8D8D8D',
    marginTop: 25,
    textAlign: 'center'
  },
  error: {
    color: '#ff0000',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (userId) => dispatch(logIn(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);