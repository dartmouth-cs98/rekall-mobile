import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, ImageBackground, FlatList, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';
import youtubeSearch from './youtube_api.js';
import axios from 'axios';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { WebView } from 'react-native-webview';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
//import VideoDetailTabs from '../components/videoDetailTabs.js';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';
import VideoDetailTabs from './videoDetailTabs.js';

const API = 'https://rekall-server.herokuapp.com';

class VideoDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            video: this.props.route.params.video,
            myalbumNames: this.props.route.params.myalbums,
            sharedalbumNames: this.props.route.params.sharedalbums,
            title: this.props.route.params.title,
            //albums: [],
            showAlbums: false,
            updateAlbums: [],
        }
    }

    // getAlbumNames(){
    //     var albums = this.state.albumNames;
    //     console.log(albums);
    //     var albumObjs = [];
    //     //var albumObj = {};
    //     for (var i=0; i < albums.length; i++){
    //         var albumObj = {};
    //         albumObj["label"] = albums[i].albumName;
    //         albumObj["value"] = albums[i].albumName;
    //         albumObjs.push(albumObj);
    //     };
    //     this.setState({
    //         albums: albumObjs,
    //     });
    // 

   

    async loadData() {
        await this.props.getAlbums(this.props.user.uid).then(() => {
            this.setState({
                myAlbums: this.props.user.userAlbums,
            });
        });

        await this.props.getSharedAlbums(this.props.user.uid).then(() => {
            this.setState({
                sharedAlbums: this.props.user.sharedAlbums,
            });
        });
    }

    renderLoadingView() {
        //console.log(this.state.albumNames);
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }

    render(){
        const { videoId } = this.state.video.id

        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <View style={styles.titleBox}><Text style={styles.titleText}>{this.state.title}</Text></View>
                        <View style={styles.videoContainer}>
                            <WebView
                                source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                                automaticallyAdjustContentInsets={false}
                                startInLoadingState={true}
                                renderLoading={() => this.renderLoadingView()}
                                containerStyle={{flex: 0, height: 250}}
                            />
                        </View>
                        {/* <View style={styles.dropDownContainer}>
                            <VideoDetailTabs videoId={videoId} navigation={this.props.navigation}/>
                        </View> */}
                    </View>
                    <View style={styles.dropDownContainer}>
                        <VideoDetailTabs videoId={videoId} navigation={this.props.navigation}/>
                    </View>
                   {/* <View style={styles.secondContainer}>
                        <View style={styles.addButtonBox}>
                            <Button mode='contained'  color="#F2F1F1" labelStyle={styles.buttonText} onPress={() => this.addToGallery('User')} >
                                Add to Gallery
                            </Button>
                        </View>
                   </View> */}
                    
                </View>
                
            </LinearGradient>
        )
        
            
            // <TouchableOpacity onPress={() => this.props.navigation.navigate.goBack()} >
            //     <View style={styles.container}><Text style={styles.dummyText}>Video Detail!</Text></View>
            // </TouchableOpacity>
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    firstContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    titleBox:{
        height: '20%',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        fontSize: 20,
        
    },
    dropDownContainer:{
        //backgroundColor: 'red',
        height: '52%',
        // height: '45%',
    },
    videoContainer: {
        //height: 500,
        //backgroundColor: 'green',
        justifyContent: 'center',
    },
    dummyText: {
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonBox:{
        alignSelf: 'center',
        alignItems: 'center',
        width: '50%',
    },
    buttonText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        fontSize: 20,
    },
    // addToGalleryContainter:{
    //     //height: 500,
    //     //backgroundColor: 'red',
    //     flexDirection: 'row',
    //     justifyContent: 'space-evenly',
    // }
})

const mapStateToProps = (state) => {
    return {
      user: state.user,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: (userID) => dispatch(fetchUserInfo(userID)),
        getAlbums: (userID) => dispatch(getAlbums(userID)),
        getSharedAlbums: (userID) => dispatch(getSharedAlbums(userID))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);