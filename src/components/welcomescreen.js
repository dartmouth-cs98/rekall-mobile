import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, PanResponder} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

class WelcomeScreen extends Component {
    render() {
      return (
        <View style={styles.container}>
            <View style={styles.firstcontainer}>
                <View style={styles.textbox}>
                    <Text style={styles.text}>RELIVE</Text>
                    <Text style={styles.text}>DISCOVER</Text>
                    <Text style={styles.text}>SHARE</Text>
                    <Text style={styles.text}>EXPLORE</Text>
                </View>
            </View>
            <View style={styles.secondcontainer}>
                <View style={styles.explanationBox}>
                    <Text style={styles.explanation}>Welcome to Rekall. Take memory sharing to the next level. Experience memories that last forever.</Text>
                </View>
            </View>
            <View style={styles.thirdcontainer}>
                <Image style={styles.image}
                    source={{ uri: '/Users/frantennis/rekall-mobile/src/assets/oculus.png'}}
                />
            </View>
            <View style={styles.fourthcontainer}>
                <View style={styles.buttonbox}>
                    <Text style={styles.starttext}>Get Started</Text>
                    <Button style={styles.button}  mode="outlined" onPress={() => console.log('Pressed')}>
                        <Icon name='angle-right' type='font-awesome' color='#8D8D8D'></Icon>
                    </Button>
                </View>
            </View>
        </View> 
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      display:'flex',
    },
    gradient:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstcontainer:{
        display: 'flex',
        //backgroundColor: 'red',
        height: 400,
        justifyContent: 'flex-end'
    },
    secondcontainer:{
        //backgroundColor: 'yellow',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    thirdcontainer: {
        //backgroundColor: 'pink',
        justifyContent: 'center',
        height: 280,
    },
    fourthcontainer: {
        //backgroundColor: 'teal',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    buttonbox: {
        width: 200,
        height: 50,
        //backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 5,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
    },
    image: {
        height: 250,
    },
    explanationBox:{
        //backgroundColor: 'grey',
        height: 90,
        width: 350,
        paddingRight: 30,
        alignSelf: 'center',
    },
    explanation:{
        fontSize: 20,
    },
    starttext: {
        paddingTop: 10,
        paddingRight: 10,
        fontSize: 20,
    },
    startbutton:{
        paddingTop: 30,
        width: 30,
    },
    textbox:{
        display: 'flex',
        width: 300,
        height: 300,
        paddingLeft: 30,
        //backgroundColor: "green",
        justifyContent: 'center'
    },
    text:{
        fontSize: 40,
        paddingBottom: 5,
    }
});

export default WelcomeScreen;