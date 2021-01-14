import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';

class ExploreScreen extends Component {

    render(){
        return(
            <LinearGradient
            colors={['#FFFFFF', '#8D8D8D']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <View style={styles.menuBox}>
                            <Text style={styles.headerText}>EXPLORE</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity>
                        
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
    firstContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 150,
        //backgroundColor: 'green',
        alignContent: 'flex-end',
    },
    menuBox:{
        display: 'flex',
        height: 100,
        width: 380,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    menuButton:{
        alignSelf: 'center',
    },
    image:{
        height: 60,
        width: 50,
        alignSelf: 'center',
    },
    headerText:{
        alignSelf: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: '#2C2C2C',
        fontSize: 22,
        paddingBottom: 5,
        fontWeight: "bold",
        textShadowColor: 'grey',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 5,
    },

});

export default ExploreScreen;
