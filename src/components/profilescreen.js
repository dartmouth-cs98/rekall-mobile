import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';


class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileName: "Profile Name",
            email: "email@dartmouth.edu",
            activeIndex:0,
            friendsList: [
            {
                userName:"Item 1",
                text: "Text 1",
            },
            {
                userName:"Item 2",
                text: "Text 2",
            },
            {
                userName:"Item 3",
                text: "Text 3",
            },
            {
                userName:"Item 4",
                text: "Text 4",
            },
            {
                userName:"Item 5",
                text: "Text 5",
            },
            ]
        };
    }

    _renderItem({item,index}){
        return (
          <View style={styles.friendContainer}>
            <View style={styles.friendImage}>

            </View>
            {/* <Text style={{fontSize: 30}}>{item.userName}</Text>
            <Text>{item.text}</Text> */}
            <Text style={styles.friendNameText}>{item.userName}</Text>
          </View>

        )
    }

    render() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/acc_bg.png')} />
            <View style={styles.menuBox}>
                <Text style={styles.headerText}>REKALL</Text>
                <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                    <Image style={styles.navimage}
                        source={require('../assets/navbutton.png')}
                    />
                </TouchableOpacity> 
            </View>
            <View style={styles.secondContainer}>
                <View style={styles.profilePicBox}>
                    <View style={styles.profileCircle}></View>
                </View>
                <View style={styles.profileInfoBox}>
                    <Text style={styles.profileName}>{this.state.profileName}</Text>
                    <View style={styles.emailBox}>
                        <Text style={styles.email}>{this.state.email}</Text>
                        <Icon style={styles.emailIcon} name='envelope' type='font-awesome' color='#8D8D8D'></Icon>
                    </View>
                </View>
            </View>
            <View style={styles.thirdContainer}>
                <View style={styles.friendsHeaderBox}>
                    <Text style={styles.friendTitle}>Friends</Text>
                </View>
                <View style={styles.friendsListBox}>
                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                        <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.friendsList}
                        sliderWidth={300}
                        itemWidth={250}
                        renderItem={this._renderItem}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                </View>
            </View>
            <View style={styles.fourthContainer}>
                <Text style={styles.updateText}>Update Profile</Text>
            </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    button: {
      height: 40,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 10,
    },
    menuBox:{
        display: 'flex',
        height: 210,
        width: 380,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    menuButton:{
        alignSelf: 'center',
    },
    navimage:{
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
    secondContainer:{
        height: 250,
        //backgroundColor: 'teal',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    profilePicBox: {
        display: 'flex',
        height: 130,
        width: 410,
        // backgroundColor: 'red',
        // opacity: 0.1,
        alignSelf: 'center',
    },
    profileCircle:{
        height: 140,
        width: 140,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 0.3,
    },
    profileInfoBox:{
        width: 420,
        height: 150,
        //backgroundColor: 'green',
        alignSelf: 'center',
        //opacity: 0.3,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    profileName:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
    emailBox:{
        height: 50,
        //backgroundColor: 'blue',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
    },
    email:{
        paddingLeft: 10,
        fontFamily: 'AppleSDGothicNeo-Thin',
        fontSize: 20,
    },
    emailIcon:{
        paddingBottom: 10,
    },
    thirdContainer:{
        height: 350,
        //backgroundColor: 'pink',
    },
    fourthContainer: {
        height: 100,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center',
        
    },
    updateText:{
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Thin',
        textAlign: 'center',
    },
    friendsHeaderBox:{
        height: 100,
        //backgroundColor: 'lightblue',
        justifyContent: 'center',
    },
    friendTitle:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    friendsListBox:{
        height: 250,
        //backgroundColor: 'darkgreen',
    },
    friendContainer:{
        display: 'flex',
        backgroundColor:'floralwhite',
        borderRadius: 10,
        height: 250,
        // padding: 50,
        // marginLeft: 25,
        // marginRight: 25,
        flexDirection: 'column',
    },
    friendImage:{
        height: 200,
        backgroundColor: '#C4C4C4',
    },
    friendNameText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#4F4F4F',
        textAlign: 'center',
        fontSize: 25,
    }
});

export default ProfileScreen;

