import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';


class WelcomeScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            // toMain: false,
        };
        this.onMainApp = this.onMainApp.bind(this);
    }

    onMainApp(){
        this.props.onMainApp(true)
        //console.log(this.state)
    }

    render() {
      return (
        <LinearGradient
        colors={['#FFFFFF', '#8D8D8D']}
        style={{flex: 1}}
        >
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
                        source={require('../assets/oculus.png')}
                    />
                </View>
                <View style={styles.fourthcontainer}>
                    <View style={styles.buttonbox}>
                        <Text style={styles.starttext}>Get Started</Text>
                        <Button style={styles.button}  mode="contained" onPress={this.onMainApp}>
                            <Icon name='angle-right' type='font-awesome' color='#8D8D8D'></Icon>
                        </Button>
                    </View>
                </View>
            </View> 
        </LinearGradient>
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
        backgroundColor: 'white',
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
        fontFamily: 'AppleSDGothicNeo-Thin',
    },
    starttext: {
        paddingTop: 10,
        paddingRight: 10,
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Thin',
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
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: '#4F4F50',
        fontSize: 53,
        paddingBottom: 5,
        fontWeight: "bold",
        textShadowColor: 'grey',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 5,
    }
});

export default WelcomeScreen;