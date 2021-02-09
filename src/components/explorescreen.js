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

class ExploreScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            activeIndex:0,
            videoItems: [
            {
                videoName:"Video 1",
                text: "Text 1",
            },
            {
                videoName:"Video 2",
                text: "Text 2",
            },
            {
                videoName:"Video 3",
                text: "Text 3",
            },
            {
                videoName:"Video 4",
                text: "Text 4",
            },
            {
                videoName:"Video 5",
                text: "Text 5",
            },
            ],
            picItems: [
                {
                    videoName:"Pic 1",
                    text: "Text 1",
                },
                {
                    videoName:"Pic 2",
                    text: "Text 2",
                },
                {
                    videoName:"Pic 3",
                    text: "Text 3",
                },
                {
                    videoName:"Pic 4",
                    text: "Text 4",
                },
                {
                    videoName:"Pic 5",
                    text: "Text 5",
                },
                ]

        }
    }

    renderVideoCard({item,index}){
        if (item.videoName !== null){
          return (
            <View style={styles.videoContainer}>
              <View style={styles.videoImage}>
  
              </View>
              {/* <Text style={{fontSize: 30}}>{item.userName}</Text>
              <Text>{item.text}</Text> */}
              <View style={styles.videoCardBottom} >
                <Text style={styles.videoNameText}>{item.videoName}</Text>
                <Icon style={styles.plusIcon} name='plus' size={40} type='evilicon' color='#686868'
                        onPress={()=> console.log("Item added to Gallery")}></Icon>
              </View>
            </View>
  
          );
        }
    }


    get360Pictures(){
        return(
            <View style={styles.video360Container}>
                <View style={styles.video360HeaderBox}>
                    <Text style={styles.videoTitle}>360 Pictures</Text>
                </View>
                <View style={styles.video360ListBox}>
                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.picItems}
                            sliderWidth={300}
                            itemWidth={250}
                            renderItem={this.renderVideoCard}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                </View>
            </View>
        )
    }

    get360videos(){
        return(
            <View style={styles.video360Container}>
                <View style={styles.video360HeaderBox}>
                    <Text style={styles.videoTitle}>360 Videos</Text>
                </View>
                <View style={styles.video360ListBox}>
                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.videoItems}
                            sliderWidth={300}
                            itemWidth={250}
                            renderItem={this.renderVideoCard}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                </View>
            </View>
        )
    }

    render(){
        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
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
                    {this.get360videos()}
                    {this.get360Pictures()}
                    <View style={styles.bottomContainer}>
                        <View style={styles.searchCircle}>
                            <Icon style={styles.searchIcon} name='search' size={50} type='material-icons' color='#686868'
                            onPress={()=> console.log("Search Clicked")}></Icon>
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
    // video360Container:{
    //     paddingTop: 20,
    //     height: 350,
    //     //backgroundColor: 'teal',
    // },
    video360HeaderBox:{
        height: 50,
        //backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
    },
    // video360Container: {
    //     //height: 350,
    //     //backgroundColor: 'teal',
    // },
    videoTitle:{
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 20,
        paddingLeft: 15,
    },
    video360Container:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'lightblue'
    },
    videoTitle:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    video360ListBox:{
        height: 300,
        //backgroundColor: 'darkgreen',
    },
    videoContainer:{
        display: 'flex',
        backgroundColor:'#F8F5F5',
        //backgroundColor: '#BABABB',
        borderRadius: 10,
        height: 250,
        // padding: 50,
        // marginLeft: 25,
        // marginRight: 25,
        flexDirection: 'column',
        shadowOffset:{  height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
    videoImage:{
        height: 200,
        backgroundColor: '#BABABB',
        borderRadius: 2,
    },
    videoCardBottom:{
        height: 50,
        flexDirection: 'row',
        //backgroundColor :'red',
        justifyContent: 'space-between',
    },
    videoNameText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#4F4F4F',
        textAlign: "left",
        fontSize: 25,
        paddingLeft: 20,
        paddingTop: 10,
    },
    bottomContainer: {
        height:  40,
        //backgroundColor: '#C4C4C4',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        //opacity: 0.6,
        paddingRight: 20,
    },
    searchCircle: {
        height: 55,
        width: 55,
        backgroundColor: '#F2F1F1',
        borderRadius: 40,
        shadowOffset:{width: 1, height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon:{
        height: 50,
        width: 60,
        alignSelf: 'flex-end',
        //backgroundColor: 'red',
    },
    
    plusIcon: {
        alignSelf: 'center',
        paddingLeft: 20,
        paddingTop: 10,
    },

});

export default ExploreScreen;
