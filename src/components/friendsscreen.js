import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabViewExample from './friendsTabs';
 


class FriendsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    

    render(){
        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <View style={styles.menuBox}>
                            <Text style={styles.headerText}>FRIENDS</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.addFriendContainer}>
                        <Icon style={styles.addFriendIcon} name='plus' size={50} type='feather' color='#838484' 
                        onPress={()=> console.log('Add Friend Pressed')}>
                        </Icon>
                    </View>
                    <View style={styles.secondContainer}>
                        <TabViewExample />
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
    addFriendContainer: {
        height: 50,
        //backgroundColor: 'green',
    },
    scene:{
        flex: 1,
    },
    addFriendIcon:{
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
    secondContainer: {
        paddingTop: 30,
        height: 730,
        //backgroundColor: 'red',
    },
});



export default FriendsScreen;