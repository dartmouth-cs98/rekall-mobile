// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../services/firebase';
import { createUser } from '../actions/userActions';
import { connect } from 'react-redux';

var database = firebase.database();

function writeUserData(userId, uid) {
  firebase.database().ref('users/' + userId).set({
    id: uid
  });
}   

class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      firstName: '',
      lastName: '',
      email: '', 
      password: '',
      errorMessage: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password)
      .then((res) => {
        console.log(res);
        res.user.updateProfile({
          displayName: this.state.firstName + ' ' + this.state.lastName
        })
        this.props.createUser(this.state.firstName, this.state.lastName, this.state.email.toLowerCase()).then(() => {
          console.log('uid: ' + res.user.uid)
          writeUserData(res.user.uid, this.props.user.uid)
          console.log('User registered successfully!');
          this.setState({
            isLoading: false,
            displayName: '',
            email: '', 
            password: ''
          })
          this.props.navigation.navigate('Login');
        });
      })
      .catch(error => this.setState({ 
        errorMessage: error.message,
        isLoading: false,
        displayName: '',
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
                placeholder="First name"
                placeholderTextColor="#8D8D8D"
                value={this.state.firstName}
                onChangeText={(val) => this.updateInputVal(val, 'firstName')}
              />      
              <TextInput
                style={styles.inputStyle}
                placeholder="Last name"
                placeholderTextColor="#8D8D8D"
                value={this.state.lastName}
                onChangeText={(val) => this.updateInputVal(val, 'lastName')}
              />
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
                <TouchableOpacity onPress={() => this.registerUser()}>
                  <View style={styles.buttonBox}>
                    <Text style={styles.signUpLabel}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
                
                {/* <Button
                  color="#3740FE"
                  title="Signup"
                  onPress={() => this.registerUser()}
                /> */}
                <Text 
                  style={styles.loginText}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Already Registered? Click here to login
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
  signUpLabel:{
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
    alignSelf: 'center',
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

export default connect(mapStateToProps, { createUser })(Signup);