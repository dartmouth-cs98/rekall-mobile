import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';

class GalleryScreen extends Component {
    constructor(props){
        super(props);
        this.state={

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
                            <Text style={styles.headerText}>GALLERY</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={styles.myAlbumsContainer}>
                        <View style={styles.albumHeaderBox}>
                            <Text style={styles.albumTitle}>My Albums</Text>
                        </View>
                        <View style={styles.albumsContainer}>
                            
                        </View>
                    </View>
                    <View style={styles.sharedAlbumsContainer}>
                        <View style={styles.albumHeaderBox}>
                            <Text style={styles.albumTitle}>Shared Albums</Text>
                        </View>
                    </View>
                    
                    <View style={styles.bottomContainer}>
                        <Icon style={styles.plusIcon} name='add-circle-outline' size='60' type='ionicon' color='#686868'
                        onPress={()=>console.log('Add album')}></Icon>
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
    firstContainer:{
        height: 160,
        //backgroundColor: 'blue',
        justifyContent: 'flex-end',
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
    bottomContainer: {
        height:  20,
        //backgroundColor: '#C4C4C4',
        justifyContent: 'flex-end',
        //opacity: 0.6,
        paddingRight: 20,
    },
    plusIcon:{
        height: 60,
        width: 60,
        alignSelf: 'flex-end',
        //backgroundColor: 'red',
    },
    myAlbumsContainer:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'teal',
    },
    albumHeaderBox:{
        height: 50,
        //backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
    },
    albumsContainer: {
        //height: 350,
        //backgroundColor: 'teal',
    },
    albumTitle:{
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 20,
        paddingLeft: 15,
    },
    sharedAlbumsContainer:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'lightblue'
    },

});

export default GalleryScreen;